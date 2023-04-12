import {
  Flex,
  Square,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { IoMdKey } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import UserDetails from "./UserDetails";
import UserPassword from "./UserPassword";
import { logout } from "@/redux/auth/auth.action";
import { useAppDispatch } from "@/redux/store";
import { useRouter } from "next/router";

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useToast();

  return (
    <Flex direction="column" p={10} color="sm.sparkle" gap="10px">
      <Square
        as="button"
        bgColor="yellow.500"
        p="10px"
        style={{ width: "min-content", height: "min-content" }}
        onClick={() => router.push("/")}
      >
        <AiFillHome size={30} color="white" />
      </Square>
      <Tabs
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        gap="50px"
        variant={"unstyled"}
        w="100%"
      >
        <TabList
          display="flex"
          flexDirection={{ base: "column", md: "column" }}
          bgColor="white"
          w={{ base: "100%", md: "20%" }}
          h="min"
        >
          <Tab
            _selected={{ color: "white", bg: "yellow.500" }}
            gap="10px"
            p={"20px"}
          >
            <FaUser size={15} /> Account Details
          </Tab>
          <Tab
            _selected={{ color: "white", bg: "yellow.500" }}
            gap="10px"
            p={"20px"}
          >
            <IoMdKey size={20} /> Change Password
          </Tab>
          <Tab
            _selected={{ color: "white", bg: "yellow.500" }}
            gap="10px"
            p={"20px"}
            onClick={() => {
              toast({
                title: "Logout Successful",
                description: "We've logout you successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top",
              });
              dispatch(logout());
            }}
          >
            <BiLogOut size={20} /> Logout
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <UserDetails />
          </TabPanel>
          <TabPanel>
            <UserPassword />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default UserProfile;
