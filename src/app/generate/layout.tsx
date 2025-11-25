import { GenerateProvider } from "./GenerateProvider";
import React from "react";

export default function GenerateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <GenerateProvider>{children}</GenerateProvider>;
}
