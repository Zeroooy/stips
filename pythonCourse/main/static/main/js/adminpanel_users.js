document.addEventListener("DOMContentLoaded", () => {
    initializePage();
});

function initializePage() {
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
// Отображение таблицы пользователей
function renderUserTable(usersData) {
    const container = document.querySelector(".frame");
    container.innerHTML = ""; // Очистка контейнера

    // Создание заголовка таблицы
    const headerRow = createTableRow(["ID", "ФИО", "Роль"], "py-2 rounded-t-xl bg-black/10 field-row header grid gap-2 mb-5 grid-cols-3 font-bold");
    container.appendChild(headerRow);

    // Заполнение таблицы пользователями
    Object.values(usersData).flat().forEach((user, index) => {
        var role = ""
        if(user.role === "Student"){ role = "Студент"
        }else if(user.role === "Administrator"){ role = "Администратор"
        }else if(user.role === "Jury"){ role = "Жюри"
        }else if(user.role === "Inspector studies"){ role = "Инспектор (Учеба)"
        }else if(user.role === "Inspector science"){ role = "Инспектор (Наука)"
        }else if(user.role === "Inspector activities"){ role = "Инспектор (Деятельность)"
        }else if(user.role === "Inspector culture"){ role = "Инспектор (Культура)"
        }else if(user.role === "Inspector sport"){ role = "Инспектор (Спорт)"
        }
        const userRow = createTableRow(
            [
                user["user-id"][0]+user["user-id"][1]+user["user-id"][2]+"..."+user["user-id"][user["user-id"].length-3]+user["user-id"][user["user-id"].length-2]+user["user-id"][user["user-id"].length-1],
                `${user.surname} ${user.name} ${user.middlename}`,
                role,
            ],
            "clickable-statement grid gap-2 py-2 grid-cols-3 border-b-1 border-black/20 hover:bg-red-50"
        );

        userRow.setAttribute("data-role", user.role);

        // Изменяем логику перехода на adminpaneluser
        userRow.addEventListener("click", () => {
            window.location.href = `user?userId=${user["user-id"]}`;
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
            const inspectorSubroles = ["Inspector studies", "Inspector science", "Inspector activities", "Inspector culture", "Inspector sport"];
            row.style.display = inspectorSubroles.includes(rowRole) || rowRole === role ? "grid" : "none";
        }
        if (role === "All") {
            row.style.display = "grid";
        }
    });
}
