import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import LoginModal from "../components/LoginModal";
import Navbar from "../components/Navbar";
import "../index.css";

const recipes = [
  {
    id: 1,
    title: "Spaghetti a la Boloñesa",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=90",
    time: "35 min",
    rating: 4.6,
  },
  {
    id: 2,
    title: "Tacos al Pastor",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/07/Tacos_al_pastor%2C_taco_de_panza.jpg",
    time: "25 min",
    rating: 4.8,
  },
  {
    id: 3,
    title: "Hamburguesa Casera",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=90",
    time: "30 min",
    rating: 4.7,
  },
  {
    id: 4,
    title: "Enchiladas Verdes",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/1b/Enchiladas_verdes_en_Tonatico.jpg",
    time: "40 min",
    rating: 4.5,
  },
  {
    id: 5,
    title: "Chilaquiles Rojos",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/56/Chilaquiles_rojos_con_pollo.jpg",
    time: "20 min",
    rating: 4.4,
  },
  {
    id: 6,
    title: "Pizza Margarita",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f9/Margarita_Pizza_from_Pizza_Express.jpg",
    time: "18 min",
    rating: 4.9,
  },
  {
    id: 7,
    title: "Sushi Variado",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/VariadoSushi.jpg",
    time: "50 min",
    rating: 4.8,
  },
  {
    id: 8,
    title: "Brownies de Chocolate",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/Brownie_IMG_001.jpg",
    time: "45 min",
    rating: 4.9,
  },
  {
    id: 9,
    title: "Ceviche Peruano",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=90",
    time: "20 min",
    rating: 4.8,
  },
];

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [query, setQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setShowLogin(true);
  };

  const openLogin = () => {
    setSelectedRecipe(null);
    setShowLogin(true);
  };

  const filtered = recipes.filter((r) =>
    r.title.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div
        className="container"
        style={{
          paddingTop: isMobile ? 90 : 100,
          paddingLeft: isMobile ? 12 : 28,
          paddingRight: isMobile ? 12 : 28,
        }}
      >
        {/* Texto superior */}
        <header
          className="topbar"
          style={{
            paddingTop: isMobile ? 6 : 12,
            paddingBottom: isMobile ? 6 : 14,
            marginBottom: 12,
          }}
        >
          <p
            className="subtitle"
            style={{
              margin: 0,
              fontSize: isMobile ? 13 : 15,
              color: "#666",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            Recetas reales, fotos reales — cocina con confianza
          </p>
        </header>

        {/* Sección superior con buscador */}
        <section
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 12,
            alignItems: isMobile ? "stretch" : "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div style={{ textAlign: isMobile ? "center" : "left" }}>
            <h2 style={{ margin: "0 0 6px 0", fontSize: isMobile ? 18 : 22 }}>
              Explora recetas destacadas
            </h2>
            <p
              style={{
                margin: 0,
                color: "#666",
                fontSize: isMobile ? 13 : 14,
              }}
            >
              Haz click en una receta para ver más (se pedirá iniciar sesión).
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 8,
              alignItems: isMobile ? "stretch" : "center",
              justifyContent: isMobile ? "center" : "flex-end",
              marginTop: isMobile ? 8 : 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#fff",
                padding: "6px 8px",
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.05)",
                width: isMobile ? "100%" : 320,
              }}
            >
              <input
                aria-label="Buscar recetas"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar recetas, ej. pizza, tacos..."
                style={{
                  border: "none",
                  outline: "none",
                  padding: "8px 6px",
                  fontSize: 14,
                  flex: 1,
                  background: "transparent",
                }}
              />
              <button
                style={{
                  background: "#e4572e",
                  color: "#fff",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: 8,
                  fontWeight: 700,
                  cursor: "default",
                }}
              >
                Buscar
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: isMobile ? "center" : "flex-end",
                gap: 8,
                marginTop: isMobile ? 8 : 0,
              }}
            >
              <button
                onClick={openLogin}
                aria-label="Explorar"
                style={{
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid rgba(0,0,0,0.06)",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                🔎
              </button>

              <button
                onClick={openLogin}
                aria-label="Favoritos"
                style={{
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid rgba(0,0,0,0.06)",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                ❤️
              </button>

              <button
                onClick={openLogin}
                aria-label="Entrar"
                style={{
                  padding: "8px 12px",
                  borderRadius: 10,
                  border: "none",
                  background: "#222",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Entrar
              </button>
            </div>
          </div>
        </section>

        {/* Grilla de recetas */}
        <main>
          <section className="recipes-section">
            <div
              className="recipes-grid"
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(auto-fill, minmax(250px, 1fr))",
                gap: isMobile ? 12 : 20,
              }}
            >
              {filtered.map((r) => (
                <RecipeCard
                  key={r.id}
                  recipe={r}
                  onOpen={() => handleOpenRecipe(r)}
                />
              ))}

              <article
                className="recipe-card"
                onClick={() =>
                  handleOpenRecipe({ id: "more", title: "Más recetas" })
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    handleOpenRecipe({ id: "more", title: "Más recetas" });
                }}
                aria-label="Ver más recetas"
                style={{
                  minHeight: 220,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "linear-gradient(180deg, #fff8f6, #fff)",
                  borderRadius: 12,
                  cursor: "pointer",
                }}
              >
                <div style={{ textAlign: "center", padding: 12 }}>
                  <div
                    style={{ fontSize: 34, color: "#e4572e", fontWeight: 800 }}
                  >
                    ＋
                  </div>
                  <h3 style={{ margin: "8px 0 4px", color: "#e4572e" }}>
                    Ver más
                  </h3>
                  <p style={{ margin: 0, color: "#777", fontSize: 14 }}>
                    Explora más recetas
                  </p>
                </div>
              </article>
            </div>
          </section>
        </main>

        {showLogin && (
          <LoginModal
            recipe={selectedRecipe}
            onClose={() => setShowLogin(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
