window.onload = function() {
  var searchFiled = document.querySelector('.field-search')
  var btnSearch = document.querySelector('.src-btn')
  btnSearch.addEventListener("click", searchBtn)

  function searchBtn() {
    var filterResults = document.querySelector('.filter-results')
    fetchSearchMeal(searchFiled.value).then(function(data) {
      for (var i = 0; i < 4 && i < data.meals.length; ++i) {
        filterResults.innerHTML = filterResults.innerHTML + createMealCard(data.meals[i], 6)
      }
    })
  }

  var categoryMeal = document.getElementById('mealCategory')
  fetchCategoryMeal().then(function(data) {
    for (var i = 0; i < data.categories.length; ++i) {
      var option = document.createElement('option')
      option.value = option.text = data.categories[i].strCategory
      categoryMeal.add(option)
    }
  })

  var areaMeal = document.getElementById('areaCategory')
  fetchAreaMeal().then(function(data) {
    for (var i = 0; i < data.meals.length; ++i) {
      var option = document.createElement('option')
      option.value = option.text = data.meals[i].strArea
      areaMeal.add(option)
    }
  })

  var ingredientsMeal = document.getElementById('ingredients')
  fetchIngredients().then(function(data) {
    for (var i = 0;i < 20 && i < data.meals.length; ++i) {
      var cbIngredients = '<div class="form-check">' +
        '<input class="form-check-input" type="checkbox" value="' + data.meals[i].strIngredient  + ' " id="defaultCheck1">' +
        '<label class="form-check-label" for="defaultCheck1">' + data.meals[i].strIngredient +
        '</label>' +
        '</div>'
        ingredientsMeal.innerHTML = ingredientsMeal.innerHTML + cbIngredients
    }
  })

}
