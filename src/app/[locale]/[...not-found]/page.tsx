"use client";
import { Link } from "@nextui-org/react";
import { useTranslations } from "next-intl";

const NotFound = () => {
  const translated = useTranslations("Index");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#000",
      }}
    >
      <h1 style={{ fontSize: "2em", color: "#fff" }}>{translated("error")}</h1>
      <Link href="/">
        <a
          style={{
            padding: "10px 20px",
            fontSize: "1em",
            color: "#000",
            background: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {translated("errorAction")}
        </a>
      </Link>
    </div>
  );
};

export default NotFound;
