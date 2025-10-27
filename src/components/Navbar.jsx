
import React from "react";

const navStyle = {
  width: "100%",
  height: 70,
  background: "linear-gradient(90deg, #ff7b4d, #e4572e)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 30px",
  boxShadow: "0 4px 18px rgba(0,0,0,0.16)",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1000,
  boxSizing: "border-box",
};

const brandStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  color: "white",
  fontWeight: 700,
  fontSize: 22,
  letterSpacing: "0.5px",
  whiteSpace: "nowrap",
};

const actionsStyle = {
  display: "flex",
  alignItems: "center",
  gap: 16,
  color: "white",
  fontWeight: 500,
  fontSize: 16,
};

const linkButtonStyle = {
  background: "transparent",
  border: "none",
  color: "white",
  fontSize: 16,
  cursor: "default", // los botones no hacen nada
  padding: "8px 12px",
  borderRadius: 8,
  outline: "none",
  minWidth: 72,
  whiteSpace: "nowrap", // evita que el texto se corte
  textAlign: "center",
};

function Navbar() {
  return (
    <nav style={navStyle} role="navigation" aria-label="Main navigation">
      <div style={brandStyle}>
        <span style={{ fontSize: 26 }}>🍳</span>
        <span>Delicias Caseras</span>
      </div>

      <div style={actionsStyle}>
        <button
          type="button"
          style={linkButtonStyle}
          aria-label="Recetas"
          onClick={() => {}}
        >
          Recetas
        </button>

        <button
          type="button"
          style={linkButtonStyle}
          aria-label="Acerca de"
          onClick={() => {}}
        >
          Acerca de
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
