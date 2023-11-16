import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header.jsx";
import Menu from "./Components/Header/MenuBurger/Menu.jsx";
import Nav from "./Components/Header/Navbar/Nav.jsx";
import Main from "./Components/Main/Main.jsx";
import CardModal from "./Components/Modal/CardModal/CardModal.jsx";
import About from "./Components/Pages/About/About.jsx";
import Contact from "./Components/Pages/Contact/Contact.jsx";
import Profile from "./Components/Pages/Profile/Profile.jsx";
import { GetAllPhotos } from "./Services/Unsplash.service";
import SpinnerLoading from "./Assets/Loading/Spinner/Spinner";

function App() {
  const [page, setPage] = useState(1); //data page value
  const [save, setSave] = useState([]); //data save api
  const [search, setSearch] = useState("all"); //search state
  const [submitBtn, setSubmitBtn] = useState(false); // submit btn remove header
  const [loader, setLoader] = useState(true); //loader state
  const [dataSave, setDataSave] = useState(""); //save new Clicked data
  const [clickedId, setClickedId] = useState(null); //clicked id save
  const [menuActive, setMenuActive] = useState(false); //burgermenu active state
  const [homePageLoader, setHomePageLoader] = useState(true);

  //localstorage data
  const [userName, setUserName] = useState(
    JSON.parse(localStorage.getItem("data")) || "",
  );

  // close ESC btn func
  document.body.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      setClickedId("");
      setDataSave("");
    }
  });

  // Top btn func
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // GetAll photos api request
  useEffect(() => {
    setLoader(true);
    GetAllPhotos(search, page)
      .then(
        (data) => setSave((prev) => [...prev, ...data.data.results]),
        setTimeout(() => {
          setLoader(false);
        }, 1000),
      )
      .catch((err) => {
        console.log(err);
      });
  }, [search, page]);

  // Infinte Scroll func
  const handleInfinteScrol = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoader(true);
      setPage((prev) => prev + 1);
    }
  };

  // infinte scroll window location
  useEffect(() => {
    window.addEventListener("scroll", handleInfinteScrol);
    return () => window.removeEventListener("scroll", handleInfinteScrol);
  }, []);

  // modal menu open scroll none func
  document.body.style.overflowY = `${
    menuActive || dataSave ? "hidden" : "scroll"
  }`;

  // Localstorage save
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(userName));
  }, [userName]);

  setTimeout(() => {
    setHomePageLoader(false);
  }, 1000);

  return (
    <>
      {homePageLoader ? (
        <div className="loading">
          <SpinnerLoading />
        </div>
      ) : (
        <>
          <>
            {menuActive && (
              <Menu setMenuActive={setMenuActive} menuActive={menuActive} />
            )}
          </>
          {dataSave && (
            <CardModal
              setClickedId={setClickedId}
              dataSave={dataSave}
              setDataSave={setDataSave}
              clickedId={clickedId}
            />
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
                    setUserName={setUserName}
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
                <Contact
                  setMenuActive={setMenuActive}
                  menuActive={menuActive}
                />
              }
            />
            <Route
              path="/profile/:id"
              element={
                <Profile
                  setDataSave={setDataSave}
                  setMenuActive={setMenuActive}
                  setClickedId={setClickedId}
                  menuActive={menuActive}
                  clickedId={clickedId}
                  goToTop={goToTop}
                  userName={userName}
                />
              }
            />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
