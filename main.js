var yearElement = document.getElementById("yr");
if (yearElement) yearElement.textContent = String(new Date().getFullYear());
var iconLibrary = /** @type {Window & { lucide?: { createIcons: () => void } }} */ (window);
if (iconLibrary.lucide) iconLibrary.lucide.createIcons();

const menuButton = document.querySelector(".menutoggle");
const mainNav = document.getElementById("mainNav");
if (menuButton instanceof HTMLButtonElement && mainNav) {
  menuButton.addEventListener("click", function () {
    var isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    mainNav.classList.toggle("open", !isOpen);
  });
  mainNav.addEventListener("click", function (event) {
    if (event.target instanceof Element && event.target.closest("a")) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      mainNav.classList.remove("open");
    }
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      mainNav.classList.remove("open");
    }
  });
}

var dateInput = document.getElementById("date");
if (dateInput instanceof HTMLInputElement) {
  var now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  dateInput.min = now.toISOString().slice(0, 10);
}

var bookingForm = document.getElementById("bookForm");
if (bookingForm instanceof HTMLFormElement) {
  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var nameInput = document.getElementById("name");
    var phoneInput = document.getElementById("phone");
    var branchSelect = document.getElementById("branch");
    var serviceSelect = document.getElementById("service");
    var bookingDate = document.getElementById("date");
    var bookingTime = document.getElementById("time");
    var notesInput = document.getElementById("notes");
    if (
      !(nameInput instanceof HTMLInputElement) ||
      !(phoneInput instanceof HTMLInputElement) ||
      !(branchSelect instanceof HTMLSelectElement) ||
      !(serviceSelect instanceof HTMLSelectElement) ||
      !(bookingDate instanceof HTMLInputElement) ||
      !(bookingTime instanceof HTMLInputElement) ||
      !(notesInput instanceof HTMLTextAreaElement)
    ) {
      return;
    }

    var name = nameInput.value.trim();
    var phone = phoneInput.value.trim();
    var branch = branchSelect.value;
    var branchWhatsApp = branchSelect.selectedOptions[0]?.dataset.whatsapp;
    if (!branchWhatsApp) return;
    var service = serviceSelect.value;
    var date = bookingDate.value;
    var time = bookingTime.value;
    var notes = notesInput.value.trim();

    var msg =
      "Hi Copperline Barbers, I'd like to book a cut.\n" +
      "Name: " +
      name +
      "\n" +
      "Phone: " +
      phone +
      "\n" +
      "Location: " +
      branch +
      "\n" +
      "Service: " +
      service +
      "\n" +
      (date ? "Preferred date: " + date + "\n" : "") +
      (time ? "Preferred time: " + time + "\n" : "") +
      (notes ? "Notes: " + notes : "");

    var url =
      "https://wa.me/" +
      branchWhatsApp +
      "?text=" +
      encodeURIComponent(msg);

    const toast = document.getElementById("toast");
    if (toast) {
      toast.classList.add("show");
      setTimeout(function () {
        toast.classList.remove("show");
      }, 2500);
    }

    window.open(url, "_blank", "noopener");
  });
}
