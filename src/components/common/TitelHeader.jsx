import React from "react";

const TitelHeader = ({ title, description }) => {
  return (
  <div style={{ padding: "0rem" }}>
    {/* Encabezado principal */}
    <div style={{ marginBottom: "2.5rem" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>{title}</h1>
      <p style={{ fontSize: "1rem", color: "#555" }}>
        {description}
      </p>
    </div>
  </div>
);

};

export default TitelHeader;
