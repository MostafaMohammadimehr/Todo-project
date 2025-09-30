const btnteme = document.getElementById("theme-switcher");
const bodytag = document.querySelector("body");
const addbtn = document.getElementById("add-btn");
const todoinput = document.getElementById("addt");
const ul = document.getElementById("todos");
const temeimg = btnteme.children[0];
let temel = "";
if (localStorage.getItem("teme") === "Light") {
  temeimg.setAttribute("src", "./assets/images/icon-moon.svg");
  bodytag.classList.add("light");
} else {
  temeimg.setAttribute("src", "./assets/images/icon-sun.svg");
  bodytag.classList.remove("light");
}
const main = () => {
  btnteme.addEventListener("click", () => {
    bodytag.classList.toggle("light");
    if (bodytag.classList.contains("light")) {
      temel = "Light";
      localStorage.setItem("teme", temel);
    } else {
      temel = "Dark";
      localStorage.setItem("teme", temel);
    }
    if (localStorage.getItem("teme") === "Light") {
      temeimg.setAttribute("src", "./assets/images/icon-moon.svg");
    } else {
      temeimg.setAttribute("src", "./assets/images/icon-sun.svg");
    }
  });

  makeTodoElement(JSON.parse(localStorage.getItem("todos")));

  ul.addEventListener("dragover", (e) => {
    if (
      e.target.classList.contains("card") &&
      !e.target.classList.contains("dragging")
    ) {
      const draggingcard = document.querySelector(".dragging");
      const cards = [...ul.querySelectorAll(".card")];
      const currentPos = cards.indexOf(draggingcard);
      const newPos = cards.indexOf(e.target);
      if (currentPos > newPos) {
        ul.insertBefore(draggingcard, e.target);
      } else {
        ul.insertBefore(e.target, draggingcard);
      }
      const todos = JSON.parse(localStorage.getItem("todos"));
      const removed = todos.splice(currentPos, 1);
      todos.splice(newPos, 0, removed[0]);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });

  addbtn.addEventListener("click", () => {
    const item = todoinput.value.trim();
    if (item) {
      todoinput.value = "";
      const todos = !localStorage.getItem("todos")
        ? []
        : JSON.parse(localStorage.getItem("todos"));
      const currentTodo = { item: item, isCompleted: false };
      todos.push(currentTodo);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });
};
const makeTodoElement = (todoArray) => {
  if (!todoArray) {
    return null;
  }
  todoArray.forEach((todoObject) => {
    const card = document.createElement("li");
    const cbContainer = document.createElement("div");
    const cbinput = document.createElement("input");
    const checkSpan = document.createElement("span");
    const itemp = document.createElement("p");
    const clearbtn = document.createElement("button");
    const img = document.createElement("img");

    //Add Classes
    card.classList.add("card");
    cbContainer.classList.add("cb-container");
    cbinput.classList.add("cb-input");
    checkSpan.classList.add("check");
    itemp.classList.add("item");
    clearbtn.classList.add("clear");

    //Add Attributes
    card.setAttribute("draggable", true);
    cbinput.setAttribute("type", "checkbox");
    img.setAttribute("src", "./assets/images/icon-cross.svg");
    img.setAttribute("alt", "Clear It");
    itemp.textContent = todoObject.item;

    //Add Events
    card.addEventListener("dragstart", () => {
      card.classList.add("dragging");
    });
    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
    });

    //Set Elements by Parent Child
    clearbtn.appendChild(img);
    cbContainer.appendChild(cbinput);
    cbContainer.appendChild(checkSpan);
    card.appendChild(cbContainer);
    card.appendChild(itemp);
    card.appendChild(clearbtn);

    document.getElementById("todos").appendChild(card);
  });
};
document.addEventListener("DOMContentLoaded", main);
