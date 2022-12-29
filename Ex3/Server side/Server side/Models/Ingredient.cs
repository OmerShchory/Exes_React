using Server_side.Models.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Server_side.Models
{
    public class Ingredient
    {
        int id;
        string name;
        string image;
        int calories;

        public Ingredient()
        {
        }

        public Ingredient(string name, string image, int calories)
        {
            this.Name = name;
            this.Image = image;
            this.Calories = calories;
        }

        public Ingredient(int id, string name, string image, int calories)
        {
            this.Id = id;
            this.Name = name;
            this.Image = image;
            this.Calories = calories;
        }

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Image { get => image; set => image = value; }
        public int Calories { get => calories; set => calories = value; }

        public Ingredient insert()
        {
            DataServices db = new DataServices();
            return db.insertIngredient(this);
        }

        public List<Ingredient> ReadAll()
        {
            DataServices db = new DataServices();
            return db.ReadIngredients();
        }
    }
}