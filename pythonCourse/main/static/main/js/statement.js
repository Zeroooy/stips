




class statement{
	constructor(){
		this.studies = {}
		this.science = {}
		this.activities = {}
		this.culture = {}
		this.sport = {}
	}


	// тут все поля мира
	addStudies(){

	}

	addScience(){

	}

	addActivities(){

	}

	addCulture(){

	}

	addSport(){

	}



	static fromJSON(json) {
    const data = JSON.parse(json);
    return new Person(
      data.firstName,
      data.lastName,
      data.age,
      data.email,
      data.phoneNumber,
      data.address
    );
  }
}

/*



 json = {
            "studies":{
                "onlyFive": data.get("onlyFive"),   # только ли пятерки?
                "project-work":{    # Получение студентом в течении предыдущего года награды по проектной деятельности
                    "international": {
                        "level": data.get("project-work-international-level"),   # уровень
                        "name": data.get("project-work-international-name"),   # название
                        "date": data.get("project-work-international-date"),   # дата
                        "url": data.get("project-work-international-url")    # ссылка
                    },
                    "regional": {
                        "level": data.get("project-work-regional-level"),   # уровень
                        "name": data.get("project-work-regional-name"),   # название
                        "date": data.get("project-work-regional-date"),   # дата
                        "url": data.get("project-work-regional-url")    # ссылка
                    },
                    "university": {
                        "level": data.get("project-work-university-level"),   # уровень
                        "name": data.get("project-work-university-name"),   # название
                        "date": data.get("project-work-university-date"),   # дата
                        "url": data.get("project-work-university-url")    # ссылка
                    }
                },
                "student-wins":{    # Признание студента победителем
                    "international": {
                        "level": data.get("student-wins-international-level"),  # уровень
                        "name": data.get("student-wins-international-name"),  # название
                        "date": data.get("student-wins-international-date"),  # дата
                        "url": data.get("student-wins-international-url")  # ссылка
                    },
                    "regional": {
                        "level": data.get("student-wins-regional-level"),  # уровень
                        "name": data.get("student-wins-regional-name"),  # название
                        "date": data.get("student-wins-regional-date"),  # дата
                        "url": data.get("student-wins-regional-url")  # ссылка
                    }
                }
            },
            "science":{
                "work": {  # Научная штука
                    "criteria": data.get("work-criteria"),  # критерий
                    "criteria-concrete": data.get("work-criteria-concrete"),  # конкретика критерия
                    "type-document": data.get("work-type-document"),  # вид документов
                    "name": data.get("work-name"),  # название
                    "date": data.get("work-date"),  # дата
                    "place": data.get("work-date"),  # дата
                    "url": data.get("work-url")  # ссылка
                },
            },
            "activities":{


            },
            "culture":{

            },
            "sport":{
                "works": data.get("sport-works")
            }*/