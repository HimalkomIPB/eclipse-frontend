import { useSearchParams } from 'react-router-dom';
import { googleLoginUrl } from '@/utils/studentAuth';

const errorMessages = {
  cancelled: 'Login dibatalkan. Silakan coba lagi bila ingin masuk.',
  domain: 'Hanya akun Google terverifikasi @apps.ipb.ac.id yang dapat masuk.',
  state: 'Sesi login kedaluwarsa atau tidak valid. Silakan ulangi login.',
  unavailable: 'Login Google belum tersedia saat ini. Silakan coba lagi nanti.',
  provider: 'Terjadi kendala saat menghubungi Google. Silakan coba lagi.',
  session: 'Silakan masuk terlebih dahulu untuk membuka dashboard.',
};

const Login = () => {
  const [params] = useSearchParams();
  const error = errorMessages[params.get('error')] ?? null;

  return (
    <section className="py-16 flex justify-center" aria-labelledby="login-title">
      <div className="w-full max-w-md bg-white text-primary-darker rounded-2xl shadow-xl p-6 md:p-10">
        <h1 id="login-title" className="font-montserrat text-2xl md:text-3xl font-bold mb-2">Masuk Mahasiswa</h1>
        <p className="mb-6">Gunakan akun Google <strong>@apps.ipb.ac.id</strong> untuk membuka dashboard.</p>
        {error && (
          <p role="alert" className="mb-6 rounded-lg border border-red-300 bg-red-50 p-3 text-red-800">{error}</p>
        )}
        <a
          href={googleLoginUrl}
          className="block w-full text-center rounded-full bg-primary-darker text-white font-semibold py-3 px-6 hover:bg-primary-dark focus:outline-none focus-visible:ring-4 focus-visible:ring-primary"
        >
          Masuk dengan Google
        </a>
        <p className="mt-6 text-sm">Berita, info lomba dan konten publik lain tetap dapat dibaca tanpa login.</p>
      </div>
    </section>
  );
};

export default Login;
