import React, { lazy, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Square,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useMediaQuery,
  VStack,
  Text,
} from "@chakra-ui/react";
import Filter from "./Filter";
import Sort from "./Sort";
import ProductsCard from "./ProductsCard";
import Pagination from "./Pagination";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getProducts } from "../../redux/products/products.action";
import Loading from "../../utils/Loading";
import Error from "../../utils/Error";
import { useRouter } from "next/router";
import { Product, ProductSearchParams } from "@/utils/types";

const Products = () => {
  const router = useRouter();
  const query = router.query;

  /********** loading params from URL if exits otherwise default values if required ******************/

  const [productPerPage, setProductPerPage] = useState<number>(
    Number(query._limit) || 10
  );
  const [currentPage, setCurrentPage] = useState<number>(
    Number(query._page) || 1
  );
  const [q, setQ] = useState<string | undefined>(
    Array.isArray(query.q) ? query.q[0] : query.q || undefined
  );
  const [sort, setSort] = useState<string>(
    Array.isArray(query._sort) ? query._sort[0] : query._sort || "rating"
  );
  const [order, setOrder] = useState<string>(
    Array.isArray(query._order) ? query._order[0] : query._order || "desc"
  );
  const [category, setCategory] = useState<string[]>(
    typeof query.category === "string" && query.category !== ""
      ? [query.category]
      : query.category || []
  );
  const [brand, setBrand] = useState<string[]>(
    typeof query.brand === "string" ? [query.brand] : query.brand || []
  );
  const [price_lte, setPrice_lte] = useState<number | undefined>(
    query.price_lte ? Number(query.price_lte) : undefined
  );
  const [price_gte, setPrice_gte] = useState<number | undefined>(
    query.price_gte ? Number(query.price_gte) : undefined
  );
  const [discount_lte, setDiscount_lte] = useState<number | undefined>(
    query.discount_lte ? Number(query.discount_lte) : undefined
  );
  const [discount_gte, setDiscount_gte] = useState<number | undefined>(
    query.discount_gte ? Number(query.discount_gte) : undefined
  );
  const [rating_lte, setRating_lte] = useState<number | undefined>(
    query.rating_lte ? Number(query.rating_lte) : undefined
  );
  const [rating_gte, setRating_gte] = useState<number | undefined>(
    query.rating_gte ? Number(query.rating_gte) : undefined
  );

  const {
    userDetails: { id },
  } = useAppSelector((store) => store.auth);

  const {
    getProductsIsLoading,
    getProductsIsError,
    totalProductCount,
    productsData,
  }: {
    getProductsIsLoading: boolean;
    getProductsIsError: boolean;
    totalProductCount: number;
    productsData: Product[];
  } = useAppSelector((store) => store.products);

  const dispatch = useAppDispatch();

  /********** functions to change params onChange ******************/

  const paginate = (value: number) => {
    setCurrentPage(Number(value));
    //searchParams.set("_page", value);
  };

  const productPerPageOnChange = (value: string | number) => {
    setProductPerPage(Number(value));
    setCurrentPage(1);
  };

  const productSortOnChange = (value: string) => {
    const splitedValue = value.split(",");
    setSort(splitedValue[0]);
    setOrder(splitedValue[1]);
  };

  const productCategoryOnchange = (value: string[]) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const productBrandOnchange = (value: string[]) => {
    setBrand(value);
    setCurrentPage(1);
  };

  const productPriceOnchange = (value: string) => {
    if (value === "*") {
      setPrice_gte(undefined);
      setPrice_lte(undefined);
      setCurrentPage(1);
    } else {
      const splicedValue = value.split(",");
      setPrice_gte(Number(splicedValue[0]));
      setPrice_lte(Number(splicedValue[1]));
      setCurrentPage(1);
    }
  };

  const productDiscountOnchange = (value: string) => {
    if (value === "*") {
      setDiscount_gte(undefined);
      setDiscount_lte(undefined);
      setCurrentPage(1);
    } else {
      const splitedValue = value.split(",");
      setDiscount_gte(Number(splitedValue[0]));
      setDiscount_lte(Number(splitedValue[1]));
      setCurrentPage(1);
    }
  };

  const productRatingOnchange = (value: string) => {
    if (value === "*") {
      setRating_gte(undefined);
      setRating_lte(undefined);
      setCurrentPage(1);
    } else {
      const splitedValue = value.split(",");
      setRating_gte(Number(splitedValue[0]));
      setRating_lte(Number(splitedValue[1]));
      setCurrentPage(1);
    }
  };

  const resetFilter = () => {
    if (query.q) {
      router.push({
        pathname: "/products",
        query: {
          q: "",
        },
      });
    }
    setQ("");
  };

  useEffect(() => {
    /**********    page will always loads at top position   ******************/
    window.scrollTo(0, 0);

    const params: ProductSearchParams = {
      q: q,
      category: category,
      brand: brand,
      _page: currentPage > 1 ? currentPage : 1,
      _limit: productPerPage,
      _sort: sort,
      _order: order as "desc" | "asc",
      price_gte: price_gte,
      price_lte: price_lte,
      discount_gte: discount_gte,
      discount_lte: discount_lte,
      rating_gte: rating_gte,
      rating_lte: rating_lte,
    };

    // filter out the null or undefined values from the params object
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([key, value]) => value != null)
    );

    router.push({
      pathname: "/products",
      query: filteredParams,
    });

    dispatch(getProducts(filteredParams));
  }, [
    q,
    currentPage,
    productPerPage,
    sort,
    order,
    category,
    brand,
    price_gte,
    price_lte,
    discount_gte,
    discount_lte,
    rating_gte,
    rating_lte,
  ]);

  /********** detect change when typed in navbar ******************/

  useEffect(() => {
    let navQuery = Array.isArray(query?.q) ? query?.q[0] : query?.q;
    if (navQuery !== undefined && navQuery !== "" && navQuery !== q) {
      setQ(navQuery);
    }

    let navCategory = Array.isArray(query?.category)
      ? query?.category
      : typeof query?.category === "string" && query?.category !== ""
      ? [query?.category]
      : [];

    if (
      Array.isArray(navCategory) &&
      navCategory.length &&
      JSON.stringify(navCategory) !== JSON.stringify(category)
    ) {
      setCategory(navCategory);
    }

    if (
      Array.isArray(navCategory) &&
      navCategory.length === 0 &&
      category.length !== 0
    ) {
      const queryParams = { ...router.query };
      delete queryParams.category;
      router.push({
        pathname: "/products",
        query: queryParams,
      });
      setCategory([]);
    }

    if (navQuery === "" && q !== "") {
      const queryParams = { ...router.query };
      queryParams.q = "";
      router.push({
        pathname: "/products",
        query: queryParams,
      });
      setQ("");
    }

    let navPage = Number(query._page);

    if (navPage && navPage !== 0 && navPage !== currentPage) {
      setCurrentPage(navPage);
    }
  }, [router]);

  /**********    state for the drawer   ******************/
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  /*******  Code to hide the mobile's sort and filter Square  ***********/
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile] = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 50
      ) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Flex
        w="85%"
        minH="100vh"
        margin="auto"
        justifyContent={{ base: "center", md: "space-between" }}
        py="20px"
        gap="50px"
        color="sm.sparkle"
        marginTop={"20px"}
      >
        <Box
          display={{ base: "none", md: "block" }}
          w={{ md: "45%", lg: "30%" }}
        >
          <Filter
            productCategoryOnchange={productCategoryOnchange}
            category={category}
            productBrandOnchange={productBrandOnchange}
            brand={brand}
            productPriceOnchange={productPriceOnchange}
            price={`${price_gte},${price_lte}`}
            productDiscountOnchange={productDiscountOnchange}
            discount={`${discount_gte},${discount_lte}`}
            productRatingOnchange={productRatingOnchange}
            rating={`${rating_gte},${rating_lte}`}
            resetFilter={resetFilter}
          />
        </Box>

        <Flex
          flexDirection="column"
          gap="20px"
          w={{ base: "100%", md: "55%", lg: "70%" }}
        >
          <Box display={{ base: "none", md: "block" }}>
            <Sort
              productPerPageOnChange={productPerPageOnChange}
              productPerPage={productPerPage}
              productSortOnChange={productSortOnChange}
              sort_order={`${sort},${order}`}
            />
          </Box>

          {getProductsIsLoading ? (
            <Loading />
          ) : getProductsIsError ? (
            <Error />
          ) : productsData && productsData.length === 0 ? (
            <Box textAlign="center">
              <VStack spacing={4} mt={8}>
                <Text fontSize="2xl">No results found</Text>
                <Text fontSize="lg">
                  We&apos;re sorry, We couldn&apos;t find any products matching
                  your search. Please try a different search term.
                </Text>
              </VStack>
            </Box>
          ) : (
            <Grid
              templateColumns={{ base: "100%", lg: "repeat(2, 1fr)" }}
              gap={10}
            >
              {productsData &&
                productsData.map((elm) => {
                  return (
                    <ProductsCard
                      key={Date() + Math.random()}
                      {...elm} //cartData={cartData}
                    />
                  );
                })}
            </Grid>
          )}

          <Pagination
            totalCount={totalProductCount}
            currentPage={currentPage}
            pageSize={productPerPage}
            onPageChange={paginate}
          />
        </Flex>
      </Flex>

      {/*********** filter, sort for mobile *******************/}

      {isMobile && (
        <Square
          position={"fixed"}
          zIndex={1}
          right={0}
          left={0}
          bottom={0}
          bgColor="sm.sparkle"
          display={isVisible ? "center" : "none"}
          style={{ width: "100%", height: "60px" }}
        >
          <Button
            bgColor={"sm.buff"}
            color="sm.sparkle"
            colorScheme="yellow"
            ref={btnRef}
            onClick={onOpen}
          >
            Apply Sort and Filter
          </Button>
        </Square>
      )}

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader color="sm.sparkle">Apply Sort and Filter</DrawerHeader>

          <DrawerBody>
            <Filter
              productCategoryOnchange={productCategoryOnchange}
              category={category}
              productBrandOnchange={productBrandOnchange}
              brand={brand}
              productPriceOnchange={productPriceOnchange}
              price={`${price_gte},${price_lte}`}
              productDiscountOnchange={productDiscountOnchange}
              discount={`${discount_gte},${discount_lte}`}
              productRatingOnchange={productRatingOnchange}
              rating={`${rating_gte},${rating_lte}`}
              resetFilter={resetFilter}
            />

            <Sort
              productPerPageOnChange={productPerPageOnChange}
              productPerPage={productPerPage}
              productSortOnChange={productSortOnChange}
              sort_order={`${sort},${order}`}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button
              bgColor={"sm.buff"}
              color="sm.sparkle"
              colorScheme="yellow"
              onClick={onClose}
            >
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Products;
