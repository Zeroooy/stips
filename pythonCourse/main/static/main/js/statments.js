var statementsData = []; // Массив для хранения всех заявлений


function getMyStatements() {
    const sessionId = sessionStorage.getItem('sessionId');

    if (!sessionId) {
        console.error("ID сессии отсутствует");
        return;
    }

    const json = {
        session: sessionId
    };

    HttpRequestPostJson('getRole', function (response) {
        const json = {
            session: sessionId
        };

        HttpRequestPostJson("getStatements", function (response) {
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


                    var a = document.querySelectorAll('.filters')
                    filterStatementsByStatus([a[0].value, a[1].value, a[2].value]);
                }
            } else {
                console.error("Нет данных или ошибка запроса");
            }
        }, json);
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
    clickableArea.classList.add("border-b-1");
    clickableArea.classList.add("border-black/20");
    clickableArea.classList.add("hover:bg-red-50");
    clickableArea.classList.add("py-2");

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
    const pointsArray = statement.points.split('|')[0].split(':').map(s => parseInt(s.trim()));
    pointsDiv.innerHTML = `
        <div title="`+statement.points.split('|')[1]+`" class="flex-row gap-3 flex justify-between rounded-xl border-2 border-black/10 p-2">
            <div class="w-1/5">`+pointsArray[0]+`</div>
            <div class="w-1/5">`+pointsArray[1]+`</div>
            <div class="w-1/5">`+pointsArray[2]+`</div>
            <div class="w-1/5">`+pointsArray[3]+`</div>
            <div class="w-1/5">`+pointsArray[4]+`</div>
        </div>`

    // Поле с датой
    const dateDiv = document.createElement("div");
    dateDiv.classList.add("w-1/4");
    dateDiv.textContent = statement.date || '';

    const oldDiv = document.createElement("div");
    oldDiv.classList.add("w-1/4");
    oldDiv.textContent = statement['old-status'] ? 'Да' : 'Нет';

    // Добавляем все поля в обертку-ссылку
    clickableArea.appendChild(userDiv);
    clickableArea.appendChild(statusDiv);
    clickableArea.appendChild(pointsDiv);
    clickableArea.appendChild(dateDiv);
    clickableArea.appendChild(oldDiv);

    // Добавляем ссылку в форму
    form.appendChild(clickableArea);

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
function filterStatementsByStatus(filters_) {
    const [statusFilter, activityFilter, relevanceFilter] = filters_;
    const container = document.getElementById("statements-container");

    // Очищаем контейнер и добавляем заголовки
    container.innerHTML = `
        <div class="clickable-statement flex-row gap-12 flex justify-between font-bold rounded-t-xl bg-black/10 py-2">
            <div class="w-1/4">ФИО</div>
            <div class="w-1/4">Статус</div>
            <div class="w-1/4">Баллы</div>
            <div class="w-1/4">Дата</div>
            <div class="w-1/4">Устаревшее</div>
        </div>`;

    // Фильтрация заявлений
    const filteredStatements = statementsData.filter(statement => {
        // Проверка на статус
        const statusMatch = statusFilter === "all" || statement.status === statusFilter;

        // Проверка на актуальность
        const isOld = statement["old-status"] === true;
        const relevanceMatch = relevanceFilter === "new" ? !isOld : isOld;

        // Проверка на вид деятельности
        let activityMatch = false;
        if (activityFilter === "all") {
            activityMatch = true;
        } else {
            const pointsArray = statement.points.split('|')[0].split(':').map(s => parseInt(s.trim()));
            const index = parseInt(activityFilter) - 1;
            activityMatch = pointsArray[index] != 0;
        }

        return statusMatch && relevanceMatch && activityMatch;
    });

    // Отображение отфильтрованных заявлений
    filteredStatements.forEach(statement => {
        createStatementFields(statement, container);
    });
}


// Добавляем обработчики событий для кнопок фильтрации
document.querySelectorAll('.filters').forEach(button => {
    button.addEventListener('change', (event) => {
        var a = document.querySelectorAll('.filters')
        filterStatementsByStatus([a[0].value, a[1].value, a[2].value]);
    });
});


document.addEventListener("DOMContentLoaded", function () {
    getMyStatements()

    const json = {
        session: sessionStorage.getItem('sessionId')
    };
    HttpRequestPostJson('getRole', function (response) {
        var options = document.querySelector(".filters").querySelectorAll("option")
        if (response.answer == "Jury") {
            options[5].remove()
            options[6].remove()
        }else if (response.answer == "Inspector studies" || response.answer == "Inspector science" || response.answer == "Inspector culture" || response.answer == "Inspector activities" || response.answer == "Inspector sport") {
            options[1].remove()
            options[2].remove()
            options[3].remove()
        } else {
            console.error("Нет данных или ошибка запроса");
        }
    }, json);
})

