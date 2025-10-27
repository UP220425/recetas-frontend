import React, { useState, useEffect } from "react";

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navStyle = {
    width: "100%",
    height: isMobile ? 60 : 70,
    background: "linear-gradient(90deg, #ff7b4d, #e4572e)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `0 ${isMobile ? 16 : 32}px`,
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    boxShadow: "0 4px 18px rgba(0,0,0,0.15)",
    transition: "padding 0.3s ease, height 0.3s ease",
  };

  const brandStyle = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "#fff",
    fontWeight: 700,
    fontSize: isMobile ? 18 : 22,
    letterSpacing: "0.5px",
    whiteSpace: "nowrap",
  };

  const actionsStyle = {
    display: isMobile ? "none" : "flex",
    alignItems: "center",
    gap: 20,
    color: "#fff",
    fontWeight: 500,
  };

  const linkButtonStyle = {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: 16,
    cursor: "pointer",
    padding: "8px 12px",
    borderRadius: 6,
    transition: "background 0.2s",
  };

  const hamburgerStyle = {
    display: isMobile ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: 8,
    background: "rgba(255,255,255,0.1)",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontSize: 22,
  };

  const mobileMenuStyle = {
    position: "fixed",
    top: 60,
    left: 0,
    right: 0,
    background: "linear-gradient(180deg, rgba(255,123,77,0.98), rgba(228,87,46,0.98))",
    display: open ? "flex" : "none",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px 0",
    gap: 12,
    boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
    transition: "all 0.3s ease-in-out",
    zIndex: 999,
  };

  const mobileLinkStyle = {
    color: "#fff",
    background: "rgba(255,255,255,0.15)",
    border: "none",
    borderRadius: 6,
    fontSize: 16,
    padding: "10px 20px",
    width: "85%",
    textAlign: "center",
    cursor: "pointer",
    transition: "background 0.2s",
  };

  return (
    <>
      <nav style={navStyle}>
        <div style={brandStyle}>
          <span style={{ fontSize: isMobile ? 22 : 26 }}>🍳</span>
          <span>Delicias Caseras</span>
        </div>

        <div style={actionsStyle}>
          <button
            type="button"
            style={linkButtonStyle}
            onClick={() => window.scrollTo(0, 0)}
          >
            Recetas
          </button>
          <button
            type="button"
            style={linkButtonStyle}
            onClick={() => alert("Sección próximamente disponible 😋")}
          >
            Acerca de
          </button>
        </div>

        <button
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={hamburgerStyle}
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Menú desplegable móvil */}
      <div style={mobileMenuStyle}>
        <button
          type="button"
          style={mobileLinkStyle}
          onClick={() => {
            window.scrollTo(0, 0);
            setOpen(false);
          }}
        >
          Recetas
        </button>
        <button
          type="button"
          style={mobileLinkStyle}
          onClick={() => {
            alert("Sección próximamente disponible 😋");
            setOpen(false);
          }}
        >
          Acerca de
        </button>
      </div>
    </>
  );
}

export default Navbar;
