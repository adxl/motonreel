import React from "react";

export default function Question({ title, children }) {
  return (
    <div>
      <div className="mb-4">
        <strong>{title}</strong>
      </div>
      <div>{children}</div>
    </div>
  );
}
