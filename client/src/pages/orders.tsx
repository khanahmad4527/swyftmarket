import Head from "next/head";
import Navbar from "@/components/Navbar/Navbar";
import Orders from "@/components/Orders/Orders";

export default function CheckoutPage() {
  return (
    <>
      <Head>
        <title>Orders - SwyftMarket</title>
        <meta
          name="description"
          content="Check your purchase history on SwyftMarket"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />
        <Orders />
      </main>
    </>
  );
}
