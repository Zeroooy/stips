function login() {
    var t1 = document.getElementById("login-input").value
    var t2 = document.getElementById("password-input").value
    if(t1 != ""){
        if(t2 != ""){

            let json = {
                login: t1,
                password: t2
            }

            HttpRequestPostJson('signIn', function (request) {

                if (request.answer != false) {
                    sessionStorage.setItem('sessionId', request.answer)
                    getRole()


                }else{
                    red_flag("password-input")
                    red_flag("login-input")
                }

            }, json)
        }else red_flag("password-input")
    }else red_flag("login-input")
}
function getRole() {
    // Получаем sessionId из sessionStorage
    const sessionId = sessionStorage.getItem('sessionId');

    // Если sessionId существует, отправляем запрос на сервер для получения роли
    if (sessionId) {
        let json = {
            session: sessionId // отправляем sessionId на сервер
        };

        HttpRequestPostJson('getRole', function (request) {
            const role = request.answer; // Получаем роль пользователя

            // Проверяем роль и перенаправляем пользователя
            if (role === "Administrator") {
                window.location.href = '/adminpanel';
            } else if (role === "Student") {
                window.location.href = '/studentmain';
            } else if (role === "Jury") {
                window.location.href = '/jurymain';
            } else if (role === "Inspector studies") {
                window.location.href = '/inspectormain';
            } else if (role === "Inspector science") {
                window.location.href = '/inspectormain';
            } else if (role === "Inspector activities") {
                window.location.href = '/inspectormain';
            } else if (role === "Inspector culture") {
                window.location.href = '/inspectormain';
            } else if (role === "Inspector sport") {
                window.location.href = '/inspectormain';
            } else {
                console.error("Неизвестная роль: " + role);
                alert("Ошибка: неизвестная роль пользователя");
            }
        }, json);
    } else {
        console.error("Сессия не найдена, пользователь не авторизован.");
        alert("Ошибка: сессия не найдена.");
    }
}

