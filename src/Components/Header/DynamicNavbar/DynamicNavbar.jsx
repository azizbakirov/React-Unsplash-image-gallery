import { motion } from "framer-motion";
import style from "./navbars.module.scss"
import logo from "../../../Assets/LOGO/THE GALLERY WHITE.png"
import { Link } from "react-router-dom";

function DynamicNavbar({ menuActive, setMenuActive }) {
  return (
    <motion.div layout className={style.bacdrop}>
      <div className={style.navbar}>
        <Link to="/" className={style.logo}>
          <img src={logo} alt="logo" />
        </Link>
        <div className={style.search}>
          <button
            className={style.burger_menu}
            onClick={() => setMenuActive(!menuActive)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default DynamicNavbar;
