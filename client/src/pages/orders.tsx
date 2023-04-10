import Head from "next/head";
import Navbar from "@/components/Navbar/Navbar";
import Orders from "@/components/Orders/Orders";
import Auth from "@/utils/auth";

export default function OrdersPage() {
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

      <Auth>
        <main>
          <Navbar />
          <Orders />
        </main>
      </Auth>
    </>
  );
}
