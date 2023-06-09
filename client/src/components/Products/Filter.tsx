import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Stack,
  CheckboxGroup,
  Checkbox,
  Radio,
  RadioGroup,
  Flex,
  Button,
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

interface FilterProps {
  productCategoryOnchange: (category: string[]) => void;
  category: string[];
  productBrandOnchange: (brand: string[]) => void;
  brand: string[];
  productPriceOnchange: (price: string) => void;
  price: string;
  productDiscountOnchange: (discount: string) => void;
  discount: string;
  productRatingOnchange: (rating: string) => void;
  rating: string;
  resetFilter: () => void;
}

const Filter = ({
  productCategoryOnchange,
  category,
  productBrandOnchange,
  brand,
  productPriceOnchange,
  price,
  productDiscountOnchange,
  discount,
  productRatingOnchange,
  rating,
  resetFilter,
}: FilterProps) => {
  const [canClear, setCanClear] = useState(true);

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

  const clearFilter = () => {
    if (
      category.length !== 0 ||
      brand.length !== 0 ||
      price != "undefined,undefined" ||
      discount != "undefined,undefined" ||
      rating != "undefined,undefined"
    ) {
      productCategoryOnchange([]);
      productBrandOnchange([]);
      productPriceOnchange("*");
      productDiscountOnchange("*");
      productRatingOnchange("*");
      resetFilter();
    }
  };

  /********** determine if we can use clear filter button ******************/

  useEffect(() => {
    if (
      category.length === 0 &&
      brand.length === 0 &&
      price === "undefined,undefined" &&
      discount === "undefined,undefined" &&
      rating === "undefined,undefined"
    ) {
      setCanClear(true);
    } else {
      setCanClear(false);
    }
  }, [category.length, brand.length, price, discount, rating]);

  return (
    <Stack bgColor="white" padding="10px" spacing="10px" color="sm.sparkle">
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize={18} fontWeight={400} textAlign={"left"}>
          Filter By
        </Text>
        <Button
          color="sm.sparkle"
          colorScheme="yellow"
          isDisabled={canClear}
          onClick={clearFilter}
        >
          Clear Filter
        </Button>
      </Flex>

      <Box h={"auto"}>
        <Accordion allowMultiple>
          {/* start hers */}

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Text fontSize={16} fontWeight={400}>
                    Category
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <CheckboxGroup
                colorScheme="yellow"
                value={category}
                onChange={productCategoryOnchange}
              >
                <Stack spacing={1} direction={"column"}>
                  {categories.map((category) => {
                    return (
                      <Checkbox
                        value={category.name}
                        key={Date() + Math.random() + category.name}
                      >
                        {category.displayName}
                      </Checkbox>
                    );
                  })}
                </Stack>
              </CheckboxGroup>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Text fontSize={16} fontWeight={400}>
                    Price
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <RadioGroup
                colorScheme="yellow"
                value={price}
                onChange={productPriceOnchange}
              >
                <Stack spacing={1} direction={"column"}>
                  <Radio value="100,1000">100 - 1000</Radio>
                  <Radio value="1000,5000">1000 - 5000</Radio>
                  <Radio value="5000,10000">5000 - 10000</Radio>
                  <Radio value="10000,15000">10000 - 15000</Radio>
                  <Radio value="15000,20000">15000 - 20000</Radio>
                  <Radio value="20000,30000">20000 - 30000</Radio>
                  <Radio value="30000,50000">30000 - 50000</Radio>
                  <Radio value="50000,100000000000">Above 50000</Radio>
                </Stack>
              </RadioGroup>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Text fontSize={16} fontWeight={400}>
                    Discount
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <RadioGroup
                colorScheme="yellow"
                value={discount}
                onChange={productDiscountOnchange}
              >
                <Stack spacing={1} direction={"column"}>
                  <Radio value="5,10">5 - 10</Radio>
                  <Radio value="10,15">10 - 15</Radio>
                  <Radio value="15,30">15 - 30</Radio>
                  <Radio value="30,60">30 - 60</Radio>
                  <Radio value="60,80">60 - 80</Radio>
                  <Radio value="80,100">Above 80</Radio>
                </Stack>
              </RadioGroup>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Text fontSize={16} fontWeight={400}>
                    Brand
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <CheckboxGroup
                colorScheme="yellow"
                value={brand}
                onChange={productBrandOnchange}
              >
                <Stack spacing={1} direction={"column"}>
                  <Checkbox value="Voltas">Voltas</Checkbox>
                  <Checkbox value="Panasonic">Panasonic</Checkbox>
                  <Checkbox value="Godrej">Godrej</Checkbox>
                  <Checkbox value="LG">LG</Checkbox>
                  <Checkbox value="Ikea">Ikea</Checkbox>
                  <Checkbox value="OnePlus">OnePlus</Checkbox>
                  <Checkbox value="BoAt">BoAt</Checkbox>
                  <Checkbox value="Lenovo">Lenovo</Checkbox>
                  <Checkbox value="Acer">Acer</Checkbox>
                  <Checkbox value="HP">HP</Checkbox>
                  <Checkbox value="Redmi">Redmi</Checkbox>
                  <Checkbox value="Oppo">Oppo</Checkbox>
                  <Checkbox value="Samsung">Samsung</Checkbox>
                  <Checkbox value="Xiaomi">Xiaomi</Checkbox>
                  <Checkbox value="Whirlpool">Whirlpool</Checkbox>
                  <Checkbox value="Generic">Generic</Checkbox>
                </Stack>
              </CheckboxGroup>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Text fontSize={16} fontWeight={400}>
                    Rating
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <RadioGroup
                colorScheme="yellow"
                value={rating}
                onChange={productRatingOnchange}
              >
                <Stack spacing={1} direction={"column"}>
                  {[4, 3, 2, 1].map((index) => {
                    return (
                      <Radio
                        value={`${index},${index + 1}`}
                        key={Date() + Math.random() + Date.now()}
                      >
                        <Flex
                          color="yellow.500"
                          alignItems={"center"}
                          gap="5px"
                        >
                          <Flex>
                            {Array(5)
                              .fill("")
                              .map((_, i) => {
                                const roundedRating = Math.round(index * 2) / 2;
                                if (roundedRating - i >= 1) {
                                  return (
                                    <BsStarFill
                                      key={
                                        Date() + Math.random() + i + Date.now()
                                      }
                                      style={{ marginLeft: "1" }}
                                    />
                                  );
                                }
                                if (roundedRating - i === 0.5) {
                                  return (
                                    <BsStarHalf
                                      key={Date() + Math.random() + i + "B"}
                                      style={{ marginLeft: "1" }}
                                    />
                                  );
                                }
                                return (
                                  <BsStar
                                    key={Date() + Math.random() + i + "A"}
                                    style={{ marginLeft: "1" }}
                                  />
                                );
                              })}
                          </Flex>
                          <Text color="sm.sparkle">& up</Text>
                        </Flex>
                      </Radio>
                    );
                  })}
                </Stack>
              </RadioGroup>
            </AccordionPanel>
          </AccordionItem>
          {/* ends here */}
        </Accordion>
      </Box>
    </Stack>
  );
};

export default Filter;
