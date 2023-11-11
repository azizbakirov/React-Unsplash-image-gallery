import style from "./profile.module.scss"
import DynamicNavbar from "../../Header/DynamicNavbar/DynamicNavbar"
import { useEffect } from "react";

function Profile({setMenuActive, menuActive}) {
  const key = "IcHl7zXAYsrJd5R0rB_SZ34fFquPdsGXRM_tgiMaDPg";
  const url = `https://api.unsplash.com/users/tolga__/photos?client_id=${key}&per_page=50`;

    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    },[])    

  // /users/:username

  return (
    <div>
      <DynamicNavbar setMenuActive={setMenuActive} menuActive={menuActive} />
    </div>
  );
}

export default Profile