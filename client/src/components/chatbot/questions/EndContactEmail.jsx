import React from "react";

import End from "./End";

const email = "support@motonreel.fr";

export default function ContactEndEmail() {
  return <End feedback={"Adresse de contact : " + email} />;
}
