import React from "react";
import {Link} from "react-router-dom";
import { getToken } from '../utils/common';

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    }
  }

  fetchData() {
    const url = "http://localhost:3001/recipes";
    const authorize = "Bearer " + getToken();
    const headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": authorize
    });
    fetch(url, {
      method: "get",
      headers
    })
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then(response => {
        this.setState({recipes: response});
      })
      .catch(() => this.props.history.push("/"));
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { recipes } = this.state;
    const image_host = "http://localhost:3001/";
    const allRecipes = recipes.map((recipe, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <img src={image_host + recipe.image}
            className="card-img-top"
            alt={`${recipe.name} image`}/>
          <div className="card-body">
            <h5 className="card-title">{recipe.name}</h5>
            <Link to={`/recipe/${recipe.id}`} className="btn custom-button">
              View Recipe
            </Link>
          </div>
        </div>
      </div>
    ));
    const noRecipe = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No recipes yet. Why not <Link to="/new_recipe">create one</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">Recipes for every occasion</h1>
            <p className="lead text-muted">
              We’ve pulled together our most popular recipes, our latest
              additions, and our editor’s picks, so there’s sure to be something
              tempting for you to try.
            </p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/recipe" className="btn custom-button">
                Create New Recipe
              </Link>
            </div>
            <div className="row">
              {recipes.length > 0 ? allRecipes : noRecipe}
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }
}

export default Recipes;
