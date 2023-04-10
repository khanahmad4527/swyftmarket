import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/store";
import dynamic from "next/dynamic";

const Auth = ({ children }: { children: JSX.Element }) => {
  const { isAuth } = useAppSelector((store) => store.auth);
  const router = useRouter();

  if (isAuth) {
    return children;
  } else {
    router.push("/login");
    return null;
  }
};

export default dynamic(() => Promise.resolve(Auth), { ssr: false });
