import React from "react";
import { Flex, Text, Square, Icon } from "@chakra-ui/react";
import alphaLogo from "../../assets/images/SwyftMarket-alpha.png";
import { BsFillShieldLockFill } from "react-icons/bs";
import { useRouter } from "next/router";
import Image from "next/image";

const CheckoutNavbar = () => {
  const router = useRouter();
  return (
    <Flex
      bgColor={"sm.sparkle"}
      w="100%"
      margin="auto"
      justifyContent={"space-around"}
      alignItems="center"
    >
      <Image
        src={alphaLogo}
        alt="SwyftMarket"
        width={100}
        height={100}
        style={{ cursor: "pointer" }}
        onClick={() => router.push("/")}
      />

      <Text fontSize="28px" fontWeight={400} color="yellow.500">
        Checkout Page
      </Text>

      <Square>
        <Icon boxSize="8" as={BsFillShieldLockFill} color={"sm.buff"} />
      </Square>
    </Flex>
  );
};

export default CheckoutNavbar;
