import style from "./style.module.scss";
function Header({ setSearch, setPage, page, setSave, setSubmitBtn }) {
  const handleSubmitFrom = (e) => {
    e.preventDefault();
    setSearch(e.target[0].value);
    setSave([]);
    setSubmitBtn(true)
  };

  return (
    <div className={style.header}>
      <div className={style.search_header}>
        <h3>THE GALLERY</h3>
        <p>Reusable generative AI style prompts for better images</p>
        <form onSubmit={handleSubmitFrom}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search styles image" />
        </form>
      </div>
    </div>
  );
}

export default Header;
