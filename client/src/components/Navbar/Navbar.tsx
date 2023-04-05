import dynamic from "next/dynamic";
import Loading from "@/utils/Loading";
import NavbarLoading from "./NavbarLoading";

const DynamicComponentWithLoading = dynamic(() => import("./NavbarHelper"), {
  loading: () => <NavbarLoading />,
  ssr: false,
});

function Navbar() {
  return <DynamicComponentWithLoading />;
}

export default Navbar;
