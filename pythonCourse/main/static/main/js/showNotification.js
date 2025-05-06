
let confirmCallback = null;

    function openModal(callback, message = "Вы точно уверены, что хотите выполнить это действие?") {
      confirmCallback = callback;
      document.getElementById("modalMessage").textContent = message;
      document.getElementById("modalBackdrop").classList.remove("hidden");
    }

    function closeModal() {
      document.getElementById("modalBackdrop").classList.add("hidden");
    }

    function confirmAction() {
      closeModal();
      if (typeof confirmCallback === 'function') {
        try {
          const result = confirmCallback(); // вызывается переданная функция
          if (result instanceof Promise) {
            result.then(() => showNotification("Действие выполнено успешно.", true))
                  .catch(() => showNotification("Произошла ошибка при выполнении.", false));
          } else {
            showNotification("Действие выполнено успешно.", true);
          }
        } catch {
          showNotification("Произошла ошибка при выполнении.", false);
        }
      }
    }

    function showNotification(message, success) {
      const notification = document.getElementById("notification");
      notification.textContent = message;
      notification.className = `fixed top-25 right-5 px-4 py-2 rounded-xl text-white shadow-lg z-50 ${
        success ? "bg-green-500" : "bg-red-500"
      }`;
      notification.classList.remove("hidden");

      setTimeout(() => {
        notification.classList.add("hidden");
      }, 3000);
    }

    function toggleFrameBorder(checkbox) {
    const frame = checkbox.closest(".frame-mid");
    if (checkbox.checked) {
      frame.classList.remove("border-black/20");
      frame.classList.add("border-green-500");
    } else {
      frame.classList.remove("border-green-500");
      frame.classList.add("border-black/20");
    }
  }