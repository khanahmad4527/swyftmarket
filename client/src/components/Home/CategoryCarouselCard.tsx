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
import Link from "next/link";

const CategoryCarouselCard = ({
  image,
  title,
  link,
}: {
  image: string;
  title: string;
  link: string;
}) => {
  return (
    <Card w="180px" h="190px" margin="auto" cursor="pointer">
      <Link href={link}>
        <CardBody>
          <Stack spacing={6}>
            <Square>
              <Image
                display="block"
                margin="auto"
                src={image}
                alt="Image belongs to QuickrBazaar. Used for educational purposes and showcasing web development skills only."
              />
            </Square>
            <Text textAlign="center" fontWeight={500}>
              {title}
            </Text>
          </Stack>
        </CardBody>
      </Link>
    </Card>
  );
};

export default CategoryCarouselCard;
