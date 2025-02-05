var statementsData = []; // Массив для хранения всех заявлений
function getPeriod() {
    HttpRequestPostJson('getPeriod', function (response) {
        if (response) {
            a = response

            document.getElementById("start-date").textContent = a.date_start
            document.getElementById("end-date").textContent = a.date_end
        } else {
            console.error("Период не найден")
        }
    },{})
}

function getMyStatements() {
    const sessionId = sessionStorage.getItem('sessionId');

    if (!sessionId) {
        console.error("ID сессии отсутствует");
        return;
    }

    const json = { session: sessionId };

    HttpRequestPostJson('getListStatementsJury', function (response) {
        if (response && response.statements) {
            statementsData = []; // Очищаем массив перед обновлением

            const container = document.getElementById("statements-container");
            container.innerHTML = ''; // Очищаем контейнер

            // Перебираем все категории заявлений (conflict, confirm, deny)
            for (const [status, statements] of Object.entries(response.statements)) {
                if (Array.isArray(statements)) {
                    // Добавляем заявления в общий массив
                    statementsData.push(...statements.map(s => ({ ...s, status })));

                    // Отображаем заявления в контейнере
                    statements.forEach(statement => {
                        createStatementFields({ ...statement, status }, container);
                    });
                }
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
    clickableArea.href = "jurystatment"; // Замените на реальный URL
    clickableArea.classList.add("clickable-statement");

    // Поле с именем пользователя
    const userDiv = document.createElement("div");
    userDiv.textContent = statement.user || '';

    // Поле со статусом
    const statusDiv = document.createElement("div");
    statusDiv.textContent = getStatusText(statement.status);

    // Поле с баллами
    const pointsDiv = document.createElement("div");
    pointsDiv.textContent = statement.points || '0';

    // Поле с датой
    const dateDiv = document.createElement("div");
    dateDiv.textContent = statement.date || '';

    // Добавляем все поля в обертку-ссылку
    clickableArea.appendChild(userDiv);
    clickableArea.appendChild(statusDiv);
    clickableArea.appendChild(pointsDiv);
    clickableArea.appendChild(dateDiv);

    // Добавляем ссылку в форму
    form.appendChild(clickableArea);

    // Добавляем форму в контейнер
    container.appendChild(form);
}


// Функция для получения текста статуса
function getStatusText(status) {
    if (status === "confirm") return "Одобрено";
    if (status === "deny") return "Отклонено";
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



document.addEventListener("DOMContentLoaded", function () {
    getPeriod()
    getMyStatements()
})

