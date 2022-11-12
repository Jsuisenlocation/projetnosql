import React, { useState, useEffect } from "react";//useEffect qui servira a afficher les images


export default function Repas({ repas }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {//utilise une fonction pour afficher l'image du repas en fonction de l'id du repas que l'on a recup
    fetch(
      `https://api.spoonacular.com/recipes/${repas.id}/information?apiKey=3fbe15356d1b4dd085cdacecf1df436f&includeNutrition=false`
    )
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.image);
      })
      .catch(() => {
        console.log("error");
      });
  }, [repas.id]);


// generation de la manière dont on affichera les données du menu
  return (
    <article>
      <h1>{repas.title}</h1>
      <img src={imageUrl} alt="Recette"/>
      <ul className="instructions">
        <li>Temps de préparation : {repas.readyInMinutes} minutes</li>
        <li>Nombre de portions : {repas.servings}</li>
      </ul>
      <a href={repas.sourceUrl}>Aller voir la recette</a>
    </article>
    
  );
}

