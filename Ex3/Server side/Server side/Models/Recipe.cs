using Server_side.Models.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Server_side.Models
{
    public class Recipe
    {
        int id;
        string name;
        string image;
        int time;
        string cookingMethod;
        List<Ingredient> ingredients;

        public Recipe() { }

        public Recipe(string name, string image, int time, string cookingMethod, List<Ingredient> ingredients)
        {
            this.Name = name;
            this.Image = image;
            this.Time = time;
            this.CookingMethod = cookingMethod;
            this.Ingredients = ingredients;
        }

        public Recipe(int id, string name, string image, int time, string cookingMethod, List<Ingredient> ingredients)
        {
            this.Id = id;
            this.Name = name;
            this.Image = image;
            this.Time = time;
            this.CookingMethod = cookingMethod;
            this.Ingredients = ingredients;
        }

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Image { get => image; set => image = value; }
        public int Time { get => time; set => time = value; }
        public string CookingMethod { get => cookingMethod; set => cookingMethod = value; }
        public List<Ingredient> Ingredients { get => ingredients; set => ingredients = value; }

        public Recipe insert()
        {
            DataServices db = new DataServices();
            return db.insertRecipe(this);
        }

        public List<Recipe> ReadAll()
        {
            DataServices db = new DataServices();
            return db.ReadRecipes();
        }

    }
}