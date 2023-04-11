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
  useColorModeValue,
  InputGroup,
  InputRightElement,
  useToast,
  Text,
  Divider,
  Square,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { existingUser, login } from "../../redux/auth/auth.action";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const [isButton, setIsButton] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isAuth } = useAppSelector((store) => store.auth);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
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
    setEmail("");
    setPassword("");
  };

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
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  border="2px solid"
                  borderColor={"yellow.500"}
                  _focus={{
                    boxShadow: "none",
                    border: "2px solid",
                    borderColor: "yellow.500",
                  }}
                  _hover={{
                    border: "2px solid",
                    borderColor: "yellow.500",
                  }}
                  type="email"
                  value={email}
                  autoComplete="on"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    border="2px solid"
                    borderColor={"yellow.500"}
                    _focus={{
                      boxShadow: "none",
                      border: "2px solid",
                      borderColor: "yellow.500",
                    }}
                    _hover={{
                      border: "2px solid",
                      borderColor: "yellow.500",
                    }}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox colorScheme={"yellow"}>Remember me</Checkbox>
                  <Link>Forgot password?</Link>
                </Stack>

                <Button
                  type="submit"
                  isLoading={isButton}
                  loadingText="Loging"
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
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  No account?{" "}
                  <Link href="/signup" color="yellow.500">
                    Create one!
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
