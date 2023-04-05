import Head from "next/head";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/NavbarHelper";
import Products from "@/components/Products/Products";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Products - SwyftMarket</title>
        <meta
          name="description"
          content="Browse and purchase products on SwyftMarket"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />
        <Products />
        <Footer />
      </main>
    </>
  );
}
