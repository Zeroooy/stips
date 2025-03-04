document.addEventListener("DOMContentLoaded", function () {
    getPeriod(); // Получаем даты
    setActiveButton("Общие сведения"); // Устанавливаем активную кнопку
    updateFormFields("Общие сведения"); // Загружаем форму для первой вкладки

    document.querySelectorAll(".perehod").forEach(button => {
        button.addEventListener("click", function () {
            setActiveButton(this.textContent);
            updateFormFields(this.textContent); // Передаем текст кнопки как раздел
        });
    });

    // Блокируем кнопку отправки, пока чекбокс не нажат
    const submitButton = document.getElementById("mark-all-outdated");
    document.getElementById("agree-checkbox").addEventListener("change", function () {
        submitButton.disabled = !this.checked;
    });
});

// Устанавливаем активную кнопку
function setActiveButton(activeText) {
    document.querySelectorAll(".perehod").forEach(button => {
        button.classList.toggle("active", button.textContent === activeText);
    });

    document.body.setAttribute("data-active-section", activeText);
}

// Функция обновления формы в зависимости от выбранного раздела
function updateFormFields(section) {
    const formFrame = document.getElementById("form-frame");
    formFrame.innerHTML = ""; // Очищаем старые поля

    // Поля для формы достижений
    const formFields = [
        "Выберите достижение",
        "Выберите вариант 2",
        "Выберите вариант 3",
        "Выберите вариант 4",
        "Выберите вариант 5"
    ];

    formFields.forEach(label => {
        const select = document.createElement("select");
        select.innerHTML = `
            <option value="" disabled selected>${label}</option>
            <option value="Учеба">Учеба</option>
            <option value="Наука">Наука</option>
            <option value="Общественная деятельность">Общественная деятельность</option>
            <option value="Культура и творчество">Культура и творчество</option>
            <option value="Спорт">Спорт</option>
        `;
        formFrame.appendChild(select);
    });
}
function show(index) {
    let forms = document.querySelectorAll(".all-frame");

    forms.forEach((form, i) => {
        form.style.display = i === index ? "block" : "none";
    });
}
// Функция получения периода
function getPeriod() {
    HttpRequestPostJson('getPeriod', function (response) {
        if (response) {
            document.getElementById("start-date").textContent = response.date_start;
            document.getElementById("end-date").textContent = response.date_end;
        } else {
            console.error("Период не найден");
        }
    }, {});
}
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".frame-mid2").forEach(section => {
        for (let i = 1; i <= 9; i++) {
            let clonedFields = section.cloneNode(true); // Клонируем блок формы
            section.parentNode.appendChild(clonedFields); // Добавляем в конец родителя
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".frame-mid3").forEach(section => {
        for (let i = 1; i <= 4; i++) {
            let clonedFields = section.cloneNode(true); // Клонируем блок формы
            section.parentNode.appendChild(clonedFields); // Добавляем в конец родителя
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".frame-mid4").forEach(section => {
        for (let i = 1; i <= 24; i++) {
            let clonedFields = section.cloneNode(true); // Клонируем блок формы
            section.parentNode.appendChild(clonedFields); // Добавляем в конец родителя
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".frame-mid5").forEach(section => {
        for (let i = 1; i <= 3; i++) {
            let clonedFields = section.cloneNode(true); // Клонируем блок формы
            section.parentNode.appendChild(clonedFields); // Добавляем в конец родителя
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".frame-mid6").forEach(section => {
        for (let i = 1; i <= 17; i++) {
            let clonedFields = section.cloneNode(true);
            section.insertAdjacentElement("afterend", clonedFields); // Вставляем сразу после оригинального блока
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".frame-mid7").forEach(section => {
        for (let i = 1; i <= 2; i++) {
            let clonedFields = section.cloneNode(true);
            section.insertAdjacentElement("afterend", clonedFields); // Вставляем сразу после оригинального блока
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".frame-mid8").forEach(section => {
        for (let i = 1; i <= 5; i++) {
            let clonedFields = section.cloneNode(true);
            section.insertAdjacentElement("afterend", clonedFields); // Вставляем сразу после оригинального блока
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".frame-mid9").forEach(section => {
        for (let i = 1; i <= 1; i++) {
            let clonedFields = section.cloneNode(true);
            section.insertAdjacentElement("afterend", clonedFields); // Вставляем сразу после оригинального блока
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".frame-mid10").forEach(section => {
        for (let i = 1; i <= 9; i++) {
            let clonedFields = section.cloneNode(true);
            section.insertAdjacentElement("afterend", clonedFields); // Вставляем сразу после оригинального блока
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".frame-mid11").forEach(section => {
        for (let i = 1; i <= 4; i++) {
            let clonedFields = section.cloneNode(true);
            section.insertAdjacentElement("afterend", clonedFields); // Вставляем сразу после оригинального блока
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".frame-mid13").forEach(section => {
        for (let i = 1; i <= 19; i++) {
            let clonedFields = section.cloneNode(true);
            section.insertAdjacentElement("afterend", clonedFields); // Вставляем сразу после оригинального блока
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".frame-mid14").forEach(section => {
        for (let i = 1; i <= 7; i++) {
            let clonedFields = section.cloneNode(true);
            section.insertAdjacentElement("afterend", clonedFields); // Вставляем сразу после оригинального блока
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".frame-mid12").forEach(section => {
        for (let i = 1; i <= 7; i++) {
            let clonedFields = section.cloneNode(true);
            section.insertAdjacentElement("afterend", clonedFields); // Вставляем сразу после оригинального блока
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const selectElement = document.querySelector(".frame-mid11 select"); // Выпадающий список
    const textInput = document.querySelector(".frame-mid11 input[readonly]"); // Поле, которое должно меняться

    // Связываем значения выпадающего списка с нужными записями
    const messages = {
        "Членство в общественных организациях, студенческих объединениях": "Копия списка студенческого объединения, заверенного куратором",
        "Членство в ученом совете университета, института, факультета": "Копия приказа о составе ученого совета",
        "Выполнение функций студенческого куратора": "Копия распоряжения о назначении и распределении кураторов академических групп",
        "Выполнение функций старосты академической группы/старосты общежитий/секретаря": "Копия распоряжения дирекции о назначении старосты академической группы / копия списка, заверенного заведующим общежитием / копия списка, заверенного куратором студенческого объединения",
        "Руководство общественной организацией, студенческим объединением": "Копия наградного студенческого объединения, заверенного куратором"
    };

    // Добавляем обработчик события на изменение выбора
    selectElement.addEventListener("change", function () {
        const selectedValue = selectElement.value; // Получаем выбранное значение
        textInput.value = messages[selectedValue] || "Копия наградного документа"; // Меняем текст в поле
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const selectElement = document.querySelector(".frame-mid10 select"); // Выпадающий список
    const textInput = document.querySelector(".frame-mid10 input[readonly]"); // Поле, которое должно меняться

    // Связываем значения выпадающего списка с нужными записями
    const messages = {
        "Благодарность, благодарственное письмо ректора": "Копия благодарности, благодарственного письма",
        "Почетная грамота ректора": "Копия почетной грамоты",
        "Награда мэра, городской Думы": "Копия наградного документа, номер и дата постановления/распоряжения",
        "Награда губернатора": "Копия наградного документа, номер и дата постановления/распоряжения",
        "Награда органа исполнительной власти федерального уровня": "Копия наградного документа, номер и дата постановления/распоряжения"
    };

    // Добавляем обработчик события на изменение выбора
    selectElement.addEventListener("change", function () {
        const selectedValue = selectElement.value; // Получаем выбранное значение
        textInput.value = messages[selectedValue] || "Копия наградного документа"; // Меняем текст в поле
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const selectElement = document.querySelector(".frame-mid12 select"); // Выпадающий список
    const textInput = document.querySelector(".frame-mid12 input[readonly]"); // Поле, которое должно меняться

    // Связываем значения выпадающего списка с нужными записями
    const messages = {
        "Член редакции студенческого центра кафедры / проекта": "Копия справки за подписью куратора пресс-центра о систематическом участии в деятельности + 1-2 скриншота",
        "Член редакции студенческого центра института / университета": "Копия справки за подписью куратора пресс-центра о систематическом участии в деятельности + 1-2 скриншота",
        "Победа в региональных конкурсах информационного сопровождения": "Копия документа, подтверждающего участие (сертификат/диплом)",
        "Победа во всероссийских конкурсах информационного сопровождения": "Копия документа, подтверждающего участие (сертификат/диплом)",
    };

    // Добавляем обработчик события на изменение выбора
    selectElement.addEventListener("change", function () {
        const selectedValue = selectElement.value; // Получаем выбранное значение
        textInput.value = messages[selectedValue] || "Копия наградного документа"; // Меняем текст в поле
    });
});