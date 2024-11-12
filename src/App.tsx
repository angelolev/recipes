// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { collection, getDocs } from "firebase/firestore";
import { db } from "./utils/firebase";
import { useEffect, useState } from "react";
import { IRecipe } from "./types/recipe";

function App() {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const querySnapshot = await getDocs(collection(db, "recipes"));
      const recipesList: IRecipe[] = [];
      querySnapshot.forEach((doc) => {
        recipesList.push({ id: doc.id, ...doc.data() });
      });
      setRecipes(recipesList);
    };

    fetchRecipes();
  }, []);

  return (
    <section className="container mx-auto px-6">
      <h1 className="text-3xl my-6 text-center font-bold">Lista de recetas</h1>
      <div className="list grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((item) => (
          <div className="shadow-lg p-6" key={item.id}>
            <h3 className="font-bold text-2xl mb-4">{item.title}</h3>
            <p className="text-base">{item.description}</p>
            <h4 className="my-2 font-semibold underline">Ingredientes</h4>
            <ul className="list-disc pl-10">
              {item.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
            <h4 className="my-2 font-semibold underline">Preparación</h4>
            <ol className="list-decimal pl-10">
              {item.preparation.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;
