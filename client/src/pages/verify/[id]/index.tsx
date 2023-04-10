import Head from "next/head";
import VerifyOTP from "./VerifyOTP";

export default function VerifyOTPPage() {
  return (
    <>
      <Head>
        <title>Verify OTP - SwyftMarket</title>
        <meta name="description" content="Verify your account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <VerifyOTP />
      </main>
    </>
  );
}
