# Happy Hour

## Cocktail Database

**Visit [Happy Hour](https://shahrene.github.io/Happy-Hour/)**

It's the final week of WDI, its been a long 3 months, so its time for a drink... **BUT WHAT TO HAVE?!?**

Luckily, the Happy Hour app has heaps of suggestions - search by name if you know what the drink is called or
by ingredient if you just have a bottle of something and need some inspiration. If you want fate to handle your selection, there's a random search too!

Each drink has a recipe and you can select *Show Recipe* for the drink you want.

## Tech Used

* ES6, HTML, CSS
* The brilliant [Cocktail Database](https://www.thecocktaildb.com/)
* [React.js](https://reactjs.org/)
* [Node.js](https://nodejs.org/en/)
* DT's awesome [react starter](https://github.com/epoch/webpack3-react-starter)
* [Giphy](https://giphy.com/) for my loading animation

## Approach

I designed the app mobile first because I thought that people would be more likely to use it on the mobile.

I chose the API and chose three different searches I thought were useful. I created the buttons and added events to each which then either made the API call or dropped down in an input box.

The search by ingredient sent back only the name, id and photo of the drink, so the Recipe info is checked for when the *Show Recipe* link is clicked and if it is not fetched a further call is made based on the id.

I found the API was slow to return results so I found a gif to play while the results are loading.


## Next Steps

* Refactor my code into more components
* Toggle Hide Recipe
* Have a database which stores cocktails that have been searched
* Maybe include a 'bars near me' search using a different API

![App1](Screenshot1.png)  ![App2](Screenshot2.png)
