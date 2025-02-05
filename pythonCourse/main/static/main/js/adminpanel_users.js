document.addEventListener("DOMContentLoaded", () => {
    initializePage();
});

function initializePage() {
    loadPeriod();
    loadUsers();

    document.querySelectorAll(".perehod").forEach((button) => {
        button.addEventListener("click", (event) => {
            const selectedRole = event.target.getAttribute("data-status");
            filterUsersByRole(selectedRole);
        });
    });

    document.querySelector(".back-button").addEventListener("click", () => {
        window.history.back();
    });
}

// Загрузка периода
function loadPeriod() {
    HttpRequestPostJson("getPeriod", (response) => {
        if (response) {
            document.getElementById("start-date").textContent = response.date_start || "Не задано";
            document.getElementById("end-date").textContent = response.date_end || "Не задано";
        } else {
            console.error("Ошибка получения периода");
        }
    }, {});
}

// Загрузка пользователей
function loadUsers() {
    const sessionId = sessionStorage.getItem("sessionId");

    if (!sessionId) {
        console.error("ID сессии отсутствует");
        return;
    }

    const requestData = { session: sessionId };

    HttpRequestPostJson("getListUsers", (response) => {
        if (response && response.users) {
            renderUserTable(response.users);
        } else {
            console.error("Ошибка получения списка пользователей");
        }
    }, requestData);
}

// Отображение таблицы пользователей
function renderUserTable(usersData) {
    const container = document.querySelector(".frame");
    container.innerHTML = ""; // Очистка контейнера

    // Создание заголовка таблицы
    const headerRow = createTableRow(["ID", "SESSION_ID", "ФИО", "Роль"], "field-row header");
    container.appendChild(headerRow);

    // Заполнение таблицы пользователями
    Object.values(usersData).flat().forEach((user, index) => {
        const userRow = createTableRow(
            [
                index + 1,
                user["user-id"],
                `${user.surname} ${user.name} ${user.middlename}`,
                user.role,
            ],
            "clickable-statement"
        );

        userRow.setAttribute("data-role", user.role);

        // Добавляем ссылку на профиль пользователя
        userRow.addEventListener("click", () => {
            window.location.href = `userProfile?userId=${user["user-id"]}`;
        });

        container.appendChild(userRow);
    });
}

// Создание строки таблицы
function createTableRow(data, className) {
    const row = document.createElement("div");
    row.className = className;

    data.forEach((item) => {
        const cell = document.createElement("div");
        cell.textContent = item;
        row.appendChild(cell);
    });

    return row;
}

// Фильтрация пользователей по роли
function filterUsersByRole(role) {
    const allRows = document.querySelectorAll(".clickable-statement");

    allRows.forEach((row) => {
        const rowRole = row.getAttribute("data-role");
        row.style.display = rowRole === role || !role ? "grid" : "none";

        // Если выбран "Инспектор", добавляем специфические подроли
        if (role === "Inspector") {
            const inspectorSubroles = ["Inspector studies", "Inspector science", "Inspector activities", "Inspector culture"];
            row.style.display = inspectorSubroles.includes(rowRole) || rowRole === role ? "grid" : "none";
        }
    });
}
