import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { upiSchema } from "../../schemas/payment";

interface UPI {
  upiId: string;
  remarks: string;
}

const initialValues: UPI = {
  upiId: "",
  remarks: "",
};

const UPIModal = ({ orderConfirmed }: { orderConfirmed: () => void }) => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: upiSchema,
      onSubmit: async (values, action) => {
        orderConfirmed();
        action.resetForm();
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <FormControl
          height="90px"
          isInvalid={touched?.upiId && errors?.upiId ? true : undefined}
        >
          <FormLabel>UPI ID</FormLabel>
          <Input
            border="2px solid"
            borderColor={"yellow.500"}
            _focus={
              touched?.upiId && errors?.upiId
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
              touched?.upiId && errors?.upiId
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
            placeholder="Enter UPI ID"
            name="upiId"
            value={values.upiId}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors?.upiId && touched?.upiId ? (
            <FormErrorMessage>{errors?.upiId}</FormErrorMessage>
          ) : null}
        </FormControl>

        <FormControl
          height="90px"
          isInvalid={touched?.remarks && errors?.remarks ? true : undefined}
        >
          <FormLabel>Remarks</FormLabel>
          <Input
            border="2px solid"
            borderColor={"yellow.500"}
            _focus={
              touched?.remarks && errors?.remarks
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
              touched?.remarks && errors?.remarks
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
            placeholder="Enter remarks"
            name="remarks"
            value={values.remarks}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors?.remarks && touched?.remarks ? (
            <FormErrorMessage>{errors?.remarks}</FormErrorMessage>
          ) : null}
        </FormControl>

        <Button
          type="submit"
          textTransform={"uppercase"}
          bg="sm.sparkle"
          color="yellow.500"
          _hover={{
            color: "sm.sparkle",
            bg: "yellow.500",
          }}
        >
          Pay Now
        </Button>
      </Stack>
    </form>
  );
};

export default UPIModal;
