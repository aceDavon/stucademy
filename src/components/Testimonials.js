import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState } from "react";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import { Rating } from "react-simple-star-rating";
import defaultAvatar from "../assets/images/avatar.jpg";
export default function Testimonials() {
  const sliderRef = useRef(null);
  const [scrolling, setScrolling] = useState({
    right: true,
    left: false,
  });
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    responsive: [
      {
        breakpoint: 768,  
        settings: {
          slidesToShow: 1,  
        },
      },
    ],
  };

  const nextSlide = () => {
    setScrolling({
      ...scrolling,
      right: true,
      left: false,
    });
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    setScrolling({
      ...scrolling,
      right: false,
      left: true,
    });
    sliderRef.current.slickPrev();
  };
  return (
    <div id="testimonials" className="testimonials-container">
      <header>
        <h2>
          <span className="hide-on-mobile">Inpsiring Testimonials: </span>Students{" "}
          <span className="love-text">Love</span> Stucademy!
        </h2> 
 
        <div className="controls">
          <span
            className={scrolling.left ? "active-control" : ""}
            onClick={prevSlide}
          >
            <BsArrowLeftShort />
          </span>
          <span
            className={scrolling.right ? "active-control" : ""}
            onClick={nextSlide}
          >
            {" "}
            <BsArrowRightShort />
          </span>
        </div>
      </header>

      <div className="slider-area">
        <Slider responsive={true} rows={1} ref={sliderRef} {...settings}>
          {testimonies.map((item, i) => {
            return (
              <div className="testimony-container">
                <div className="testimony " key={i}>
                  <div className="avatar">
                    <img src={item.avatar || defaultAvatar} alt="" />
                  </div>

                  <div className="text">{item.text}</div>

                  <div className="bottom">
                    <div className="name">{item.name}</div>
                    <div className="rating">
                      <Rating size={20} initialValue={item.stars} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

const testimonies = [
  {
    text: "I highly recommend this mobile application for students. its very informative and helped my child ace his examinations",
    stars: 5,
    name: "Onoja VOO",
    avatar: "",
  },
  {
    text: "Infermedica beats out other “elephants in the room” such as IBM Watson. Throughout our engagement we continue to be",
    stars: 5,
    name: "Joseph Jiyok",
    avatar: "",
  },
  {
    text: " my child ace his examinations",
    stars: 3,
    name: "Theresa Webb",
    avatar: "",
  },
  {
    text: "I highly recommend this mobile application for students. its very informative and helped my child ace his examinations",
    stars: 5,
    name: "Floyd Miles",
    avatar: "",
  },
  {
    text: "I highly recommend this mobile application for students. its very informative and helped my child ace his examinations",
    stars: 5,
    name: "Cody Fisher",
    avatar: "",
  },
];
