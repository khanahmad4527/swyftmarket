import Head from "next/head";
import VerifyEmail from "./VerifyEmail";

export default function VerifyEmailPage() {
  return (
    <>
      <Head>
        <title>Verify Email - SwyftMarket</title>
        <meta
          name="description"
          content="Add products to cart on SwyftMarket"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <VerifyEmail />
      </main>
    </>
  );
}
