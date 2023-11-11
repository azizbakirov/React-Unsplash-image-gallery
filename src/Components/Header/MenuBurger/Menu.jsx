import React from "react";
import style from "./menu.module.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from '../../../Assets/LOGO/THE GALLERY WHITE.png'

function Menu({ setMenuActive }) {
  return (
    <motion.div
      layout
      whileInView={{ opacity: 1 }}
      className={style.menu}
      animate={{ opacity: 1 }}
    >
      <div className={style.menu_wrapper}>
        <Link to="/" onClick={() => setMenuActive(false)}>
          <img src={logo} alt="" />
        </Link>
        <motion.div
          animate={{ transform: "translateX(0px)" }}
          className={style.category_xmark}
        >
          <i
            className="fa-solid fa-xmark"
            onClick={() => setMenuActive((old) => !old)}
          ></i>
          <div className={style.category_menu}>
            <Link onClick={() => setMenuActive(false)}>All Image</Link>
            <Link onClick={() => setMenuActive(false)}>Images</Link>
            <Link onClick={() => setMenuActive(false)}>Creators</Link>
            <Link onClick={() => setMenuActive(false)} to="/about">
              About
            </Link>
            <Link onClick={() => setMenuActive(false)} to="/contact">
              Contacte
            </Link>
          </div>
          
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Menu;
