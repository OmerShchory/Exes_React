using Server_side.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace Server_side.Controllers
{
    public class RecipesController : ApiController
    {
        public IHttpActionResult Post([FromBody] Recipe recipe)
        {
            try
            {
                Recipe rec = recipe.insert();
                return Ok(rec);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public IHttpActionResult Get()
        {
            try
            {
                Recipe rec = new Recipe();
                List<Recipe> recipes = rec.ReadAll();
                return Ok(recipes);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}