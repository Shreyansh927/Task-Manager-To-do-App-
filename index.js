let add1 = document.getElementById("add1");
let containerList = document.getElementById("containerList");
let listInput = document.getElementById("listInput");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let date = document.getElementById("date");
let current_date = new Date();
let formattedDate = current_date.toLocaleDateString();

function createAndAppendList(task) {
  let coldiv = document.createElement("div");
  coldiv.classList.add("col-12", "mb-3");
  containerList.appendChild(coldiv);

  let flexdiv = document.createElement("div");
  flexdiv.classList.add("d-flex");
  coldiv.appendChild(flexdiv);

  let inputEle = document.createElement("input");
  inputEle.classList.add("text-left", "pr-3", "mr-2");
  inputEle.type = "checkbox";
  inputEle.checked = task.completed; // Set checkbox based on task's completed state

  flexdiv.appendChild(inputEle);

  let carddiv = document.createElement("div");
  carddiv.classList.add("card", "shadow", "col-12", "pl-2", "pr-2");
  flexdiv.appendChild(carddiv);

  let contentDflex = document.createElement("div");
  contentDflex.classList.add("d-flex", "flex-row", "justify-content-between");
  carddiv.appendChild(contentDflex);

  let par = document.createElement("p");
  par.textContent = formattedDate;
  carddiv.appendChild(par);

  let h5 = document.createElement("h5");
  h5.classList.add("mt-2");
  h5.textContent = task.text;
  if (task.completed) {
    h5.classList.add("linethrough"); // Add line-through class if completed
  }
  contentDflex.appendChild(h5);

  inputEle.onclick = function () {
    h5.classList.toggle("linethrough");
    task.completed = inputEle.checked; // Update completed state
    save();
  };

  let updatedInput = document.createElement("input");
  updatedInput.type = "text";
  updatedInput.value = h5.textContent;
  updatedInput.classList.add("updatedInput");
  updatedInput.style.display = "none";
  contentDflex.appendChild(updatedInput);

  let inputdiv = document.createElement("div");
  inputdiv.classList.add("d-flex");
  contentDflex.appendChild(inputdiv);

  let icon3 = document.createElement("i");
  icon3.style.display = "none";
  icon3.classList.add("bi", "bi-check-circle-fill");
  icon3.onclick = function () {
    icon3.style.display = "none";
    icon2.style.display = "block";
    h5.textContent = updatedInput.value;
    updatedInput.style.display = "none";
    h5.style.display = "block";
    task.text = updatedInput.value; // Update task text
    save();
  };
  inputdiv.appendChild(icon3);

  let icon2 = document.createElement("i");
  icon2.classList.add("bi", "bi-pen", "edit", "mr-2");
  icon2.onclick = function () {
    icon3.style.display = "block";
    icon2.style.display = "none";
    h5.style.display = "none";
    updatedInput.style.display = "block";
    save();
  };
  inputdiv.appendChild(icon2);

  let icon1 = document.createElement("i");
  icon1.classList.add("bi", "bi-x-circle-fill");
  icon1.onclick = function () {
    containerList.removeChild(coldiv);
    tasks = tasks.filter((t) => t.text !== task.text); // Remove task from array
    save();
  };
  inputdiv.appendChild(icon1);
}

add1.onclick = function () {
  if (listInput.value === "") {
    alert("Enter Some Task");
    return;
  }
  let taskText = listInput.value;
  let newTask = {
    text: taskText,
    completed: false,
  };
  tasks.push(newTask);
  createAndAppendList(newTask);
  listInput.value = "";
  save();
};

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function show() {
  tasks.forEach((task) => {
    createAndAppendList(task);
  });
}

function addList(event) {
  if (event.key === "Enter") {
    add1.click(); // Trigger the same action as clicking the add button
  }
}

listInput.addEventListener("keydown", addList);
show();
