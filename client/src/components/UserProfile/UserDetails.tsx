import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/router";
import instance from "@/utils/axiosInstance";

interface UserProfileProps {
  firstname: string;
  lastname: string;
  email: string;
}

const initialForm: UserProfileProps = {
  firstname: "",
  lastname: "",
  email: "",
};

/****************************** userdetails validation ************************************/

const userDetailSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2)
    .max(50)
    .required("First name is required")
    .matches(/^[a-zA-Z\s]+$/, "First name must contain only alphabets"),

  lastname: Yup.string()
    .min(2)
    .max(50)
    .required("Last name is required")
    .matches(/^[a-zA-Z\s]+$/, "Last name must contain only alphabets"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const UserDetails = () => {
  const [isButton, setIsButton] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();

  const {
    values,
    setValues,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik<UserProfileProps>({
    initialValues: initialForm,
    validationSchema: userDetailSchema,
    onSubmit: async (values: UserProfileProps, action) => {
      const { firstname, lastname, email } = values;

      const user_data = {
        firstname,
        lastname,
        email,
      };

      setIsButton(true);
      try {
        const response = await instance.post(`/user/auth/update`, user_data);
        toast({
          title: response.data.message,
          description: response.data.description,
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        Cookies.set("smUserData", JSON.stringify(user_data));
        router.replace("/");
      } catch (error: any) {
        console.log("error", error);
        toast({
          title: error.response.data.message,
          description: error.response.data.description,
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      }
      setIsButton(false);
    },
  });

/****************************** get updated data always ************************************/

  useEffect(() => {
    const cookieValues = JSON.parse(Cookies.get("smUserData") || "{}");
    setValues(cookieValues); // Code to fetch cookie values
  }, [setValues]);

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack
        spacing={4}
        bgColor="white"
        w={"full"}
        maxW={"md"}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile
        </Heading>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl
                  height="90px"
                  isInvalid={
                    touched.firstname && errors.firstname ? true : undefined
                  }
                >
                  <FormLabel>First Name</FormLabel>
                  <Input
                    border="2px solid"
                    borderColor={"yellow.500"}
                    _focus={
                      touched.firstname && errors.firstname
                        ? {
                            boxShadow: "none",
                            border: "2px solid",
                            borderColor: "red.500",
                          }
                        : {
                            boxShadow: "none",
                            border: "2px solid",
                            borderColor: "yellow.500",
                          }
                    }
                    _hover={
                      touched.firstname && errors.firstname
                        ? {
                            border: "2px solid",
                            borderColor: "red.500",
                          }
                        : {
                            border: "2px solid",
                            borderColor: "yellow.500",
                          }
                    }
                    type="text"
                    name="firstname"
                    value={values.firstname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.firstname && touched.firstname ? (
                    <FormErrorMessage>{errors.firstname}</FormErrorMessage>
                  ) : null}
                </FormControl>
              </Box>

              <Box>
                <FormControl
                  height="90px"
                  isInvalid={
                    touched.lastname && errors.lastname ? true : undefined
                  }
                >
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    border="2px solid"
                    borderColor={"yellow.500"}
                    _focus={
                      touched.lastname && errors.lastname
                        ? {
                            boxShadow: "none",
                            border: "2px solid",
                            borderColor: "red.500",
                          }
                        : {
                            boxShadow: "none",
                            border: "2px solid",
                            borderColor: "yellow.500",
                          }
                    }
                    _hover={
                      touched.lastname && errors.lastname
                        ? {
                            border: "2px solid",
                            borderColor: "red.500",
                          }
                        : {
                            border: "2px solid",
                            borderColor: "yellow.500",
                          }
                    }
                    type="text"
                    name="lastname"
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.lastname && touched.lastname ? (
                    <FormErrorMessage>{errors.lastname}</FormErrorMessage>
                  ) : null}
                </FormControl>
              </Box>
            </HStack>

            <FormControl
              height="90px"
              isInvalid={touched.email && errors.email ? true : undefined}
            >
              <FormLabel>Email address</FormLabel>
              <Input
                border="2px solid"
                borderColor={"yellow.500"}
                _focus={
                  touched.email && errors.email
                    ? {
                        boxShadow: "none",
                        border: "2px solid",
                        borderColor: "red.500",
                      }
                    : {
                        boxShadow: "none",
                        border: "2px solid",
                        borderColor: "yellow.500",
                      }
                }
                _hover={
                  touched.email && errors.email
                    ? {
                        border: "2px solid",
                        borderColor: "red.500",
                      }
                    : {
                        border: "2px solid",
                        borderColor: "yellow.500",
                      }
                }
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              ) : null}
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                type="submit"
                isLoading={isButton}
                loadingText="Checking"
                size="lg"
                bg="sm.sparkle"
                color="yellow.500"
                textTransform={"uppercase"}
                _hover={{
                  color: "sm.sparkle",
                  bg: "yellow.500",
                }}
              >
                UPDATE
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
};

export default UserDetails;
