import React, { useState } from "react";
import style from "./nav.module.scss";
import { m, motion } from "framer-motion";
import Menu from "../MenuBurger/Menu";
import logo from "../../../Assets/LOGO/THE GALLERY WHITE.png"
import DynamicNavbar from "../DynamicNavbar/DynamicNavbar";

function Nav({goToTop, setSave, setSearch, setSubmitBtn, submitBtn,setMenuActive, menuActive }) {
  const [active, setActive] = useState(false);

  document.body.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      setMenuActive(false)
    }
  });

  window.onscroll = function () {
   scrollNav();
  };
  

  const scrollNav = () => {
    if (
      document.body.scrollTop >= 90 ||
      document.documentElement.scrollTop >= 150
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target[0].value);
    setSave([]);
    setSubmitBtn(true);
    setActive("active")
  };


  return (
    <motion.div layout>
      {active ? (
        <motion.div layout className={style.bacdrop}>
          <div className={style.navbar}>
            <div className={style.logo} onClick={goToTop}>
              <img src={logo} alt="" />
            </div>
            <div className={style.search}>
              <form onSubmit={handleSearchSubmit}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Search Style for image" />
              </form>
              <p>|</p>
              <button
                className={style.burger_menu}
                onClick={() => setMenuActive(!menuActive)}
              >
                <i className="fa-solid fa-bars"></i>
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div layout>
          {submitBtn ? (
            <DynamicNavbar
              menuActive={menuActive}
              setMenuActive={setMenuActive}
            />
          ) : (
            <motion.div layout className={style.old_Navbar}>
              <div className={style.nav}>
                <button className={style.help}>
                  <i className="fa-solid fa-question"></i>
                  <span>How to use The Gallery</span>
                </button>
                <button
                  className={style.burger_menu}
                  onClick={() => setMenuActive(!menuActive)}
                >
                  <i className="fa-solid fa-bars"></i>
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default Nav;
