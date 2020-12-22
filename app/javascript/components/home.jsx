import React from "react";
import { Link } from "react-router-dom";
import { getToken } from '../utils/common.js';

export default() => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Food Recipes</h1>
        <p className="lead">
          A curated list of recipes for the best homemade meal and delicacies.
        </p>
        <hr className="my-4" />
        <Link to="/recipes" className="btn btn-lg custom-button mr-2" role="button">
          View Recipes
        </Link>
        <Link to="/login" className="btn btn-lg custom-button mr-2" role="button">
          Login
        </Link>
        <Link to="/qrcode" className="btn btn-lg custom-button mr-2" role="button">
          Qrcode
        </Link>
        <Link to="/enable_tfa" className="btn btn-lg custom-button mr-2" role="button">
          Enable 2FA
        </Link>
        <Link to="/logout" className="btn btn-lg custom-button mr-2" role="button">
          Log out
        </Link>
      </div>
    </div>
  </div>
)
