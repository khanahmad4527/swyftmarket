import { Button } from "@chakra-ui/react";
import React from "react";

const COD = ({ orderConfirmed }: { orderConfirmed: () => void }) => {
  const handlePayment: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    orderConfirmed();
  };
  return (
    <Button
      textTransform={"uppercase"}
      bg="sm.sparkle"
      color="yellow.500"
      _hover={{
        color: "sm.sparkle",
        bg: "yellow.500",
      }}
      onClick={handlePayment}
    >
      Confirm Order
    </Button>
  );
};

export default COD;
