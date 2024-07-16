import React from "react";
import { useSidebarContext } from "../layout/layout-context";
import { AcmeIconMobile } from "../icons/acma-mobile-icon";

export const BurguerButton = () => {
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button
        style={{
          width: "32px",
          height: "32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          background: "transparent",
          padding: "4px",
          outline: "none",
          marginLeft: "8px", // Add spacing between logo and button
        }}
        // onClick={() => setCollapsed(!collapsed)} // Toggle the collapsed state
      >
        <div
          style={{
            width: "24px",
            height: "2px",
            backgroundColor: "black",
            borderRadius: "2px",
          }}
        />
        <div
          style={{
            width: "24px",
            height: "2px",
            backgroundColor: "black",
            borderRadius: "2px",
          }}
        />
        <div
          style={{
            width: "24px",
            height: "2px",
            backgroundColor: "black",
            borderRadius: "2px",
          }}
        />
      </button>
      <AcmeIconMobile />
    </div>
  );
};
