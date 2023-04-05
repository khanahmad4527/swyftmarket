import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/store";
import { ReactNode } from "react";

const Auth = ({ children }: { children: ReactNode }) => {
  const { isAuth } = useAppSelector((store) => store.auth);
  const router = useRouter();

  if (isAuth) {
    return children;
  } else {
    router.push("/login", undefined, { shallow: true });
    return null;
  }
};

export default Auth;
