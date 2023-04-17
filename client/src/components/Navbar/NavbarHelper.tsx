import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
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
import React, { useEffect, useState } from "react";
import alphaLogo from "../../assets/images/SwyftMarket-alpha.png";
import { SearchIcon, HamburgerIcon } from "@chakra-ui/icons";
import { BiUserCircle } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { logout } from "@/redux/auth/auth.action";
import { getCartData } from "../../redux/cart/cart.actions";
import { FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/router";
import Image from "next/image";
import Cookies from "js-cookie";

const Navbar = () => {
  const router = useRouter();
  const [category, setCategory] = useState<string[]>([]);
  const [query, setQuery] = useState<string>(
    Array.isArray(router.query?.q) ? router.query.q[0] : router.query?.q || ""
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const categories = [
    { name: "air_conditioner", displayName: "Air Conditioner" },
    { name: "beds", displayName: "Beds" },
    { name: "dining_tables", displayName: "Dining Tables" },
    { name: "earbuds", displayName: "Earbuds" },
    { name: "electronics", displayName: "Electronics" },
    { name: "furnitures", displayName: "Furnitures" },
    { name: "home_appliances", displayName: "Home Appliances" },
    { name: "kids", displayName: "Kids" },
    { name: "laptops", displayName: "Laptops" },
    { name: "mobiles", displayName: "Mobiles" },
    { name: "refrigerators", displayName: "Refrigerators" },
    { name: "sofa", displayName: "Sofa" },
    { name: "sports", displayName: "Sports" },
    { name: "tvs", displayName: "Tvs" },
    { name: "utensils", displayName: "Utensils" },
    { name: "wardrobes", displayName: "Wardrobes" },
    { name: "washing_machine", displayName: "Washing Machine" },
    { name: "watch", displayName: "Watch" },
  ];

  /********** handle query search on different pages ******************/

  const handleSearch = () => {
    const { q } = router.query;

    if (category.length) {
      if (q) {
        router.push({
          pathname: "/products",
          query: {
            q: query,
            category: Array.isArray(category) ? category : [category],
            _page: 1,
          },
        });
      } else {
        router.push(
          `/products?q=${query}&category=${category}&_page=1&_limit=10&_sort=rating&_order=desc`
        );
      }
    } else {
      if (q) {
        router.push({
          pathname: "/products",
          query: {
            q: query,
            category: Array.isArray(category) ? category : [category],
            _page: 1,
          },
        });
      } else {
        router.push(
          `/products?q=${query}&_page=1&_limit=10&_sort=rating&_order=desc`
        );
      }
    }
  };

  /********** load query and category if exits to show on navbar ******************/

  useEffect(() => {
    setQuery(
      Array.isArray(router.query?.q) ? router.query.q[0] : router.query?.q || ""
    );
    let searchCategory = router.query?.category;

    if (typeof searchCategory === "string") {
      setCategory([searchCategory]);
    } else if (searchCategory?.length) {
      setCategory(searchCategory);
    } else {
      setCategory([]);
    }
  }, [router]);

  const {
    userDetails: { id },
    isAuth,
  } = useAppSelector((store) => store.auth);

  const { getCartIsLoading, cartData } = useAppSelector((store) => store.cart);

  const dispatch = useAppDispatch();

  const { firstname, lastname, email } = JSON.parse(
    Cookies.get("smUserData") || "{}"
  ) as { firstname: string; lastname: string; email: string };

  const handleLogout = () => {
    toast({
      title: "Logout Successful",
      description: "We've logout you successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    dispatch(logout());
  };

  useEffect(() => {
    /**********    page will always loads at top position   ******************/
    window.scrollTo(0, 0);

    if (isAuth) {
      if (!cartData.length) {
        dispatch(getCartData());
      }
    }
  }, [isAuth]);

  return (
    <>
      {/*** 🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃 Mobile logo 🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃 ***/}

      <Box
        display={{ base: "block", lg: "none" }}
        m="auto"
        w="100%"
        bgColor="sm.sparkle"
      >
        <Image
          src={alphaLogo}
          height={100}
          width={100}
          alt="SwyftMarket"
          onClick={() => router.push("/")}
          style={{ cursor: "pointer", display: "block", margin: "auto" }}
        />
      </Box>

      {/*** 🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁 Mobile logo 🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁 ***/}

      <Grid
        bgColor="sm.sparkle"
        justifyContent={"space-between"}
        alignItems="center"
        gap="10px"
        paddingTop={{ base: "20px", lg: "0" }}
        templateColumns="repeat(1,1fr)"
        alignSelf={"center"}
        position="sticky"
        top="0"
        left="0"
        width="100%"
        zIndex={100}
      >
        <Flex
          justifyContent={"space-between"}
          alignItems="center"
          gap="10px"
          p={{ base: "0px 10px 20px 10px", lg: "0px 20px 0px 10px" }}
        >
          {/*** 🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃 Mobile Logout Login My Account 🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃 ***/}

          <Box display={{ base: "block", lg: "none" }}>
            <Icon
              boxSize="8"
              as={HamburgerIcon}
              color={"sm.buff"}
              onClick={onOpen}
            />
            <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent style={{ width: "200px" }}>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px" color="sm.sparkle">
                  SwyftMarket
                </DrawerHeader>
                <DrawerBody>
                  <Flex flexDirection="column" gap="10px">
                    {isAuth && (
                      <Menu>
                        <MenuButton
                          as={Button}
                          bg="sm.sparkle"
                          color="yellow.500"
                          _hover={{
                            color: "sm.sparkle",
                            bg: "yellow.500",
                          }}
                          leftIcon={<BiUserCircle size="30px" />}
                          variant="unstyled"
                          display="flex"
                          alignItems="center"
                          px="10px"
                        >
                          My Account
                        </MenuButton>
                        <MenuList position={"relative"} zIndex={10}>
                          <MenuGroup title="Profile">
                            <MenuItem onClick={() => router.push("/profile")}>
                              Name: {`${firstname} ${lastname}`}
                            </MenuItem>
                          </MenuGroup>
                        </MenuList>
                      </Menu>
                    )}

                    {isAuth && (
                      <Box>
                        <Button
                          bg="sm.sparkle"
                          color="yellow.500"
                          _hover={{
                            color: "sm.sparkle",
                            bg: "yellow.500",
                          }}
                          variant="unstyled"
                          px="10px"
                          onClick={() => router.push("/orders")}
                        >
                          Orders
                        </Button>
                      </Box>
                    )}

                    {!isAuth && (
                      <Box>
                        <Button
                          bg="sm.sparkle"
                          color="yellow.500"
                          _hover={{
                            color: "sm.sparkle",
                            bg: "yellow.500",
                          }}
                          variant="unstyled"
                          px="10px"
                          onClick={() => router.push("/login")}
                        >
                          Login
                        </Button>
                      </Box>
                    )}

                    {isAuth && (
                      <Box>
                        <Button
                          bg="sm.sparkle"
                          color="yellow.500"
                          _hover={{
                            color: "sm.sparkle",
                            bg: "yellow.500",
                          }}
                          variant="unstyled"
                          px="10px"
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>
                      </Box>
                    )}
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>

          {/*** 🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁 Mobile Logout Login My Account 🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁 ***/}

          {/*** 🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃 Laptop Logout Login My Account 🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃 ***/}

          <Box display={{ base: "none", lg: "block" }}>
            <Image
              src={alphaLogo}
              width={100}
              height={100}
              alt="SwyftMarket"
              onClick={() => router.push("/")}
              style={{ cursor: "pointer" }}
            />
          </Box>

          {/*** 🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃 Search Bar 🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃🢃 ***/}

          <Box>
            <InputGroup outline="2px solid" outlineColor="sm.buff">
              <InputLeftAddon bg="none" border="none" p="0">
                <Select
                  value={category[0]}
                  onChange={(e) => setCategory([e.target.value])}
                  _focus={{ boxShadow: "none" }}
                  w={{ base: "120px", sm: "100%" }}
                  placeholder="All Categories"
                  m="auto"
                  border="none"
                  outline="none"
                >
                  {categories.map((category) => {
                    return (
                      <option
                        value={category.name}
                        key={Date() + Math.random() + category.name}
                      >
                        {category.displayName}
                      </option>
                    );
                  })}
                </Select>
                <Divider
                  h="6"
                  color="sm.buff"
                  orientation="vertical"
                  borderWidth="1px"
                />
              </InputLeftAddon>
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                _focus={{ boxShadow: "none" }}
                w={{ base: "100%", sm: "400px", md: "450px", lg: "400px" }}
                m="auto"
                border="none"
                alignSelf="center"
              />
              <InputRightAddon
                bg="sm.buff"
                border="none"
                borderRadius="none"
                cursor="pointer"
                onClick={handleSearch}
              >
                <Icon boxSize="5" as={SearchIcon} />
              </InputRightAddon>
            </InputGroup>
          </Box>

          {/*** 🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁 Search Bar 🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁 ***/}

          {!isAuth && (
            <Box display={{ base: "none", lg: "block" }}>
              <Button
                bgColor={"sm.buff"}
                variant="unstyled"
                px="10px"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            </Box>
          )}

          {isAuth && (
            <Box display={{ base: "none", lg: "block" }}>
              <Menu>
                <MenuButton
                  as={Button}
                  bgColor={"sm.buff"}
                  leftIcon={<BiUserCircle size="30px" />}
                  variant="unstyled"
                  display="flex"
                  alignItems="center"
                  px="10px"
                >
                  My Account
                </MenuButton>
                <MenuList position={"relative"} zIndex={10}>
                  <MenuGroup title="Profile">
                    <MenuItem onClick={() => router.push("/profile")}>
                      Name: {`${firstname} ${lastname}`}
                    </MenuItem>
                    <MenuItem onClick={() => router.push("/orders")}>
                      Orders
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          )}

          {isAuth && (
            <Square
              onClick={() => router.push("/cart")}
              cursor="pointer"
              position="relative"
            >
              <Icon boxSize={50} as={FiShoppingCart} color="sm.buff" />
              {getCartIsLoading ? (
                <Spinner
                  position="absolute"
                  top={0}
                  right={0}
                  thickness="2px"
                  speed="0.65s"
                  color="yellow.500"
                  boxSize="25px"
                />
              ) : (
                <Circle
                  border="2px solid"
                  borderColor="yellow.500"
                  borderRadius="50%"
                  size="25px"
                  bg="sm.buff"
                  color="sm.sparkle"
                  position="absolute"
                  top={0}
                  right={0}
                >
                  {cartData && cartData.length}
                </Circle>
              )}
            </Square>
          )}

          {/*** 🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁 Laptop Logout Login My Account 🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁🢁 ***/}
        </Flex>
      </Grid>
    </>
  );
};

export default Navbar;
