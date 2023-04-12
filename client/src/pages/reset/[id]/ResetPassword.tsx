import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { resetPasswordSchema } from "@/schemas/resetPassword";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import instance from "@/utils/axiosInstance";

interface ResetPasswordValues {
  password: string;
  confirm_password: string;
}

const initialForm: ResetPasswordValues = {
  password: "",
  confirm_password: "",
};

export default function ResetPasswordForm(): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isAllow, setIsAllow] = useState<boolean>(false);
  const [isButton, setIsButton] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;

  /********** checking if user has a valid session to change password else redirect to home page ******************/

  useEffect(() => {
    if (id && id) {
      (async () => {
        try {
          const response = await instance.post(`/user/auth/detail`, {
            userId: id && id,
          });
          if (response.status === 200) {
            if (response.data.session) {
              setIsAllow(true);
            } else {
              router.push("/");
            }
          } else {
            router.push("/");
          }
        } catch (error: any) {
          router.push("/");
        }
      })();
    }
  }, [id, router]);

  /********** formik and yup validation ******************/

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik<ResetPasswordValues>({
      initialValues: initialForm,
      validationSchema: resetPasswordSchema,
      onSubmit: async (values: ResetPasswordValues, action) => {
        const { password } = values;

        setIsButton(true);
        try {
          await instance.post(`/user/reset/resetpassword/${id}`, {
            password,
          });
          toast({
            title: "Password Reset Successful!",
            description: "Your password has been successfully reset.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          router.push("/");
        } catch (error: any) {
          if (error.response.status === 401) {
            toast({
              title: error.response.data.message,
              description: error.response.data.description,
              status: "warning",
              position: "top",
              duration: 5000,
              isClosable: true,
            });
          }
          router.push("/");
        }
        setIsButton(false);
        action.resetForm();
      },
    });

  return (
    <>
      {isAllow && (
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bgColor="white"
            color="sm.sparkle"
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
              Enter new password
            </Heading>

            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl
                  height="90px"
                  isInvalid={
                    touched.password && errors.password ? true : undefined
                  }
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
                    <FormErrorMessage>
                      {errors.confirm_password}
                    </FormErrorMessage>
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
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Flex>
      )}
    </>
  );
}
