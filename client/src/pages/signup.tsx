import Head from "next/head";
import { useAppSelector } from "@/redux/store";
import dynamic from "next/dynamic";

const Signup = dynamic(() => import("@/components/Auth/Signup"), {
  ssr: false,
});

export default function SignupPage() {
  const { isAuth } = useAppSelector((store) => store.auth);

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
