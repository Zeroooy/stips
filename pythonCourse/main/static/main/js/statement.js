

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
        }else{

            HttpRequestPostJson("getInfo", function (response) {
                document.querySelector("#input-field-fio").value = response['FIO']
                document.querySelector("#input-field-phone").value = response['phone']
                document.querySelector("#input-field-group").value = response['group']
                document.querySelector("#input-field-inst").value = response['inst']
                document.querySelector("#input-field-mail").value = response['email']
            }, {
                session: sessionStorage.getItem('sessionId')
            });

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
        document.querySelectorAll(".file-uploader").forEach(container => {
            const input = container.querySelector("input.el");
            const fileNameSpan = container.querySelector(".file-name");
            const uploadBtn = container.querySelector(".upload-btn");
            const deleteBtn = container.querySelector(".delete-btn");
            const downloadLink = container.querySelector(".download-link");

            uploadBtn.addEventListener("click", () => input.click());

            input.addEventListener("change", () => {
            const file = input.files[0];
            if (file) {
                fileNameSpan.textContent = file.name;
                const url = URL.createObjectURL(file);
                downloadLink.href = url;
                downloadLink.download = file.name;
                deleteBtn.classList.remove("hidden");
                downloadLink.classList.remove("hidden");
            }
            });

            deleteBtn.addEventListener("click", () => {
            input.value = "";
            fileNameSpan.textContent = "Файл не выбран";
            deleteBtn.classList.add("hidden");
            downloadLink.classList.add("hidden");
            downloadLink.removeAttribute("href");
            });
        });

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

        createListeners(".frame-mid17 .selector1", ".frame-mid17 .selector2",  {
            "Член редакции студенческого центра кафедры / проекта": "Копия справки за подписью куратора пресс-центра о систематическом участии в деятельности + 1-2 скриншота",
            "Член редакции студенческого центра института / университета": "Копия справки за подписью куратора пресс-центра о систематическом участии в деятельности + 1-2 скриншота",
            "Победа в региональных конкурсах информационного сопровождения": "Копия документа, подтверждающего участие (сертификат/диплом)",
            "Победа во всероссийских конкурсах информационного сопровождения": "Копия документа, подтверждающего участие (сертификат/диплом)",
        })

        if(!checkStud){
            for (let i = 0; i < 51; i++) {
                var framesMid = document.querySelectorAll(".frame-mid" + i);
                framesMid.forEach(el => {
                    // Убедимся, что родитель имеет relative позиционирование
                    el.classList.add('relative');

                    // Создаем чекбокс
                    var checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.classList.add("absolute", "top-0", "right-0", "scale-250", "cursor-pointer", "checkboxs");

                    el.appendChild(checkbox);
                });

                if (i > 45) {
                    document.querySelector(".frame-mid" + i).querySelectorAll(".el").forEach(el_ => {
                        if (el_.type === 'file') {
                            el_.closest('div.flex').querySelector('.upload-btn').classList.add('hidden');
                            if(el_.nextElementSibling.href == ""){
                                el_.nextElementSibling.classList.add('hidden')
                            };
                            el_.classList.add('hidden')
                        }else{
                            el_.disabled = true;
                        }

                    })
                }
            }

            document.querySelectorAll(".checkboxs").forEach(el => {
                el.addEventListener('change', function() {
                    if(el.checked == true){
                        el.parentElement.classList.add('border-lime-500');
                        el.parentElement.classList.remove('border-black/20');
                        el.parentElement.classList.add('bg-lime-50');
                    }else{
                        el.parentElement.classList.add('border-black/20');
                        el.parentElement.classList.remove('border-lime-500');
                        el.parentElement.classList.remove('bg-lime-50');
                    }
                    autoPointsCode(response.answer)
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
                            el_.closest('div.flex').querySelector('.upload-btn').classList.add('hidden');
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
                        const link = elements[count_].closest('div.flex').querySelector('a.download-link') // соседний <a>

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
    old_urls = []
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

    if(information["achievements"].length == 0){ showNotificationBad("Вы не прикрепили файлы!");return }
    if(information["fio"] == ''){ showNotificationBad("Напишите ФИО!");return }
    if(information["mail"] == ''){ showNotificationBad("Напишите почту для связи!");return }
    if(information["phone"] == ''){ showNotificationBad("У вас не написан номер телефона!");return }
    if(information["inst"] == ''){ showNotificationBad("У вас не написан институт!");return }
    if(information["group"] == ''){ showNotificationBad("У вас не написана группа!");return }
    if(information["agree-checkbox"] == 'off'){ showNotificationBad("Нажмите подтверждение обработки данных!");return }



    // УЧЕБА
    var studies = {
        "onlyFive": document.getElementById("onlyFive").value,   // только ли пятерки?
        "list":{}
    }

    var a = [0, 1]
    a.forEach(el => {
        studies["list"][""+el] = []
        document.querySelectorAll(".frame-mid"+el).forEach(el_ => {
            fn = giveEls(el_, studies["list"][""+el], formData, fn, old_urls)
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
            fn = giveEls(el_, science["list"][""+el], formData, fn, old_urls)
        })
    })



    // АКТИВНОСТЬ

    var activities = {
        "list": {}
    }

    a = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    a.forEach(el => {
        activities["list"][""+el] = []
        document.querySelectorAll(".frame-mid"+el).forEach(el_ => {
            fn = giveEls(el_, activities["list"][""+el], formData, fn, old_urls)
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
            fn = giveEls(el_, culture["list"][""+el], formData, fn, old_urls)
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
            fn = giveEls(el_, sport["list"][""+el], formData, fn, old_urls)
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
    formData.append("old_urls", JSON.stringify(old_urls));

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



function giveEls(element, parent, formData, fn, old_urls){
    var el = {}
    var mass = element.querySelectorAll(".el")
    for(let i = 0; i < mass.length; i++){
        if (mass[i] && mass[i].type === 'file') {
            if (mass[i].files[0]) {
                el[""+(i+1)] = "@" + fn
                formData.append("file", mass[i].files[0])
                fn++
            }else if(mass[i].closest('div.flex').querySelector('a.download-link').href != ""){
                el[""+(i+1)] = mass[i].closest('div.flex').querySelector('a.download-link').href
                old_urls.push(decodeURIComponent(mass[i].closest('div.flex').querySelector('a.download-link').href.replace("http://127.0.0.1:8000/files/", "")))
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

    if(document.querySelector("#checkbox-error").checked == true){
        json.mark = -2
    }

    HttpRequestPostJson('rateStatement', function (response) {
        if(response.answer == true){
            window.location.href='statments'
        }
    }, json)
}





document.addEventListener("DOMContentLoaded", () => {


    const checkboxs = document.getElementsByClassName("custom-checkbox")
    const buttons = document.getElementsByClassName("perehod")

    for(let i = 0; i < checkboxs.length; i++) {
        checkboxs[i].addEventListener('change', function() {
            if (this.checked) enableButton(buttons[i])
            else disableButton(buttons[i])
        });
    }

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

                if(response["statement-comments"]){
                    var ine = 0
                    var els_com = document.querySelectorAll(".comment-block-input")
                    response["statement-comments"].forEach(comment => {
                        els_com[ine].value = comment
                        ine++
                    })
                    document.querySelectorAll(".comment-block").forEach(comment => {
                        comment.classList.remove("hidden")
                    })
                }else{
                    document.querySelectorAll(".comment-block").forEach(comment => {
                        comment.remove()
                    })
                }

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


            loading()

        }, json);


    }else{
        loading()
    }

})

function loading(){

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
            var temp = document.querySelectorAll('.perehod')
            disableButton(temp[0])
            disableButton(temp[1])
            disableButton(temp[2])
            disableButton(temp[3])
            disableButton(temp[4])
            autoPointsCode(response.answer)
            if (response.answer == "Inspector studies") enableButton(temp[0])
            else if (response.answer == "Inspector science") enableButton(temp[1])
            else if (response.answer == "Inspector culture") enableButton(temp[3])
            else if (response.answer == "Inspector activities") enableButton(temp[2])
            else if (response.answer == "Inspector sport") enableButton(temp[4])
            blocks[0].remove()
            blocks[1].classList.remove("hidden")
            blocks[2].remove()
            blocks[3].remove()
        } else {
            console.error("Нет данных или ошибка запроса");
        }
    }, json);
}

function disableButton(button){
    button.disabled = true
    button.classList.remove('hover:bg-red-200');
    button.classList.add('text-black/50');
}

function enableButton(button){
    button.disabled = false;  // Разблокируем кнопку
    button.classList.add('hover:bg-red-200');
    button.classList.remove('text-black/50');
}

function changeStatus() {
    const sessionId = sessionStorage.getItem("sessionId");
    const statementId = new URLSearchParams(window.location.search).get("statementId");
    const newStatus = document.getElementById("status").value;

    if (!sessionId || !statementId) {

        return;
    }

    const requestData = {
        "session": sessionId,
        "statement-id": statementId,
        "status": parseInt(newStatus)
    };

    HttpRequestPostJson("changeStatus", (response) => {
        if (response.answer === true) {
            showNotification("Статус успешно изменен");
        } else {
            showNotification("Ошибка изменения статуса");
        }
    }, requestData);
}

function ratingStatement(url) {
    const sessionId = sessionStorage.getItem("sessionId");
    const statementId = new URLSearchParams(window.location.search).get("statementId");


    if (!sessionId || !statementId) {

        return;
    }

    const requestData = {
        "session": sessionId,
        "statement-id": statementId,
    };

    HttpRequestPostJson(url, (response) => {
        if (response.answer === true) {
            showNotification("Заявление успешно обработано");
        } else {
            showNotification("Ошибка обработки заявления");
        }
    }, requestData);
}




function autoPointsCode(role){
    var blocks_ = []
    var a = 0
    var b = 50

    if(role == "Inspector studies") blocks_.push([0, document.querySelector("#onlyFive").selectedIndex-1])
    else if(role == "Inspector studies"){a=0; b=1}
    else if(role == "Inspector science"){a=2; b=6}
    else if(role == "Inspector activities"){a=7; b=18}
    else if(role == "Inspector culture"){a=19; b=23}
    else if(role == "Inspector sport"){a=24; b=50}

    for(let i = a; i <= b; i++){
        var frameMid = document.querySelectorAll(".frame-mid"+i)
        frameMid.forEach(el2 => {
            if(el2.querySelector(".checkboxs").checked == true){
                if(el2.querySelector(".el-var") > 0){
                    blocks_.push([i+1, el2.querySelector(".el-var").selectedIndex-1])
                }else blocks_.push([i+1 ,0])
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
}