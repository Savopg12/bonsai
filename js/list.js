window.onload = function () {
  var searchFiled = document.querySelector('.field-search')
  var btnSearch = document.querySelector('.src-btn')
  btnSearch.addEventListener("click", searchBtn)
  function searchBtn() {
    var filterResults = document.querySelector('.filter-results')
    console.log(searchFiled.value)
    fetchSearchMeal(searchFiled.value).then(function (data) {
      for (var i = 0; i < 4 && i < data.meals.length; ++i) {
        filterResults.innerHTML = filterResults.innerHTML + createMealCard(data.meals[i], 6)
      }
      console.log(data)
      return false;
    })
  }
}
