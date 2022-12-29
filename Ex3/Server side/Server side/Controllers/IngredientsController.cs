using Server_side.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

namespace Server_side.Controllers
{
    public class IngredientsController : ApiController
    {

        public IHttpActionResult Post([FromBody] Ingredient ingredient)
        {
            try
            {
                Ingredient ing = ingredient.insert();
                return Ok(ing);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public IHttpActionResult Get()
        {
            try
            {
                Ingredient ing = new Ingredient();
                List<Ingredient> ingredients = ing.ReadAll();
                return Ok(ingredients);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}