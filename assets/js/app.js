const btnteme = document.getElementById("theme-switcher");
const bodytag = document.querySelector("body");
const addbtn = document.getElementById("add-btn");
const todoinput = document.getElementById("addt");
const main = () => {
  btnteme.addEventListener("click", () => {
    bodytag.classList.toggle("light");
    const temeimg = btnteme.children[0];
    temeimg.setAttribute(
      "src",
      temeimg.getAttribute("src") === "./assets/images/icon-moon.svg"
        ? "./assets/images/icon-sun.svg"
        : "./assets/images/icon-moon.svg"
    );
  });

  makeTodoElement(JSON.parse(localStorage.getItem("todos")));

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
