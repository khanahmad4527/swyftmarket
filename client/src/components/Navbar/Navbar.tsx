import dynamic from "next/dynamic";
import NavbarLoading from "./NavbarLoading";

  /********** loading navbar dynamically to avoid hydration error ******************/

const DynamicComponentWithLoading = dynamic(() => import("./NavbarHelper"), {
  loading: () => <NavbarLoading />,
  ssr: false,
});

function Navbar() {
  return <DynamicComponentWithLoading />;
}

export default Navbar;
