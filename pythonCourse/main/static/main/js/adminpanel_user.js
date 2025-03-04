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
    const fieldMapping = {
        "ID": "user-id",
        "SESSION_ID": "session",
        "SURNAME": "surname",
        "LOGIN": "login",
        "PASSWORD": "password",
        "NAME": "name",
        "MIDDLENAME": "middlename",
        "ROLE": "role",
        "USER_ID": "user-id",
        "EMAIL": "email",
        "PHONE": "phone"
    };

    document.querySelectorAll(".field-row").forEach((row) => {
        const label = row.children[0].textContent.trim();
        const fieldKey = fieldMapping[label];

        if (fieldKey && userData[fieldKey] !== undefined) {
            row.children[1].textContent = userData[fieldKey] || "Не указано";
        }
    });
}
