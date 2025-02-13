function getPeriod() {
    HttpRequestPostJson('getPeriod', function (response) {
        if (response) {
            a = response;
            document.getElementById("start-date").textContent = a.date_start;
            document.getElementById("end-date").textContent = a.date_end;
        } else {
            console.error("Период не найден");
        }
    }, {});
}

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

        logEntry.innerHTML = `
            <p><strong>Пользователь:</strong> ${log.user}</p>
            <p><strong>Событие:</strong> ${log.event}</p>
            <p><strong>Дата:</strong> ${new Date(log.date).toLocaleString()}</p>
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
        if (response === true) {
            logsData = [];
            document.getElementById("logs-container").innerHTML = '<p>История действий успешно очищена.</p>';
        } else {
            console.error("Ошибка при очистке истории действий");
        }
    }, json);
}

// При загрузке страницы загружаем логи
document.addEventListener("DOMContentLoaded", function () {
    getPeriod();
    getLogs();
    document.getElementById("clear-logs-btn").addEventListener("click", clearLogs);
});
