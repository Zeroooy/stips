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

show(0)