import { NavLink } from 'react-router-dom';
import TImages from '../../utils/images';

const Logo = () => {
  return (
    <NavLink
      to="/home"
      className="flex items-center gap-2 text-white transition-opacity duration-300 hover:opacity-90 sm:gap-2.5"
    >
      <span className="text-[1.08rem] font-semibold italic leading-none tracking-tight sm:text-[1.18rem] xl:text-[1.2rem] 2xl:text-[1.3rem]">
        Himalkom<span className="font-light not-italic">IPB</span>
      </span>
      <img
        src={TImages.LOGO.LOGO_HIMALKOM}
        alt="HIMALKOM"
        className="h-7 w-7 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.12)] sm:h-8 sm:w-8 xl:h-8 xl:w-8 2xl:h-9 2xl:w-9"
      />
    </NavLink>
  );
};

export default Logo;
