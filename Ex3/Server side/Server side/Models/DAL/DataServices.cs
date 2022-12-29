using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace Server_side.Models.DAL
{
    public class DataServices
    {
        //insert ingredient 
        public Ingredient insertIngredient(Ingredient ingredient)
        {
            SqlConnection con = Connect();
            // Create Command
            SqlCommand command = CreateinsertIngredientCommand(con, ingredient);
            // Execute
            int numaffected = command.ExecuteNonQuery();
            SqlCommand cmd = CreateCommand("SELECT MAX(id) FROM Ingredients", con);
            ingredient.Id = (int)cmd.ExecuteScalar();

            // Close Connection
            con.Close();
            return ingredient;
        }

        //insert recipe
        public Recipe insertRecipe(Recipe recipe)
        {
            SqlConnection con = Connect();
            // Create Command
            SqlCommand command = CreateinsertRecipeCommand(con, recipe);
            command.ExecuteNonQuery();
            SqlCommand cmd = CreateCommand("SELECT MAX(id) FROM Recipes", con);
            int recipeId = (int)cmd.ExecuteScalar();
            recipe.Id = recipeId;


            foreach (Ingredient ing in recipe.Ingredients)
            {
                command = CreateinsertIngredientInRecipeCommand(con, recipeId, ing.Id);
                command.ExecuteNonQuery();
            }
            // Close Connection
            con.Close();
            return recipe;
        }

        //read all the ingredients
        public List<Ingredient> ReadIngredients()
        {
            SqlConnection con = Connect();
            SqlCommand command = CreateReadCommand(con, "spReadAllIngredients");
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
            List<Ingredient> ingredients = new List<Ingredient>();

            while (dr.Read())
            {
                int id = Convert.ToInt32(dr["id"]);
                string name = dr["name"].ToString();
                string image = dr["image"].ToString();
                int calories = Convert.ToInt32(dr["calories"]);

                ingredients.Add(new Ingredient(id, name, image, calories));
            }

            con.Close();
            return ingredients;
        }

        //read all the recipes
        public List<Recipe> ReadRecipes()
        {
            SqlConnection con = Connect();
            SqlCommand command = CreateReadCommand(con, "spReadAllRecipes");
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
            List<Recipe> recipes = new List<Recipe>();

            while (dr.Read())
            {
                int id = Convert.ToInt32(dr["id"]);
                string name = dr["name"].ToString();
                string image = dr["image"].ToString();
                string cookingMethod = dr["cookingMethod"].ToString();
                int time = Convert.ToInt32(dr["time"]);
                List<Ingredient> ingredients = new List<Ingredient>();

                recipes.Add(new Recipe(id, name, image, time, cookingMethod, ingredients));
            }

            con.Close();
            con = Connect();

            foreach (Recipe recipe in recipes)
            {
                command = CreateReadIngredientsOfRecipeCommand(con, recipe.Id,"spReadIngredientsInRecipe");
                dr = command.ExecuteReader(CommandBehavior.CloseConnection);
                while (dr.Read())
                {
                    int id = Convert.ToInt32(dr["id"]);
                    string name = dr["name"].ToString();
                    string image = dr["image"].ToString();
                    int calories = Convert.ToInt32(dr["calories"]);
                    Ingredient ingredient = new Ingredient(id, name, image, calories);

                    recipe.Ingredients.Add(ingredient);
                }
            }

            con.Close();
            return recipes;
        }

        //create command general
        private SqlCommand CreateCommand(string command, SqlConnection con)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = command;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.Text; // the type of the command, can also be stored procedure

            return cmd;
        }

        //create Read command general
        private SqlCommand CreateReadCommand(SqlConnection con, string text)
        {
            SqlCommand command = new SqlCommand();
            command.CommandText = text;
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        //create read ingredients of recipe command
        private SqlCommand CreateReadIngredientsOfRecipeCommand(SqlConnection con,int recipeId, string text)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@recipeId", recipeId);
            command.CommandText = text;
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        //create insert ingredient in recipe command
        private SqlCommand CreateinsertIngredientInRecipeCommand(SqlConnection con, int recipeId, int ingredientId)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@recipeId", recipeId);
            command.Parameters.AddWithValue("@ingredientId", ingredientId);
            command.CommandText = "spInsertIngredientInRecipe";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        //create insert recipe command
        private SqlCommand CreateinsertRecipeCommand(SqlConnection con, Recipe recipe)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@name", recipe.Name);
            command.Parameters.AddWithValue("@image", recipe.Image);
            command.Parameters.AddWithValue("@cookingMethod", recipe.CookingMethod);
            command.Parameters.AddWithValue("@time", recipe.Time);
            command.CommandText = "spInsertRecipe";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        //create insert ingredient command
        private SqlCommand CreateinsertIngredientCommand(SqlConnection con, Ingredient ingredient)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@name", ingredient.Name);
            command.Parameters.AddWithValue("@image", ingredient.Image);
            command.Parameters.AddWithValue("@calories", ingredient.Calories);
            command.CommandText = "spInsertIngredient";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        // connect 
        private SqlConnection Connect()
        {
            // read the connection string from the web.config file
            string connectionString = WebConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;

            // create the connection to the db
            SqlConnection con = new SqlConnection(connectionString);

            // open the database connection
            con.Open();

            return con;
        }
    }
}