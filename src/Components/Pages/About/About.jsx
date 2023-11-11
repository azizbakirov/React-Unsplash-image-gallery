import React from "react";
import style from "./about.module.scss";
import about from "../../../Assets/AboutPng/about.png";
import { Link } from "react-router-dom";
import DynamicNavbar from "../../Header/DynamicNavbar/DynamicNavbar";

function About({ setMenuActive, menuActive}) {
  return (
    <div className={style.about_item}>
      <DynamicNavbar setMenuActive={setMenuActive} menuActive={menuActive}/>
      <div className="container">
        <div className={style.about}>
          <div className={style.description}>
            <h3>About THE GALLERY</h3>
            <p>
              Welcome to <b>THE GALLERY!</b> Discover a world of captivating
              visuals at THE GALLERY. We curate a diverse collection of
              high-quality images to cater to your creative needs. Whether
              you're a designer, blogger, marketer, or simply someone who
              appreciates stunning visuals, our image library has something for
              everyone. Why Choose THE GALLERY? Diverse Categories: Explore our
              extensive range of categories, from nature and travel to business
              and technology. Find the perfect image to complement your project
              or enhance your content. High-Quality Imagery: Our curated
              selection ensures that every image meets the highest standards of
              quality. Crisp resolutions and vivid colors make your projects
              stand out. User-Friendly Interface: Navigate seamlessly through
              our user-friendly interface. Find what you need quickly with
              intuitive search features and filters. Royalty-Free Licensing:
              Enjoy peace of mind with our royalty-free licensing. Use the
              images for personal or commercial projects without worrying about
              licensing fees. How It Works: Browse: Explore our vast collection
              of images organized into easy-to-navigate categories. Search: Use
              our powerful search feature to find specific images or themes that
              match your vision. Download: Once you've found the perfect image,
              download it instantly in high resolution. It's that simple! Join
              THE GALLERY Today! Enhance your projects with the power of
              captivating visuals. Join THE GALLERY today and elevate your
              creative endeavors to new heights. Whether you're a seasoned
              professional or just starting, our image library is your go-to
              resource for stunning visuals.
            </p>
          </div>
          <img src={about} alt="" />
        </div>
        <Link className={style.back} to="/">
          <i className="fa-solid fa-arrow-left"></i> back Home
        </Link>
      </div>
    </div>
  );
}

export default About;
