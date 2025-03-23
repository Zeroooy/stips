function createJson(){
    // ИНФОРМАЦИЯ

    var information = {
        "achievements": [],
        "fio": document.getElementById("input-field-fio").value,
        "inst": document.getElementById("input-field-inst").value,
        "phone": document.getElementById("input-field-phone").value,
        "group": document.getElementById("input-field-group").value,
        "agree": document.getElementById("agree-checkbox").value
    }
    document.querySelectorAll("#form-frame select").forEach(el => {
        information["achievements"].push(el.value)
    })

    if(information["achievements"].length == 0){ return }
    if(information["inst"] == ''){ return }
    if(information["phone"] == ''){ return }
    if(information["inst"] == ''){ return }
    if(information["group"] == ''){ return }
    if(information["agree-checkbox"] == 'off'){ return }

    console.log(information)



    // УЧЕБА
    var studies = {
        "onlyFive": document.getElementById("onlyFive").value,   // только ли пятерки?
        "project-works":[],    // Получение студентом в течении предыдущего года награды по проектной деятельности
        "wins-works":[]
    }

    document.querySelectorAll(".project-works").forEach(el => {
        studies["project-works"].push(
            {
                "level": el.querySelector(".work-select").value,   // уровень
                "name": el.querySelector(".work-input").value,   // название
                "date": el.querySelector(".work-input").value,   // дата
                "url": el.querySelector(".work-input").value    // ссылка
            })
    })

    document.querySelectorAll(".wins-works").forEach(el => {
        studies["wins-works"].push(
            {
                "level": el.querySelector(".work-select").value,   // уровень
                "name": el.querySelector(".work-input").value,   // название
                "date": el.querySelector(".work-input").value,   // дата
                "url": el.querySelector(".work-input").value    // ссылка
            })
    })


    // if(studies["onlyFive"] == ''){ return }

    // if(studies["project-works"].length == 0 && studies["wins-works"].length == 0){ studies = {} } // оптимизатор

    console.log(studies)





    // НАУКА


    var science = {
        "list": [],
    }

    document.querySelectorAll(".frame-mid2").forEach(el => {
        var els = el.querySelectorAll(".work-input")
        if(el.querySelector(".work-select").value != '' && el.querySelector(".work-criteria").value != '' && els[0].value != '' && els[1].value != '' && els[2].value != '' && els[3].value != '' && els[4].value != ''){
            science["list"].push({
                "criteria": el.querySelector(".work-criteria").value,   // критерий
                "criteria-concrete": el.querySelector(".work-select").value,   // название
                "type-document": els[0].value,   // вид
                "name": els[1].value,    // название
                "date": els[2].value,  // дата
                "place": els[3].value,  // место
                "url": els[4].value  // ссылка
            })
        }
    })



    console.log(science)




    // АКТИВНОСТЬ


    var activities = {
        "list": []
    }

    document.querySelectorAll(".frame-mid9").forEach(el => {
        var els = el.querySelectorAll(".work-input")
        if(el.querySelector(".type-document").value != '' && el.querySelector(".work-criteria").value != '' && els[0].value != '' && els[1].value != '' && els[2].value != '' && els[3].value != '' && els[4].value != ''){
            activities["list"].push({
                "criteria": el.querySelector(".work-criteria").value,   // критерий
                "type-document": el.querySelector(".type-document").value,   // название
                "form-activities": els[0].value,   // вид
                "name": els[1].value,    // название
                "date": els[2].value,  // дата
                "place": els[3].value,  // место
                "url": els[4].value  // ссылка
            })
        }
    })

    console.log(activities)

    // КУЛЬТУРА

    var culture = {
        "list": []
    }

    var elementsCount = [6, 7, 3, 4, 5]
    var elements = []
    elementsCount.forEach(el => {
        elements.push(...document.querySelectorAll(".frame-mid"+el))
    })

    elements.forEach(el => {
        var els = el.querySelectorAll(".work-input")
        if(el.querySelector(".forma-participation").value != '' && el.querySelector(".criteria-concrete").value != '' && els[0].value != '' && els[1].value != '' && els[2].value != '' && els[3].value != '' && els[4].value != ''){
            culture["list"].push({
                "forma-participation": el.querySelector(".forma-participation").value,   // критерий
                "criteria-concrete": el.querySelector(".criteria-concrete").value,   // название
                "form-document": els[0].value,   // вид
                "name": els[1].value,    // название
                "date": els[2].value,  // дата
                "organizator": els[3].value,  // место
                "url": els[4].value  // ссылка
            })
        }
    })








    console.log(culture)

    // СПОРТ

    var sport = {
        "list": [],
    }


    elementsCount = [15, 16]
    elements = []
    elementsCount.forEach(el => {
        elements.push(...document.querySelectorAll(".frame-mid"+el))
    })

    elements.forEach(el => {
        var els = el.querySelectorAll(".work-input")
        if(el.querySelector(".forma-participation").value != '' && el.querySelector(".criteria-concrete").value != '' && els[0].value != '' && els[1].value != '' && els[2].value != '' && els[3].value != '' && els[4].value != ''){
            sport["list"].push({
                "criteria": el.querySelector(".forma-participation").value,   // критерий
                "criteria-concrete": el.querySelector(".criteria-concrete").value,   // название
                "name": els[0].value,   // вид
                "date": els[1].value,    // название
                "place": els[2].value,  // дата
                "copy-protocol": els[3].value,  // место
                "copy-calendar": els[4].value  // ссылка
            })
        }
    })


    console.log(sport)









    var json = {
        "information": information,
        "studies":studies,
        "science":science,
        "activities":activities,
        "culture":culture,
        "sport":sport,
    }
    return json
}



/*

json = {

    "science":{
        "list": [
            "work": {  # Научная штука
                "criteria": ["(А.1) Получение наград",
                "(А.2) Получение благодарственных писем",
                "(А.3) Получение документов",
                "(А.4) Получение грантов",
                "(Б) Наличие публикации в научном издании"],  # критерий

                -------------------------------------------------------------------------------------------------------------------------

                "criteria-concrete": "",  # конкретика критерия ДЛЯ А1 ["Диплом 1 степени", "Диплом 2 степени", "Диплом 3 степени"]

                ДЛЯ А2 ["Федерального уровня (Министерство образования и науки РФ и ведомства)",
                "Регионального и городского уровня (Правительство ВО, Губернатор и мэр)",
                "Внутриуниверситетского уровня (ректор) - за работу в рамках хоздоговора, сумма договора до 50.000 на 1 студента",
                "Внутриуниверситетского уровня (ректор) - за работу в рамках хоздоговора, сумма договора 51.000 - 100.000 на 1 студента",
                "Внутриуниверситетского уровня (ректор) - за работу в рамках хоздоговора, сумма договора 101.000 - 300.000 на 1 студента"
                ,"Внутриуниверситетского уровня (ректор) - за работу в рамках хоздоговора, сумма договора до 301.000 - 500.000 на 1 студента",
                "Внутриуниверситетского уровня (ректор) - за работу в рамках хоздоговора, сумма договора свыше 501.000 на 1 студента",
                "Внутриуниверситетского уровня (ректор) - за участие в организации научного мероприятия",
                "Внутриуниверситетского уровня (директор института/декан факультета)"]

                ДЛЯ А3 ["Индивидуальное достижение",
                "В соавторстве"]

                ДЛЯ А4 ["Под руководством студента",
                "В составе коллектива"]

                ДЛЯ Б [""Белый список" научных журналов",
                "Публикации, проиндексированные в WoS, Scopus, RSCI, не вошедшие в "Белый список"",
                "ВАК",
                "Научные журналы уровня РИНЦ (с № ISSN)",
                "Статья в сборниках уровня РИНЦ по материалам международных, всероссийских конференций",
                "Тезисы в сборниках уровня РИНЦ по материалам международных, всероссийских конференций",
                "Иные публикации, размещенные на elibrary"]

                ------------------------------------------------------------------------------------------------------

                "type-document": "",  # вид документов ДЛЯ А1["Копия диплома"]

                ДЛЯ А2 ["Копия благодарственного письма /грамоты / приказа ректора /распоряжения директора института или декана факультета по представлению руководителя научного объединения"]

                ДЛЯ А3 ["Копия патента, свидетельства"]

                ДЛЯ А4 ["Копия грантового соглашения, договора о выделении гранта, копия информационного письма грантодающей организации о присуждении гранта (Государственное задание, РНФ, РГО, РИО, Росмолодежь, Фонд содействия инновациям,внутриуниверситетские конкурсы)"]

                ДЛЯ Б ["Ссылка на публикацию в открытом онлайн-доступе, копии: титульного листа, содержания журнала/сборника с ФИО автора, первой страницы публикации и скриншот страницы для авторов из электронной библиотеки elibrary с отражением публикаций"]

                "name": "",  # название
                "date": "",  # дата
                "place": "",  # место
                "url": ""  # ссылка
            },
        ],

    },

    "activities":{
        "list": [
            "work": {  # активности
                "criteria-concrete": "",  # конкретика критерия ДЛЯ А2 ["Членство в общественных организациях, студенческих объединениях",
                "Членство в ученом совете университета, института, факультета","Выполнение функций студенческого куратора",
                "Выполнение функций старосты академической группы/старосты общежитий/секретаря",
                "Руководство общественной организацией, студенческим объединением"]

                ДЛЯ А3 ["Участник команды проекта","Руководитель проекта"]

                ДЛЯ А4 ["Участие в одном мероприятии", "Менеджмент мероприятия"]

                ДЛЯ А5 ["Участие в региональных конкурсах и форумах общественной направленности",
                "Участие в федеральных конкурсах и форумах общественной направленности, финальный этап (АНО "Россия - страна возможностей", Росмолодежь, "Твой ход")",
                "Победа в федеральных конкурсах общественной направленности"]

                "vid-pod-doc": "",  # вид подтверждающих документов ДЛЯ А2 для каждого критерия по порядку которые выше в том же порядке["Копия списка студенческого объединения, заверенного куратором",
                "Копия приказа о составе ученого совета",
                "Копия распоряжения о назначении и распределении кураторов",
                "назначение старосты академической группы / копия списка, заверенного заведующим общежитием / копия",
                "Копия списка студенческого объединения, заверенного куратором"]

                ДЛЯ А3 ["Копия грантового соглашения / договора о выделении гранта, копия информационного письмагрантодающей организации"]

                ДЛЯ А4 ["Справка, подтверждающая количество участий студента","Справка, подтверждающая количество организованных мероприятия студента"]

                ДЛЯ А5 ["Копия документа, подтверждающего участие (сертификат/диплом)"]

                "forma-proved": "",  # форма провередения ДЛЯ А2-В ["смешанная","очная","заочная"]

                "name": "",  # название
                "date": "",  # дата
                "url": ""  # ссылка
            },
        ],

    },

    "culture":{
        "list": [
            "work": {  # культура
                "criteria-concrete": "",  # конкретика критерия ДЛЯ А ["Всероссийский, международный уровень, победа/призовое место",
                "Областной уровень, победа/призовое место",
                "университетский уровень, диплом 1 степени",
                "университетский уровень, диплом 2-3 степени",
                "университетский уровень, диплом победителя в номинации",
                "университетский уровень, диплом призера в номинации",
                "университетский уровень, диплом финалиста"]
               !!! и под вопросом 3 пункта всегда есть просто такие вот одинаковые:["Победа в заочных конкурсах, интернет-конкурсах любого уровня"] 196 СТРОКУ СМОТРИ

                ДЛЯ Б ["Одно произведение"]

                ДЛЯ В1 ["Одно мероприятие"]

                ДЛЯ В2 ["Членство в одной студии"]

                ----------------------------------------------------------------------------------------

                "vid-pod-doc": "",  # вид подтверждающих документов ДЛЯ А ["Наградной документ"]

                ДЛЯ Б ["Ссылка на публичное представление созданного произведения"]

                ДЛЯ В1-B2 ["Копия справки, подтверждающий участие студента в культурно-творческой деятельности / сертификата, диплома участника, благодарственное письма / ссылка на пост в официальной группе проекта"]

                ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

                "forma-participation": "",  # форма участия ДЛЯ А-Б ["смешанная","очная","заочная"] !!!!и у этих 3 последних пунктов ["заочная"]!!!! 177 СТРОКУ СМОТРИ

                 ДЛЯ В1 отсутсвуют требования

                 ДЛЯ В2 ["участник коллектива"]

                 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

                "name": "",  # название для В2 ["ВЭС «Бриз»",
                "Студия «DanceFM»",
                "Студия «K-pop Cover Dance»",
                "Студия фитнеса и растяжки",
                "ИЗО-студия"]

                "date": "",  # дата
                "organizator": "",  # организатор
                "url": ""  # ссылка
            },
        ],
    },

    "sport":{
        "list": [
            "work": {  # спорт
                "criteria": "",  # критерии
                "criteria-concrete": "",  # конкретика критерия
                "name": "",  # название
                "date": "",  # дата "place": "",  # место
                "copy-protocol": "",  # копия протокола
                "copy-calendar": ""  # копия календаря
            },
        ],
    }
}*/