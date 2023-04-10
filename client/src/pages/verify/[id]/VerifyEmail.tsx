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
} from "@chakra-ui/react";

const VerifyEmail = () => {
  const [pin, setPin] = useState<string>("");
  const toast = useToast();

  const handleVerify = () => {
    // TODO: Implement verification logic here
    if (pin.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: "Account Verified",
      description: "Your account has been successfully verified.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box maxWidth="500px" mx="auto" mt="20">
      <Heading textAlign="center" mb="6">
        Verify Your SwyftMarket Account
      </Heading>
      <FormControl mb="6">
        <FormLabel>Enter the OTP sent to your email:</FormLabel>
        <PinInput
          size="lg"
          onChange={(value: string) => setPin(value)}
          onComplete={handleVerify}
        >
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </FormControl>
      <Button colorScheme="blue" onClick={handleVerify}>
        Verify Account
      </Button>
      <Text mt="4" fontSize="sm">
        Please check your email for the OTP. If you haven&apos;t received it,
        please check your spam folder or click the resend button.
      </Text>
    </Box>
  );
};

export default VerifyEmail;
