import Head from "next/head";
import VerifyOTP from "./VerifyOTP";
import { useEffect, useState } from "react";
import instance from "@/utils/axiosInstance";
import { useRouter } from "next/router";

export default function VerifyOTPPage() {
  const [isAllow, setIsAllow] = useState<boolean>(false);
  const [expiry, setExpiry] = useState<number>();
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (id && id) {
      (async () => {
        try {
          const response = await instance.post(`/user/auth/detail`, {
            userId: id && id,
          });
          if (response.status === 200) {
            setExpiry(response.data.expiry);
            setIsAllow(true);
          } else {
            router.push("/login");
          }
        } catch (error) {
          router.push("/login");
        }
      })();
    }
  }, [id, router]);

  return (
    <>
      <Head>
        <title>Verify OTP - SwyftMarket</title>
        <meta name="description" content="Verify your account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{isAllow && <VerifyOTP expiry={expiry} />}</main>
    </>
  );
}
