import Head from "next/head";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Cart from "@/components/Cart/Cart";
import Auth from "@/utils/auth";

export default function CartPage() {
  return (
    <>
      <Head>
        <title>Cart - SwyftMarket</title>
        <meta
          name="description"
          content="Add products to cart on SwyftMarket"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Auth>
        <main>
          <Navbar />
          <Cart />
          <Footer />
        </main>
      </Auth>
    </>
  );
}
