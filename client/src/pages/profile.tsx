import React from "react";
import Head from "next/head";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAppSelector } from "@/redux/store";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const UserProfile = dynamic(
  () => import("@/components/UserProfile/UserProfile"),
  { ssr: false }
);

function UserProfilePage() {
  const { firstname, lastname, email } = JSON.parse(
    Cookies.get("smUserData") || "{}"
  ) as { firstname: string; lastname: string; email: string };

  const { isAuth } = useAppSelector((store) => store.auth);

  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push("/");
    }
  }, [isAuth, router]);

  return (
    <>
      <Head>
        <title>{`${firstname} ${lastname}`}&apos;s Profile - SwyftMarket</title>
        <meta
          name="description"
          content={`${firstname} ${lastname}'s profile page`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{isAuth && <UserProfile />}</main>
    </>
  );
}

export default UserProfilePage;
