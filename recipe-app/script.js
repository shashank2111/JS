const mealsElement = document.getElementById('meals');
const favMealsContainerElement = document.getElementById('fav-meals-container')

getRandomMeal();
const meals = fetchFavMeals();


async function getRandomMeal() {
    const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/random.php'
    );
    const data = await response.json();
    const randomMeal = data.meals[0];

    addMeal(randomMeal, (random = true));
}

async function getMealById(mealId) {
    const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + mealId
    );
    const data = await response.json();
    const meal = data.meals[0];
    return meal
}

async function getMealBySearch(term) {
    const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=' + term
    );
    const data = await response.json();
    const meal = data.meals[0];
    addMeal(meal, false);
}

function addMeal(mealData, random = false) {
    const mealElement = document.createElement('div');
    // mealElement.id = mealData.idMeal
    mealElement.innerHTML = `
            <div class="meal-header">
                <div class="random"> <span>Recipe of Day</span> </div>
                <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
            </div>
            <div class="meal-body">
                <div class="meal-name"><span>${mealData.strMeal}</span></div>
                <div class="meal-favourites">
                    <button class="fav-btn">
                        <i class="far fa-heart" id="heart-${mealData.idMeal}"></i>
                    </button>
                </div>
            </div>    
        `;
    const heart_id = `heart-${mealData.idMeal}`;
    favBtnElement = mealElement.querySelector("#" + heart_id);
    favBtnElement.addEventListener('click', () => {
        if (favBtnElement.classList.contains('far')) {
            favBtnElement.classList.remove('far');
            favBtnElement.classList.add('fas');
            addMealToLS(mealData.idMeal)
        } else {
            favBtnElement.classList.add('far');
            favBtnElement.classList.remove('fas');
            removeMealFromLS(mealData.idMeal)
        }
        fetchFavMeals()
    });

    mealsElement.appendChild(mealElement);
}

function addMealToLS(mealId) {
    const mealIds = getMealsFromLS();
    if (localStorage.mealIds == undefined || !localStorage.mealIds.includes(mealId)) {
        localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
    }
}

function removeMealFromLS(mealId) {
    let mealIds = getMealsFromLS();
    mealIds = mealIds.filter((id) => id !== mealId);
    localStorage.setItem('mealIds', JSON.stringify(mealIds));
}

function getMealsFromLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
    return mealIds == null ? [] : mealIds;
}

async function fetchFavMeals() {
    favMealsContainerElement.innerHTML = ""

    const mealIds = getMealsFromLS();

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        const meal = await getMealById(mealId);
        addMealToFav(meal)
    }
    
}


function addMealToFav(mealData) {

    favMealElement = document.createElement('div');
    inner_html = `
        <div class="fav-meal">
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
            <p>${mealData.strMeal}</p>
        </div>
    `;
    favMealElement.innerHTML = inner_html
    favMealsContainerElement.appendChild(favMealElement)

}