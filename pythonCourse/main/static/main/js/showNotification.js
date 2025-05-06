

function showConfirmation(onConfirm) {
  // Если уже существует — не создаём повторно
  if (document.getElementById("custom-modal")) return;

  // Создаем фон
  const backdrop = document.createElement("div");
  backdrop.id = "custom-modal";
  backdrop.className = "fixed inset-0 bg-black/20 flex items-center justify-center z-50";

  // Создаем окно
  const modal = document.createElement("div");
  modal.className = "bg-white p-6 rounded-xl shadow-xl w-80 text-center";

  // Заголовок / сообщение
  const message = document.createElement("p");
  message.className = "mb-6 text-lg font-semibold";
  message.textContent = "Вы уверены, что хотите выполнить это действие?";
  modal.appendChild(message);

  // Контейнер кнопок
  const buttons = document.createElement("div");
  buttons.className = "flex justify-center gap-4";

  // Кнопка "Да"
  const yesBtn = document.createElement("button");
  yesBtn.className = "px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600";
  yesBtn.textContent = "Да";
  yesBtn.onclick = () => {
    onConfirm?.(); // выполняем переданную функцию
    document.body.removeChild(backdrop);
  };

  // Кнопка "Нет"
  const noBtn = document.createElement("button");
  noBtn.className = "px-4 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500";
  noBtn.textContent = "Нет";
  noBtn.onclick = () => {
    document.body.removeChild(backdrop);
  };

  // Добавляем кнопки
  buttons.appendChild(yesBtn);
  buttons.appendChild(noBtn);
  modal.appendChild(buttons);
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);
}

function showNotification(message) {
  // Удалим старое уведомление, если есть
  const old = document.getElementById("custom-notify");
  if (old) old.remove();

  // Создаем уведомление
  const note = document.createElement("div");
  note.id = "custom-notify";
  note.textContent = message;
  note.className = "fixed top-25 right-5 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg z-50";

  document.body.appendChild(note);

  // Удалить через 3 секунды
  setTimeout(() => {
    note.remove();
  }, 3000);
}



function confirmСlearLogs() {
  showConfirmation(() => {
    createJson()
  });
}