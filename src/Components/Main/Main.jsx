import Card from "./Card/Card";
import style from "./style.module.scss";
import { motion } from "framer-motion";
import Loading from "../Loading/Loading";
import { useState } from "react";
import CardModal from "../Modal/CardModal/CardModal";

function Main({ loader, save, setDataSave, clickedId, setClickedId }) {

  return (
    <div className="container">
      <motion.div className={style.card}>
        {save?.map((data, idx) => (
          <Card  clickedId={clickedId} setClickedId={setClickedId} data={data} key={idx} setDataSave={setDataSave} />
        ))}
      </motion.div>
      <div className={style.load}>{loader ? <Loading /> : ""}</div>
    </div>
  );
}

export default Main;
