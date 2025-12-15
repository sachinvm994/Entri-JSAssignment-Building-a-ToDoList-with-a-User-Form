// Initial Tasks for reference.
const tasks = [
  { text: "Buy groceries", completed: false },
  { text: "Walk the dog", completed: false },
  { text: "Read a book", completed: false },
];
// const tasks = [];

// to Display Tasks
const displayTasks = () => {
  const tasklist = document.getElementById("taskList");
  const messagElement = document.getElementById("message");
  if (tasks.length === 0) {
    messagElement.classList.remove("d-none");
  } else {
    messagElement.classList.add("d-none");
  }
  tasklist.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    let completedClass = "";
    let checkboxState = "";
    let editDisabled = "";
    // console.log(tasks[i]);
    if (tasks[i].completed) {
      completedClass = "task-completed";
      checkboxState = "checked disabled";
      editDisabled = "disabled";
    }
    tasklist.innerHTML += `<div class="alert alert-light d-flex justify-content-between align-items-center mb-2 task-item ${completedClass}">
            
            <div class="form-check">
                <input class="form-check-input" type="checkbox"
                    ${checkboxState}
                    onchange="handleDelayedComplete(${i}, this)">

                <label class="form-check-label">
                    ${tasks[i].text}
                </label>
            </div>

            <div>
                <button class="btn btn-warning btn-sm me-2"
                    onclick="editTask(${i})"
                    ${editDisabled}>
                    Edit
                </button>

                <button class="btn btn-danger btn-sm"
                    onclick="deleteTask(${i})">
                    Delete
                </button>
            </div>
        </div>`;
  }
};
displayTasks();

// to Add New task
const addTask = () => {
  const input = document.getElementById("task-input");
  const newTaskInput = input.value.trim();
  if (newTaskInput.length === 0) {
    alert("Task cannot be empty");
    return;
  }
  //   console.log(newTaskInput);

  if (isEditing) {
    tasks[currentEditIndex].text = newTaskInput;
    isEditing = false;
    currentEditIndex = null;
    document.getElementById("add-Task").textContent = "Add Task";
  } else {
    tasks.push({ text: newTaskInput, completed: false });
  }
  // console.log(tasks);
  input.value = "";
  displayTasks();
};

// to delete Task
const deleteTask = (index) => {
  console.log("Delete task at index: ", index);
  tasks.splice(index, 1);
  displayTasks();
};

// Edit Task using Input Field
let isEditing = false;
let currentEditIndex = null;
const editTask = (index) => {
  if (tasks[index].completed === true) {
    return;
  }

  const input = document.getElementById("task-input");
  input.value = tasks[index].text;
  isEditing = true;
  currentEditIndex = index;
  document.getElementById("add-Task").textContent = "Update Task";
};

// to complete Task
const completeTask = (index) => {
  //   console.log("Complete task at index: ", index);
  tasks[index].completed = true;
  displayTasks();
  const taskElements = document.querySelectorAll(".task-item");
  const currentTask = taskElements[index];
  if (!currentTask) return;

  setTimeout(() => {
    currentTask.classList.add("fade-out");
  }, 4000);

  setTimeout(() => {
    tasks.splice(index, 1);
    displayTasks();
  }, 5000);
};

// to handle delayed completion
let completionTimers = {};
const handleDelayedComplete = (index, checkbox) => {
    if (!checkbox.checked) {
        clearTimeout(completionTimers[index]);
        delete completionTimers[index];

        tasks[index].completed = false;
        displayTasks();
        return;
    }
    completionTimers[index] = setTimeout(() => {
        delete completionTimers[index];
        completeTask(index);
    }, 3000);

}
