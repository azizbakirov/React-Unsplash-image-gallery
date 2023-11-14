import React from 'react'
import style from "./loader.module.scss"

function Loading() {
  return (
    <div className={style.loads}>
      <span className={style.loader}></span>
    </div>
  );
}

export default Loading