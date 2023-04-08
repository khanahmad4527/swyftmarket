import {
  Flex,
  Box,
  Image,
  Icon,
  chakra,
  Tooltip,
  Text,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { useAppDispatch } from "@/redux/store";
//import { addToCart } from "../../redux/cart/cart.actions";
import { useRouter } from "next/router";
import Link from "next/link";

function ProductsCard({
  _id,
  title,
  category,
  price,
  discount,
  discountPrice,
  rating,
  reviews,
  image,
  images,
  colours,
  sizes,
  quantity,
  description,
  brand,
}: {
  _id: string;
  title: string;
  category: string;
  price: number;
  discount: number;
  discountPrice: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[][];
  colours: string[][];
  sizes: string[];
  quantity: number;
  description: string;
  brand: string;
}) {
  const [isAdded, setIsAdded] = useState(false);

  const router = useRouter();

  const toast = useToast();

  const dispatch = useAppDispatch();

  const handleAddToCart = (item: any) => {
    setIsAdded(true);

    //const updatedCartData = [item, ...cartData];

    //dispatch(addToCart(updatedCartData));
    toast({
      title: "Added to cart",
      description: "We've added the product in your cart",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  useEffect(() => {
    // for (let i = 0; i < cartData.length; i++) {
    //   if (cartData[i]._id == _id) {
    //     setIsAdded(true);
    //   }
    // }
  }, []);

  return (
    <Box
      bgColor="white"
      borderWidth="1px"
      rounded="lg"
      color="sm.sparkle"
      cursor="pointer"
      _hover={{ shadow: "lg" }}
    >
      <Link href={`/product/${_id}`}>
        <Image
          src={images[0][0] || image}
          alt="Image belongs to Amazon. Used for educatinal purposes and showcasing web development skills only."
          w={{
            base: "200px",
            sm: "250px",
            md: "350px",
            lg: "400px",
          }}
          h={{
            base: "200px",
            sm: "250px",
            md: "350px",
            lg: "400px",
          }}
          p="10px"
          display="block"
          margin="auto"
          objectFit="contain"
        />
      </Link>

      <Stack p="6" spacing={2}>
        <Flex mt="1" justifyContent="space-between" alignContent="center">
          <Text
            fontSize={{ base: "lg", sm: "20px", md: "20px" }}
            fontWeight="semibold"
            width={{
              base: "150px",
              sm: "230px",
              md: "300px",
              lg: "300px",
            }}
            isTruncated
          >
            {title && title}
          </Text>

          {isAdded ? (
            <Box
              display={{ base: "none", lg: "flex" }}
              color="sm.buff"
              onClick={() =>
                toast({
                  title: "Product in cart",
                  description: "Product is already in the cart",
                  status: "warning",
                  duration: 2000,
                  isClosable: true,
                  position: "top",
                })
              }
            >
              <Icon as={FiShoppingCart} h={7} w={7} alignSelf={"center"} />
            </Box>
          ) : (
            <Box
              display={{ base: "none", ll: "flex" }}
              onClick={() =>
                handleAddToCart({
                  productId: _id,
                  title,
                  category,
                  itemPrice: discountPrice,
                  quantity: 1,
                  totalPrice: discountPrice * 1,
                  image,
                  colour: colours[0][0],
                  size: sizes[0],
                  description,
                })
              }
            >
              <Icon as={FiShoppingCart} h={7} w={7} alignSelf={"center"} />
            </Box>
          )}
        </Flex>

        <Flex justifyContent="space-between" alignItems="center">
          <Rating rating={rating && rating} numReviews={reviews && reviews} />
          <Box display={{ base: "none", lg: "block" }}>
            <Text textDecoration="line-through" textAlign="right">
              <span>&#8377;</span>
              {price && formatMoney(price)}
            </Text>
            <Text fontSize="20px">
              <span style={{ color: "red" }}>-{discount}%</span>{" "}
              <span>&#8377;</span>
              {discountPrice && formatMoney(discountPrice)}
            </Text>
          </Box>
        </Flex>

        <Flex
          justifyContent="space-between"
          alignItems="center"
          display={{ base: "flex", ll: "none" }}
        >
          <Box>
            <Text fontSize="20px">
              <span style={{ color: "red" }}>-{discount}%</span>{" "}
              <span>&#8377;</span>
              {discountPrice && formatMoney(discountPrice)}
            </Text>
            <Text textDecoration="line-through">
              <span>&#8377;</span>
              {price && formatMoney(price)}
            </Text>
          </Box>

          {isAdded ? (
            <Box
              color="sm.buff"
              onClick={() =>
                toast({
                  title: "Product in cart",
                  description: "Product is already in the cart",
                  status: "warning",
                  duration: 2000,
                  isClosable: true,
                  position: "top",
                })
              }
            >
              <Icon as={FiShoppingCart} h={7} w={7} alignSelf={"center"} />
            </Box>
          ) : (
            <Box
              onClick={() =>
                handleAddToCart({
                  productId: _id,
                  title,
                  category,
                  itemPrice: discountPrice,
                  quantity: 1,
                  totalPrice: discountPrice * 1,
                  image,
                  colour: colours[0][0],
                  size: sizes[0],
                  description,
                })
              }
            >
              <Icon as={FiShoppingCart} h={7} w={7} alignSelf={"center"} />
            </Box>
          )}
        </Flex>
      </Stack>
    </Box>
  );
}

export default ProductsCard;

function Rating({
  rating,
  numReviews,
}: {
  rating: number;
  numReviews: number;
}) {
  return (
    <Flex alignItems="start" color="yellow.500">
      <Flex>
        {Array(5)
          .fill("")
          .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2;
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={Date() + Math.random() + i}
                  style={{ marginLeft: "1" }}
                />
              );
            }
            if (roundedRating - i === 0.5) {
              return (
                <BsStarHalf
                  key={Date() + Math.random() + i}
                  style={{ marginLeft: "1" }}
                />
              );
            }
            return (
              <BsStar
                key={Date() + Math.random() + i}
                style={{ marginLeft: "1" }}
              />
            );
          })}
      </Flex>

      <Text color="sm.sparkle" fontSize="sm" ml="2">
        {numReviews} review{numReviews > 1 && "s"}
      </Text>
    </Flex>
  );
}

const formatMoney = (amount: number) => {
  if (amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};
