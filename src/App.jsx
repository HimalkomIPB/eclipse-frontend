import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ScrollToTop from './components/common/ScrollToTop';
import PageFallback from './components/common/PageFallback';
import Footer from './components/footer';
import Header from './components/header';
import MainLayout from './layout/MainLayout';

// Home is eagerly loaded since it's the primary landing route
import Home from './pages/Home';

// All other routes are lazy-loaded to reduce the initial JS bundle
const Departemen = lazy(() => import('./pages/Departemen'));
const Galeri = lazy(() => import('./pages/Galeri'));
const GalleryDetail = lazy(() => import('./pages/Galeri/Detail'));
const Himalkom = lazy(() => import('./pages/Himalkom'));
const Komnews = lazy(() => import('./pages/Komnews'));
const News = lazy(() => import('./pages/Komnews/News'));
const Komunitas = lazy(() => import('./pages/Komunitas'));
const Megaproker = lazy(() => import('./pages/Megaproker'));
const Explore = lazy(() => import('./pages/Explore'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Riset = lazy(() => import('./pages/Riset'));
const Syntax = lazy(() => import('./pages/Syntax'));
const Prestasi = lazy(() => import('./pages/Prestasi'));
const DetailPrestasi = lazy(() => import('./pages/Prestasi/Detail/Detail'));

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <MainLayout>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/community/:slug" element={<Komunitas />} />
            <Route path="/himalkom" element={<Himalkom />} />
            <Route path="/division/:slug" element={<Departemen />} />
            <Route path="/komnews" element={<Komnews />} />
            <Route path="/komnews/:slug" element={<News />} />
            <Route path="/riset" element={<Riset />} />
            <Route path="/syntax" element={<Syntax />} />
            <Route path="/megaproker" element={<Megaproker />} />
            <Route path="/galeri" element={<Galeri />} />
            <Route path="/galeri/:id" element={<GalleryDetail />} />
            <Route path="/prestasi" element={<Prestasi />} />
            <Route path="/prestasi/:id" element={<DetailPrestasi />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MainLayout>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
