import React from "react";

import End from "./End";

const phone = "01-25-36-44-88";

export default function ContactEndPhone() {
  return <End feedback={"Numéro de contact : " + phone} />;
}
