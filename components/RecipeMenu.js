import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { getRecipes } from "@/utils/request";

const RecipeMenu = ({userId}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { isLoading, isError, data: recipes, error } = useQuery(['recipes', userId], () => getRecipes(userId));

  useEffect(() => {
	console.log(recipes);

  }, [recipes]);

  const items = [
    { imgSrc: 'https://anyonecancook.s3.us-east-2.amazonaws.com/img_ramen.png' },
    { imgSrc: 'https://anyonecancook.s3.us-east-2.amazonaws.com/img_cake.png'},
    { imgSrc: 'https://anyonecancook.s3.us-east-2.amazonaws.com/img_friedrice.png' },
	{ imgSrc: 'https://anyonecancook.s3.us-east-2.amazonaws.com/img_quiche.png'},
	{ imgSrc: 'https://anyonecancook.s3.us-east-2.amazonaws.com/img_hamburger.png' },
	{ imgSrc: 'https://anyonecancook.s3.us-east-2.amazonaws.com/img_steak.png'},
];

return (
  <div className="recipe-menu" style={{
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'left',
	zIndex: '1',
	position: 'absolute',
	top: '-2%',
	left: '12%',
  }}>
	<button onClick={() => setIsExpanded(!isExpanded)} style={{
	border: '2px solid pink',
	background: 'white',
	borderRadius: '10px',
	padding: '7px 10px',
	width: '110px',
  }}>
  		My Recipes
	  {isExpanded ? ' ↑ ' : ' ↓ '}
	</button>

    {selectedRecipe !== null && !isExpanded && (
        <div className="selected-recipe" style={{ width: '120%', height: '120%' }}>
          <img src={items[selectedRecipe].imgSrc} style={{ width: '100%', borderRadius: '20px', border: '5px solid black' }} onClick={() => {
					setSelectedRecipe(null);}}/>
		  <img
            src={'images/overlay.png'}
            alt="overlay"
            style={{
			  padding: '10px',
			  marginLeft: '45%',
              position:'absolute',
              bottom: '0',
			  left: '0',
              width: '80%',
              height: '80%',
              objectFit: 'cover',
            }}
          	/>

			<div className="recipe-text" style={{
				position:'absolute',
				border: '2px solid pink',
				background: 'white',
				borderRadius: '10px',
				top: '10%',
				left: '124%',
				display: 'flex',
				flexDirection: 'column',
				width: '90%',
				height: '80%',
				paddingTop: 100,
				paddingLeft: 20,
				paddingRight: 20,

			}}>
				<h1 style={{position: 'relative'}}>
					{recipes[selectedRecipe].name}
				</h1>
				{recipes[selectedRecipe].steps.map((step, index) => {
					return (
						<p style={{color: 'black'}} key={index}>{step}</p>
					);
				})}

			</div>
		</div>
      )}

	{isExpanded && (
	  <div className="grid-container" style={{
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		gridTemplateRows: 'repeat(3, 1fr)',
		gridgap: '10px',
		marginTop: '10px'
	  }}>
		{recipes && recipes.map((item, index) => (
		  <div key={index} className="grid-item" style={{
			width: '120px',
			height: '120px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		  }}>
			  <img
				onClick={() => {
					setSelectedRecipe(index);
					setIsExpanded(false);
				}}
				src={items[index].imgSrc}
				style={{
					border: selectedRecipe === index ? '4px solid pink' : '4px solid white',
					borderRadius: '10px',
				}}
				/>
		  </div>
		))}
	  </div>
	)}
</div>
);
};

export default RecipeMenu;