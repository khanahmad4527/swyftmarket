import Head from "next/head";
import Signup from "@/components/Auth/Singup";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Signup - SwyftMarket</title>
        <meta name="description" content="Signup in to access your account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Signup />
      </main>
    </>
  );
}
