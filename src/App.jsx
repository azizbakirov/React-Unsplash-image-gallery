import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Menu from "./Components/Header/MenuBurger/Menu";
import Nav from "./Components/Header/Navbar/Nav";
import Main from "./Components/Main/Main";
import CardModal from "./Components/Modal/CardModal/CardModal";
import About from "./Components/Pages/About/About";
import Contact from "./Components/Pages/Contact/Contact";
import Profile from "./Components/Pages/Profile/Profile";

function App() {
  const [page, setPage] = useState(1); //data page value
  const [save, setSave] = useState([]); //data save api
  const [search, setSearch] = useState("all"); //search state
  const [submitBtn, setSubmitBtn] = useState(false); // submit btn remove header
  const [loader, setLoader] = useState(true); //loader state
  const [dataSave, setDataSave] = useState(""); //save new Clicked data
  const [clickedId, setClickedId] = useState(null);
  const [menuActive, setMenuActive] = useState(false);

  document.body.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      setClickedId("");
      setDataSave("");
    }
  });

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const key = "IcHl7zXAYsrJd5R0rB_SZ34fFquPdsGXRM_tgiMaDPg";
  const url = `https://api.unsplash.com/search/photos/?client_id=${key}&query=${search}&per_page=20&page=${page}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSave((prev) => [...prev, ...data.results]);
        setLoader(false);
      })
      .finally();
  }, [url]);

  const handleInfinteScrol = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoader(true);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfinteScrol);
    return () => window.removeEventListener("scroll", handleInfinteScrol);
  }, []);

  document.body.style.overflow = menuActive || dataSave ? "hidden" : "scroll";


  return (
    <>
      <>
        {menuActive && (
          <Menu setMenuActive={setMenuActive} menuActive={menuActive} />
        )}
      </>
      {dataSave ? (
        <CardModal
          setClickedId={setClickedId}
          dataSave={dataSave}
          setDataSave={setDataSave}
          clickedId={clickedId}
        />
      ) : (
        ""
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav
                goToTop={goToTop}
                setSave={setSave}
                setSearch={setSearch}
                search={search}
                setSubmitBtn={setSubmitBtn}
                submitBtn={submitBtn}
                setMenuActive={setMenuActive}
                menuActive={menuActive}
              />
              {submitBtn ? (
                ""
              ) : (
                <>
                  <Header
                    setSearch={setSearch}
                    setPage={setPage}
                    page={page}
                    setSave={setSave}
                    setSubmitBtn={setSubmitBtn}
                  />
                </>
              )}
              <Main
                setClickedId={setClickedId}
                clickedId={clickedId}
                setDataSave={setDataSave}
                loader={loader}
                submitBtn={submitBtn}
                save={save}
              />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <About menuActive={menuActive} setMenuActive={setMenuActive} />
          }
        />
        <Route
          path="/contact"
          element={
            <Contact setMenuActive={setMenuActive} menuActive={menuActive} />
          }
        />
        <Route
          path="/profile/:id"
          element={
            <Profile setMenuActive={setMenuActive} menuActive={menuActive} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
