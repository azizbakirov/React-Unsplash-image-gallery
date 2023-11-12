import style from "./card.module.scss";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Card({
  setUserName,
  data,
  setDataSave,
  clickedId,
  setClickedId,
  user,
}) {
  const handleClikId = (id) => {
    if (id === data.id) {
      setDataSave(data);
      setUserName(data?.user?.username);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => handleClikId(data.id)}
    >
      <div className={style.cards}>
        {data?.urls ? (
          <img src={data?.urls?.regular} alt="" />
        ) : (
          <>
            <img src={data?.source?.cover_photo?.urls?.regular} alt="" />
          </>
        )}
        <div className={style.title_account}>
          {user?.profile_image ? (
            <div className={style.account}>
              <img src={user?.profile_image?.small} alt="" />
              <p>{user?.name}</p>
            </div>
          ) : (
            <div className={style.account}>
              <img src={data?.user?.profile_image?.small} alt="" />
              <p>{data?.user?.first_name}</p>
            </div>
          )}
          {data?.tags ? (
            <p>{data?.tags[0]?.title?.slice(0, 20)}</p>
          ) : (
            <p>{data?.title}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Card;
