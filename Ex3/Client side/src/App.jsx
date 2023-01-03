import "./App.css";
import { Routes, Route } from "react-router-dom";
import NewNavbar from "./Components/NewNavbar";
import MyKitchen from "./Components/MyKitchen";
import IngredientForm from "./Components/IngredientForm";
import RecipeForm from "./Components/RecipeForm";
import NotFound from "./Components/NotFound";

function App() {
  return (
    <div id="main">
      <NewNavbar />
      <Routes>
        <Route path="/recipe" element={<RecipeForm />} />
        <Route path="/ingredient" element={<IngredientForm />} />
        <Route path="/" element={<MyKitchen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
