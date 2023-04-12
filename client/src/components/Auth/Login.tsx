import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  InputGroup,
  InputRightElement,
  useToast,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { existingUser, login } from "../../redux/auth/auth.action";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";

interface LoginFormValues {
  email: string;
  password: string;
}

const initialForm: LoginFormValues = {
  email: "",
  password: "",
};

/************************ loginSchema *****************************/

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(128)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\[\]!@#\$%\^&\*])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toast = useToast();
  const [isButton, setIsButton] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  /*********************** formik and yup validation to handle login **********************************/

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik<LoginFormValues>({
      initialValues: initialForm,
      validationSchema: loginSchema,
      onSubmit: async (values: LoginFormValues, action) => {
        const { email, password } = values;

        setIsButton(true);
        const response = await existingUser(email, password);
        if (response.status === 200) {
          dispatch(login(email, password));
          toast({
            title: "Login Successful",
            description: "We've login you successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
          if (
            response.data.role === "admin" ||
            response.data.role === "superadmin"
          ) {
            router.push("/admin");
          } else {
            router.push("/");
          }
          setIsButton(false);
        } else if (response.status === 404) {
          toast({
            title: "No results found",
            description: "Please sign up to create an account.",
            status: "warning",
            duration: 3000,
            position: "top",
            isClosable: true,
          });
          setIsButton(false);
        } else if (response.status === 401) {
          if (response.data.message === "Email verification needed") {
            toast({
              title: response.data.message,
              description: response.data.description,
              status: "warning",
              duration: 3000,
              position: "top",
              isClosable: true,
            });
            router.push(`/verify/${response.data.id}`);
          } else {
            toast({
              title: response.data.message,
              description: response.data.description,
              status: "warning",
              duration: 3000,
              position: "top",
              isClosable: true,
            });
          }
          setIsButton(false);
        }

        setIsButton(false);
        action.resetForm();
      },
    });

  // useEffect(() => {
  //   const { asPath, query } = router;
  //   const { from } = query;
  //   if (isAuth) {
  //     router.replace(
  //       "/login",
  //       { query: { from: asPath } },
  //       { shallow: true, scroll: false }
  //     );
  //   }
  // }, [isAuth]);

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} color="sm.sparkle">
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6} w="max-content">
        <Stack align={"center"}>
          <Heading fontSize={"36px"} fontWeight={400} color="sm.sparkle">
            Login to your account
          </Heading>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={8} bgColor={"white"}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
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

              <FormControl
                height="90px"
                isInvalid={
                  touched.password && errors.password ? true : undefined
                }
              >
                <FormLabel>Password</FormLabel>
                <InputGroup>
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
                {errors.password && touched.password ? (
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                ) : null}
              </FormControl>

              <Stack spacing={5} pt={2}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox colorScheme={"yellow"}>Remember me</Checkbox>
                  <Link href="/reset/forgotpassword">Forgot password?</Link>
                </Stack>

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
                  Login
                </Button>

                <Stack pt={6}>
                  <Text align={"center"}>
                    No account?{" "}
                    <Link href="/signup" color="yellow.500">
                      Create one!
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
