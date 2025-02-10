import React from "react";
import Img1 from "../../assets/shirt/shirt.png";
import Img2 from "../../assets/shirt/shirt2.png";
import Img3 from "../../assets/shirt/shirt3.png";
import { FaStar } from "react-icons/fa";

const ServicesData = [
  {
    id: 1,
    img: Img1,
    title: "AI/ML Solutions",
    link: "/services/ai-ml-solutions",
    description:
      "We design and deploy advanced Artificial Intelligence and Machine Learning solutions that enable automation, prediction, and optimization for businesses. From natural language processing to computer vision, our AI/ML models drive actionable insights and enhance operational efficiency.",
  },
  {
    id: 2,
    img: Img2,
    title: "Software Developmet",
    link: "/services/software-development",
    description:
      "Our team builds robust, user-friendly software products tailored to meet specific client needs. Wefocus on high performance, scalability, and intuitive design to deliver reliable solutions that enhance business productivity and customer experience.",
  },
  {
    id: 3,
    img: Img3,
    title: "Data Analytics & Insights",
    link: "/services/data-analytics-and-insights",
    description:
      "Through comprehensive data analysis and visualization, we help organizations uncover trends and patterns. Our data analytics services empower businesses with insights that support strategic decision-making and optimize resource allocation.",
  },
  {
    id: 4,
    img: Img3,
    title: "Algorithmic Design",
    link: "/services/algorithmic-design",
    description:
      "We specialize in creating customized algorithms that address complex problems efficiently. Our expertise in algorithmic design ensures optimal performance, accuracy, and scalability, helping businesses solve critical challenges and streamline processes.",
  },
];
const Services = ({ handleOrderPopup }) => {
  return (
    <div>
      <div className="container">
        {/* Header section */}
        <div className="text-left mb-24">
          <p data-aos="fade-up" className="text-sm text-primary">
            Our Services for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Services
          </h1>
        </div>
        {/* Body section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-20 md:gap-5 place-items-center">
          {ServicesData.map((data) => (
            <div
              data-aos="zoom-in"
              className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group max-w-[300px]"
            >
              {/* image section */}
              <div className="h-[100px]">
                <img
                  src={data.img}
                  alt=""
                  className="max-w-[140px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
                />
              </div>
              {/* details section */}
              <div className="p-4 text-center">
                {/* star rating */}
                <div className="w-full flex items-center justify-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                </div>
                <h1 className="text-xl font-bold">{data.title}</h1>
                <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                  {data.description}
                </p>
                <button
                  className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
                  onClick={() => (window.location.href = data.link)}
                >
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
