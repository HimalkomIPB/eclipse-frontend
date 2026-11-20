import { LOMBA_STATUSES } from './api.js';

export const registrationFeatures = [
  {
    path: '/infolomba',
    endpoint: '/infolomba',
    responseKey: 'infolomba',
    label: 'Info Lomba',
    name: 'lomba',
    hasCategories: true,
    allowInactiveRegistration: true,
    useStorageCoverFallback: true,
    statusLabels: LOMBA_STATUSES,
    description: 'Temukan lomba pilihanmu dan catat periode pendaftarannya.',
  },
  {
    path: '/infomagang',
    endpoint: '/info-magang',
    responseKey: 'infomagang',
    label: 'Info Magang',
    name: 'magang',
    description: 'Temukan program magang dan lihat periode pendaftarannya.',
  },
  {
    path: '/beasiswa',
    endpoint: '/info-beasiswa',
    responseKey: 'infobeasiswa',
    label: 'Info Beasiswa',
    name: 'beasiswa',
    description: 'Temukan beasiswa dan lihat periode pendaftarannya.',
  },
];

export function isRegistrationPath(pathname) {
  const path = pathname.toLowerCase();
  return registrationFeatures.some(feature => path === feature.path || path.startsWith(`${feature.path}/`));
}
