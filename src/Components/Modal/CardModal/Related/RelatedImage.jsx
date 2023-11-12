import React from "react";
import { motion } from "framer-motion";
import style from "./related.module.scss";

function RelatedImage({setDataSave,clickedId, data, setClickedId }) {
 
    const handleClick = (id) => {
        setClickedId(id);
        
    }
    
    if(data.id === clickedId){
        setDataSave(data)
    } 

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => handleClick(data.id)}
    >
      <a href="#top" className={style.cards}>
        <img src={data?.urls?.regular} alt="" />
        <div className={style.title_account}>
          <div className={style.account}>
            <img src={data?.user?.profile_image?.small} alt="" />
            <p>{data?.user?.first_name}</p>
          </div>
          <p>{data?.tags[0]?.title?.slice(0, 20)}</p>
        </div>
      </a>
    </motion.div>
  );
}

export default RelatedImage;
