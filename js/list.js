/**
 *
 */
function getSelectedFilter() {
  return document.querySelector('input[name="searchFilterOptions"]:checked').value;
}

function displayFilters() {
  var sf = getSelectedFilter()

// Selektuj mi sva serach polja, pristupi im pomocu Id-ija, i u zavistnosti
//da li su cekirana neka budu prikazana ili neprikazana.
  var searchFilters = document.getElementsByClassName("search-filter")
  for (var j = 0; j < searchFilters.length; ++j) {
    if (sf + 'Wrapper' === searchFilters[j].id) {
      searchFilters[j].style.display = 'block'
    } else {
      searchFilters[j].style.display = 'none'
    }
  }
}

function init() {
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

  var ingredientsMeal = document.getElementById('ingredientsWrapper')
  fetchIngredients().then(function(data) {
    for (var i = 0;i < 20 && i < data.meals.length; ++i) {
      var cbIngredients = '<div class="form-check">' +
        '<input class="form-check-input messageCheckbox" type="checkbox" value="' + data.meals[i].strIngredient  + '" id="defaultCheck' + i +'" name="user_group[]">' +
        '<label class="form-check-label" for="defaultCheck' + i + '">' + data.meals[i].strIngredient +
        '</label>' +
        '</div>'
        ingredientsMeal.innerHTML = ingredientsMeal.innerHTML + cbIngredients
    }
  })

  //  Za cekirana input polja, odradi click event koji i u zavistnosti da li su
  // cekirana vrace njihovu vrijednost.
  var selectedFilters = document.getElementsByClassName("form-check-input");
  for (var i = 0; i < selectedFilters.length; ++i) {
    selectedFilters[i].addEventListener('click', function(e) {
      displayFilters()
    })
  }

  displayFilters()
}

function searchBtn() {
  var sf = getSelectedFilter()
  var searchFiled = document.querySelector('.field-search')
  var filterResults = document.querySelector('.filter-results')
  var categoryMeal = document.getElementById('mealCategory')
  var areaMeal = document.getElementById('areaCategory')
  var ingredientsMeal = document.getElementById('ingredientsWrapper')

  switch (sf) {
    case 'mealName':
        fetchSearchMeal(searchFiled.value).then(function(data) {
          for (var i = 0; i < 4 && i < data.meals.length; ++i) {
            filterResults.innerHTML = filterResults.innerHTML + createMealCard(data.meals[i], 6)
          }
        })
      break
    case 'mealCategory':
        var ctg = categoryMeal.options[categoryMeal.selectedIndex].value
        fetchFilterCategory(ctg).then(function(data) {
          filterResults.innerHTML = ''
          for (var i = 0; i < 8 && i < data.meals.length; ++i) {
            fetchMeal(data.meals[i].idMeal).then(function (data) {
              filterResults.innerHTML = filterResults.innerHTML + createMealCard(data.meals[0], 6)
            })
          }
        })
      break
      case 'areaCategory':
          var are = areaMeal.options[areaMeal.selectedIndex].value
          fetchFilterArea(are).then(function(data) {
            filterResults.innerHTML = ''
            for (var i = 0; i < 8 && i < data.meals.length; ++i) {
              fetchMeal(data.meals[i].idMeal).then(function (data) {
                filterResults.innerHTML = filterResults.innerHTML + createMealCard(data.meals[0], 6)
              })
            }
          })
        break
        case 'ingredients':
            var checkedValue = [];
            var checkboxes = document.getElementsByClassName('messageCheckbox')
            for (var i = 0; i < checkboxes.length; ++i) {
              if (checkboxes[i].checked === true){
                checkedValue.push(checkboxes[i].value)
              }
            }
            if (checkedValue.length === 0) {
              alert('Check any checkbox first')
              return 
            }
            if (checkedValue.length > 1) {
              alert('Filter by multi-ingredient (only available to $1+ Patreon supporters)')
              return 
            }
            fetchFilterIngredient(checkedValue.join()).then(function(data) {
              filterResults.innerHTML = ''
              for (var i = 0; i < 8 && i < data.meals.length; ++i) {
                fetchMeal(data.meals[i].idMeal).then(function (data) {
                  filterResults.innerHTML = filterResults.innerHTML + createMealCard(data.meals[0], 6)
                })
              }
            })

          break
  }
}

window.onload = function() {
  init()

  var btnSearch = document.querySelector('.src-btn')
  btnSearch.addEventListener("click", searchBtn)
}
