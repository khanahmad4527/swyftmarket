import Head from "next/head";
import CheckoutNavbar from "@/components/Checkout/CheckoutNavbar";
import Checkout from "@/components/Checkout/Checkout";

export default function CheckoutPage() {
  return (
    <>
      <Head>
        <title>Checkout - SwyftMarket</title>
        <meta name="description" content="Seamlessly pay on SwyftMarket" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <CheckoutNavbar />
        <Checkout />
      </main>
    </>
  );
}
