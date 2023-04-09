import { AddIcon, CheckCircleIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Input,
  Link,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";
import { emptyCart, getCartData } from "../../redux/cart/cart.actions";
import {
  getAddress,
  deleteAddress,
} from "../../redux/checkout/checkout.actions";
//import { addToOrder } from "../../redux/order/order.actions";
import Error from "../../utils/Error";
import Loading from "../../utils/Loading";
import AddressModal from "./AddressModal";
import CardModal from "./CardModal";
import COD from "./COD";
import NetBankingModal from "./NetBankingModal";
import UPIModal from "./UPIModal";
import { Address } from "@/utils/types";

const initialFormData: Address = {
  _id: "",
  userId: "",
  country: "INDIA",
  firstname: "",
  lastname: "",
  mobile: "",
  address: {
    street_address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: undefined,
  },
  email: "",
};

const Checkout = () => {
  const [formData, setFormData] = useState<Address>(initialFormData);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [deliveryAmount, setDeliveryAmount] = useState<number>(0);
  const [addressTitle, setAddressTitle] = useState<string>("");
  const [addressOperation, setAddressOperation] = useState<string>("");
  const [coupon, setCoupon] = useState<string>("");
  const [formDataLoaded, setFormDataLoaded] = useState<boolean>(false);

  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const toast = useToast();

  const { getCartIsLoading, getCartIsError, cartData } = useAppSelector(
    (store) => store.cart
  );

  const {
    getCheckoutIsLoading,
    getCheckoutIsError,
    userAddress,
    getCouponIsLoading,
    getCouponIsError,
    coupons,
  } = useAppSelector((store) => store.checkout);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleDeleteAddress = (id: string) => {
    dispatch(deleteAddress(id));
  };

  const calculateFinalAmount = (discount: number) => {
    const final = subtotal - subtotal * (discount / 100);
    setFinalAmount(final);
    toast({
      title: "Coupon Applied!",
      description:
        "Congratulations! You have unlocked amazing discounts with our coupons. Start saving now!",
      status: "success",
      position: "top",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleCoupons = () => {
    let flag = true;
    // for (let i = 0; i < coupons.length; i++) {
    //   if (coupon === coupons[i].code) {
    //     if (subtotal >= coupons[i].minimumSpend) {
    //       calculateFinalAmount(coupons[i].discount);
    //       flag = false;
    //       break;
    //     } else {
    //       flag = false;
    //       const final = subtotal + deliveryAmount;
    //       setFinalAmount(final);
    //       toast({
    //         title: "Apply Coupon and Save!",
    //         description: `Spend at least ${coupons[i].minimumSpend} to unlock amazing discounts with our coupons. Start saving now!`,
    //         status: "warning",
    //         position: "top",
    //         duration: 2000,
    //         isClosable: true,
    //       });
    //       break;
    //     }
    //   }
    // }

    if (flag) {
      const final = subtotal + deliveryAmount;
      setFinalAmount(final);
      toast({
        title: "Invalid Coupon",
        description:
          "Sorry, the coupon code you entered is invalid. Please check the code and try again.",
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const orderConfirmed = () => {
    dispatch(emptyCart());

    toast({
      title: "Payment successful!",
      description: "Thank you for your purchase.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    onClose1();

    const currentDate = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedDate = `${days[currentDate.getDay()]} ${
      months[currentDate.getMonth()]
    } ${currentDate.getDate()} ${currentDate.getFullYear()}`;

    const newOrder = {
      orderDate: formattedDate,
      paidAmount: finalAmount,
      paymentMethod: paymentMethod,
      items: cartData.map((item) => {
        return {
          quantity: item.quantity,
          title: item.title,
          itemPrice: item.itemPrice,
        };
      }),
    };
    //dispatch(addToOrder(newOrder));
    router.push("/");
  };

  useEffect(() => {
    /**********    page will always loads at top position   ******************/
    window.scrollTo(0, 0);

    if (!cartData.length) {
      dispatch(getCartData());
    }

    if (!userAddress.length) {
      dispatch(getAddress());
    }

    // if (!coupons.length) {
    //   dispatch(getCoupons());
    // }

    // if (!orderData.length) {
    //   dispatch(getOrderData());
    // }
  }, []);

  useEffect(() => {
    let subtotal = 0;

    for (let i = 0; i < cartData.length; i++) {
      subtotal += cartData[i].quantity * cartData[i].itemPrice;
    }
    setSubtotal(subtotal);
    setDeliveryAmount(subtotal >= 499 ? 0 : 50);
    const final = subtotal + (subtotal >= 499 ? 0 : 50);
    setFinalAmount(final);
  }, [cartData]);

  //to handel addressmodal emptyformdata condition
  useEffect(() => {
    if (formData._id && formData.userId) {
      setFormDataLoaded(true);
    }
  }, [formData]);

  if (getCheckoutIsLoading) {
    return (
      <Flex w="100%" h="100vh">
        <Loading />
      </Flex>
    );
  } else if (getCheckoutIsError) {
    return (
      <Flex w="100%" h="100vh">
        <Error />
      </Flex>
    );
  } else {
    return (
      <Container maxW={"7xl"} h="100vh" margin="auto" marginTop={"40px"}>
        <Flex
          justifyContent="space-between"
          gap="20px"
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Box
            w={{ base: "100%", lg: "75%" }}
            h="max-content"
            bgColor={"white"}
          >
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      color="sm.sparkle"
                      fontSize="20px"
                      fontWeight={500}
                    >
                      1 Select a delivery address
                    </Box>
                  </AccordionButton>
                </h2>

                <AccordionPanel>
                  <Flex
                    borderRadius="10px"
                    padding="10px"
                    flexDirection="column"
                    gap="10px"
                  >
                    <Text fontSize="20px" fontWeight={500}>
                      Your addresses
                    </Text>

                    <Divider />

                    <RadioGroup
                      value={deliveryAddress}
                      onChange={setDeliveryAddress}
                    >
                      <Stack spacing="15px">
                        {userAddress &&
                          userAddress.map((item) => {
                            return (
                              <Radio
                                key={Date() + Math.random()}
                                value={`${item._id}`}
                              >
                                <Box>
                                  <span style={{ fontWeight: "bold" }}>
                                    {item.firstname} {item.lastname}
                                  </span>{" "}
                                  {item.address.apartment},{" "}
                                  {item.address.street_address},{" "}
                                  {item.address.city}, {item.address.state},{" "}
                                  {item.address.pincode}, {item.country}, Phone
                                  number: {item.mobile}{" "}
                                  <Link
                                    color="yellow.500"
                                    onClick={() => {
                                      setAddressTitle("Edit the address");
                                      setAddressOperation("edit");
                                      setFormData(item);
                                      onOpen2();
                                    }}
                                  >
                                    Edit Address
                                  </Link>{" "}
                                  <Box display={"inline"}>|</Box>{" "}
                                  <Link
                                    color="yellow.500"
                                    onClick={() =>
                                      handleDeleteAddress(item._id)
                                    }
                                  >
                                    Delete Address
                                  </Link>
                                </Box>
                              </Radio>
                            );
                          })}
                      </Stack>
                    </RadioGroup>

                    <Link
                      isExternal
                      color={"sm.sparkle"}
                      onClick={() => {
                        setFormDataLoaded(true);
                        setAddressTitle("Add a new address");
                        setAddressOperation("add");
                        onOpen2();
                      }}
                    >
                      <AddIcon /> Add new address
                    </Link>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      color="sm.sparkle"
                      fontSize="20px"
                      fontWeight={500}
                    >
                      2 Select a payment method
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  <Flex
                    borderRadius="10px"
                    padding="10px"
                    flexDirection="column"
                    gap="10px"
                  >
                    <Text fontSize="20px" fontWeight={500}>
                      Payment method
                    </Text>

                    <Divider />

                    <RadioGroup
                      value={paymentMethod}
                      onChange={setPaymentMethod}
                    >
                      <Stack spacing={15}>
                        <Radio value="debit">
                          <Text>Pay with Debit/Credit/ATM Cards</Text>

                          <Flex
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Box w="70px" h="30px">
                              <Image
                                src="https://i.imgur.com/JQYL5RQ.png"
                                alt="payment-service"
                                w="100%"
                                h="100%"
                                objectFit={"contain"}
                              />
                            </Box>

                            <Box w="50px" h="30px">
                              <Image
                                src="https://i.imgur.com/jArAalY.png"
                                alt="payment-service"
                                w="100%"
                                h="100%"
                                objectFit={"contain"}
                              />
                            </Box>

                            <Box w="50px" h="30px">
                              <Image
                                src="https://i.imgur.com/kvM8lRS.png"
                                alt="payment-service"
                                w="100%"
                                h="100%"
                                objectFit={"contain"}
                              />
                            </Box>

                            <Box w="50px" h="30px">
                              <Image
                                src="https://i.imgur.com/NJBCVG0.png"
                                alt="payment-service"
                                w="100%"
                                h="100%"
                                objectFit={"contain"}
                              />
                            </Box>

                            <Box w="50px" h="30px">
                              <Image
                                src="https://i.imgur.com/YmasP9j.png"
                                alt="payment-service"
                                w="100%"
                                h="100%"
                                objectFit={"contain"}
                              />
                            </Box>

                            <Box w="50px" h="30px">
                              <Image
                                src="https://i.imgur.com/tu4reZE.png"
                                alt="payment-service"
                                w="100%"
                                h="100%"
                                objectFit={"contain"}
                              />
                            </Box>
                          </Flex>
                        </Radio>
                        <Radio value="banking">Net Banking</Radio>
                        <Radio value="upi">
                          UPI Apps
                          <Box w="70px" h="30px">
                            <Image
                              src="https://i.imgur.com/JQYL5RQ.png"
                              alt="payment-service"
                              w="100%"
                              h="100%"
                              objectFit={"contain"}
                            />
                          </Box>
                        </Radio>
                        <Radio value="cod">
                          Cash On Delivery/Pay On Delivery
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>

          <Flex
            w={{ base: "100%", lg: "25%" }}
            padding="10px"
            flexDirection="column"
            gap="10px"
            h="min-content"
            bgColor={"white"}
          >
            <Input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
              border="2px solid"
              borderColor={"yellow.500"}
              _focus={{
                boxShadow: "none",
                border: "2px solid",
                borderColor: "yellow.500",
              }}
              _hover={{
                border: "2px solid",
                borderColor: "yellow.500",
              }}
              autoComplete="on"
            />
            <Button
              isDisabled={coupon === "" ? true : false}
              w="max"
              px="10px"
              variant="unstyled"
              textTransform={"uppercase"}
              bg="sm.sparkle"
              color="yellow.500"
              _hover={{
                color: "sm.sparkle",
                bg: "yellow.500",
              }}
              onClick={handleCoupons}
            >
              Add
            </Button>

            <Divider />

            <Text fontSize="20px" fontWeight={500}>
              Order Summary
            </Text>

            <Flex flexDirection="column" gap="10px">
              <Flex justifyContent="space-between">
                <Text>Items:</Text>
                <Text>
                  <span>&#8377;</span> {cartData && formatMoney(subtotal)}
                </Text>
              </Flex>

              <Flex justifyContent="space-between">
                <Text>Delivery:</Text>
                <Text>
                  <span>&#8377;</span> {deliveryAmount}
                </Text>
              </Flex>

              <Flex justifyContent="space-between">
                <Text>Promotion Applied:</Text>
                <Text>
                  <span>&#8377;</span> {formatMoney(finalAmount)}
                </Text>
              </Flex>
            </Flex>

            <Divider />

            <Flex justifyContent="space-between" color="sm.sparkle">
              <Text fontSize="25px" fontWeight={500}>
                Order Total:
              </Text>
              <Text fontSize="25px" fontWeight={500}>
                <span>&#8377;</span> {formatMoney(finalAmount)}
              </Text>
            </Flex>

            <Divider />

            <Button
              w="max"
              px="10px"
              textTransform={"uppercase"}
              bg="sm.sparkle"
              color="yellow.500"
              _hover={{
                color: "sm.sparkle",
                bg: "yellow.500",
              }}
              variant="unstyled"
              onClick={() => {
                if (deliveryAddress === "") {
                  toast({
                    title: "Kindly select a delivery address",
                    description: "Go to delivery address",
                    status: "info",
                    position: "top",
                    duration: 2000,
                    isClosable: true,
                  });
                } else if (paymentMethod === "") {
                  toast({
                    title: "Kindly select a payment method",
                    description: "Go to payment method",
                    status: "info",
                    position: "top",
                    duration: 2000,
                    isClosable: true,
                  });
                } else {
                  onOpen1();
                }
              }}
              display={subtotal === 0 ? "none" : "block"}
            >
              Proceed To Pay
            </Button>
          </Flex>
        </Flex>

        {paymentMethod !== "" ? (
          <Modal isOpen={isOpen1} onClose={onClose1}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Thank you for shopping</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {paymentMethod === "debit" ? (
                  <CardModal orderConfirmed={orderConfirmed} />
                ) : paymentMethod === "banking" ? (
                  <NetBankingModal orderConfirmed={orderConfirmed} />
                ) : paymentMethod === "upi" ? (
                  <UPIModal orderConfirmed={orderConfirmed} />
                ) : paymentMethod === "cod" ? (
                  <COD orderConfirmed={orderConfirmed} />
                ) : (
                  ""
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        ) : (
          ""
        )}

        {formDataLoaded && (
          <AddressModal
            title={addressTitle}
            isOpen2={isOpen2}
            onClose2={onClose2}
            formData={formData}
            setFormData={setFormData}
            initialFormData={initialFormData}
            addressOperation={addressOperation}
          />
        )}
      </Container>
    );
  }
};

export default Checkout;

const formatMoney = (amount: number) => {
  if (amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};
