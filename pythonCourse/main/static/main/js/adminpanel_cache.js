var statementsData = []; // Массив для хранения всех заявлений

function getMyStatements() {
    const sessionId = sessionStorage.getItem('sessionId');

    if (!sessionId) {
        console.error("ID сессии отсутствует");
        return;
    }

    const json = { session: sessionId };

    HttpRequestPostJson('getListCache', function (response) {
        if (response && response.statements) {
            statementsData = response.statements; // Сохраняем данные
            const container = document.getElementById("statements-container");
            container.innerHTML = ''; // Очищаем контейнер

            // Отображаем каждое заявление
            response.statements.forEach(statement => {
                createStatementFields(statement, container);
            });
        } else {
            console.error("Нет данных или ошибка запроса");
        }
    }, json);
}

// Функция для создания полей заявления
function createStatementFields(statement, container) {
    const form = document.createElement("div");
    form.classList.add("statement-form");

    const clickableArea = document.createElement("a");
    clickableArea.href = "inspectorstatment";
    clickableArea.classList.add("clickable-statement");

    // Создаем поля
    const userDiv = document.createElement("div");
    userDiv.textContent = statement.user || '';

    const statusDiv = document.createElement("div");
    statusDiv.textContent = getStatusText(statement.status);

    const pointsDiv = document.createElement("div");
    pointsDiv.textContent = statement.points || '0';

    const dateDiv = document.createElement("div");
    dateDiv.textContent = statement.date || '';

    const idDiv = document.createElement("div");
    idDiv.textContent = statement["statement-id"] || '';

    const cacheStatusDiv = document.createElement("div");
    cacheStatusDiv.textContent = statement["cache-status"] ? 'Да' : 'Нет';

    // Добавляем поля в обертку
    clickableArea.append(userDiv, statusDiv, pointsDiv, dateDiv, idDiv, cacheStatusDiv);

    form.appendChild(clickableArea);
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
    container.innerHTML = ''; // Очищаем контейнер

    // Фильтруем заявления по статусу
    const filteredStatements = statementsData.filter(statement => statement.status === status);

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
            alert("Все заявления успешно помечены как устаревшие.");
            getMyStatements(); // Обновляем список заявлений
        } else {
            console.error("Не удалось пометить заявления как устаревшие.");
        }
    }, json);
}



document.addEventListener("DOMContentLoaded", function () {
    getMyStatements()
})

