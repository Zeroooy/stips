document.addEventListener("DOMContentLoaded", () => {
    loadUserData();
    document.querySelector(".back-button").addEventListener("click", () => {
        window.history.back();
    });
});

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
        var key_ = userData[key]
        if(label == "ID" || label == "Сессия") {key_ = userData[key][0]+userData[key][1]+userData[key][2]+"..."+userData[key][userData[key].length-3]+userData[key][userData[key].length-2]+userData[key][userData[key].length-1]}
        const value = key_ || "Не указано";
        const row = document.createElement("div");
        row.classList.add("field-row");
        row.classList.add("flex");
        row.classList.add("flex-row");
        row.classList.add("justify-between");
        row.innerHTML = `<div class="font-bold">${label}</div><div>${value}</div>`;
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

