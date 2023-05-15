
'use strict'

if (document.getElementById("register")) {
    let register_form = document.getElementById("register"); // Получаем форму

    register_form.addEventListener("submit", function(event) {
        event.preventDefault();

        if (document.getElementById("password").value == document.getElementById("password_repeated").value) { // Банальная проверка совпали ли пароли
            const elements = Array.from(register_form.elements).filter((element) => !!element.name);

            let data = {};

            elements.forEach((element) => { // Собираем данные
                const name = element.name;
                const value = element.value;

                return data[name] = value;
            })

            // Здесь типо должен быть запрос который добавит пользователя

            document.location.href = "./index.html";
        } else {
            document.querySelector("[data-bs-target]").click(); // Это костыль. Использовал бутсрап для отображения модалки и пришлось симулировать нажатие кнопки чтобы она открылась типо ошибка
        }
    })
}