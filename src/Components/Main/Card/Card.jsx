import style from "./card.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";

function Card({ data, setDataSave, clickedId, setClickedId }) {

    if (data.id === clickedId) {
       setDataSave(data);
    }  

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setClickedId(data.id)}
    >
      <div className={style.cards}>
        <img src={data?.urls?.regular} alt="" />
        <div className={style.title_account}>
          <div className={style.account}>
            <img src={data?.user?.profile_image?.small} alt="" />
            <p>{data?.user?.first_name}</p>
          </div>
          <p>{data?.tags[0]?.title?.slice(0, 20)}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default Card;
