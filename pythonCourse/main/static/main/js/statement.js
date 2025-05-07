
const checkboxs = document.getElementsByClassName("custom-checkbox")
const buttons = document.getElementsByClassName("perehod")

for(let i = 0; i < checkboxs.length; i++) {
    checkboxs[i].addEventListener('change', function() {
        if (this.checked) {
          buttons[i].disabled = false;  // Разблокируем кнопку
          buttons[i].classList.add('hover:bg-red-200');
          buttons[i].classList.remove('text-black/50');
        } else {
          buttons[i].disabled = true;   // Блокируем кнопку
          buttons[i].classList.remove('hover:bg-red-200');
          buttons[i].classList.add('text-black/50');
        }
    });
}

// Устанавливаем активную кнопку
function setActiveFrame(e) {
    var els = document.getElementsByClassName("perehod-")

    for (let i = 0; i < els.length; i++) {
      els[i].classList.remove("active")
    }

    els[e].classList.toggle("active")

    var els = document.getElementsByClassName("all-frame")
    for (let i = 0; i < els.length; i++) {
      els[i].style.display = "none"
    }

    els[e].style.display = "block"
}







// Функция обновления формы в зависимости от выбранного раздела
function fillFrames() {
    var checkStud = true
    HttpRequestPostJson('getRole', function (response) {
        if (response.answer != "Student"){
            checkStud = false
            if(!checkStud){
                document.querySelector("#input-field-fio").disabled = true
                document.querySelector("#input-field-phone").disabled = true
                document.querySelector("#input-field-group").disabled = true
                document.querySelector("#input-field-inst").disabled = true
                document.querySelector("#input-field-mail").disabled = true
                document.querySelector("#agree-checkbox").disabled = true
                document.querySelector("#onlyFive").disabled = true
                document.querySelectorAll(".custom-checkbox").forEach(el_ => el_.disabled = true);
            }
        }

        createDuplicate([0, 1], 3, checkStud)

        createDuplicate([2,3,4,5,6, 10, 18], 9, checkStud)

        createDuplicate([7, 8], 1, checkStud)

        createDuplicate([9], 5, checkStud)

        createDuplicate([11, 12], 4, checkStud)

        createDuplicate([13, 14], 19, checkStud)

        createDuplicate([15, 17], 7, checkStud)

        createDuplicate([16, 20], 2, checkStud)

        createDuplicate([19], 17, checkStud)

        createDuplicate([21], 4, checkStud)

        createDuplicate([22], 24, checkStud)

        createDuplicate([23], 3, checkStud)

        createDuplicate([24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45], 5, checkStud)

        // Связываем значения выпадающего списка с нужными записями


        // Добавляем обработчик события на изменение выбора

        createListeners(".frame-mid11 .selector1", ".frame-mid11 .selector2", {
            "Членство в общественных организациях, студенческих объединениях": "Копия списка студенческого объединения, заверенного куратором",
            "Членство в ученом совете университета, института, факультета": "Копия приказа о составе ученого совета",
            "Выполнение функций студенческого куратора": "Копия распоряжения о назначении и распределении кураторов академических групп",
            "Выполнение функций старосты академической группы/старосты общежитий/секретаря": "Копия распоряжения дирекции о назначении старосты академической группы / копия списка, заверенного заведующим общежитием / копия списка, заверенного куратором студенческого объединения",
            "Руководство общественной организацией, студенческим объединением": "Копия наградного студенческого объединения, заверенного куратором"
        })

        createListeners(".frame-mid10 .selector1", ".frame-mid10 .selector2", {
            "Благодарность, благодарственное письмо ректора": "Копия благодарности, благодарственного письма",
            "Почетная грамота ректора": "Копия почетной грамоты",
            "Награда мэра, городской Думы": "Копия наградного документа, номер и дата постановления/распоряжения",
            "Награда губернатора": "Копия наградного документа, номер и дата постановления/распоряжения",
            "Награда органа исполнительной власти федерального уровня": "Копия наградного документа, номер и дата постановления/распоряжения"
        })

        createListeners(".frame-mid12 .selector1", ".frame-mid12 .selector2",  {
            "Член редакции студенческого центра кафедры / проекта": "Копия справки за подписью куратора пресс-центра о систематическом участии в деятельности + 1-2 скриншота",
            "Член редакции студенческого центра института / университета": "Копия справки за подписью куратора пресс-центра о систематическом участии в деятельности + 1-2 скриншота",
            "Победа в региональных конкурсах информационного сопровождения": "Копия документа, подтверждающего участие (сертификат/диплом)",
            "Победа во всероссийских конкурсах информационного сопровождения": "Копия документа, подтверждающего участие (сертификат/диплом)",
        })

        if(!checkStud){
            for (let i = 0; i < 51; i++) {
                var framesMid = document.querySelectorAll(".frame-mid" + i);
                framesMid.forEach(el => {
                    // Создаем элемент input
                    var checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.classList.add("top-1", "right-1", "scale-90", "cursor-pointer", "checkboxs");

                    // Добавляем чекбокс в элемент
                    el.appendChild(checkbox);
                });
            }

            document.querySelectorAll(".checkboxs").forEach(el => {
                el.addEventListener('change', function() {
                    var blocks_ = []
                    blocks_.push([0, document.querySelector("#onlyFive").selectedIndex-1])
                    for(let i = 0; i < 51; i++){
                        var frameMid = document.querySelectorAll(".frame-mid"+i)
                        frameMid.forEach(el2 => {
                            if(el2.querySelector(".checkboxs").checked == true){
                                blocks_.push([i+1, el2.querySelector(".el-var").selectedIndex-1])
                            }
                        })
                    }
                    const json = {
                        session: sessionStorage.getItem('sessionId'),
                        blocks: blocks_,
                    };

                    HttpRequestPostJson('autoPoints', function (response) {
                        document.querySelector("#points").value = response.answer
                    }, json)
                })
            })
        }
    }, {
        session: sessionStorage.getItem('sessionId')
    })

}


function createListeners(selector, selector2, messages){
    var els = document.querySelectorAll(selector)
    var els2 = document.querySelectorAll(selector2)
    for (var i = 0; i < els.length; i++) {
        const el = els[i]
        const el2 = els2[i]
        el.addEventListener("change", function (){
            el2.value = messages[el.value] || "Копия наградного документа";
        })
    }
}


function createDuplicate(elements, count, checkStud){
    elements.forEach(el => {
        document.querySelectorAll(".frame-mid"+el).forEach(section => {
            var clonedFieldsPred = section
            for (let i = 1; i <= count; i++) {
                let clonedFields = section.cloneNode(true); // Клонируем блок формы
                if(clonedFieldsPred != null){
                    clonedFields.classList.add('hidden');
                    if(checkStud){
                        clonedFieldsPred.addEventListener("change", function (){
                            clonedFields.classList.remove('hidden');
                        })
                    }
                }
                section.parentNode.append(clonedFields); // Добавляем в конец родителя
                if(!checkStud){

                    clonedFieldsPred.querySelectorAll(".el").forEach(el_ => {
                        if (el_.type === 'file') {
                            el_.parentElement.classList.remove('border-2');
                            if(el_.nextElementSibling.href == ""){
                                el_.nextElementSibling.classList.add('hidden')
                            };
                            el_.classList.add('hidden')
                        }else{
                            el_.disabled = true;
                        }
                    })
                }
                clonedFieldsPred = clonedFields
            }
        });
    })
}

















function interInfo(block){
    for (let key in block) { // проходим по блокам
        var frames = document.getElementsByClassName("frame-mid"+key)
        var count = 0

        if (block.hasOwnProperty(key)) {

            for (let key2 in block[key]) { // проходим по частям в блоке

                let elements = frames[count].querySelectorAll(".el")
                var count_ = 0
                frames[count].classList.remove('hidden');

                for (let key3 in block[key][key2]) {
                    if (elements[count_].type === 'file') {
                        const link = elements[count_].nextElementSibling; // соседний <a>

                        if (link && link.tagName === 'A') {
                            const fileUrl = block[key][key2][key3]; // ссылка на файл
                            if (fileUrl) {
                                const fullUrl = decodeURIComponent(fileUrl);  // декодируем путь и добавляем префикс
                                link.href = fullUrl;
                                link.classList.remove('hidden'); // если скрыта
                            } else {
                                link.classList.add('hidden'); // скрыть, если нет ссылки
                            }
                        }
                    } else {
                        elements[count_].value = block[key][key2][key3]
                    }
                    count_++
                }

                count++
            }
        }
    }
}

















function createJson(){
    const formData = new FormData();
    var fn = 0
    // ИНФОРМАЦИЯ
    var information = {
        "achievements": [],
        "fio": document.getElementById("input-field-fio").value,
        "inst": document.getElementById("input-field-inst").value,
        "phone": document.getElementById("input-field-phone").value,
        "mail": document.getElementById("input-field-mail").value,
        "group": document.getElementById("input-field-group").value,
        "agree": document.getElementById("agree-checkbox").value
    }
    document.querySelectorAll(".custom-checkbox").forEach(el => {
        if(el.checked == true){
            information["achievements"].push(el.value)
        }
    })

    if(information["achievements"].length == 0){ return }
    if(information["inst"] == ''){ return }
    if(information["phone"] == ''){ return }
    if(information["inst"] == ''){ return }
    if(information["group"] == ''){ return }
    if(information["agree-checkbox"] == 'off'){ return }



    // УЧЕБА
    var studies = {
        "onlyFive": document.getElementById("onlyFive").value,   // только ли пятерки?
        "list":{}
    }

    var a = [0, 1]
    a.forEach(el => {
        studies["list"][""+el] = []
        document.querySelectorAll(".frame-mid"+el).forEach(el_ => {
            fn = giveEls(el_, studies["list"][""+el], formData, fn)
        })
    })

    // НАУКА

    var science = {
        "list": {}
    }

    a = [2, 3, 4, 5, 6]
    a.forEach(el => {
        science["list"][""+el] = []
        document.querySelectorAll(".frame-mid"+el).forEach(el_ => {
            fn = giveEls(el_, science["list"][""+el], formData, fn)
        })
    })



    // АКТИВНОСТЬ

    var activities = {
        "list": {}
    }

    a = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    a.forEach(el => {
        activities["list"][""+el] = []
        document.querySelectorAll(".frame-mid"+el).forEach(el_ => {
            fn = giveEls(el_, activities["list"][""+el], formData, fn)
        })
    })

    // КУЛЬТУРА

    var culture = {
        "list": {}
    }

    a = [19, 20, 21, 22, 23]
    a.forEach(el => {
        culture["list"][""+el] = []
        document.querySelectorAll(".frame-mid"+el).forEach(el_ => {
            fn = giveEls(el_, culture["list"][""+el], formData, fn)
        })
    })

    // СПОРТ

    var sport = {
        "list": {}
    }

    a = [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]
    a.forEach(el => {
        sport["list"][""+el] = []
        document.querySelectorAll(".frame-mid"+el).forEach(el_ => {
            fn = giveEls(el_, sport["list"][""+el])
        })
    })

    var json_ = {
        "information": information,
        "studies":studies,
        "science":science,
        "activities":activities,
        "culture":culture,
        "sport":sport,
    }



    formData.append("session", sessionStorage.getItem('sessionId'));
    formData.append("json", JSON.stringify(json_));

    HttpRequestPostFormData('uploadStatement', function (response) {
        if (response.answer == "Too late") {
            showNotificationBad("Закончен сбор заявлений, вы не успели:(");
        }else if (response.answer == "no files") {
            showNotificationBad("Вы не прикрепили файлы!");
        }else if (response.answer) {
            showNotification("Заявление успешно отправлено");
        } else {
            showNotification("Ошибка отправки заявления");
            console.error("Нет данных или ошибка запроса");
        }
    }, formData);
}



function giveEls(element, parent, formData, fn){
    var el = {}
    var mass = element.querySelectorAll(".el")
    for(let i = 0; i < mass.length; i++){
        if (mass[i] && mass[i].type === 'file') {
            if (mass[i].files[0]) {
                el[""+(i+1)] = "@" + fn
                formData.append("file", mass[i].files[0])
                fn++
            }else{
                return fn
            }
        }else{
            if(mass[i].value == "") return fn
            el[""+(i+1)] = mass[i].value
        }
    }
    parent.push(el)
    return fn
}


















function rateStatment(){
    const statementId = new URLSearchParams(window.location.search).get("statementId");
    const json = {
        session: sessionStorage.getItem('sessionId'),
        "statement-id": statementId,
        mark: document.getElementById("points").value,
        comment: document.getElementById("comment").value,
    };

    HttpRequestPostJson('rateStatement', function (response) {
        if(response.answer == true){
            window.location.href='menu'
        }
    }, json)
}





document.addEventListener("DOMContentLoaded", () => {

    setActiveFrame(0); // Устанавливаем активную кнопку

    // Блокируем кнопку отправки, пока чекбокс не нажат
    const submitButton = document.getElementById("mark-all-outdated");
    document.getElementById("agree-checkbox").addEventListener("change", function () {
        submitButton.disabled = !this.checked;
    });

    fillFrames()




    const statementId = new URLSearchParams(window.location.search).get("statementId");
    if(statementId != null){
        const json = {
            session: sessionStorage.getItem('sessionId'),
            "statement-id": statementId
        };

        HttpRequestPostJson('getStatement', function (response) {
            if (response) {
                statementsJson = response["statement-json"]; // Сохраняем все данные заявлений
                document.getElementById("input-field-fio").value = statementsJson["information"]["fio"];
                document.getElementById("input-field-phone").value = statementsJson["information"]["phone"];
                document.getElementById("input-field-inst").value = statementsJson["information"]["inst"];
                document.getElementById("input-field-mail").value = statementsJson["information"]["mail"];
                document.getElementById("input-field-group").value = statementsJson["information"]["group"];

                document.getElementById("onlyFive").value = statementsJson["studies"]["onlyFive"];

                if(statementsJson["information"]["agree"] == "on"){
                    document.getElementById("agree-checkbox").checked = true;
                }

                statementsJson["information"]["achievements"].forEach(section => {
                    if(section == "Учеба"){
                        document.getElementsByClassName("custom-checkbox")[0].checked = true;
                        buttons[0].disabled = false;  // Разблокируем кнопку
                        buttons[0].classList.add('hover:bg-red-200');
                        buttons[0].classList.remove('text-black/50');
                    }
                    if(section == "Наука"){
                        document.getElementsByClassName("custom-checkbox")[1].checked = true;
                        buttons[1].disabled = false;  // Разблокируем кнопку
                        buttons[1].classList.add('hover:bg-red-200');
                        buttons[1].classList.remove('text-black/50');
                    }
                    if(section == "Общественная деятельность"){
                        document.getElementsByClassName("custom-checkbox")[2].checked = true;
                        buttons[2].disabled = false;  // Разблокируем кнопку
                        buttons[2].classList.add('hover:bg-red-200');
                        buttons[2].classList.remove('text-black/50');
                    }
                    if(section == "Культура и творчество"){
                        document.getElementsByClassName("custom-checkbox")[3].checked = true;
                        buttons[3].disabled = false;  // Разблокируем кнопку
                        buttons[3].classList.add('hover:bg-red-200');
                        buttons[3].classList.remove('text-black/50');
                    }
                    if(section == "Спорт"){
                        document.getElementsByClassName("custom-checkbox")[4].checked = true;
                        buttons[4].disabled = false;  // Разблокируем кнопку
                        buttons[4].classList.add('hover:bg-red-200');
                        buttons[4].classList.remove('text-black/50');
                    }
                })

                interInfo(statementsJson["activities"]["list"])
                interInfo(statementsJson["culture"]["list"])
                interInfo(statementsJson["science"]["list"])
                interInfo(statementsJson["studies"]["list"])
                interInfo(statementsJson["sport"]["list"])


            } else {
                console.error("Нет данных или ошибка запроса");
            }
        }, json);
    }




    const json = {
        session: sessionStorage.getItem('sessionId')
    };

    HttpRequestPostJson('getRole', function (response) {
        var blocks = document.querySelectorAll(".button-block")
        if (response.answer == "Administrator") {
            blocks[0].remove()
            blocks[1].remove()
            blocks[2].remove()
            blocks[3].classList.remove("hidden")
        }else if (response.answer == "Student") {
            blocks[0].classList.remove("hidden")
            blocks[1].remove()
            blocks[2].remove()
            blocks[3].remove()
        }else if (response.answer == "Jury") {
            blocks[0].remove()
            blocks[1].remove()
            blocks[2].classList.remove("hidden")
            blocks[3].remove()
        }else if (response.answer == "Inspector studies" || response.answer == "Inspector science" || response.answer == "Inspector culture" || response.answer == "Inspector activities" || response.answer == "Inspector sport") {
            blocks[0].remove()
            blocks[1].classList.remove("hidden")
            blocks[2].remove()
            blocks[3].remove()
        } else {
            console.error("Нет данных или ошибка запроса");
        }
    }, json);





})



