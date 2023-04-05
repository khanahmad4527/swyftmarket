import Head from "next/head";
import Login from "@/components/Auth/Login";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login - SwyftMarket</title>
        <meta name="description" content="Sign in to access your account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Login />
      </main>
    </>
  );
}
