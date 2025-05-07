var statementsData = []; // Массив для хранения всех заявлений

function getMyStatements() {
    const sessionId = sessionStorage.getItem('sessionId');

    if (!sessionId) {
        console.error("ID сессии отсутствует");
        return;
    }

    const json = { session: sessionId };

    HttpRequestPostJson('getStatementsOld', function (response) {
        if (response && response.statements) {
            statementsData = []; // Очищаем массив перед обновлением

            const container = document.getElementById("statements-container");

            // Перебираем все категории заявлений (conflict, confirm, deny)
            if (Array.isArray(response.statements)) {
                statementsData = [...response.statements]; // Сохраняем все заявления

                const container = document.getElementById("statements-container");

                // Показываем все заявления
                response.statements.forEach(statement => {
                    createStatementFields(statement, container);
                });
            }
        } else {
            console.error("Нет данных или ошибка запроса");
        }
    }, json);
}

// Функция для создания полей заявления
function createStatementFields(statement, container) {
    const form = document.createElement("div");
    form.classList.add("statement-form");

    // Создаем обертку-ссылку для всего заявления
    const clickableArea = document.createElement("a");
    clickableArea.classList.add("items-center");
    clickableArea.href = "statment?statementId=" + statement["statement-id"]; // Замените на реальный URL
    clickableArea.classList.add("clickable-statement");
    clickableArea.classList.add("field-row");
    clickableArea.classList.add("gap-12");
    clickableArea.classList.add("flex");
    clickableArea.classList.add("justify-between");

    // Поле с именем пользователя
    const userDiv = document.createElement("div");
    userDiv.classList.add("w-1/4");
    userDiv.textContent = statement.user || '';

    // Поле со статусом
    const statusDiv = document.createElement("div");
    statusDiv.classList.add("w-1/4");
    statusDiv.textContent = getStatusText(statement.status);

    // Поле с баллами
    const pointsDiv = document.createElement("div");
    pointsDiv.classList.add("w-1/4");
    pointsDiv.textContent = statement.points || '0';

    // Поле с датой
    const dateDiv = document.createElement("div");
    dateDiv.classList.add("w-1/4");
    dateDiv.textContent = statement.date || '';

    // Добавляем все поля в обертку-ссылку
    clickableArea.appendChild(userDiv);
    clickableArea.appendChild(statusDiv);
    clickableArea.appendChild(pointsDiv);
    clickableArea.appendChild(dateDiv);

    // Добавляем ссылку в форму
    form.appendChild(clickableArea);
    form.classList.add("rounded-xl");
    form.classList.add("p-3");
    form.classList.add("hover:bg-red-100");
    form.classList.add("flex");

    // Добавляем форму в контейнер
    container.appendChild(form);
}


// Функция для получения текста статуса
function getStatusText(status) {
    if (status === "process") return "На проверке";
    if (status === "error") return "Ошибочно";
    if (status === "verified") return "Проверено";
    if (status === "deny") return "Отклонено";
    if (status === "confirm") return "Одобрено";
    if (status === "conflict") return "Конфликт";
    return "Неизвестный статус";
}

// Функция для фильтрации заявлений по статусу
function filterStatementsByStatus(status) {
    const container = document.getElementById("statements-container");
    container.innerHTML = `<div class="clickable-statement flex-row gap-12 flex justify-between font-bold ">
            <div class="w-1/4">ФИО</div><div class="w-1/4">Статус</div><div class="w-1/4">Баллы</div><div class="w-1/4">Дата</div>
        </div>`; // Очищаем контейнер

    // Фильтруем заявления по статусу
    var filteredStatements = ""
    if(status == "all"){
        filteredStatements = statementsData;
    }else{
        filteredStatements = statementsData.filter(statement => statement.status === status);
    }
    // Отображаем только отфильтрованные заявления
    filteredStatements.forEach(statement => {
        createStatementFields(statement, container);
    });
}

// Добавляем обработчики событий для кнопок фильтрации
document.querySelectorAll('.perehod').forEach(button => {
    button.addEventListener('click', (event) => {
        const status = event.target.getAttribute('data-status');
        filterStatementsByStatus(status);
    });
});

function markAllStatementsOutdated() {

    const sessionId = sessionStorage.getItem('sessionId');

    if (!sessionId) {
        console.error("ID сессии отсутствует");
        return;
    }

    const json = { session: sessionId };

    // Отправляем запрос на сервер для устаревания всех заявлений
    HttpRequestPostJson('setOld', function (response) {
        if (response && response.answer === true) {
            showNotification("Заявления сделаны устаревшими.");
            getMyStatements(); // Обновляем список заявлений
        } else {
            console.error("Не удалось пометить заявления как устаревшие.");
        }
    }, json);
}


document.addEventListener("DOMContentLoaded", function () {
    getMyStatements()
})

