//Код помогает определить, на каком устройстве была открыта страница, с помощью него, 
//можно понять, открыта страница на touchScreen или с использованием обычной мыши
const isMobile = {
  Android: function () {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  Ios: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
      return (
          isMobile.Android() ||
          isMobile.BlackBerry() ||
          isMobile.Ios() ||
          isMobile.Opera() ||
          isMobile.Windows());
  }
};
//Если это всё-таки мобильное устройство
if (isMobile.any()) {
  //То для body добавляем класс touch
  document.body.classList.add('_touch');
  //Тут берём все стрелочки на странице, так как их может быть несколько
  let menuArrows = document.querySelectorAll('.menu__arrow');
  if (menuArrows.length > 0) {
      for (let index = 0; index < menuArrows.length; index++) {
          const menuArrow = menuArrows[index];
          menuArrow.addEventListener("click", function (e) {
              //Для родителя конкретной нажатой стрелочки
              menuArrow.parentElement.classList.toggle("_active")
          });
      }
  }
}
else {
  document.body.classList.add('_pc');
}
//Меню бургер

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
//При нахождении начинаем реализацию
if (iconMenu) {

  iconMenu.addEventListener("click", function (e) {
      //Запрет скролла страницы при открытом меню
      document.body.classList.toggle('_lock');
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');

  });


}



//Прокрутка при клике

//Массив ссылок, у которых есть data-goto
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
//Если нашлись ссылки
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
      menuLink.addEventListener("click", onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
      const menuLink = e.target;
      //Если есть наш атрибут и существует ли объект, на который мы указываем
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
          const gotoBlock = document.querySelector(menuLink.dataset.goto);
          //Вычисление положения объекта, включая высоту шапки 
          //getBoundingClientRect().top - Получение расстояние от верха объекта
          //pageYOffset - количество прокрученны пикселей
          //document.querySelector('header').offsetHeight - для того, чтобы отнять высоту шапки
          const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

          //При скроле к какому-либо объекту скрыть меню
          if (iconMenu.classList.contains('_active')) {
              document.body.classList.remove('_lock');
              iconMenu.classList.remove('_active');
              menuBody.classList.remove('_active');
          }

          //Прокрутка к нужному месту(разделу)
          window.scrollTo({
              //Прокрутиться сверху на gotoBlockValue
              top: gotoBlockValue,
              //Плавная прокрутка
              behavior: "smooth"
          });
          //Чтобы ссылка никуда не переходила, а именно выполняла функцию прокрутки
          e.preventDefault();
      }
  }
}






function lightMode() {
  const body = document.body;
  const header = document.querySelector('.header');
  const links = document.querySelectorAll('a');
  const planetLinks = document.querySelectorAll('.main__text');
  const subList = document.querySelector('.menu__sub-list');
  const menuBody = document.querySelector('.menu__body');
  const wasLightMode = localStorage.getItem('lightmode') === 'true';

  localStorage.setItem('lightmode', !wasLightMode);
  body.classList.toggle('light-mode', !wasLightMode);
  header.classList.toggle('light-mode', !wasLightMode);
  subList.classList.toggle('light-mode', !wasLightMode);
  menuBody.classList.toggle('light-mode', !wasLightMode);
  for (let index = 0; index < links.length; index++) {
      const link = links[index];
      link.classList.toggle('light-mode', !wasLightMode);
  }
  for (let index = 0; index < planetLinks.length; index++) {
      const planetLink = planetLinks[index];
      planetLink.classList.toggle('light-mode', !wasLightMode);
  }
}

document.querySelector('#theme').addEventListener('click', lightMode)

function onLoad() {
  document.body.classList.toggle('light-mode', localStorage.getItem('light') === 'true');
  

}

document.addEventListener('DOMContentLoaded', onLoad)