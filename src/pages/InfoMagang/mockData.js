import { MAGANG_CATEGORIES } from './api';

export const MOCK_MAGANG_ITEMS = [
  {
    id: 1,
    title: 'Frontend Web Developer Intern',
    slug: 'frontend-web-developer-intern',
    category: MAGANG_CATEGORIES[0], // Software Engineering / Development
    status: 'active',
    start_date: '2026-11-01',
    end_date: '2026-12-30',
    description: '<p>Bergabunglah dengan tim engineering kami untuk mengembangkan antarmuka web modern berbasis React, TypeScript, dan Tailwind CSS. Anda akan berkolaborasi langsung dengan UI/UX Designer dan Backend Developer dalam membangun fitur-fitur interaktif dengan performa optimal.</p>',
    link: 'https://careers.google.com',
    company: 'TechNova Solutions',
    location: 'Jakarta (Hybrid)',
  },
  {
    id: 2,
    title: 'UI/UX Product Designer & Researcher Intern',
    slug: 'ui-ux-product-designer-intern',
    category: MAGANG_CATEGORIES[1], // UI/UX Design & Research
    status: 'active',
    start_date: '2026-11-05',
    end_date: '2026-12-20',
    description: '<p>Membantu riset pengguna, pembuatan wireframe, visual design, design system di Figma, dan usability testing untuk produk digital skala nasional. Kesempatan belajar langsung dari Senior Product Designer.</p>',
    link: 'https://www.linkedin.com',
    company: 'Creative Studio Indonesia',
    location: 'Remote',
  },
  {
    id: 3,
    title: 'Data Science & Machine Learning Intern',
    slug: 'data-science-ml-intern',
    category: MAGANG_CATEGORIES[2], // Data Science & Analytics
    status: 'upcoming',
    start_date: '2026-12-01',
    end_date: '2027-01-15',
    description: '<p>Mengolah big data, membangun model prediktif, eksplorasi data (EDA) menggunakan Python, Pandas, Scikit-learn, serta membuat visualisasi dashboard interaktif untuk business insights.</p>',
    link: 'https://www.kaggle.com',
    company: 'DataSphere Analytics',
    location: 'Bandung (Onsite)',
  },
  {
    id: 4,
    title: 'Associate Product Manager (APM) Intern',
    slug: 'associate-product-manager-intern',
    category: MAGANG_CATEGORIES[3], // Product Management
    status: 'active',
    start_date: '2026-11-10',
    end_date: '2026-12-25',
    description: '<p>Mendampingi Product Manager dalam menyusun Product Requirement Document (PRD), menganalisis feedback pengguna, memprioritaskan backlog fitur, dan melakukan sprint review bersama tim lintas disiplin.</p>',
    link: 'https://glints.com',
    company: 'Inovasi Digital Nusantara',
    location: 'Jakarta (Hybrid)',
  },
  {
    id: 5,
    title: 'QA Automation & Manual Testing Intern',
    slug: 'qa-automation-testing-intern',
    category: MAGANG_CATEGORIES[4], // Quality Assurance (QA) / Testing
    status: 'active',
    start_date: '2026-11-08',
    end_date: '2026-12-31',
    description: '<p>Membuat test plan, test cases, menjalankan automated test suite menggunakan Cypress/Playwright, serta mendokumentasikan bug reporting untuk memastikan kualitas aplikasi bebas dari error.</p>',
    link: 'https://jobstreet.co.id',
    company: 'Nusantara Cloud Tech',
    location: 'Remote',
  },
  {
    id: 6,
    title: 'Cybersecurity & Security Operations (SOC) Intern',
    slug: 'cybersecurity-soc-intern',
    category: MAGANG_CATEGORIES[5], // Cybersecurity / Information Security
    status: 'upcoming',
    start_date: '2026-12-05',
    end_date: '2027-01-20',
    description: '<p>Mempelajari identifikasi celah keamanan (vulnerability assessment), monitoring traffic jaringan, penanganan insiden keamanan siber, dan analisis protokol keamanan informasi standar industri.</p>',
    link: 'https://www.cybersecurity.id',
    company: 'SecureGuard Cyber',
    location: 'Jakarta (Onsite)',
  },
  {
    id: 7,
    title: 'DevOps & Cloud Infrastructure Intern',
    slug: 'devops-cloud-infrastructure-intern',
    category: MAGANG_CATEGORIES[6], // DevOps & Cloud Infrastructure
    status: 'closed',
    start_date: '2026-10-01',
    end_date: '2026-10-31',
    description: '<p>Mengelola pipeline CI/CD dengan GitHub Actions, konfigurasi container Docker, serta eksplorasi cloud service (AWS/GCP/Kubernetes) untuk mendukung deployment aplikasi yang scalable dan reliable.</p>',
    link: 'https://aws.amazon.com',
    company: 'CloudPrime Technologies',
    location: 'Remote',
  },
  {
    id: 8,
    title: 'Digital Marketing & Content Creator Specialist Intern',
    slug: 'digital-marketing-content-intern',
    category: MAGANG_CATEGORIES[7], // Digital Marketing & Content Creation
    status: 'active',
    start_date: '2026-11-02',
    end_date: '2026-12-28',
    description: '<p>Menyusun strategi konten media sosial (TikTok, Instagram, LinkedIn), analisis tren konten, copy writing kreatif, serta mengelola kampanye iklan digital untuk meningkatkan engagement komunitas.</p>',
    link: 'https://instagram.com',
    company: 'Visi Media Kreasi',
    location: 'Bogor (Hybrid)',
  },
  {
    id: 9,
    title: 'Corporate Operations & Strategy Analyst Intern',
    slug: 'corporate-operations-strategy-intern',
    category: MAGANG_CATEGORIES[8], // General Corporate / Operations
    status: 'closed',
    start_date: '2026-09-15',
    end_date: '2026-10-25',
    description: '<p>Mendukung efisiensi proses operasional harian perusahaan, koordinasi antar divisi, penyusunan laporan evaluasi bulanan, serta riset pasar pendukung keputusan strategis manajemen.</p>',
    link: 'https://dealls.com',
    company: 'Karsa Sinergi Mandiri',
    location: 'Jakarta (Onsite)',
  },
];

export function filterMockMagang({ q = '', category = '', status = '', page = 1, per_page = 6 }) {
  const query = q.toLowerCase().trim();

  const filtered = MOCK_MAGANG_ITEMS.filter(item => {
    if (query) {
      const matchTitle = item.title.toLowerCase().includes(query);
      const matchDesc = item.description.toLowerCase().includes(query);
      const matchCat = item.category?.name.toLowerCase().includes(query);
      if (!matchTitle && !matchDesc && !matchCat) return false;
    }

    if (category) {
      const matchCategory =
        item.category?.id === category ||
        item.category?.name.toLowerCase() === category.toLowerCase();
      if (!matchCategory) return false;
    }

    if (status && item.status !== status) {
      return false;
    }

    return true;
  });

  const total = filtered.length;
  const last_page = Math.max(1, Math.ceil(total / per_page));
  const currentPage = Math.min(Math.max(1, page), last_page);
  const start = (currentPage - 1) * per_page;
  const paginated = filtered.slice(start, start + per_page);

  return {
    categories: MAGANG_CATEGORIES,
    infomagang: paginated,
    pagination: {
      current_page: currentPage,
      last_page,
      per_page,
      total,
    },
  };
}

export function getMockMagangBySlug(slug) {
  const item = MOCK_MAGANG_ITEMS.find(m => m.slug === slug);
  return item ? { infomagang: item } : null;
}
