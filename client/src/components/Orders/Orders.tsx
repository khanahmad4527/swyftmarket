import React, { useEffect } from "react";
import { Flex, Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getOrderData } from "../../redux/order/order.actions";
import Loading from "../../utils/Loading";
import Error from "../../utils/Error";
import EmptyOrder from "./EmptyOrder";

const Orders = () => {
  const { getOrderIsLoading, getOrderIsError, orderData } = useAppSelector(
    (store) => store.order
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!orderData.length) {
      dispatch(getOrderData());
    }
  }, [dispatch, orderData.length]);

  /********** loading conditionally for good UX ******************/

  if (getOrderIsLoading) {
    return (
      <Flex w="100%" h="100vh">
        <Loading />
      </Flex>
    );
  } else if (getOrderIsError) {
    return (
      <Flex w="100%" h="100vh">
        <Error />
      </Flex>
    );
  } else if (orderData.length === 0) {
    return <EmptyOrder />;
  } else {
    return (
      <Box
        w="100%"
        minH="100vh"
        marginTop={"40px"}
        overflow={{ base: "auto", lg: "hidden" }}
      >
        <Table variant="simple" color="sm.sparkle">
          <Thead bgColor={"yellow.500"}>
            <Tr>
              <Th color="white">Order ID</Th>
              <Th color="white">Order Date</Th>
              <Th color="white">Paid Amount</Th>
              <Th color="white">Payment Method</Th>
              <Th color="white">Items</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orderData.map((order, index) => (
              <Tr
                key={order._id}
                bgColor={index % 2 === 0 ? "#F0CD7D" : "#F8ECC2"}
                verticalAlign="top"
              >
                <Td>{order._id}</Td>
                <Td>{order.orderDate}</Td>
                <Td>{order.paidAmount}</Td>
                <Td textTransform={"uppercase"}>{order.paymentMethod}</Td>
                <Td w="30%">
                  <ul>
                    {order.items.map((item) => {
                      return (
                        <li
                          key={Date.now() + Math.random()}
                          style={{
                            marginBottom: "10px",
                          }}
                        >
                          {item.quantity} x {item.title} <span>&#8377;</span>{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {formatMoney(item.itemPrice)}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  }
};

export default Orders;

const formatMoney = (amount: number) => {
  if (amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};
