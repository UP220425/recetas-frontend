import React, { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import LoginModal from "../components/LoginModal";
import Navbar from "../components/Navbar"; // 🔹 Agregada la barra superior
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

  const handleOpenRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setShowLogin(true);
  };

  return (
    <div>
      <Navbar />
      <div className="container">


        <header className="topbar" style={{ paddingTop: "90px" }}>
          <div className="brand">

            <p className="subtitle">
              Recetas reales, fotos reales — cocina con confianza
            </p>
          </div>
        </header>

        <main>
          <section className="recipes-section">
            <div className="recipes-grid">
              {recipes.map((r) => (
                <RecipeCard
                  key={r.id}
                  recipe={r}
                  onOpen={() => handleOpenRecipe(r)}
                />
              ))}

              {/* Card "Ver más" como si fuera receta; también pide inicio de sesión */}
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
              >
                <div
                  className="image-wrap"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 180,
                    background: "linear-gradient(180deg, #fff8f6, #fff)",
                  }}
                >
                  <div style={{ textAlign: "center", padding: 12 }}>
                    <div
                      style={{
                        fontSize: 34,
                        color: "#e4572e",
                        fontWeight: 800,
                      }}
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
