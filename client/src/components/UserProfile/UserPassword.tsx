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
  InputGroup,
  InputRightElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import React from "react";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/router";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import instance from "@/utils/axiosInstance";

interface UserProfileProps {
  password: string;
  confirm_password: string;
}

const initialForm: UserProfileProps = {
  password: "",
  confirm_password: "",
};

const userPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(128)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\[\]!@#\$%\^&\*])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  confirm_password: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const UserPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isButton, setIsButton] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();

/******************************** password validation ***************************************/

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik<UserProfileProps>({
      initialValues: initialForm,
      validationSchema: userPasswordSchema,
      onSubmit: async (values: UserProfileProps, action) => {
        const { password } = values;

        setIsButton(true);
        try {
          const response = await instance.post(`/user/auth/update`, {
            password,
          });
          toast({
            title: response.data.message,
            description: response.data.description,
            status: "success",
            duration: 3000,
            position: "top",
            isClosable: true,
          });
          router.push("/");
        } catch (error: any) {
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
        action.resetForm();
      },
    });

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
            <FormControl
              height="90px"
              isInvalid={touched.password && errors.password ? true : undefined}
            >
              <FormLabel>Password</FormLabel>
              <Input
                border="2px solid"
                borderColor={"yellow.500"}
                _focus={
                  touched.password && errors.password
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
                  touched.password && errors.password
                    ? {
                        border: "2px solid",
                        borderColor: "red.500",
                      }
                    : {
                        border: "2px solid",
                        borderColor: "yellow.500",
                      }
                }
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              ) : null}
            </FormControl>

            <FormControl
              height="90px"
              isInvalid={
                touched.confirm_password && errors.confirm_password
                  ? true
                  : undefined
              }
            >
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  border="2px solid"
                  borderColor={"yellow.500"}
                  _focus={
                    touched.confirm_password && errors.confirm_password
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
                    touched.confirm_password && errors.confirm_password
                      ? {
                          border: "2px solid",
                          borderColor: "red.500",
                        }
                      : {
                          border: "2px solid",
                          borderColor: "yellow.500",
                        }
                  }
                  type={showPassword ? "text" : "password"}
                  id="confirm_password"
                  name="confirm_password"
                  value={values.confirm_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <InputRightElement h={"full"}>
                  <Button
                    bg="none"
                    _hover={{ bg: "none" }}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.confirm_password && touched.confirm_password ? (
                <FormErrorMessage>{errors.confirm_password}</FormErrorMessage>
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

export default UserPassword;
