
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

document.addEventListener("DOMContentLoaded", function () {

    setActiveFrame(0); // Устанавливаем активную кнопку

    // Блокируем кнопку отправки, пока чекбокс не нажат
    const submitButton = document.getElementById("mark-all-outdated");
    document.getElementById("agree-checkbox").addEventListener("change", function () {
        submitButton.disabled = !this.checked;
    });


    fillFrames()
});

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

    createDuplicate([0, 1], 3)

    createDuplicate([2,3,4,5,6, 10, 18], 9)

    createDuplicate([7, 8], 1)

    createDuplicate([9], 5)

    createDuplicate([11, 12], 4)

    createDuplicate([13, 14], 19)

    createDuplicate([15, 17], 7)

    createDuplicate([16, 20], 2)

    createDuplicate([19], 17)

    createDuplicate([21], 4)

    createDuplicate([22], 24)

    createDuplicate([23], 3)

    createDuplicate([24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45], 5)

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


function createDuplicate(elements, count){
    elements.forEach(el => {
        document.querySelectorAll(".frame-mid"+el).forEach(section => {
            var clonedFieldsPred = section
            for (let i = 1; i <= count; i++) {
                let clonedFields = section.cloneNode(true); // Клонируем блок формы
                if(clonedFieldsPred != null){
                    clonedFields.classList.add('hidden');
                    clonedFieldsPred.addEventListener("change", function (){
                        clonedFields.classList.remove('hidden');
                    })
                }
                section.parentNode.append(clonedFields); // Добавляем в конец родителя
                clonedFieldsPred = clonedFields
            }
        });
    })
}




const statementId = new URLSearchParams(window.location.search).get("statementId");
if(statementId != null){
    const json = {
        session: sessionStorage.getItem('sessionId'),
        id: statementId
    };

    HttpRequestPostJson('getMyStatement', function (response) {
        if (response) {
            statementsJson = response["statement-json"]; // Сохраняем все данные заявлений
            document.getElementById("input-field-fio").value = statementsJson["information"]["fio"];
            document.getElementById("input-field-phone").value = statementsJson["information"]["phone"];
            document.getElementById("input-field-inst").value = statementsJson["information"]["inst"];
            document.getElementById("input-field-mail").value = statementsJson["information"]["mail"];
            document.getElementById("input-field-group").value = statementsJson["information"]["group"];

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


function interInfo(block){
    for (let key in block) {
        var frames = document.getElementsByClassName("frame-mid"+key)
        count = 0
        if (block.hasOwnProperty(key)) {
            let elements = frames[count].querySelectorAll(".el")

            for (let key2 in block[key]) {
                var count_ = 0
                for (let key3 in block[key][key2]) {
                    elements[count_].value = block[key][key2][key3]
                    count_++
                }
            }
            count++
        }
    }
}