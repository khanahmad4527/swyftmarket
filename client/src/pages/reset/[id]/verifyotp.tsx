import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  PinInput,
  PinInputField,
  Button,
  Text,
  useToast,
  Square,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import instance from "@/utils/axiosInstance";
import { useRouter } from "next/router";

const VerifyOTP = () => {
  const [isAllow, setIsAllow] = useState<boolean>(false);
  const [pin, setPin] = useState<string>("");
  const [expiry, setExpiry] = useState<number>();
  const toast = useToast();
  const router = useRouter();
  const id = router.query?.id;

  /********** checking if user to eligible to verify OTP else redirect to home page ******************/

  useEffect(() => {
    if (id && id) {
      (async () => {
        try {
          const response = await instance.post(`/user/auth/detail`, {
            userId: id && id,
          });
          if (response.status === 200) {
            if (response.data.OTP !== "") {
              setIsAllow(true);
              setExpiry(response.data.expiry);
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

  const handleVerify = async () => {
    if (id && id && pin.length === 6) {
      try {
        const response = await instance.post(`/user/reset/verifyotp`, {
          code: pin,
          userId: id,
        });
        if (response.status === 201) {
          toast({
            title: response.data.message,
            description: response.data.description,
            status: "success",
            position: "top",
            duration: 3000,
            isClosable: true,
          });
          router.push(`/reset/${id}/resetpassword`);
        }
      } catch (error: any) {
        if (error.response.status === 409) {
          toast({
            title: error.response.data.message,
            description: error.response.data.description,
            status: "error",
            position: "top",
            duration: 3000,
            isClosable: true,
          });
        } else if (error?.response?.status === 404) {
          toast({
            title: "User not found",
            description: "Please signup",
            status: "error",
            position: "top",
            duration: 3000,
            isClosable: true,
          });
          router.push("/signup");
        }
      }
    }
  };

  const requestOTP = async () => {
    if (expiry && id) {
      const timeDiffMs = Date.now() - expiry;

      if (timeDiffMs > 600000) {
        if (id && id) {
          const otpResponce = await instance.post("/user/reset/generateotp", {
            userId: id,
          });
          const { OTP } = otpResponce.data;
          await instance.post("/user/reset/sendemail", {
            code: OTP,
            userId: id,
          });
        }
        toast({
          title: "OTP Sent Successfully",
          description: "Please check your email for the OTP",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
        router.replace(`/reset/${id}/verifyotp`);
      } else {
        toast({
          title: "OTP Request Failed",
          description: "You can only request OTP after 10 minute",
          status: "warning",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <>
      {isAllow && (
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Box
            width="max-content"
            bgColor="white"
            mt="40px"
            color="sm.sparkle"
            p="10px"
          >
            <Heading textAlign="center" mb="6">
              Reset Your SwyftMarket Account Password
            </Heading>
            <Flex
              justifyContent={"center"}
              margin="auto"
              w="max-content"
              textAlign={"center"}
            >
              <FormControl mb="6">
                <FormLabel textAlign={"center"}>
                  Enter the OTP sent to your email:
                </FormLabel>
                <HStack>
                  <PinInput
                    otp
                    size="lg"
                    onChange={(value: string) => setPin(value)}
                  >
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
              </FormControl>
            </Flex>
            <HStack>
              <Button
                colorScheme="blue"
                onClick={handleVerify}
                isDisabled={pin.length < 6}
              >
                Reset
              </Button>
              <Button colorScheme="blue" onClick={requestOTP}>
                Request OTP
              </Button>
            </HStack>

            <Text mt="4" fontSize="sm">
              Please check your email for the OTP. If you haven&apos;t received
              it, please check your spam folder or click the resend button.
            </Text>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default VerifyOTP;
