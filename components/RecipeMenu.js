import React, { useState } from 'react';

const RecipeMenu = ({userId}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const items = [
    { imgSrc: 'https://anyonecancook.s3.us-east-2.amazonaws.com/img_ramen.png' },
    { imgSrc: 'https://anyonecancook.s3.us-east-2.amazonaws.com/img_steak.png'},
    { imgSrc: 'https://anyonecancook.s3.us-east-2.amazonaws.com/img_sushi.png'},
    { imgSrc: 'https://anyonecancook.s3.us-east-2.amazonaws.com/img_cake.png'},
    { imgSrc: 'https://anyonecancook.s3.us-east-2.amazonaws.com/img_hamburger.png' },
    { imgSrc: 'https://anyonecancook.s3.us-east-2.amazonaws.com/img_friedrice.png' },
];

return (
  <div className="recipe-menu" style={{
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'left',
	zIndex: '1',
	position: 'absolute',
	top: '0',
	left: '15%',
  }}>
	<button onClick={() => setIsExpanded(!isExpanded)} style={{
	border: '2px solid white',
	borderRadius: '10px',
	padding: '7px 10px',
	width: '110px',
  }}>
  		My Recipes
	  {isExpanded ? ' ↑ ' : ' ↓ '}
	</button>

    {selectedRecipe !== null && !isExpanded && (
        <div className="selected-recipe" style={{ width: '100%' }}>
          <img src={items[selectedRecipe].imgSrc} style={{ width: '100%' }} onClick={() => {
					setSelectedRecipe(null);}}/>
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
		{items.map((item, index) => (
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
				src={item.imgSrc}
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