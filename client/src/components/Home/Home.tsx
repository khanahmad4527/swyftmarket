import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  getHomeAppliances,
  getMobiles,
  getTvs,
} from "../../redux/home/home.action";
import CategoryCarousel from "./CategoryCarousel";
import ProductCarousel from "./ProductCarousel";
import Loading from "@/utils/Loading";
import Error from "@/utils/Error";

const Home = () => {
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const mobile = useAppSelector((store) => store.home);
  const tv = useAppSelector((store) => store.home);
  const home = useAppSelector((store) => store.home);

  const dispatch = useAppDispatch();

  useEffect(() => {
    /********** page will always loads at top position ******************/
    window.scrollTo(0, 0);

    if (!mobile.mobileData.length) {
      dispatch(getMobiles("mobiles"));
    }

    if (!tv.tvData.length) {
      dispatch(getTvs("tvs"));
    }

    if (!home.homeData.length) {
      dispatch(getHomeAppliances("home_appliances"));
    }
  }, [
    dispatch,
    home.homeData.length,
    mobile.mobileData.length,
    tv.tvData.length,
  ]);

  useEffect(() => {
    // check if all data has finished loading
    if (
      mobile.getMobileIsLoading === false &&
      tv.getTvIsLoading === false &&
      home.getHomeIsLoading === false
    ) {
      setDataLoaded(true);
    }
  }, [home, mobile, tv]);

  if (dataLoaded === false) {
    return (
      <Flex w="100%" minH="100vh">
        <Loading />
      </Flex>
    );
  } else if (
    mobile.getMobileIsError ||
    tv.getTvIsError ||
    home.getHomeIsError
  ) {
    return (
      <Flex w="100%" minH="100vh">
        <Error />
      </Flex>
    );
  } else {
    return (
      <Flex flexDirection="column">
        <CategoryCarousel />
        <ProductCarousel
          title="Mobiles"
          data={mobile.mobileData}
          loading={mobile.getMobileIsLoading}
          error={mobile.getMobileIsError}
        />
        <ProductCarousel
          title="Tvs"
          data={tv.tvData}
          loading={tv.getTvIsLoading}
          error={tv.getTvIsError}
        />
        <ProductCarousel
          title="Home Appliances"
          data={home.homeData}
          loading={home.getHomeIsLoading}
          error={home.getHomeIsError}
        />
        {/* To maintain the margin bottom with footer on home page */}
        <Box mt={"20px"}></Box>
      </Flex>
    );
  }
};

export default Home;
