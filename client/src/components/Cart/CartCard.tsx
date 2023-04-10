import {
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";
import { deleteCartData, updateCartData } from "../../redux/cart/cart.actions";
import { Cart } from "@/utils/types";

interface CartCard {
  item: Cart;
}

const CartCard = ({ item }: CartCard) => {
  const [qtyValue, setQtyValue] = useState(item.quantity);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleCount = (value: number) => {
    dispatch(updateCartData(item._id, value));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteCartData(id));
  };

  return (
    <Stack key={Date() + Math.random()} gap="10px">
      <Divider borderColor="yellow.500" borderWidth="1px" />

      <Grid
        p={5}
        w="100%"
        margin="auto"
        justifyContent={"space-between"}
        templateColumns={{
          base: "1fr",
          md: "27% 65% 5%",
          lg: "21% 70% 5%",
        }}
        gap="10px"
        border={"2px solid"}
        borderColor={"yellow.500"}
      >
        <GridItem cursor={"pointer"}>
          <Image
            p={2}
            src={item.image}
            alt="product-image"
            w="100%"
            h="200px"
            objectFit="contain"
            onClick={() => router.push(`/product/${item.productId}`)}
          />
        </GridItem>

        <GridItem>
          <Flex
            h="200px"
            flexDirection="column"
            justifyContent="space-between"
            w="100%"
          >
            <Text
              fontSize={18}
              fontWeight={400}
              w="100%"
              noOfLines={{ base: 3, lg: 2 }}
              wordBreak="break-word"
            >
              {item.title}
            </Text>
            <Text fontSize={18} fontWeight={500}>
              Price: <span>&#8377;</span>{" "}
              {item.itemPrice && formatMoney(item.itemPrice)}
            </Text>

            <Flex alignItems={"center"} gap="10px">
              <Select
                w="max"
                border="2px solid"
                borderColor="yellow.500"
                _hover={{
                  border: "2px solid",
                  borderColor: "yellow.500",
                }}
                outline="none"
                _focus={{
                  boxShadow: "none",
                  border: "2px solid",
                  borderColor: "yellow.500",
                }}
                value={qtyValue}
                onChange={(e) => {
                  handleCount(+e.target.value);
                }}
              >
                {new Array(10).fill(1).map((_, index) => {
                  return (
                    <option
                      key={Date() + Math.random()}
                      value={`${index + 1}`}
                    >{`Qty ${index + 1}`}</option>
                  );
                })}
              </Select>

              <Text>
                Subtotal: <span>&#8377;</span>{" "}
                {item.itemPrice && formatMoney(item.itemPrice * item.quantity)}
              </Text>
            </Flex>
          </Flex>
        </GridItem>

        <GridItem
          padding={{ base: "10px", sm: "10px" }}
          cursor="pointer"
          _hover={{
            transform: "scale(1.1)",
            transition: "all 0.2s ease-in",
          }}
          //align="right"
          style={{ alignItems: "right" }}
          onClick={() => handleDelete(item._id)}
        >
          <RxCross2 size="30px" />
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default CartCard;

const formatMoney = (amount: number) => {
  if (amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};
