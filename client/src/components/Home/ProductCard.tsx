import React from "react";
import { Box, Card, CardBody, Image, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const ProductCard = ({
  _id,
  title,
  image,
  price,
}: {
  _id: string;
  title: string;
  image: string;
  price: number;
}) => {
  const router = useRouter();

  return (
    <Box padding="20px">
      <Card
        w={{
          base: "200px",
          sm: "210px",
          md: "260px",
          lg: "250px",
        }}
        border="2px solid"
        borderColor={"yellow.500"}
        margin="auto"
        cursor="pointer"
        _hover={{ transform: "scale(1.1)", transition: "all 0.2s ease-in" }}
        onClick={() => router.push(`/product/${_id}`)}
      >
        <CardBody>
          <Image
            src={image && image}
            alt="Image belongs to Amazon. Used for educational purposes and showcasing web development skills only."
            display="block"
            margin="auto"
            h={{ base: "150px", sm: "200px", lg: "250px" }}
            objectFit="contain"
          />
          <Stack mt="6" spacing="3">
            <Text
              color="sm.sparkle"
              fontSize="18px"
              fontWeight={400}
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {title}
            </Text>
            <Text fontSize="20px" fontWeight={400} color="sm.sparkle">
              ₹ {price && formatMoney(price)}
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default ProductCard;

const formatMoney = (amount: number) => {
  if (amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};
