import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchStudent, logoutStudent } from '@/utils/studentAuth';

const plannedServices = ['Materi kuliah', 'Bantuan belajar AI', 'Latihan Komquest'];

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    fetchStudent()
      .then((result) => {
        if (!active) return;
        if (!result) navigate('/login?error=session', { replace: true });
        else setData(result);
      })
      .catch(() => active && setError('Dashboard tidak dapat dimuat. Silakan muat ulang halaman.'));
    return () => {
      active = false;
    };
  }, [navigate]);

  const handleLogout = async () => {
    setBusy(true);
    try {
      await logoutStudent(data.csrf_token);
      navigate('/', { replace: true });
    } catch {
      setError('Gagal keluar. Silakan coba lagi.');
      setBusy(false);
    }
  };

  if (error) {
    return <p role="alert" className="py-16 text-center">{error}</p>;
  }

  if (!data) {
    return <p className="py-16 text-center" aria-live="polite">Memuat dashboard…</p>;
  }

  const { student, is_admin: isAdmin } = data;

  return (
    <section className="py-12 md:py-16" aria-labelledby="dashboard-title">
      <div className="bg-white text-primary-darker rounded-2xl shadow-xl p-6 md:p-10 max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 id="dashboard-title" className="font-montserrat text-2xl md:text-3xl font-bold">Dashboard</h1>
            <p className="mt-1">
              Masuk sebagai <strong>{student.name || student.email}</strong>
              {student.name && <span className="block text-sm break-all">{student.email}</span>}
            </p>
            <p className="mt-2 inline-block rounded-full bg-primary-light px-3 py-1 text-sm font-semibold">
              {isAdmin ? 'Administrator' : 'Mahasiswa'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            disabled={busy}
            className="rounded-full border-2 border-primary-darker px-6 py-2 font-semibold hover:bg-primary-light disabled:opacity-60 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary"
          >
            {busy ? 'Keluar…' : 'Keluar'}
          </button>
        </div>

        <h2 className="font-montserrat text-xl font-bold mt-10 mb-4">Layanan</h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {plannedServices.map((name) => (
            <li key={name} className="rounded-xl border border-primary p-4" aria-disabled="true">
              <span className="block font-semibold">{name}</span>
              <span className="text-sm">Belum tersedia</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Dashboard;
