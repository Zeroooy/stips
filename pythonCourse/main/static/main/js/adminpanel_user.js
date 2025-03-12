document.addEventListener("DOMContentLoaded", () => {
    loadUserData();
    loadPeriod()
    document.querySelector(".back-button").addEventListener("click", () => {
        window.history.back();
    });
});
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
// Функция загрузки данных пользователя
function loadUserData() {
    const sessionId = sessionStorage.getItem("sessionId");
    const userId = new URLSearchParams(window.location.search).get("userId");

    if (!sessionId || !userId) {
        console.error("Отсутствует sessionId или userId");
        return;
    }

    const requestData = { "session": sessionId, "user-id": userId };

    HttpRequestPostJson("getUser", (response) => {
        if (response && response.user) {
            fillUserFields(response.user);
        } else {
            console.error("Ошибка загрузки данных пользователя");
        }
    }, requestData);
}

// Функция заполнения полей данными пользователя
function fillUserFields(userData) {
    const container = document.querySelector(".frame-admin");
    container.innerHTML = ""; // Очищаем перед добавлением новых данных

    const fieldMapping = {
        "ID": "user-id",
        "Сессия": "session",
        "Фамилия": "surname",
        "Логин": "login",
        "Пароль": "password",
        "Имя": "name",
        "Отчество": "middlename",
        "Роль": "role",
        "Email": "email",
        "Телефон": "phone"
    };

    Object.entries(fieldMapping).forEach(([label, key]) => {
        const value = userData[key] || "Не указано";
        const row = document.createElement("div");
        row.classList.add("field-row");
        row.innerHTML = `<div>${label}</div><div>${value}</div>`;
        container.appendChild(row);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("change-role-button").addEventListener("click", changeUserRole);
});

function changeUserRole() {
    const sessionId = sessionStorage.getItem("sessionId");
    const userId = new URLSearchParams(window.location.search).get("userId");
    const newRole = document.getElementById("role-select").value;

    if (!sessionId || !userId) {
        alert("Ошибка: отсутствует sessionId или userId");
        return;
    }

    const requestData = {
        "session": sessionId,
        "user-id": userId,
        "user-role": parseInt(newRole)
    };

    HttpRequestPostJson("changeRole", (response) => {
        if (response.answer === true) {
            alert("Роль успешно изменена!");
            location.reload();
        } else {
            alert("Ошибка изменения роли");
        }
    }, requestData);
}

