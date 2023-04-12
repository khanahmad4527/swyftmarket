import React from "react";
import { Box, Circle, Text } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./ProductCard";
import Loading from "../../utils/Loading";
import Error from "../../utils/Error";
import { Product } from "@/utils/types";

const ProductCarousel = ({
  title,
  data,
  loading,
  error,
}: {
  title: string;
  data: Product[];
  loading: boolean;
  error: boolean;
}) => {
  /*********************** carousel props **********************************/

  const settings = {
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
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
    <Box
      padding="20px"
      bgColor="white"
      w={{ base: "95%", lg: "85%" }}
      margin=" 20px auto"
    >
      <Text fontSize="20px" fontWeight={500} color="sm.sparkle">
        {title}
      </Text>
      <Box w="95%" margin="auto">
        {loading ? <Loading /> : ""}
        {error ? <Error /> : ""}
        <Slider {...settings}>
          {data &&
            data.map((item) => (
              <ProductCard
                key={Date() + item.title + item.discount}
                {...item}
              />
            ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default ProductCarousel;

/*********************** custom button for carousel **********************************/

const CustomPrevArrow = ({ onClick }: any) => (
  <Circle
    as="button"
    border="1px solid gray"
    position="absolute"
    zIndex={1}
    left={{ base: "-20px", lg: "0px", xl: "-35px" }}
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
    right={{ base: "-20px", lg: "0px", xl: "-35px" }}
    top="50%"
    transform="translateY(-50%)"
    backgroundColor="white"
    size="35px"
    onClick={onClick}
  >
    <IoIosArrowForward size="20px" color="black" />
  </Circle>
);
