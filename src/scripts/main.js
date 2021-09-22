const slides = document.querySelectorAll(".carousel-track__slide");
const statusBarItems = document.querySelectorAll(".status-bar__item");

const checkbox = document.querySelector(".checkbox");

const buttons = document.querySelectorAll(".carousel__button");
const leftArrowButton = buttons[0];
const rightArrowButton = buttons[1];

const form = document.forms.form;
const inputs = document.querySelectorAll(".feedback__form input");

const burgermenu = document.querySelector('.burgermenu');
const burgermenuToggle = document.querySelector('.burgermenu-toggle');

let intervalID;
let current = 0;

carousel();
form.reset();

burgermenuToggle.addEventListener('click', () => {
  burgermenu.hidden = !burgermenu.hidden;
});

intervalID = setInterval(() => {
  if (current + 1 === slides.length) {
    current = 0;
  } else {
    current++;
  }
  carousel();
}, 5000);

checkbox.addEventListener("mousedown", () => {
  if (checkbox.dataset.checked === "false") {
    checkbox.dataset.checked = "true";
    clearInterval(intervalID);
    return;
  }

  intervalID = setInterval(() => {
    if (current + 1 === slides.length) {
      current = 0;
    } else {
      current++;
    }
    carousel();
  }, 5000);

  checkbox.dataset.checked = "false";
});

leftArrowButton.addEventListener("click", () => {
  if (current - 1 === -1) {
    current = slides.length - 1;
  } else {
    current--;
  }
  carousel();
});

rightArrowButton.addEventListener("click", () => {
  if (current + 1 === slides.length) {
    current = 0;
  } else {
    current++;
  }
  carousel();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  for (const input of inputs) {
    if (input.value == "") {
      validateInputs(input);
      return;
    }
  }

  form.children[4].innerText = 'Отправлено!';
});

for (const input of inputs) {
  input.addEventListener("blur", () => {
    validateInputs(input);
  });
}

function carousel() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.add("invisible");
    setTimeout(() => {
      slides[i].classList.add("hidden");
    }, 0);
    statusBarItems[i].classList.remove("status-bar__item--active");
  }

  slides[current].classList.remove("invisible");
  setTimeout(() => {
    slides[current].classList.remove("hidden");
  }, 0);
  statusBarItems[current].classList.add("status-bar__item--active");
}

function validateInputs(input) {
  const set = new Set([
    {
      name: "name",
      regExp: /^[a-zA-Z]{1,20}$/,
      errMessage: "Invalid name.",
    },
    {
      name: "phone",
      regExp:
        /^(?:\+38)?(?:\(0[0-9][0-9]\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|0[0-9][0-9][ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|0[0-9][0-9][0-9]{7})$/gm,
      errMessage: "Invalid phone.",
    },
    {
      name: "email",
      regExp: /^[\w\.-]{1,}@[a-zA-Z]{0,}\.[a-zA-Z]{2,4}$/,
      errMessage: "Invalid email.",
    },
  ]);

  set.forEach((item) => {
    if (item.name !== input.name) return;

    if (!item.regExp.test(input.value) || !input.value === "") {
      if (input.nextElementSibling) {
        input.nextElementSibling.remove();
      }

      const span = document.createElement("span");
      span.className = "error";
      span.innerHTML = item.errMessage;
      input.parentNode.append(span);
    } else {
      if (input.nextElementSibling) {
        input.nextElementSibling.remove();
      }
    }
  });
}
