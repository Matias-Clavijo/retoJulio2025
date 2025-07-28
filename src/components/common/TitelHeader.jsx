import React from "react";

const TitelHeader = ({ title, description, button }) => {
  return (
    <div
  style={{
    padding: "0rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center", 
  }}
>
  <div>
    <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>{title}</h1>
    <p style={{ fontSize: "1rem", color: "#555" }}>{description}</p>
  </div>

  <div>
    {button}
  </div>
</div>

  );
};

export default TitelHeader;
