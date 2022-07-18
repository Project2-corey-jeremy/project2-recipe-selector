// Create app namespace
const recipeApp = {};

// Saving the base URL
recipeApp.apiURL = new URL("https://api.spoonacular.com/recipes/complexSearch");

// get recipe info method
recipeApp.getRecipeInfo = (result) => {

		console.log(result.results[Math.floor(Math.random() * result.results.length)]);

		// get recipe object and its instructions
		const recipe = result.results[Math.floor(Math.random() * result.results.length)];
		const recipeInstructions = recipe.analyzedInstructions[0];

		// display recipe title on page
		const recipeTitle = recipe.title;
		const titleElement = document.querySelector('.recipeTitle');
		titleElement.innerText = recipeTitle;


		// parse recipe instructions and display on page
		let parsedInstructions = ''
		for (let i = 0; i < recipeInstructions.steps.length; i++) {
			parsedInstructions += `${i + 1}.  ${recipeInstructions.steps[i].step} <br><br>`
		}

		const recipeElement = document.querySelector('.textContainer p')
		recipeElement.innerHTML = parsedInstructions

		// add recipe image to page
		let recipeImage = document.querySelector('.imgContainer img')
		recipeImage.src = recipe.image

};

// assign all user selections to the API query
recipeApp.getUserValues = (userSelect1, userSelect2) => {
	const userValue1 = userSelect1.options[userSelect1.selectedIndex].value
	const userValue2 = userSelect2.options[userSelect2.selectedIndex].value
	recipeApp.apiURL.search = new URLSearchParams({
		apiKey: '187c0eba5b0d4570b499b9d5f22c7a0a',
		includeIngredients: `${userValue1},${userValue2}`,
		addRecipeInformation: true,
		number: 10,
	});
}


// Attach an event handler to the Sumbit Button and prevent the default action of refreshing the page. Then Alert user if either dropdown ingredient has not been selected.
const button = document.querySelector('.buttonSubmit')
button.addEventListener('click', function(event){
	event.preventDefault()

	let firstSelection = document.querySelector("#ingredientSelector1")
	let secondSelection = document.querySelector("#ingredientSelector2")

	if (firstSelection.selectedIndex === 0 || secondSelection.selectedIndex === 0){
		
		alert('Please select an item from each dropdown list')

	} else {
		recipeApp.getUserValues (firstSelection, secondSelection)
		
		fetch(recipeApp.apiURL)
			.then((response) => {
				if (response) {
					return response.json()
				} //else {
				// 	throw new Error('something went wrong')
				// }
			})
			.then((result) => {
				console.log(result)
				recipeApp.getRecipeInfo(result)
			})
			// .catch((error) => {
			// 	if (error.message === "something went wrong") {
			// 		alert('No recipes found. Please select another combination!')
			// 	}
			// });
	
	}
	
});

recipeApp.init = () => {

};

// Inititalizing App
recipeApp.init();