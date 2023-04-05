import React from "react";
import {
  Card,
  CardBody,
  Text,
  Stack,
  Image,
  Box,
  Square,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const CategoryCarosuelCard = ({
  image,
  title,
  link,
}: {
  image: string;
  title: string;
  link: string;
}) => {
  const router = useRouter();

  return (
    <Card
      w="180px"
      h="190px"
      margin="auto"
      cursor="pointer"
      onClick={() => router.push(link)}
    >
      <CardBody>
        <Stack spacing={6}>
          <Square>
            <Image
              display="block"
              margin="auto"
              src={image}
              alt="Image belongs to QuickrBazaar. Used for educatinal purposes and showcasing web development skills only."
            />
          </Square>
          <Text textAlign="center" fontWeight={500}>
            {title}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CategoryCarosuelCard;
