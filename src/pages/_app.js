// pages/_app.js

import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { PublicLayout } from "../components/layout/public-layout";
import { Layout } from "../components/layout/layout";
import "@/styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const isDashboardPage = router.pathname.startsWith("/dashboard"); // Check if the pathname starts with /dashboard

  const getLayout =
    Component.getLayout ||
    ((page) =>
      isDashboardPage ? (
        <Layout>{page}</Layout>
      ) : (
        <PublicLayout>{page}</PublicLayout>
      ));

  return (
    <NextUIProvider>
      <SessionProvider session={session}>
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    </NextUIProvider>
  );
}
