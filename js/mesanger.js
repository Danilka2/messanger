'use strict'
// Поиск не реализован

// Tabs класс для удобства (скопировал с интернета и перпеписал под себя)
class ItcTabs {
    // Передаем первым параметром блок где лежат "кнопки" - список диалогов с пользователями
    // Передаем вторым параметром блок где лежит "контент" - список сообщений с пользователем
    constructor(target, target_content, config) {
      const defaultConfig = {};
      this._targetContent = document.querySelector(target_content);
      this._config = Object.assign(defaultConfig, config);
      this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
      this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
      this._elPanes = this._targetContent.querySelectorAll('.tabs__pane');
      this._eventShow = new Event('tab.itc.change');
      this._init();
      this._events();
    }
    _init() {
      this._elTabs.setAttribute('role', 'tablist');
      this._elButtons.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute('role', 'tab');
        this._elPanes[index].setAttribute('role', 'tabpanel');
      });
    }
    show(elLinkTarget) {
      const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
      const elLinkActive = this._elTabs.querySelector('.tabs__btn_active');
      const elPaneShow = this._targetContent.querySelector('.tabs__pane_show');
      if (elLinkTarget === elLinkActive) {
        return;
      }
      elLinkActive ? elLinkActive.classList.remove('tabs__btn_active') : null;
      elPaneShow ? elPaneShow.classList.remove('tabs__pane_show') : null;
      elLinkTarget.classList.add('tabs__btn_active');
      elPaneTarget.classList.add('tabs__pane_show');
      this._elTabs.dispatchEvent(this._eventShow);
      elLinkTarget.focus();
    }
    showByIndex(index) {
      const elLinkTarget = this._elButtons[index];
      elLinkTarget ? this.show(elLinkTarget) : null;
    };
    _events() {
      this._elTabs.addEventListener('click', (e) => {
        const target = e.target.closest('.tabs__btn');
        if (target) {
          e.preventDefault();
          this.show(target);
        }
      });
    }
}

// Tabs инициализация (message list)
if(document.querySelector(".message-list") && document.querySelector(".main-content")) {
  // Передаем первым параметром блок где лежат "кнопки" - список диалогов с пользователями
  // Передаем вторым параметром блок где лежит "контент" - список сообщений с пользователем
  new ItcTabs('.message-list', '.main');
}

// Инициалзирую блоки, у которых есть дава атрибут "клик"
// Логика:
// В это дата атрибуте ледит имя класса блока, с который при клике нужно открыть или закрыть (если открыт - закроет, если закрыт - откроет)
// Для этого месенджера идельный и легкий вариант как по мне
if(document.querySelectorAll("[data-click]")) {
  let elems = document.querySelectorAll("[data-click]");
  
  elems.forEach(el => {
    el.addEventListener("click", function(e) {
      let opener_el = document.querySelector(`.${el.getAttribute("data-click")}`);

      if(opener_el.classList.contains("active")) {
        opener_el.classList.remove("active");
      } else {
        opener_el.classList.add("active");
      }
    })
  })
}

// Edit 
if (document.getElementById("edit-content")) {
  let edit_content = document.getElementById("edit-content"); // Получаем форму

  document.querySelector(".edit-header__save").addEventListener("click", function(event) {
      event.preventDefault();

      const elements = Array.from(edit_content.querySelectorAll(".edit-item"));

      let data = {};
      
      // !!! ВНИМАНИЕ КАК СОБРАТЬ ДАННЫЕ С ФОТО И ОТПРАВИТЬ ПРАВИЛЬНО БУДЕТ Я НЕ ЗНАЮ. Собрал только текстовые данные
      elements.forEach((element) => { // Собираем данные
          const name = element.id;
          const value = element.innerHTML;

          return data[name] = value;
      })

      let is_edit = true; // Типо отправил запрос и получил что все ок

      if (is_edit) {
        // Ну все ок он закроет блок edit т.к. я в элементе прописал data-click="edit"
        // Нужно будет перерисовать блок с инфо
      } else {
          console.log("err")
      }
  })
}

// Logout
if (document.querySelector(".logout")) {
  document.querySelector(".logout").addEventListener("click", function(e) {
    // Пропистать логику выхода
    document.location.href = "./index.html";
  })
}