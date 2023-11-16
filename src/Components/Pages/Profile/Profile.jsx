import { useEffect, useState } from "react";
import { GetUser } from "../../../Services/Unsplash.service";
import DynamicNavbar from "../../Header/DynamicNavbar/DynamicNavbar";
import Card from "../../Main/Card/Card";
import style from "./profile.module.scss";
import { SpinnerLoading } from "../../../Assets";
import StatisticChart from "./Charts/StatisticChart";

function Profile({
  setMenuActive,
  menuActive,
  setDataSave,
  clickedId,
  setClickedId,
  userName,
}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetUser(userName)
      .then((data) => {
        setLoading(false);
        setUser(data.data);
      })
      .finally();
  }, [userName]);

  return (
    <div>
      {loading ? (
        <div className={style.loading}>
          <SpinnerLoading />
        </div>
      ) : (
        <>
          <DynamicNavbar
            setMenuActive={setMenuActive}
            menuActive={menuActive}
          />

          <div className={style.profile}>
            <div className={style.user}>
              <div className={style.user_info}>
                <img src={user?.profile_image?.large} alt="" />
                <h4>{user?.name}</h4>
                <p className={style.desc}>{user?.bio}</p>
                <p className={style.location}>{user?.location}</p>
                <div className={style.social}>
                  {user?.social?.instagram_username && (
                    <a
                      target="_blank"
                      href={`https://www.instagram.com/${user?.social?.instagram_username}`}
                    >
                      <i className="fa-brands fa-square-instagram"></i>
                    </a>
                  )}
                  {user?.social?.twitter_username && (
                    <a
                      target="_blank"
                      href={`https://www.x.com/${user?.social?.twitter_username}`}
                    >
                      <i className="fa-brands fa-x-twitter"></i>
                    </a>
                  )}
                  {user?.social?.portfolio_url && (
                    <a target="_blank" href={user?.social?.portfolio_url}>
                      <i className="fa-solid fa-camera-retro"></i>
                    </a>
                  )}
                  {user?.social?.paypal_email && (
                    <a
                      target="_blank"
                      href={`https://www.instagram.com/${user?.social?.paypal_email}`}
                    >
                      <i className="fa-brands fa-paypal"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className={style.charts}>
              <StatisticChart />
            </div>

            <div className={style.user_image}>
              {user?.tags?.aggregated?.map((data, idx) => (
                <>
                  {data?.source && (
                    <Card
                      key={idx}
                      user={user}
                      data={data}
                      setDataSave={setDataSave}
                      clickedId={clickedId}
                      setClickedId={setClickedId}
                    />
                  )}
                </>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
