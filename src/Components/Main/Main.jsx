import Card from "./Card/Card";
import style from "./style.module.scss";
import { motion } from "framer-motion";
import Loading from "../../Assets/Loading/Loading";

function Main({
  setUserName,
  loader,
  save,
  setDataSave,
  clickedId,
  setClickedId,
}) {
  return (
    <div className="container">
      <motion.div className={style.card}>
        {save?.map((data, idx) => (
          <Card
            setUserName={setUserName}
            clickedId={clickedId}
            setClickedId={setClickedId}
            data={data}
            key={idx}
            setDataSave={setDataSave}
          />
        ))}
      </motion.div>
      <div
        className={style.load}
        style={
          loader ? { transform: `translateY(0%)`,
          bottom: "0" } : { transform: `translateY(200%)`, bottom: "-50%"}
        }
      >
        <Loading />{" "}
      </div>
    </div>
  );
}

export default Main;
