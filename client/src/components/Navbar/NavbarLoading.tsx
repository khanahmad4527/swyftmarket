import React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  Select,
  Icon,
  Grid,
  Circle,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  DrawerCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  useToast,
  Text,
  Spinner,
  Square,
} from "@chakra-ui/react";
import alphaLogo from "../../assets/images/SwyftMarket-alpha.png";
import { HamburgerIcon } from "@chakra-ui/icons";
import Image from "next/image";

const NavbarLoading = () => {
  return (
    <Grid
      bgColor="sm.sparkle"
      justifyContent={"space-between"}
      alignItems="center"
      gap="10px"
      templateColumns="repeat(1,1fr)"
      alignSelf={"center"}
      position="sticky"
      top="0"
      left="0"
      width="100%"
      zIndex={100}
    >
      {/*** 🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃 Mobile logo 🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃 ***/}

      <Box display={{ base: "block", lg: "none" }} m="auto">
        <Image
          src={alphaLogo}
          height={100}
          width={100}
          alt="SwyftMarket"
          style={{ cursor: "pointer" }}
        />
      </Box>

      {/*** 🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁 Mobile logo 🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁 ***/}

      <Flex
        justifyContent={"space-between"}
        alignItems="center"
        gap="10px"
        p={{ base: "0px 10px 20px 10px", lg: "0px 20px 0px 10px" }}
      >
        {/*** 🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃 Mobile Logout Login My Account 🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃 ***/}

        <Box display={{ base: "block", lg: "none" }}>
          <Icon boxSize="8" as={HamburgerIcon} color={"sm.buff"} />
        </Box>

        {/*** 🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁 Mobile Logout Login My Account 🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁 ***/}

        {/*** 🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃 Laptop Logout Login My Account 🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃 ***/}

        <Box display={{ base: "none", lg: "block" }}>
          <Image src={alphaLogo} width={100} height={100} alt="SwyftMarket" />
        </Box>

        {/*** 🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁 Laptop Logout Login My Account 🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁 ***/}
      </Flex>
    </Grid>
  );
};

export default NavbarLoading;
