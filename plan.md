# HIMALKOM Website Performance Optimization Plan

## Goal

Make the mobile landing page feel fast on a mid-range phone and slow 4G connection, while preserving its content, visual identity, accessibility, and navigation behavior.

## Current baseline

Source: PageSpeed Insights mobile run from August 27, 2026 at 17:35 GMT+7, plus a local production build.

| Metric | Current | Target |
| --- | ---: | ---: |
| Lighthouse performance | 66 | >= 90 |
| First Contentful Paint (FCP) | 3.1 s | <= 1.8 s |
| Largest Contentful Paint (LCP) | 6.1 s | <= 2.5 s |
| Total Blocking Time (TBT) | 120 ms | <= 200 ms; do not regress |
| Cumulative Layout Shift (CLS) | 0.096 | <= 0.05 |
| Speed Index | 4.8 s | <= 3.4 s |
| Initial-page transfer | 22,669 KiB | <= 2,000 KiB |
| DOM elements | 1,454 | < 800 |
| Initial JavaScript | 193.4 KiB transferred; 96.6 KiB unused | < 120 KiB gzip |
| Local production bundle | One 653.98 KiB minified / 204.19 KiB gzip JS chunk | Route- and feature-split chunks |

There is no real-user Chrome UX Report data yet, so these targets must initially be validated with repeat lab tests and then monitored with real-user metrics.

## Why the site feels slow

1. **The page eagerly downloads far too many full-size images.** Lighthouse recorded a 22.7 MiB page and estimates 15.8 MiB can be saved through better image delivery. Several files are 0.7-1.8 MiB each, often loaded at source dimensions far larger than their rendered cards. The homepage images do not use responsive `srcset`/`sizes`, most below-fold images are not lazy-loaded, and many lack explicit dimensions.

2. **The project marquee multiplies the work.** `GalleryMarquee.jsx` combines all gallery and community projects, then creates two looping rows with two copies per row. Each unique project can therefore produce four image/DOM instances. Lighthouse saw 100 direct children in one marquee track and 1,454 total DOM nodes.

3. **API requests are duplicated and fanned out.** `NavMenu`, `MobileMenu`, and `Home` independently request community data. Both navigation variants stay mounted even when CSS hides one of them. The home page then makes one portfolio request per community with `Promise.all`, creating an N+1 request pattern. The report shows repeated `/divisions` and `/communities` calls, multiple portfolio calls, and a critical request chain ending around 4.0 seconds. `/komnews/home` alone transfers about 393 KiB.

4. **All routes and heavy UI libraries ship on the first visit.** `App.jsx` statically imports every page, so code for pages the visitor has not opened is included in the initial bundle. Swiper, Framer Motion, DOMPurify, icon libraries, and every route contribute to one large JavaScript chunk. Lighthouse estimates roughly half of the deployed JavaScript is unused during the initial page view.

5. **The critical render path waits on CSS and remote fonts.** The stylesheet and Google Fonts request block first paint, with an estimated 1.45-second saving available. The CSS imports two font families across many weights. `index.css` is also referenced from both `index.html` and `main.jsx` in source.

6. **The LCP element is delayed by discovery and animation.** Lighthouse identifies the `Eclipse Himalkom` SVG as the LCP element. Its request starts about 1.72 seconds late and it has about 1.04 seconds of render delay. The asset is approximately 341 KiB uncompressed locally, has no `fetchpriority="high"`, sits inside reveal/float effects, and continuously animates a `filter: drop-shadow(...)`, which is not composited.

7. **Continuous effects add scroll and paint cost.** The page has forced reflows, 477 ms of style/layout work, six long main-thread tasks, ten non-composited animations, persistent `will-change`, several backdrop blurs, and filter animations. These are secondary to the network problem, but they can make scrolling feel uneven on mobile.

8. **Layout space is not consistently reserved.** Images and asynchronously loaded sections do not always declare width/height or aspect ratio. Font swapping and arriving API content move the About section, producing almost all of the measured 0.096 CLS.

9. **Unused carousel state causes recurring full-page renders.** `Home` starts two `useCarousel` intervals and passes their values to components that do not consume them. Every five seconds these timers update parent state and re-render the homepage unnecessarily.

## Implementation plan

### Phase 0 — Establish repeatable measurement

- [ ] Record three cold-cache mobile Lighthouse runs and use the median, with the same Moto G Power / slow 4G profile as the supplied report.
- [ ] Save the network waterfall, coverage report, performance trace, request count, transfer size, LCP element, and bundle composition.
- [ ] Add a bundle analysis command or Vite visualizer that can be run locally without shipping analyzer code to production.
- [ ] Define performance budgets in CI: initial JS <= 120 KiB gzip, initial CSS <= 20 KiB gzip, above-fold images <= 300 KiB total, initial-page transfer <= 2 MiB, LCP <= 2.5 s, and CLS <= 0.05.

Exit criterion: the baseline is reproducible and a failed budget can block a regression.

### Phase 1 — Cut the image payload first

This is the highest-impact phase because images account for most of the 22.7 MiB transfer.

- [ ] Add a server-side image transformation pipeline or image CDN for API media. Generate AVIF/WebP thumbnails at the actual card widths (roughly 176, 240, 320, 640, and 960 px) while retaining an original for detail pages.
- [ ] Change API responses to return thumbnail URLs or variants rather than forcing the frontend to request original uploads.
- [ ] Update homepage cards to use `srcset` and `sizes`; use AVIF/WebP with a safe fallback where necessary.
- [ ] Add `loading="lazy"` and `decoding="async"` to every below-fold image. Do not lazy-load the true above-fold LCP asset.
- [ ] Add intrinsic `width`/`height` or CSS `aspect-ratio` to all images, including community and Megaproker logos, to reserve layout space.
- [ ] Optimize the local `eclipse-himalkom.svg` and other oversized SVGs with SVGO. Remove embedded raster data and unnecessary editor metadata if present.
- [ ] Cap homepage project items to a curated/recent set (for example 8-12 items) instead of loading every portfolio entry.

Exit criterion: initial transfer is <= 2 MiB, no homepage card downloads an original image larger than twice its rendered width, and the image-delivery audit no longer reports multi-megabyte savings.

### Phase 2 — Remove duplicate and non-critical data work

- [ ] Replace independent `useFetchData` calls with a shared request cache that deduplicates in-flight requests, caches successful navigation data for the session, supports `AbortController`, and exposes retry/error behavior. Avoid adding a large query library solely for these simple reads.
- [ ] Fetch divisions and communities once for the header. Render only the active navigation implementation at each breakpoint, or pass the same cached data to both variants.
- [ ] Do not mount/fetch mobile-menu content until the menu is first opened.
- [ ] Remove the homepage N+1 community portfolio requests. Add one backend endpoint such as `/homepage/projects?limit=12` that returns a mixed, bounded list with thumbnail URLs.
- [ ] Slim `/komnews/home` to only the fields needed by cards, truncate summaries on the server, limit the item count, and return thumbnail variants rather than full article payloads.
- [ ] Start below-fold section requests only when the section approaches the viewport, while rendering fixed-height skeletons so deferred content does not shift the page.
- [ ] Set sensible API caching (`Cache-Control`, `ETag`/conditional requests) and compress JSON with Brotli or gzip.

Exit criterion: one request per unique endpoint on first load, no per-community request fan-out, and non-critical homepage requests no longer extend the LCP critical path.

### Phase 3 — Fix LCP and the render-blocking path

- [ ] Decide and stabilize the intended LCP element in the first viewport. Remove entrance delays and visibility-gated animation from above-fold hero/LCP content.
- [ ] Optimize the identified `Eclipse Himalkom` SVG, give it intrinsic dimensions, and add `fetchpriority="high"` if it remains the true LCP resource. Preload it only after verifying that the preload is used and does not compete with a more important hero resource.
- [ ] Stop animating `filter` on the LCP image. Keep any gentle float to `transform` only, and disable it for `prefers-reduced-motion`.
- [ ] Self-host a small set of subsetted WOFF2 fonts, preload only the critical regular/semibold face, and use `font-display: swap` or `optional`. Remove unused font families and weights.
- [ ] Remove the stylesheet reference from `index.html` and keep the single Vite import in `main.jsx`.
- [ ] Keep critical global/hero styles small; defer section-specific CSS with its lazy-loaded feature where practical.

Exit criterion: FCP <= 1.8 s, LCP <= 2.5 s, no avoidable render-blocking font request, and no animation-imposed LCP render delay.

### Phase 4 — Split and reduce JavaScript

- [ ] Convert every non-home route in `App.jsx` to `React.lazy(() => import(...))` with a stable, lightweight `Suspense` fallback.
- [ ] Lazy-load below-fold homepage features such as KomNews/Swiper and the project gallery when they approach the viewport.
- [ ] Keep Swiper CSS and JavaScript inside the KomNews feature chunk. Evaluate replacing the one-card news slider with CSS scroll snap if it preserves required behavior with materially less code.
- [ ] Reduce broad animation usage: replace simple reveal effects with a shared Intersection Observer plus CSS transitions, or at minimum avoid one Framer Motion observer/component per card.
- [ ] Remove the two unused `useCarousel` instances and props from `Home`; they currently trigger parent updates every five seconds.
- [ ] Remove unused dependencies and imports after checking production bundle output. Prefer small inline SVG icons for the few static controls if icon packages remain a meaningful chunk.
- [ ] Configure stable vendor/route chunking only after dynamic imports are in place; do not hide an oversized initial bundle by merely renaming chunks.

Exit criterion: no Vite chunk-size warning for the initial route, initial JS is <= 120 KiB gzip, and the Lighthouse unused-JavaScript opportunity is minimal.

### Phase 5 — Reduce DOM, paint, and recurring runtime work

- [ ] Redesign the mobile project marquee as one bounded row or a user-controlled horizontal list. On larger screens, render only the copies required for a seamless loop and keep the item cap from Phase 1.
- [ ] Add `content-visibility: auto` plus appropriate `contain-intrinsic-size` to large below-fold sections after confirming accessibility and anchor navigation behavior.
- [ ] Pause marquee and decorative animations when offscreen or when the document is hidden. Fully honor `prefers-reduced-motion`.
- [ ] Replace filter/drop-shadow animation with opacity/transform where the visual result remains acceptable. Limit backdrop blur to a small number of surfaces on mobile.
- [ ] Remove persistent `will-change` from the marquee, cards, header clip path, and logo; apply it only immediately before a known animation if profiling proves it helps.
- [ ] Throttle the header threshold calculation with `requestAnimationFrame`, and update React state only when the threshold boolean changes.
- [ ] Use the Performance panel to locate the reported forced reflows, then batch layout reads before writes and eliminate the responsible call paths.

Exit criterion: DOM < 800 elements on the home page, no non-composited animation warnings on core content, no recurring idle re-render from carousel timers, and smooth scrolling on a mid-range Android device.

### Phase 6 — Caching and delivery

- [ ] Serve hashed Vite assets and versioned media variants with `Cache-Control: public, max-age=31536000, immutable`; keep HTML short-lived/no-cache so deployments update safely.
- [ ] Put transformed images and static assets behind a CDN close to Indonesian users.
- [ ] Enable Brotli for JavaScript, CSS, SVG, and JSON, with gzip fallback.
- [ ] Use HTTP/2 or HTTP/3 and verify cache headers at the deployed URL. Do not add speculative preconnects unless a new trace shows a connection setup bottleneck.
- [ ] Ensure error fallbacks point to real, lightweight local placeholder assets; current `/images/placeholder-*.jpg` paths should be verified.

Exit criterion: repeat visits reuse immutable assets, Lighthouse cache-lifetime savings are negligible, and all placeholders resolve successfully.

### Phase 7 — Prevent regressions and verify UX

- [ ] Re-run three cold-cache mobile Lighthouse tests after each phase and compare medians, not a single score.
- [ ] Test at 360 px, 768 px, and desktop widths; verify navigation, all route transitions, project links, carousels, reduced motion, keyboard use, and screen-reader names.
- [ ] Confirm skeletons and font loading do not cause layout shift. Validate CLS during both initial load and late API arrival.
- [ ] Add lightweight real-user monitoring using the `web-vitals` library or the hosting platform's native RUM, collecting LCP, INP, and CLS without personal data.
- [ ] Monitor p75 mobile Core Web Vitals once enough traffic exists. Treat p75 LCP <= 2.5 s, INP <= 200 ms, and CLS <= 0.1 as the production pass criteria.
- [ ] Recheck accessibility and SEO after performance changes; do not trade the current accessibility score for speed.

## Recommended execution order

1. Responsive/lazy thumbnails and a capped marquee.
2. Shared API cache, one homepage-project endpoint, and a slim news endpoint.
3. Stable LCP, self-hosted subset fonts, and no above-fold reveal delay.
4. Route/feature code splitting and removal of unused carousel state.
5. DOM/animation/paint cleanup.
6. CDN, caching headers, compression, CI budgets, and RUM.

The first two items should deliver the largest visible improvement. TBT is already acceptable, so image/network work should not be delayed in favor of small JavaScript micro-optimizations.
