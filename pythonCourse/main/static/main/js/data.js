function formatDateToCustom(date) {
    const parsedDate = new Date(date);

    // Форматируем время
    const hours = String(parsedDate.getUTCHours()).padStart(2, '0');
    const minutes = String(parsedDate.getUTCMinutes()).padStart(2, '0');

    // Форматируем дату
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = parsedDate.getFullYear();

    // Возвращаем строку в формате HH:MM DD.MM.YYYY
    return `${hours}:${minutes} ${day}.${month}.${year}`;
}


function setPeriod() {
    // Получаем значения из полей ввода
    const startDate = document.getElementById("start-date-input").value;
    const endDate = document.getElementById("end-date-input").value;
    const sessionId = sessionStorage.getItem("sessionId");

    // Проверяем, что даты заполнены
    if (!startDate || !endDate) {
        createMessage("Пожалуйста, заполните обе даты.", "error");
        return;
    }

    // Проверяем, что сессия существует
    if (!sessionId) {
        createMessage("Сессия не найдена. Пожалуйста, авторизуйтесь.", "error");
        return;
    }

    // Преобразуем даты в нужный формат
    const formattedStartDate = formatDateToCustom(startDate);
    const formattedEndDate = formatDateToCustom(endDate);

    // Формируем JSON-данные для отправки
    const json = {
        session: sessionId,
        date_start: formattedStartDate,
        date_end: formattedEndDate,
    };

    // Выполняем запрос на сервер
    HttpRequestPostJson('setPeriod', function (response) {
        if (response && response.answer === true) {
            showNotification("Даты успешно изменены");

        } else {
            console.error("Ошибка при сохранении периода:", response);
            showNotification("Ошибка изменения даты");
        }
    }, json);
}
