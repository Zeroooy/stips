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
    getPeriod(); // Получаем даты
    setActiveButton("Общие сведения"); // Устанавливаем активную кнопку


    document.querySelectorAll(".perehod").forEach(button => {
        button.addEventListener("click", function () {
            setActiveButton(this.textContent);
            updateFormFields(this.textContent);
        });
    });

    // Блокируем кнопку, пока нет данных
    const submitButton = document.getElementById("mark-all-outdated");
    submitButton.disabled = true;

    document.getElementById("statements-container").addEventListener("input", function () {
        submitButton.disabled = document.querySelectorAll(".form-input").length === 0;
    });
});

// Устанавливаем активную кнопку
function setActiveButton(activeText) {
    document.querySelectorAll(".perehod").forEach(button => {
        if (button.textContent === activeText) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });

    document.body.setAttribute("data-active-section", activeText);
}
document.addEventListener("DOMContentLoaded", function () {
    const formContainer = document.getElementById("form-container");

    function createFormField(placeholderText) {
        const formEntry = document.createElement("div");
        formEntry.classList.add("form-entry");

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = placeholderText;

        formEntry.appendChild(input);
        formContainer.appendChild(formEntry);
    }

    createFormField("Введите текст...");
    createFormField("Дополнительное поле...");

});


