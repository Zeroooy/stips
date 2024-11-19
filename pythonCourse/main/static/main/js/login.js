function login() {
    var t1 = document.getElementById("login-input").value
    var t2 = document.getElementById("password-input").value
    if(t1 != ""){
        if(t2 != ""){

            let json = {
                login: t1,
                password: t2
            }

            HttpRequestPostJson('GetLogin', function (request) {

                if (request.answer == "bad_password") {
                    createMessage("НЕВЕРНЫЙ ПАРОЛЬ", "error")
                } else if(request.answer == "bad_login") {
                    createMessage("НЕВЕРНЫЙ ЛОГИН", "error")
                }else if (request.answer != "False") {
                    sessionStorage.setItem('sessionId', request.answer)
                    window.location.href = '/menu'
                }

            }, json)
        }else red_flag("password-input")
    }else red_flag("login-input")
}