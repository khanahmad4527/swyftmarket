import {
  Box,
  chakra,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaLinkedin, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import alphaLogo from "../../assets/images/SwyftMarket-alpha.png";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Footer() {
  const router = useRouter();
  return (
    <Box bg="sm.buff" color="sm.sparkle">
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Image
                src={alphaLogo}
                alt={"SwyftMarket"}
                width={90}
                height={90}
                onClick={() => router.push("/")}
                style={{ cursor: "pointer" }}
              />
            </Box>
            <Text fontSize={"sm"}>© 2023 SwyftMarket. All rights reserved</Text>
            <Stack direction={"row"} spacing={6}>
              <SocialButton
                label={"Twitter"}
                href={"https://github.com/khanahmad4527"}
              >
                <FaGithub />
              </SocialButton>
              <SocialButton
                label={"YouTube"}
                href={"https://khanahmad4527.github.io"}
              >
                <FaExternalLinkAlt />
              </SocialButton>
              <SocialButton
                label={"Instagram"}
                href={"https://www.linkedin.com/in/khanahmad4527"}
              >
                <FaLinkedin />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Link>About us</Link>
            <Link>Blog</Link>
            <Link>Contact us</Link>
            <Link>Pricing</Link>
            <Link>Testimonials</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Link>Help Center</Link>
            <Link>Terms of Service</Link>
            <Link>Legal</Link>
            <Link>Privacy Policy</Link>
            <Link>Satus</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Stay up to date</ListHeader>
            <Stack direction={"row"}>
              <Input
                placeholder={"Your email address"}
                bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                outline="none"
                border="2px solid"
                borderColor="transparent"
                _hover={{ borderColor: "none" }}
                _focus={{
                  bg: "whiteAlpha.300",
                  boxShadow: "none",
                  border: "2px solid",
                  borderColor: "yellow.500",
                }}
              />
              <IconButton
                bg="sm.sparkle"
                color={useColorModeValue("white", "gray.800")}
                _hover={{
                  bg: "sm.sparkle",
                }}
                aria-label="Subscribe"
                icon={<BiMailSend />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: React.ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};
