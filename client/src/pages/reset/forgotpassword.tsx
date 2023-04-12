import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  FormLabel,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import instance from "@/utils/axiosInstance";

interface ForgetPasswordValues {
  email: string;
}

const initialForm: ForgetPasswordValues = {
  email: "",
};

  /********** email schema ******************/

const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function ForgotPasswordForm() {
  const [isButton, setIsButton] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();

    /********** formik and yup validation ******************/

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialForm,
      validationSchema: emailSchema,
      onSubmit: async (values: ForgetPasswordValues, action) => {
        const { email } = values;

        setIsButton(true);
        try {
          const otpResponce = await instance.post("/user/reset/generateotp", {
            email,
          });
          const { OTP, _id: id } = otpResponce.data;

          try {
            await instance.post("/user/reset/sendemail", { code: OTP, email });

            toast({
              title: "OTP Sent Successfully",
              description: "Please check your email for the OTP",
              status: "success",
              position: "top",
              duration: 5000,
              isClosable: true,
            });

            setIsButton(false);

            router.push(`/reset/${id}/verifyotp`);
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
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bgColor={"white"}
        color={"sm.sparkle"}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Forgot your password?
        </Heading>
        <Text fontSize={{ base: "sm", sm: "md" }}>
          You&apos;ll get an email with an OTP
        </Text>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl
              height="90px"
              isInvalid={touched.email && errors.email ? true : undefined}
            >
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="your-email@example.com"
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
                Send OTP
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}
