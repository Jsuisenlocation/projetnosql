import React from "react";
import Repas from "./Repas";


export default function ListeRepas({ mealData }) {
  const nutriments = mealData.nutrients;
  //affiche une liste contenant les diffentes infos récupéré  a partir des datas, toFixed sert a ignorer les décimales
  return (
    <main>
      <section className="nutriments">

        <h1>Macros</h1>
        <ul>
          <li>Calories: {nutriments.calories.toFixed(0)}</li>
          <li>Glucides: {nutriments.carbohydrates.toFixed(0)}</li>
          <li>Lipides: {nutriments.fat.toFixed(0)}</li>
          <li>Protéines: {nutriments.protein.toFixed(0)}</li>
        </ul>
      </section>

      <section className="repas">
        {mealData.meals.map((repas) => {
          return <Repas key={repas.id} repas={repas} />;//permet de générer 3 repas, a partir de mealdata, on regards le meals et pour chaque meals on attribue un id
        })}
      </section>
    </main>
  );
}
