import Head from "next/head";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Signup = dynamic(() => import("@/components/Auth/Signup"), { ssr: false });

export default function SignupPage() {
  const { isAuth } = useAppSelector((store) => store.auth);
  const router = useRouter();

  useEffect(() => {
    if (isAuth) {
      router.push("/");
    }
  }, [isAuth, router]);
  return (
    <>
      <Head>
        <title>Signup - SwyftMarket</title>
        <meta name="description" content="Signup in to access your account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{!isAuth && <Signup />}</main>
    </>
  );
}
