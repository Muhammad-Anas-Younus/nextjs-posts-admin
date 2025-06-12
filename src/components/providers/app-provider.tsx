"use client";
import React from "react";
import { Header } from "../shared/header";
import { Footer } from "../shared/footer";
import QueryProvider from "./query-provider";
import { usePathname } from "next/navigation";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isAdminOrLogin = pathname === "/login" || pathname === "/admin";

  console.log(isAdminOrLogin);

  return (
    <QueryProvider>
      {!isAdminOrLogin ? <Header /> : null}
      {children}
      {!isAdminOrLogin ? <Footer /> : null}
    </QueryProvider>
  );
};

export default AppProvider;
