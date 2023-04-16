import React, { useState } from 'react';
const RecipeModal = ({ onClose, recipe }) => (
	<div className="recipe-modal">
	  <h2>{recipe.name}</h2>
	  <h3>Ingredients</h3>
	  <ul>
		{recipe.ingredients.map((ingredient, index) => (
		  <li key={index}>{ingredient}</li>
		))}
	  </ul>
	  <h3>Steps</h3>
	  <ol>
		{recipe.steps.map((step, index) => (
		  <li key={index}>{step}</li>
		))}
	  </ol>
	  <button onClick={onClose}>Close</button>
	</div>
  );