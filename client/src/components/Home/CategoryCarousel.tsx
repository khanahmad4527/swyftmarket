import { Box, Circle } from "@chakra-ui/react";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryCarosuelCard from "./CategoryCarosuelCard";

const CarosuelImages = [
  {
    image:
      "https://teja10.kuikr.com/escrow/assets/image/certified_landing_page/other-furnitures.png",
    title: "Dress",
    link: "/products?category=dress",
  },
  {
    image:
      "https://teja10.kuikr.com/escrow/assets/image/assured_landing_page/all_electonics_desktop.png",
    title: "All Electonics",
    link: "/products?category=electronics&category=tvs&category=laptops&category=refrigerators&category=washing_machine&category=air_conditioner",
  },
  {
    image:
      "https://teja10.kuikr.com/escrow/assets/image/assured_landing_page/sofa_sets_desktop.png",
    title: "Sofa Sets",
    link: "/products?category=sofa",
  },
  {
    image:
      "https://teja10.kuikr.com/escrow/assets/image/certified_landing_page/bed.png",
    title: "Bed Sets",
    link: "/products?category=beds",
  },
  {
    image:
      "https://teja10.kuikr.com/escrow/assets/image/assured_landing_page/Wardrobes_desktop.png",
    title: "Wardrobes",
    link: "/products?category=wardrobes",
  },
  {
    image:
      "https://teja10.kuikr.com/escrow/assets/image/certified_landing_page/led-tv.png",
    title: "Tvs",
    link: "/products?category=tvs",
  },
  {
    image:
      "https://teja10.kuikr.com/escrow/assets/image/certified_landing_page/laptops.png",
    title: "Laptops",
    link: "/products?category=laptops",
  },
  {
    image:
      "https://teja10.kuikr.com/escrow/assets/image/certified_landing_page/electronics/refrigerator.png",
    title: "Refrigerators",
    link: "/products?category=refrigerators",
  },
  {
    image:
      "https://teja10.kuikr.com/escrow/assets/image/certified_landing_page/dining-tables.png",
    title: "Dining Tables",
    link: "/products?category=dining_tables",
  },
  {
    image:
      "https://teja10.kuikr.com/escrow/assets/image/certified_landing_page/electronics/washing-machine.png",
    title: "Washing Machines",
    link: "/products?category=washing_machine",
  },
  {
    image:
      "https://teja10.kuikr.com/escrow/assets/image/certified_landing_page/electronics/air-conditioner.png",
    title: "Air Conditioner",
    link: "/products?category=air_conditioner",
  },
];

const CategoryCarosuel = () => {
  const settings = {
    infinite: true,
    speed: 200,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <Box padding="20px" w="85%" margin=" 20px auto">
        <Slider {...settings}>
          {CarosuelImages.map((item) => (
            <CategoryCarosuelCard key={Date() + Math.random()} {...item} />
          ))}
        </Slider>
      </Box>
    </>
  );
};

export default CategoryCarosuel;

const CustomPrevArrow = ({ onClick }: any) => (
  <Circle
    as="button"
    border="1px solid gray"
    position="absolute"
    zIndex={1}
    left="-30px"
    top="50%"
    transform="translateY(-50%)"
    backgroundColor="white"
    size="35px"
    onClick={onClick}
  >
    <IoIosArrowBack size="20px" color="black" />
  </Circle>
);

const CustomNextArrow = ({ onClick }: any) => (
  <Circle
    as="button"
    border="1px solid gray"
    position="absolute"
    zIndex={1}
    right="-30px"
    top="50%"
    transform="translateY(-50%)"
    backgroundColor="white"
    size="35px"
    onClick={onClick}
  >
    <IoIosArrowForward size="20px" color="black" />
  </Circle>
);
