import Head from "next/head";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import ProductDetail from "./ProductDetail";
import { useRouter } from "next/router";

export default function ProductDetailPage() {
  const router = useRouter();
  const id: string = Array.isArray(router.query?.id)
    ? router.query.id[0]
    : router.query.id || "";

  return (
    <>
      <Head>
        <title>{`Product ${id} - SwyftMarket`}</title>
        <meta
          name="description"
          content="Add products to cart on SwyftMarket"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />
        <ProductDetail id={id} />
        <Footer />
      </main>
    </>
  );
}
