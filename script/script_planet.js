/* Когда пользователь прокручивает вниз, скрыть навигационную панель. Когда пользователь прокручивает вверх, показать навигационную панель */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("footer").style.bottom = "0";
    document.getElementById("footer").style.opacity = "1";
  } else {
    document.getElementById("footer").style.bottom = "-64px";
    // document.getElementById("footer").style.opacity = "1";
  }
  prevScrollpos = currentScrollPos;
}