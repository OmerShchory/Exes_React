import { Component } from 'react'
import {data} from '../Assets/data'
import Recipes from '../Functional Components/Recipes';
import {Ingredient} from '../Classes/Ingredient'
import {DishRecipe} from '../Classes/DishRecipe'


export default class MyKitchen extends Component {
    constructor(props) {
    super(props);
    this.ingredients = [];
    this.state = {
        recipes: [],
        ready_to_eat : [],
        counter_recipes: 0,
        counter_ready: 0
    }  
}
    componentDidMount = () => {
        this.CreateDishes();
}

     CreateDishes = () => {
        data.map(item=>this.ingredients.push(new Ingredient(item.id, item.name, item.image, item.calories)));
        const pad_thai_ingr = [this.ingredients[0], this.ingredients[1], this.ingredients[2], this.ingredients[3]];
        const chop_suey_ingr = [this.ingredients[0], this.ingredients[1]];
        const pho_ingr = [this.ingredients[2], this.ingredients[3]];

        const pad_thai =  new DishRecipe (1, "Pad Thai", pad_thai_ingr, 60, "stir-fry dish, mix all ingredients together", "https://glebekitchen.com/wp-content/uploads/2016/11/easypadthaibowltop-1-500x500.jpg");
        const chop_suey =  new DishRecipe (2, "Chop Suey", chop_suey_ingr, 40, "5 minute stir fry,add each vegetable in the order in which they cook.", "https://kirbiecravings.com/wp-content/uploads/2020/04/chop-suey-5.jpg");
        const pho =  new DishRecipe (3, "Pho", pho_ingr, 30, "slow-cooked soup", "https://www.fodmapeveryday.com/wp-content/uploads/2017/06/Pho-closeup-copy-855x570.jpg");
       
        const newRecipes = [...this.state.recipes, pad_thai, chop_suey, pho];
        this.setState({recipes : newRecipes, counter_recipes: newRecipes.length});          
} 
    changeRecipes = (recipe) =>{
        const newRecipes = this.state.recipes.filter(rec=>rec.id !== recipe.id);
        this.setState({recipes: newRecipes, counter_recipes: this.state.counter_recipes -1});
        this.setState({ready_to_eat: [...this.state.ready_to_eat, recipe], counter_ready: this.state.counter_ready +1});
    }

    changeMadeRecipes = (recipe) => {
        const newRecipes = this.state.ready_to_eat.filter(rec=>rec.id !== recipe.id);
        this.setState({ready_to_eat: newRecipes, counter_ready: this.state.counter_ready -1});
        this.setState({recipes: [...this.state.recipes, recipe], counter_recipes: this.state.counter_recipes +1});
    }


  render() {
    return (
      <div>
        {/* Recipes */}
        <Recipes recipes={this.state.recipes} title={"Recipes"} btnText={"Prepare dish!"} clickEvent={this.changeRecipes} counter={this.state.counter_recipes} btnColor={"btn-outline-primary"}/>  
        {/* Recipes ready to eat */}
        <Recipes recipes={this.state.ready_to_eat} title={"Ready to EAT!"} btnText={"eat!"} clickEvent={this.changeMadeRecipes} counter={this.state.counter_ready} btnColor={"btn-outline-danger"}/> 

      </div>
    
    )
  }
}
