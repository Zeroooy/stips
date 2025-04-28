
var logsData = []; // Хранение логов

function getLogs() {
    const sessionId = sessionStorage.getItem('sessionId');

    if (!sessionId) {
        console.error("ID сессии отсутствует");
        return;
    }

    const json = { session: sessionId };

    HttpRequestPostJson('getLog', function (response) {
        if (response && response.logs) {
            logsData = response.logs;
            displayLogs();
        } else {
            console.error("Нет данных или ошибка запроса");
        }
    }, json);
}

// Функция отображения логов
function displayLogs() {
    const container = document.getElementById("logs-container");
    container.innerHTML = ''; // Очищаем контейнер перед добавлением

    logsData.forEach(log => {
        const logEntry = document.createElement("div");
        logEntry.classList.add("log-entry");
        logEntry.classList.add("mb-5");

        logEntry.innerHTML = `
            <p class="flex my-2 justify-between"><strong>Пользователь:</strong> ${log.user}</p>
            <p class="flex my-2 justify-between"><strong>Событие:</strong> ${log.event}</p>
            <p class="flex my-2 justify-between"><strong>Дата:</strong> ${new Date(log.date).toLocaleString()}</p>
            <hr>
        `;

        container.appendChild(logEntry);
    });
}

// Функция очистки логов через API
function clearLogs() {
    const sessionId = sessionStorage.getItem('sessionId');

    if (!sessionId) {
        console.error("ID сессии отсутствует");
        return;
    }

    const json = { session: sessionId };

    HttpRequestPostJson('resetLog', function (response) {
        if (response.answer === true) {
            document.getElementById("logs-container").innerHTML = '<p>История действий успешно очищена.</p>';
            getLogs();
        } else {
            console.error("Ошибка при очистке истории действий");
        }
    }, json);

}

// При загрузке страницы загружаем логи
document.addEventListener("DOMContentLoaded", function () {
    getLogs();
    document.getElementById("clear-logs-btn").addEventListener("click", clearLogs);
});
