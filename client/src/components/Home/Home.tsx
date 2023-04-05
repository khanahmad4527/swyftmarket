import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  getHomeAppliances,
  getMobiles,
  getTvs,
} from "../../redux/home/home.action";
import CategoryCarosuel from "./CategoryCarosuel";
import ProductCarouel from "./ProductCarouel";

const Home = () => {
  const mobile = useAppSelector((store) => store.home);
  const tv = useAppSelector((store) => store.home);
  const home = useAppSelector((store) => store.home);

  const dispatch = useAppDispatch();

  useEffect(() => {
    /**********    page will always loads at top position   ******************/
    window.scrollTo(0, 0);

    // if (!mobile.mobileData.length) {
    //   dispatch(getMobiles());
    // }

    // if (!tv.tvData.length) {
    //   dispatch(getTvs());
    // }

    // if (!home.homeData.length) {
    //   dispatch(getHomeAppliances());
    // }
  }, []);

  return (
    <Flex flexDirection="column">
      <CategoryCarosuel />
      <ProductCarouel
        title="Mobiles"
        data={mobile.mobileData}
        loading={mobile.isLoadingMobile}
        error={mobile.isErrorMobile}
      />
      <ProductCarouel
        title="Tvs"
        data={tv.tvData}
        loading={tv.isLoadingTv}
        error={tv.isErrorTv}
      />
      <ProductCarouel
        title="Home Appliances"
        data={home.homeData}
        loading={home.isLoadingHome}
        error={home.isErrorHome}
      />
      {/* To maintain the margin bottom with footer on home page */}
      <Box mt={"20px"}></Box>
    </Flex>
  );
};

export default Home;
