window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  loader.className += " hidden"; // class "loader hidden"
});

window.onload = function () {
  //
  var topRated = document.querySelector('.top-rated')
  for (var i = 0; i < 6; ++i) {
    fetchRandomMeal().then(function (data) {
      topRated.innerHTML = topRated.innerHTML + createMealCard(data.meals[0], 4)
      initModalLinks()
    })
  }

  //
  var bestTeaser = document.querySelector('.teaser_best')
  for (var i = 0; i < 2; ++i) {
    fetchRandomMeal().then(function (data) {
      bestTeaser.innerHTML = bestTeaser.innerHTML + createMiniCard(data.meals[0])
      initModalLinks()
    })
  }

  var slider = document.querySelector('.carousel-inner')
  for (var i = 0; i < 3; ++i) {
    createSlider(slider, i == 0 ? true : false)
  }

  var moreBtn = document.querySelector('.load-more-top-rated')
  moreBtn.addEventListener('click', loadMore)
  
}


