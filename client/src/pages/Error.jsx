import React from "react";

export default function Error({ code = "404" }) {
  return <h1>{code}</h1>;
}
