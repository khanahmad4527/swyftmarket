import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ReactNode } from "react";

const Auth = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { isAuth } = useSelector((store: any) => store.auth);

  if (isAuth) {
    return children;
  } else {
    router.push("/login");
    return null;
  }
};

export default Auth;
