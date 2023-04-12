import { useState } from "react";
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
import instance from "@/utils/axiosInstance";
import { useRouter } from "next/router";

const VerifyOTP = ({ expiry }: { expiry: number | undefined }) => {
  const [pin, setPin] = useState<string>("");
  const toast = useToast();
  const router = useRouter();
  const id = router.query?.id;

  /********** handle verify otp ******************/

  const handleVerify = async () => {
    if (id && id) {
      try {
        const response = await instance.post(`/user/verify/verifyemail/${id}`, {
          code: pin,
        });
        if (response.status === 201) {
          toast({
            title: "Account Verified",
            description: "Your account has been successfully verified.",
            status: "success",
            position: "top",
            duration: 3000,
            isClosable: true,
          });
          router.push("/login");
        }
        if (response.status === 200) {
          toast({
            title: "Account Verified",
            description: "Your account has already been verified.",
            status: "info",
            position: "top",
            duration: 3000,
            isClosable: true,
          });
          router.push("/login");
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

  /********** request otp if otp expiry ******************/

  const requestOTP = async () => {
    if (expiry && id) {
      const timeDiffMs = Date.now() - expiry;

      if (timeDiffMs > 600000) {
        if (id && id) {
          const otpResponce = await instance.post("/user/verify/generateotp", {
            userId: id,
          });
          const { OTP } = otpResponce.data;
          await instance.post("/user/verify/sendemail", {
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
        router.replace(`/verify/${id}`);
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
    <Flex justifyContent={"center"} alignItems={"center"}>
      <Box
        width="max-content"
        bgColor="white"
        mt="40px"
        color="sm.sparkle"
        p="10px"
      >
        <Heading textAlign="center" mb="6">
          Verify Your SwyftMarket Account
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
            Verify Account
          </Button>
          <Button colorScheme="blue" onClick={requestOTP}>
            Request OTP
          </Button>
        </HStack>

        <Text mt="4" fontSize="sm">
          Please check your email for the OTP. If you haven&apos;t received it,
          please check your spam folder or click the resend button.
        </Text>
      </Box>
    </Flex>
  );
};

export default VerifyOTP;
