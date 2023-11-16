import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAllPhotos } from "../../../Services/Unsplash.service";
import style from "./modal.module.scss";
import RelatedImage from "./Related/RelatedImage";

function CardModal({ dataSave, setDataSave, setClickedId, clickedId }) {
  const [resizeImage, setResizeImage] = useState(false);
  const [hover, setHover] = useState(false);
  const [relatedImage, setRelatedImage] = useState([]);

  const close = (e) => {
    setClickedId("");
    setDataSave("");
  };
  const handleClickDiv = (e) => {
    e?.stopPropagation();
  };

  const handleLeave = () => {
    setHover(false);
  };
  const handleAccountClick = (e) => {
    handleClickDiv();
  };

  {
    dataSave?.tags[0] &&
      useEffect(() => {
        GetAllPhotos(`${dataSave?.tags[0]?.title}`, 1)
          .then((data) => {
            setRelatedImage(data.data.results);
          })
          .catch((err) => {
            console.log("err", err);
          });
      }, [dataSave?.tags[0]?.title]);
  }

  return (
    <div className={style.card_bacdrop} onClick={close}>
      <div className={style.cards} onClick={close} id="top">
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
          <div className={style.account} onClick={handleAccountClick}>
            <Link
              to={"/profile/" + dataSave?.user?.id}
              className={style.image_desc}
              onMouseEnter={() => setHover("profile")}
              onMouseLeave={handleLeave}
            >
              <img src={dataSave.user.profile_image.small} alt="" />
            </Link>
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
          </div>
        </div>

        <div className={style.content}>
          <h4>Related images</h4>

          <div className={style.related_image} onClick={handleClickDiv}>
            {relatedImage.map((data, idx) => (
              <RelatedImage
                key={idx}
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
