
import React from "react";

function RecipeCard({ recipe, onOpen }) {
  return (
    <article
      className="recipe-card"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen();
      }}
      aria-label={`Abrir ${recipe.title}`}
    >
      <div className="image-wrap">
        <img src={recipe.image} alt={recipe.title} loading="lazy" />
        <div className="card-overlay">
          <div className="meta">
            <span className="chip">{recipe.time}</span>
            <span className="chip">⭐ {recipe.rating}</span>
          </div>
          <h3 className="card-title">{recipe.title}</h3>
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;
