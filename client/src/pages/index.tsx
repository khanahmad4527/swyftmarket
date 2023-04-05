import Head from "next/head";
import Home from "@/components/Home/Home";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Home - SwyftMarket</title>
        <meta name="description" content="homepage" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Home />
      </main>
    </>
  );
}
