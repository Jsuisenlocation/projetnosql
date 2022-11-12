import React, { useState } from "react"; /*Hook qui permet d’ajouter l’état local React à des fonctions composants*/
import ListeRepas from "./ListeRepas";  //liaision avec MealList afin de gardé une trace des repas
import axios from 'axios';


function App() {
  const [mealData, setMealData] = useState(null); //constante prenant l'etat du Hook useState
  const [calories, setCalories] = useState(2000);
  const [diet, setDiet] = useState(null);
  const [User, setUser] = useState(null);
  const [select, setSelect] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [readyInMinutes, setreadyInMinutes] = useState("");
  const [servings, setservings] = useState("");
  const [sourceUrl, setsourceUrl] = useState("");
  const [title, setTitle] = useState("");
  const [select2, setSelect2] = useState([{prot_total : 0, gluc_total : 0, lip_total : 0}]);

  var i = 0;

  function getMealData() {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=3fbe15356d1b4dd085cdacecf1df436f&timeFrame=day&diet=${diet}&targetCalories=${calories}`// a changer en fonction de ma clé api
    )
      .then((response) => response.json())//recupération des données 
      .then((data) => {
        setMealData(data);  //enregistrement des données dans setMealData
      })
      .catch(() => {          //si on ne recupere pas les informations
        console.log("error");
      });
  }


  function handleChange(e) {
    setCalories(e.target.value);  //met calories a la valeur de setCalories dans le input plus bas
  }

  function handleChange2(e) {
    setDiet(e.target.value);  
  }

  function handleChange3(e) {
    setUser(e.target.value);  
  }

  function save(id1,id2,id3,id4,id5,id6,id7) {
    
    axios
    .get("http://127.0.0.1:8080/save/"+id1+"/"+id2+"/"+id3+"/"+id4+"/"+id5+"/"+id6+"/"+id7)
    .then((res) => console.log(res.data));
    
  }

  function affiche() {
    
    axios
    .get("http://127.0.0.1:8080/select/"+User)
    .then((res) => setSelect(res.data));
    AfficheSave(select[i].identifiant);
  }



  
  function affiche2() {
    
    axios
    .get("http://127.0.0.1:8080/select2")
    .then((res) => setSelect2(res.data));
    console.log(select2);
    
  }


  function loop(){
    const id1 = mealData.meals[0].id
    const id2 = mealData.meals[1].id
    const id3 = mealData.meals[2].id
    const id4 = User
    const id5 = mealData.nutrients.protein.toFixed(0)
    const id6 = mealData.nutrients.carbohydrates.toFixed(0)
    const id7 = mealData.nutrients.fat.toFixed(0)
    save(id1, id2, id3, id4, id5, id6, id7);
  }

  function AfficheSave(selected) {//utilise une fonction pour afficher l'image du repas en fonction de l'id du repas que l'on a recup
    fetch(
      `https://api.spoonacular.com/recipes/${selected}/information?apiKey=3fbe15356d1b4dd085cdacecf1df436f&includeNutrition=false`
    )
      .then((response) => response.json())
      .then((data) => { 
        setImageUrl(data.image);
        setTitle(data.title);
        setservings(data.servings);
        setsourceUrl(data.sourceUrl);
        setreadyInMinutes(data.readyInMinutes);
      })
      .catch(() => {
        console.log("error");
      });
     
  }


  function it(){
    i = i+1;
    console.log(i);
  }



  return (
    <div className="App">
      <section className="controles">
        <input
          type="number"
          placeholder="Inserer les Calories"  // reclame un nombre jusqu'a 2000 calories
          onChange={handleChange}
        />
        <input
          type="string"
          placeholder="regime alimentaire"  
          onChange={handleChange2}
        />
        <input
          type="string"
          placeholder="Pseudo"  
          onChange={handleChange3}
        />

        <h1>Les consommations total de nutriments sont de : {select2[0].prot_total} proteines, {select2[0].gluc_total} glucides, {select2[0].lip_total} lipides !</h1>
        <button onClick={getMealData}>Générer des recettes !</button> 
        <button onClick={() => { loop(); affiche2();}}>Sauvegarger les recettes !</button>
        <button onClick={affiche}>Afficher les recettes sauvegarder !</button>
        <button onClick={it}>Suivant</button>
      </section>

      <article>
      <h1>{title}</h1>
      <img src={imageUrl} alt="Recette"/>
      <ul className="instructions">
        <li>Temps de préparation : {readyInMinutes} minutes</li>
        <li>Nombre de portions : {servings}</li>
      </ul>
      <a href={sourceUrl}>Aller voir la recette</a>
      </article>

      {mealData && <ListeRepas mealData={mealData} />}
    </div>
    
  );  //si on a des datas on affiche les repas selon une MealList défini dans le fichier respectif
}

export default App;
