is_correct_session()

function openBlockContainer(count) {
    var elements = document.getElementsByClassName("block-container")
    var elements2 = document.getElementsByClassName("buttons-container-button")
    for (let i = 0; i < elements2.length; i++){
        elements2[i].classList = "buttons-container-button bcb-grey"
        elements[i].style.display = "none"
    }
    elements2[count].classList = "buttons-container-button bcb-main"
    elements[count].style.display = "flex"
}






function update() {
    let json = {
        session: sessionStorage.getItem('sessionId')
    }

    HttpRequestPostJson('GetListInfo', function (request) {
        if (!request || !request.usersInfo) {
            document.getElementById("main-container-select").innerHTML = '<div class="container-course">Ошибка загрузки курсов</div>';
            return;
        }

        document.getElementById("buttonUser").innerHTML = "Пользователи: " + request.usersInfo.length

        var block = "<option value='-1'> -- Выберите пользователя -- </option>";
        for (var i = 0; i < request.usersInfo.length; i++) {
            block += '<option value="' + i + '">' + request.usersInfo[i][0] + '</option>'
        }
        document.getElementById("c-u").innerHTML = block;


        document.getElementById("buttonCourse").innerHTML = "Курсы: " + request.courses.length

        var block = "<option value='-1'> -- Выберите курс -- </option>";
        for (var i = 0; i < request.courses.length; i++) {
            block += '<option value="' + i + '">' + request.courses[i] + '</option>'
        }

        document.getElementById("c-c").innerHTML = block;
        document.getElementById("c-c-i-m").innerHTML = block;
        document.getElementById("c-c-i-l").innerHTML = block;

        document.getElementById("c-c-i-m-a").innerHTML = block;
        document.getElementById("c-c-i-l-a").innerHTML = block;

        document.getElementById("c-c-i-m").addEventListener("change", OnChangeCourse(request, "c-c-i-m", "c-m"));
        document.getElementById("c-c-i-l").addEventListener("change", OnChangeCourse(request, "c-c-i-l", "c-m-i-l"));

        document.getElementById("c-c-i-l-a").addEventListener("change", OnChangeCourse(request, "c-c-i-l-a", "c-m-i-l-a"));

        document.getElementById("c-m-i-l").addEventListener("change", OnChangeModule(request, "c-c-i-l", "c-m-i-l", "c-l"));

        var block = "<option value='-1'> -- Выберите видео -- </option>";
        for (var i = 0; i < request.videos.length; i++) {
            block += '<option value="' + i + '">' + request.videos[i] + '</option>'
        }
        document.getElementById("c-v").innerHTML = block;

        var block = "<option value='-1'> -- Выберите документ -- </option>";
        for (var i = 0; i < request.documents.length; i++) {
            block += '<option value="' + i + '">' + request.documents[i] + '</option>'
        }
        document.getElementById("c-d").innerHTML = block;

    }, json)
}

update();




const OnChangeCourse = (request, id_1, id_2) => event => {
    var block = "<option value='-1'> -- Выберите модуль -- </option>";
    for (var i = 0; i < request.coursesInfo[document.getElementById(id_1).value][1].length; i++) {
        block += '<option value="' + i + '">' + request.coursesInfo[document.getElementById(id_1).value][1][i][0] + '</option>'
    }
    document.getElementById(id_2).innerHTML = block;
}

const OnChangeModule = (request, id_1, id_2, id_3) => event => {
    var block = "<option value='-1'> -- Выберите урок -- </option>";
    for (var i = 0; i < request.coursesInfo[document.getElementById(id_1).value][1][document.getElementById(id_2).value][1].length; i++) {
        block += '<option value="' + i + '">' + request.coursesInfo[document.getElementById(id_1).value][1][document.getElementById(id_2).value][1][i] + '</option>'
    }
    document.getElementById(id_3).innerHTML = block;
}





function showLK(type) {
    if(type == 0 || document.getElementById("c-u").value != "-1"){
        var elements = document.getElementsByClassName("selection-container")
        elements[0].style.display = "none"
        elements[1].style.display = "flex"
        elements[2].style.display = "none"

        if (type == 0) {
            document.getElementById("mbac-title").innerHTML = "Пользователь | добавление"
            document.getElementById("save_changes").setAttribute( "onClick", "add_change_User(0)");

            document.getElementById("mbac-avatar").src = "static/main/img/no_photo.png"

        }else if(type == 1){
            if (document.getElementById("c-u").value != "-1") {

                var json = {
                    session: sessionStorage.getItem('sessionId'),
                    userPosition: document.getElementById("c-u").value
                }

                HttpRequestPostJson("GetUserInfo", function (request) {
                    if (request) {

                        document.getElementById("mbac-title").innerHTML = "Пользователь | " + request.surname + " " + request.name
                        document.getElementById("mdcb-name").value = request.name
                        document.getElementById("mdcb-surname").value = request.surname
                        document.getElementById("mdcb-postname").value = request.postname
                        document.getElementById("mdcb-email").value = request.email
                        document.getElementById("mdcb-number").value = request.number

                        document.getElementById("mdcb-login").value = request.login
                        document.getElementById("mdcb-password").value = request.password

                        document.getElementById("mdcb-role").value = request.role

                        if(request.avatar != "") document.getElementById("mbac-avatar").src = request.avatar
                        else document.getElementById("mbac-avatar").src = "static/main/img/no_photo.png"

                    }
                }, json)

                document.getElementById("save_changes").setAttribute( "onClick", "add_change_User(1)");

            }else red_flag("c-u")
        }

        var json = {
            session: sessionStorage.getItem('sessionId'),
            userNumber: document.getElementById("c-u").value
        }

        HttpRequestPostJson("GetAllCourses", function (request) {
            if (request) {
                var inner = ""
                for(var i = 0; i < request.courses.length; i++){
                    checkbox_value.push(false)
                    if(request.courses[i][1]){
                        inner += '<div class="checkbox-row"><div class="checkbox checkbox1 button-checked" onclick="checkbox('+i+')">&#10004;</div><label style="line-height:1px;">'+request.courses[i][0]+'</label></div>'
                        checkbox_value[i] = true
                    }else{
                        inner += '<div class="checkbox-row"><div class="checkbox checkbox1 button-unchecked" onclick="checkbox('+i+')">&#10004;</div><label style="line-height:1px;">'+request.courses[i][0]+'</label></div>'
                        checkbox_value[i] = false
                    }
                }
                document.getElementById("select-course-container").innerHTML = inner
            }
        }, json)
    }else red_flag("c-u")
}




function deleteUser(){
    if (document.getElementById("c-u").value != "-1") {
        createAlertSuccess("Подтвердить удаление?", function(){
            var json = {
                session: sessionStorage.getItem('sessionId'),
                userPosition: document.getElementById("c-u").value
            }

            HttpRequestPostJson("DeleteUser", function (request) {
                if (request) {
                    window.location.href = '/adminpanel'
                }
            }, json)
        })
    }else red_flag("c-u")
}



function add_change_User(type) {

    if (document.getElementById("mdcb-name").value != ""){
        if (document.getElementById("mdcb-surname").value != ""){
            if (document.getElementById("mdcb-login").value != ""){
                if (document.getElementById("mdcb-password").value != ""){
                    if (document.getElementById("mdcb-role").value != "-1") {

                        var formData = new FormData()
                        formData.append("session", sessionStorage.getItem('sessionId'))

                        if(type == 0) formData.append("userNumber", "-1")
                        else formData.append("userNumber", document.getElementById("c-u").value)

                        formData.append("name", document.getElementById("mdcb-name").value)
                        formData.append("surname", document.getElementById("mdcb-surname").value)
                        formData.append("postname", document.getElementById("mdcb-postname").value)
                        formData.append("email", document.getElementById("mdcb-email").value)
                        formData.append("number", document.getElementById("mdcb-number").value)

                        formData.append("login", document.getElementById("mdcb-login").value)
                        formData.append("password", document.getElementById("mdcb-password").value)
                        formData.append("role", document.getElementById("mdcb-role").value)

                        formData.append("open_courses", checkbox_value)

                        var adress = document.getElementById("mbac-avatar").src.split("/")
                        if(adress[adress.length-1] == "no_photo.png") formData.append("clearAvatar", "clear")
                        else formData.append("clearAvatar", "")
                        formData.append("avatar", document.getElementById("photo-user-file").files[0])


                        createLockScreen("Ожидаем загрузку на сервер-хранилище...</br> Вас вернет в панель администрирования после загрузки!")
                        HttpRequestPostFormData("EditUser", function (request) {
                            if (request) {
                                if(request.answer == "equalsLogin"){
                                    createMessage("НЕЛЬЗЯ ЧТОБЫ ЛОГИНЫ ПОВТОРЯЛИСЬ", "error")
                                    createUnlockScreen()
                                }else window.location.href = '/adminpanel'
                            }
                        },formData)
                    }else red_flag("mdcb-role")
                }else red_flag("mdcb-password")
            }else red_flag("mdcb-login")
        }else red_flag("mdcb-surname")
    }else red_flag("mdcb-name")

}



function showCourse(type) {
    if(type == 0 || document.getElementById("c-c").value != "-1"){
        var elements = document.getElementsByClassName("selection-container")
        elements[0].style.display = "none"
        elements[1].style.display = "none"
        elements[3].style.display = "none"
        elements[4].style.display = "none"
        elements[2].style.display = "flex"

        if (type == 0) {
            document.getElementById("cdc-title").innerHTML = "Курс | добавление"
            document.getElementById("save_changes_course").setAttribute( "onClick", "add_change_Course(0)");
            document.getElementById("cdc-avatar").src = "static/main/img/no_photo.png"
        }else if(type == 1){
            var json = {
                session: sessionStorage.getItem('sessionId'),
                coursePosition: document.getElementById("c-c").value
            }

            HttpRequestPostJson("GetCourseInfo", function (request) {
                if (request) {
                    document.getElementById("cdc-title").innerHTML = "Курс | " + request.name
                    document.getElementById("cdc-name").value = request.name
                    document.getElementById("cdc-description").value = request.description
                    if(request.avatar != "") document.getElementById("cdc-avatar").src = request.avatar
                    else document.getElementById("cdc-avatar").src = "static/main/img/no_photo.png"
                }
            }, json)

            document.getElementById("save_changes_course").setAttribute( "onClick", "add_change_Course(1)");




            var json = {
                session: sessionStorage.getItem('sessionId'),
                coursePosition: document.getElementById("c-c").value
            }

            HttpRequestPostJson("GetOrderModules", function (request) {
                if (request) {
                    var inner = ""
                    for(var i = 0; i < request.modules.length; i++){
                        inner += '<li class="list-order-el">'+request.modules[i]+'</li>'
                    }
                    document.getElementById("course-order-container").innerHTML = inner

                    slist(document.getElementById("course-order-container"));
                }
            }, json)

        }




    }else red_flag("c-c")
}


function showModule(type) {
    if(type == 0 || document.getElementById("c-c-i-m").value != "-1"){
        if(type == 0 || document.getElementById("c-m").value != "-1"){
            if(type == 1 || document.getElementById("c-c-i-m-a").value != "-1" ){

                var elements = document.getElementsByClassName("selection-container")
                elements[0].style.display = "none"
                elements[1].style.display = "none"
                elements[2].style.display = "none"
                elements[4].style.display = "none"
                elements[3].style.display = "flex"

                if (type == 0) {
                    document.getElementById("mdc-title").innerHTML = "Модуль | добавление"
                    document.getElementById("save_changes_module").setAttribute( "onClick", "add_change_Module(0)");

                     document.getElementById("mdc-avatar").src = "static/main/img/no_photo.png"
                }else if(type == 1){

                    var json = {
                        session: sessionStorage.getItem('sessionId'),
                        coursePosition: document.getElementById("c-c-i-m").value,
                        modulePosition: document.getElementById("c-m").value,
                    }

                    HttpRequestPostJson("GetModuleInfo", function (request) {
                        if (request) {
                            document.getElementById("mdc-title").innerHTML = "Модуль | " + request.name
                            document.getElementById("mdc-name").value = request.name
                            if(request.avatar != "") document.getElementById("mdc-avatar").src = request.avatar
                            else document.getElementById("mdc-avatar").src = "static/main/img/no_photo.png"
                        }
                    }, json)

                    document.getElementById("save_changes_module").setAttribute( "onClick", "add_change_Module(1)");




                    var json = {
                        session: sessionStorage.getItem('sessionId'),
                        coursePosition: document.getElementById("c-c-i-m").value,
                        modulePosition: document.getElementById("c-m").value,
                    }

                    HttpRequestPostJson("GetOrderLessons", function (request) {
                        if (request) {
                            var inner = ""
                            for(var i = 0; i < request.lessons.length; i++){
                                inner += '<li class="list-order-el">'+request.lessons[i]+'</li>'
                            }
                            document.getElementById("module-order-container").innerHTML = inner

                            slist(document.getElementById("module-order-container"));
                        }
                    }, json)

                }



            }else red_flag("c-c-i-m-a")
        }else red_flag("c-m")
    }else red_flag("c-c-i-m")
}












function showLesson(type) {
    if(type == 0 || document.getElementById("c-c-i-l").value != "-1"){
        if(type == 0 || document.getElementById("c-m-i-l").value != "-1"){
            if(type == 0 || document.getElementById("c-l").value != "-1"){
                if(type == 1 || document.getElementById("c-c-i-l-a").value != "-1" ){
                    if(type == 1 || document.getElementById("c-m-i-l-a").value != "-1" ){
                        var elements = document.getElementsByClassName("selection-container")
                        elements[0].style.display = "none"
                        elements[1].style.display = "none"
                        elements[2].style.display = "none"
                        elements[3].style.display = "none"
                        elements[4].style.display = "flex"

                        if (type == 0) {
                            document.getElementById("ldc-title").innerHTML = "Урок | добавление"
                            document.getElementById("save_changes_lesson").setAttribute( "onClick", "add_change_Lesson(0)");
                            document.getElementById("ldc-avatar").src = "static/main/img/no_photo.png"
                        }else if(type == 1){

                                        var json = {
                                            session: sessionStorage.getItem('sessionId'),
                                            coursePosition: document.getElementById("c-c-i-l").value,
                                            modulePosition: document.getElementById("c-m-i-l").value,
                                            lessonPosition: document.getElementById("c-l").value,
                                        }

                                        HttpRequestPostJson("GetLessonInfo", function (request) {
                                            if (request) {
                                                document.getElementById("ldc-title").innerHTML = "Урок | " + request.name
                                                document.getElementById("ldc-name").value = request.name
                                                if(request.avatar != "") document.getElementById("ldc-avatar").src = request.avatar
                                                else document.getElementById("ldc-avatar").src = "static/main/img/no_photo.png"
                                                document.getElementById("ldc-text").value = request.text
                                            }
                                        }, json)

                                        document.getElementById("save_changes_lesson").setAttribute( "onClick", "add_change_Lesson(1)");

                        }


                        var json = {
                            session: sessionStorage.getItem('sessionId'),
                            coursePosition: document.getElementById("c-c-i-l").value,
                            modulePosition: document.getElementById("c-m-i-l").value,
                            lessonPosition: document.getElementById("c-l").value
                        }

                        HttpRequestPostJson("GetAllVideoAndDocument", function (request) {
                            if (request) {
                                var inner = ""
                                var inner2 = ""
                                for(var i = 0; i < request.videos.length; i++){
                                    checkbox_value2.push(false)
                                    var text = request.videos[i][0]
                                    if(request.videos[i][2] == true) text+=" (уже занято)"
                                    if(request.videos[i][1]){
                                        inner += '<div class="checkbox-row"><div class="checkbox checkbox2 button-checked" onclick="checkbox2('+i+')">&#10004;</div><label style="line-height:1px;">'+text+'</label></div>'
                                        checkbox_value2[i] = true
                                    }else{
                                        inner += '<div class="checkbox-row"><div class="checkbox checkbox2 button-unchecked" onclick="checkbox2('+i+')">&#10004;</div><label style="line-height:1px;">'+text+'</label></div>'
                                        checkbox_value2[i] = false
                                    }
                                }
                                document.getElementById("list_videos").innerHTML = inner

                                for(var i = 0; i < request.documents.length; i++){
                                    checkbox_value3.push(false)
                                    var text = request.documents[i][0]
                                    if(request.documents[i][2] == true) text+=" (уже занято)"
                                    if(request.documents[i][1]){
                                        inner2 += '<div class="checkbox-row"><div class="checkbox checkbox3 button-checked" onclick="checkbox3('+i+')">&#10004;</div><label style="line-height:1px;">'+text+'</label></div>'
                                        checkbox_value3[i] = true
                                    }else{
                                        inner2 += '<div class="checkbox-row"><div class="checkbox checkbox3 button-unchecked" onclick="checkbox3('+i+')">&#10004;</div><label style="line-height:1px;">'+text+'</label></div>'
                                        checkbox_value3[i] = false
                                    }
                                }
                                document.getElementById("list_documents").innerHTML = inner2
                            }
                        }, json)
                    }else red_flag("c-m-i-l-a")
                }else red_flag("c-c-i-l-a")
            }else red_flag("c-l")
        }else red_flag("c-m-i-l")
    }else red_flag("c-c-i-l")
}








function add_change_Lesson(type) {
    if (document.getElementById("ldc-name").value != ""){
        if (document.getElementById("ldc-text").value != ""){

            var formData = new FormData()
            formData.append("session", sessionStorage.getItem('sessionId'))

            if(type == 0) formData.append("lessonPosition", "-1")
            else formData.append("lessonPosition", document.getElementById("c-l").value)

            formData.append("name", document.getElementById("ldc-name").value)
            formData.append("text", document.getElementById("ldc-text").value)

            formData.append("avatar", document.getElementById("photo-lesson-file").files[0])

            var adress = document.getElementById("ldc-avatar").src.split("/")
            if(adress[adress.length-1] == "no_photo.png") formData.append("clearAvatar", "clear")
            else formData.append("clearAvatar", "")

            formData.append("set_documents", checkbox_value3)
            formData.append("set_videos", checkbox_value2)

            if(type ==  0) formData.append("coursePosition", document.getElementById("c-c-i-l-a").value)
            else  formData.append("coursePosition", document.getElementById("c-c-i-l").value)

            if(type ==  0) formData.append("modulePosition", document.getElementById("c-m-i-l-a").value)
            else formData.append("modulePosition", document.getElementById("c-m-i-l").value)

            createLockScreen("Ожидаем загрузку на сервер-хранилище...</br> Вас вернет в панель администрирования после загрузки!")
            HttpRequestPostFormData("EditLesson", function (request) {
                if (request) {
                    window.location.href = '/adminpanel'
                }
            }, formData)


        }else red_flag("ldc-text")
    }else red_flag("ldc-name")

}


























function deleteCourse(){
    if (document.getElementById("c-c").value != "-1") {
        createAlertSuccess("Подтвердить удаление?", function(){
            var json = {
                session: sessionStorage.getItem('sessionId'),
                coursePosition: document.getElementById("c-c").value
            }

            HttpRequestPostJson("DeleteCourse", function (request) {
                if (request) {
                    window.location.href = '/adminpanel'
                }
            }, json)
        })
    }else red_flag("c-c")
}




function deleteModule(){
    if (document.getElementById("c-c-i-m").value != "-1") {
        if (document.getElementById("c-m").value != "-1") {
            createAlertSuccess("Подтвердить удаление?", function(){
                var json = {
                    session: sessionStorage.getItem('sessionId'),
                    coursePosition: document.getElementById("c-c-i-m").value,
                    modulePosition: document.getElementById("c-m").value,
                }

                HttpRequestPostJson("DeleteModule", function (request) {
                    if (request) {
                        window.location.href = '/adminpanel'
                    }
                }, json)
            })
        }else red_flag("c-m")
    }else red_flag("c-c-i-m")
}

function deleteLesson(){
    if (document.getElementById("c-c-i-l").value != "-1") {
        if (document.getElementById("c-m-i-l").value != "-1") {
            if (document.getElementById("c-l").value != "-1") {
                createAlertSuccess("Подтвердить удаление?", function(){
                    var json = {
                        session: sessionStorage.getItem('sessionId'),
                        coursePosition: document.getElementById("c-c-i-l").value,
                        modulePosition: document.getElementById("c-m-i-l").value,
                        lessonPosition: document.getElementById("c-l").value,
                    }

                    HttpRequestPostJson("DeleteLesson", function (request) {
                        if (request) {
                            window.location.href = '/adminpanel'
                        }
                    }, json)
                })
            }else red_flag("c-l")
        }else red_flag("c-m-i-l")
    }else red_flag("c-c-i-l")
}



function add_change_Course(type) {

    if (document.getElementById("cdc-name").value != ""){
        if (document.getElementById("cdc-description").value != ""){


            var formData = new FormData()
            formData.append("session", sessionStorage.getItem('sessionId'))

            if(type == 0) formData.append("coursePosition", "-1")
            else formData.append("coursePosition", document.getElementById("c-c").value)

            formData.append("name", document.getElementById("cdc-name").value)
            formData.append("description", document.getElementById("cdc-description").value)

            var adress = document.getElementById("cdc-avatar").src.split("/")
            if(adress[adress.length-1] == "no_photo.png") formData.append("clearAvatar", "clear")
            else formData.append("clearAvatar", "")

            var objectsName = []
            var objects = document.getElementById("course-order-container").getElementsByTagName("li")
            for(var i = 0; i < objects.length; i++) objectsName[i] = (objects[i].innerHTML)
            formData.append("modules_order", objectsName)

            formData.append("avatar", document.getElementById("photo-course-file").files[0])

            createLockScreen("Ожидаем загрузку на сервер-хранилище...</br> Вас вернет в панель администрирования после загрузки!")
            HttpRequestPostFormData("EditCourse", function (request) {
                if (request) {
                    window.location.href = '/adminpanel'
                }
            }, formData)



        }else red_flag("cdc-description")
    }else red_flag("cdc-name")


}





function add_change_Module(type) {

    if (document.getElementById("mdc-name").value != ""){

        var formData = new FormData()
        formData.append("session", sessionStorage.getItem('sessionId'))

        if(type == 0) formData.append("modulePosition", "-1")
        else formData.append("modulePosition", document.getElementById("c-m").value)

        formData.append("name", document.getElementById("mdc-name").value)

        var adress = document.getElementById("mdc-avatar").src.split("/")
        if(adress[adress.length-1] == "no_photo.png") formData.append("clearAvatar", "clear")
        else formData.append("clearAvatar", "")

        formData.append("avatar", document.getElementById("photo-module-file").files[0])


        var objectsName = []
        var objects = document.getElementById("module-order-container").getElementsByTagName("li")
        for(var i = 0; i < objects.length; i++) objectsName[i] = (objects[i].innerHTML)
        formData.append("lessons_order", objectsName)

        if(type ==  0) formData.append("coursePosition", document.getElementById("c-c-i-m-a").value)
        else formData.append("coursePosition", document.getElementById("c-c-i-m").value)

        createLockScreen("Ожидаем загрузку на сервер-хранилище...</br> Вас вернет в панель администрирования после загрузки!")
        HttpRequestPostFormData("EditModule", function (request) {
            if (request) {
                window.location.href = '/adminpanel'
            }
        }, formData)

    }else red_flag("mdc-name")

}




































function showVideo(type) {
    if(type == 0 || document.getElementById("c-v").value != "-1"){
        var elements = document.getElementsByClassName("selection-container")
        elements[0].style.display = "none"
        elements[1].style.display = "none"
        elements[2].style.display = "none"
        elements[3].style.display = "none"
        elements[4].style.display = "none"
        elements[6].style.display = "none"
        elements[5].style.display = "flex"

        if (type == 0) {
            document.getElementById("vdc-title").innerHTML = "Видео | добавление"
            document.getElementById("save_changes_video").setAttribute( "onClick", "add_change_Video(0)");
        }else if(type == 1){

            var json = {
                session: sessionStorage.getItem('sessionId'),
                videoPosition: document.getElementById("c-v").value
            }

            HttpRequestPostJson("GetVideoInfo", function (request) {
                if (request) {
                    document.getElementById("vdc-title").innerHTML = "Видео | " + request.name
                    document.getElementById("vdc-name").value = request.name
                }
            }, json)

            document.getElementById("save_changes_video").setAttribute( "onClick", "add_change_Video(1)");
        }
    }else red_flag("c-v")
}


function showDocument(type) {
    if(type == 0 || document.getElementById("c-d").value != "-1"){
        var elements = document.getElementsByClassName("selection-container")

        elements[0].style.display = "none"
        elements[1].style.display = "none"
        elements[2].style.display = "none"
        elements[3].style.display = "none"
        elements[4].style.display = "none"
        elements[5].style.display = "none"
        elements[6].style.display = "flex"

        if (type == 0) {
            document.getElementById("ddc-title").innerHTML = "Документ | добавление"
            document.getElementById("save_changes_document").setAttribute( "onClick", "add_change_Document(0)");
        }else if(type == 1){

            var json = {
                session: sessionStorage.getItem('sessionId'),
                documentPosition: document.getElementById("c-d").value
            }

            HttpRequestPostJson("GetDocumentInfo", function (request) {
                if (request) {
                    document.getElementById("ddc-title").innerHTML = "Документ | " + request.name
                    document.getElementById("ddc-name").value = request.name
                }
            }, json)

            document.getElementById("save_changes_document").setAttribute( "onClick", "add_change_Document(1)");
        }
    }else red_flag("c-d")
}















function add_change_Video(type) {
    if (document.getElementById("vdc-name").value != ""){
        if (document.getElementById("vdc-file").files.length != 0){

            var formData = new FormData();
            formData.append('session', sessionStorage.getItem('sessionId'));
            formData.append('position', document.getElementById("c-v").value);
            formData.append('file', document.getElementById("vdc-file").files[0]);
            formData.append('name', document.getElementById("vdc-name").value);


            if(type ==  0) formData.append('condition', false);
            else formData.append('condition', true);

            createLockScreen("Ожидаем загрузку на сервер-хранилище...</br> Вас вернет в панель администрирования после загрузки!")
            HttpRequestPostFormDataWithProgressBar("EditVideo", function (request) {
                if (request) {
                    window.location.href = '/adminpanel'
                }
            }, formData)
        }else red_flag("label-video")
    }else red_flag("vdc-name")
}






function add_change_Document(type) {
    if (document.getElementById("ddc-name").value != ""){
        if (document.getElementById("ddc-file").files.length != 0){

            var formData = new FormData();
            formData.append('session', sessionStorage.getItem('sessionId'));
            formData.append('position', document.getElementById("c-d").value);
            formData.append('file', document.getElementById("ddc-file").files[0]);
            formData.append('name', document.getElementById("ddc-name").value);


            if(type ==  0) formData.append('condition', false);
            else formData.append('condition', true);


            createLockScreen("Ожидаем загрузку на сервер-хранилище...</br> Вас вернет в панель администрирования после загрузки!")
            HttpRequestPostFormDataWithProgressBar("EditDocument", function (request) {
                if (request) {
                    window.location.href = '/adminpanel'
                }
            }, formData)

        }else red_flag("label-file")
    }else red_flag("ddc-name")
}








function deleteVideo(){
    if (document.getElementById("c-v").value != "-1") {
        createAlertSuccess("Подтвердить удаление?", function(){
            var json = {
                session: sessionStorage.getItem('sessionId'),
                videoPosition: document.getElementById("c-v").value
            }

            HttpRequestPostJson("DeleteVideo", function (request) {
                if (request) {
                    window.location.href = '/adminpanel'
                }
            }, json)
        })
    }else red_flag("c-v")
}



function deleteDocument(){
    if (document.getElementById("c-d").value != "-1") {
        createAlertSuccess("Подтвердить удаление?", function(){
            var json = {
                session: sessionStorage.getItem('sessionId'),
                documentPosition: document.getElementById("c-d").value
            }

            HttpRequestPostJson("DeleteDocument", function (request) {
                if (request) {
                    window.location.href = '/adminpanel'
                }
            }, json)
        })
    }else red_flag("c-d")
}



































function course(i) {
    sessionStorage.setItem('numberCourse', i);
    window.location.href = '/course'
}


change_data(true)
function change_data(selector){
    if(selector){
        document.getElementById("me-data-container").style.display = "flex"
        document.getElementById("select-course-container").style.display = "none"

        document.getElementById("data_button").style.boxShadow = "0px 4px 0px var(--main-color-dark)"
        document.getElementById("data_button").style.background = "var(--main-color)"

        document.getElementById("course_button").style.boxShadow = "0px 4px 0px var(--grey-color-dark)"
        document.getElementById("course_button").style.background = "var(--grey-color)"

    }else{
        document.getElementById("me-data-container").style.display = "none"
        document.getElementById("select-course-container").style.display = "flex"

        document.getElementById("course_button").style.boxShadow = "0px 4px 0px var(--main-color-dark)"
        document.getElementById("course_button").style.background = "var(--main-color)"

        document.getElementById("data_button").style.boxShadow = "0px 4px 0px var(--grey-color-dark)"
        document.getElementById("data_button").style.background = "var(--grey-color)"


    }
}


var checkbox_value = []
function checkbox(t){
    checkbox_value[t] = !checkbox_value[t]
    var checkbox = document.getElementsByClassName("checkbox1")
    checkbox[t].classList.toggle('button-checked');
    checkbox[t].classList.toggle('button-unchecked');
}


var checkbox_value2 = []
function checkbox2(t){
    checkbox_value2[t] = !checkbox_value2[t]
    var checkbox2 = document.getElementsByClassName("checkbox2")
    checkbox2[t].classList.toggle('button-checked');
    checkbox2[t].classList.toggle('button-unchecked');
}

var checkbox_value3 = []
function checkbox3(t){
    checkbox_value3[t] = !checkbox_value3[t]
    var checkbox3 = document.getElementsByClassName("checkbox3")
    checkbox3[t].classList.toggle('button-checked');
    checkbox3[t].classList.toggle('button-unchecked');
}













change_lesson(0)
change_module(0)
change_course(0)
function change_lesson(selector){
    if(selector == 0){
        document.getElementById("lesson-data-container").style.display = "flex"
        document.getElementById("change_button_document_video").style.display = "none"

        document.getElementById("change_button_text").style.boxShadow = "0px 4px 0px var(--main-color-dark)"
        document.getElementById("change_button_text").style.background = "var(--main-color)"

        document.getElementById("change_button_video").style.boxShadow = "0px 4px 0px var(--grey-color-dark)"
        document.getElementById("change_button_video").style.background = "var(--grey-color)"


    }else if(selector == 1){
        document.getElementById("lesson-data-container").style.display = "none"
        document.getElementById("change_button_document_video").style.display = "flex"

        document.getElementById("change_button_video").style.boxShadow = "0px 4px 0px var(--main-color-dark)"
        document.getElementById("change_button_video").style.background = "var(--main-color)"

        document.getElementById("change_button_text").style.boxShadow = "0px 4px 0px var(--grey-color-dark)"
        document.getElementById("change_button_text").style.background = "var(--grey-color)"
    }

}


function change_course(selector){
    if(selector == 0){
        document.getElementById("course-data-container").style.display = "flex"
        document.getElementById("course-order-container").style.display = "none"

        document.getElementById("change_button_data_course").style.boxShadow = "0px 4px 0px var(--main-color-dark)"
        document.getElementById("change_button_data_course").style.background = "var(--main-color)"

        document.getElementById("change_button_order_course").style.boxShadow = "0px 4px 0px var(--grey-color-dark)"
        document.getElementById("change_button_order_course").style.background = "var(--grey-color)"


    }else if(selector == 1){
        document.getElementById("course-data-container").style.display = "none"
        document.getElementById("course-order-container").style.display = "flex"

        document.getElementById("change_button_order_course").style.boxShadow = "0px 4px 0px var(--main-color-dark)"
        document.getElementById("change_button_order_course").style.background = "var(--main-color)"

        document.getElementById("change_button_data_course").style.boxShadow = "0px 4px 0px var(--grey-color-dark)"
        document.getElementById("change_button_data_course").style.background = "var(--grey-color)"
    }
}


function change_module(selector){
    if(selector == 0){
        document.getElementById("module-data-container").style.display = "flex"
        document.getElementById("module-order-container").style.display = "none"

        document.getElementById("change_button_data_module").style.boxShadow = "0px 4px 0px var(--main-color-dark)"
        document.getElementById("change_button_data_module").style.background = "var(--main-color)"

        document.getElementById("change_button_order_module").style.boxShadow = "0px 4px 0px var(--grey-color-dark)"
        document.getElementById("change_button_order_module").style.background = "var(--grey-color)"


    }else if(selector == 1){
        document.getElementById("module-data-container").style.display = "none"
        document.getElementById("module-order-container").style.display = "flex"

        document.getElementById("change_button_order_module").style.boxShadow = "0px 4px 0px var(--main-color-dark)"
        document.getElementById("change_button_order_module").style.background = "var(--main-color)"

        document.getElementById("change_button_data_module").style.boxShadow = "0px 4px 0px var(--grey-color-dark)"
        document.getElementById("change_button_data_module").style.background = "var(--grey-color)"
    }
}




document.getElementById("vdc-file").addEventListener('change', (e) => {
    var file_name = e.target.files[0].name
    if(e.target.files[0].length > 30){
        var file_name_split = file_name.name.split(".")
        document.getElementById("vdc-name").value = file_name.substring(0,20) + file_name_split[file_name_split.length-1]
    }else{
        document.getElementById("vdc-name").value = file_name
    }
});


document.getElementById("ddc-file").addEventListener('change', (e) => {
    var file_name = e.target.files[0].name
    if(e.target.files[0].name.length > 30){
        var file_name_split = file_name.split(".")
        document.getElementById("ddc-name").value = file_name.substring(0,20) +"."+ file_name_split[file_name_split.length-1]
    }else{
        document.getElementById("ddc-name").value = file_name
    }
});



document.getElementById("photo-user-file").addEventListener('change', (e) => {
    var reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("mbac-avatar").src = e.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});



document.getElementById("photo-course-file").addEventListener('change', (e) => {
    var reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("cdc-avatar").src = e.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});


document.getElementById("photo-module-file").addEventListener('change', (e) => {
    var reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("mdc-avatar").src = e.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});


document.getElementById("photo-lesson-file").addEventListener('change', (e) => {
    var reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("ldc-avatar").src = e.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});

function deleteImg(id_input, id_image){
    document.getElementById(id_image).src="static/main/img/no_photo.png"
}



