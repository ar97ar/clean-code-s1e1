let taskInput = document.getElementById("new-task"); //Add a new task.
let addButton = document.getElementsByTagName("button")[0]; //first button
let incompleteTaskHolder = document.getElementById("incompleteTasks"); //ul of #incompleteTasks
let completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//New task list item

let createNewTaskElement = function (taskString) {

  let listItem = document.createElement("li");
  //input (checkbox)
  let checkBox = document.createElement("input"); //checkbox
  //label
  let label = document.createElement("label"); //label
  //input (text)
  let editInput = document.createElement("input"); //text
  //button.edit
  let editButton = document.createElement("button"); //edit button
  //button.delete
  let deleteButton = document.createElement("button"); //delete button
  let deleteButtonImg = document.createElement("img"); //delete button image

  label.innerText = taskString;
  label.className = "list__task-value";
  //Each elements, needs appending
  listItem.className = "list__task";

  checkBox.type = "checkbox";
  checkBox.className = "list__task-check";

  editInput.type = "text";
  editInput.className = "list__task-input";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "list__task_btn-edit";

  deleteButton.className = "list__task_btn-delete";
  deleteButtonImg.className = "list__task_img-delete";

  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "delete-button";

  deleteButton.appendChild(deleteButtonImg);
  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

let addTask = function () {
  console.log("Add Task...");

  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  let listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

//Edit an existing task.

let editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  let listItem = this.parentNode;
  let editInput = listItem.querySelector(".list__task-input");
  let label = listItem.querySelector(".list__task-value");
  let editBtn = listItem.querySelector(".list__task_btn-edit");
  let containsClass = listItem.classList.contains("edit-task");

  //If class of the parent is .editmode
  if (containsClass) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .editmode on the parent.
  label.classList.toggle("list__task-value_edit");
  editInput.classList.toggle("list__task-input_edit");
  listItem.classList.toggle("edit-task");
};

//Delete task.
let deleteTask = function () {
  console.log("Delete Task...");
  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
};

//Mark task completed
let taskCompleted = function () {
  console.log("Complete Task...");
  //Append the task list item to the #completed-tasks
  let listItem = this.parentNode;
  let label = listItem.querySelector(".list__task-value");

  label.classList.toggle("list__task-value_complete");
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

let taskIncomplete = function () {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  let listItem = this.parentNode;
  let label = listItem.querySelector(".list__task-value");

  label.classList.toggle("list__task-value_complete");
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

let ajaxRequest = function () {
  console.log("AJAX Request");
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");

  //select ListItems children
  let checkBox = taskListItem.querySelector("input[type=checkbox]");
  let editButton = taskListItem.querySelector(".list__task_btn-edit");
  let deleteButton = taskListItem.querySelector(".list__task_btn-delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items children(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.