'use strict'

if (document.getElementById("login")) {
    let login_form = document.getElementById("login"); // Получаем форму

    login_form.addEventListener("submit", function(event) {
        event.preventDefault();

        const elements = Array.from(login_form.elements).filter((element) => !!element.name)

        let data = {};

        elements.forEach((element) => { // Собираем данные
            const name = element.name;
            const value = element.value;

            return data[name] = value;
        })

        let is_authorized = true; // Типо отправил запрос и получил что все ок

        if (is_authorized) {
            window.location.href = "./messanger.html"
        } else {
            document.querySelector("[data-bs-target]").click() // Это костыль. Использовал бутсрап для отображения модалки и пришлось симулировать нажатие кнопки чтобы она открылась типо ошибка
        }
    })


}