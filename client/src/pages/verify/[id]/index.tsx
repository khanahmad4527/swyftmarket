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

  /********** display only if user's email is not verified else redirect to home page/signup page ******************/

  useEffect(() => {
    if (id && id) {
      (async () => {
        try {
          const response = await instance.post(`/user/auth/detail`, {
            userId: id && id,
          });
          if (response.status === 200) {
            if (!response.data.isEmailVerified) {
              setExpiry(response.data.expiry);
              setIsAllow(true);
            } else {
              router.push("/");
            }
          } else {
            router.push("/signup");
          }
        } catch (error: any) {
          router.push("/signup");
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
