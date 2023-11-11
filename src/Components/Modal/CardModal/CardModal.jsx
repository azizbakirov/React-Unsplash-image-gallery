import { Component, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./modal.module.scss";
import RelatedImage from "./Related/RelatedImage";

function CardModal({ dataSave, setDataSave, setClickedId, clickedId }) {
  const [resizeImage, setResizeImage] = useState(false);
  const [hover, setHover] = useState(false);
  const [relatedImage, setRelatedImage] = useState([]);

  const para = useParams()

  console.log(para);



  const close = (e) => {
    setClickedId("");
    setDataSave("");
  };
  const handleClickDiv = (e) => {
    e.stopPropagation();
  };

  const handleEnter = () => {
    setHover("");
  };
  const handleLeave = () => {
    setHover(false);
  };
  const handleAccountClick = () => {
    handleClickDiv()
    setDataSave("")

  }

  const key = "IcHl7zXAYsrJd5R0rB_SZ34fFquPdsGXRM_tgiMaDPg";

  const url = `https://api.unsplash.com/search/photos/?client_id=${key}&query=${dataSave?.tags[0]?.title}&per_page=6&page=1`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRelatedImage(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(dataSave.user);

  return (
    <div className={style.card_bacdrop} onClick={close}>
      <div className={style.cards} onClick={close}>
        <div className={style.close}>
          <i className="fa-solid fa-xmark" onClick={close}></i>
        </div>
        <div className={style.image_account} onClick={close}>
          <div></div>
          <div
            onClick={handleClickDiv}
            className={style.image}
            style={resizeImage ? { width: "100%", height: "100%" } : {}}
          >
            <div
              className={style.resize}
              onClick={() => setResizeImage(!resizeImage)}
            >
              {resizeImage ? (
                <i className="fa-solid fa-down-left-and-up-right-to-center"></i>
              ) : (
                <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
              )}
            </div>
            <img src={dataSave.urls.regular} alt="" />
          </div>
          <Link
            to={"/profile/"+dataSave.user.id}
            className={style.account}
            onClick={handleAccountClick}
          >
            <div
              className={style.image_desc}
              onMouseEnter={() => setHover("profile")}
              onMouseLeave={handleLeave}
            >
              <img src={dataSave.user.profile_image.medium} alt="" />
            </div>
            {hover === "profile" && (
              <div
                style={{
                  top: "120px",
                }}
                title="Profile"
                className={style.hover_info}
              >
                <span>{dataSave.user.name}</span>
                <p>{dataSave.user.first_name}</p>
              </div>
            )}

            <div>
              <div
                className={style.info}
                onMouseEnter={() => setHover("info")}
                onMouseLeave={handleLeave}
              >
                <i className="fa-solid fa-info"></i>
              </div>
              {hover === "info" && (
                <div
                  title="Description"
                  className={style.hover_info}
                  onMouseEnter={() => setHover("info")}
                  onMouseLeave={handleLeave}
                >
                  <span>{dataSave.alt_description}</span>
                  {dataSave?.description === null ? null : (
                    <p>{dataSave.description}</p>
                  )}
                </div>
              )}
            </div>
            <div>
              <a
                title="Download"
                download="THE_GALLERY"
                target="_blank"
                href={dataSave.urls.full}
                className={style.info}
                onMouseEnter={() => setHover("down")}
                onMouseLeave={handleLeave}
              >
                <i className="fa-solid fa-arrow-down"></i>
              </a>
            </div>
          </Link>
        </div>

        <div className={style.content}>
          <h4>Related images</h4>

          <div className={style.related_image} onClick={handleClickDiv}>
            {relatedImage.map((data) => (
              <RelatedImage
                setDataSave={setDataSave}
                clickedId={clickedId}
                data={data}
                setClickedId={setClickedId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardModal;
