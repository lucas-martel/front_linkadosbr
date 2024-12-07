import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "gerencia do site",
  robots: {
    index: false,
    follow: false,
  },
};

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

export default layout;
