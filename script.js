
const form = document.getElementById("form");
const input = document.getElementById("input");
const todos = document.getElementById("todos"); 

const loadstored = JSON.parse(localStorage.getItem("key"));

if (loadstored) {
  loadstored.forEach((todo) => {
    addTodo(todo);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todo) {


  const tarih = new Date();
  const yil = tarih.getFullYear();
  const ay = tarih.getMonth() + 1;
  const gun = tarih.getDate();
  const todoTime = (gun + "/" + ay + "/" + yil).toString();

  let todoText = input.value
    ? input.value + " The start date of the task: " + todoTime
    : input.value;

  if (todo) {
    todoText = todo.text;

  }

  if (todoText) {
    const todoEl = document.createElement("li"); 

    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }

    const lastText = todoText.slice(-37);
    const first = todoText.split("", todoText.length - 37);
    const firstText = first.join("");

    todoEl.innerHTML = ` <p class="paragraph"> ${firstText} </p>
                       <p class="paragraph" id="second"> ${lastText} </p> `;

    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed"); 
      updateLS();
    });

    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todoEl.remove();
      updateLS();
    });

    todos.appendChild(todoEl);

    input.value = "";
    updateLS();
  }
}

function updateLS() {
  const todosEl = document.querySelectorAll("li");

  const stored = [];
 
  todosEl.forEach((item) => {
    stored.push({
      text: item.innerText,
      completed: item.classList.contains("completed"),
    });
  });

  localStorage.setItem("key", JSON.stringify(stored));
}
