const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Function to save tasks to localStorage
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to get tasks from localStorage
function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}

// Function to render tasks from localStorage
function renderTasks(tasks) {
    taskList.innerHTML = "";  // Clear the task list before rendering
    tasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task");
        taskItem.innerHTML = `
            <div class="task-info">
                <p>${task.name}</p>
                <p>Priority: ${task.priority}</p>
                <p>Deadline: ${task.deadline}</p>
            </div>
            <button class="mark-done"><i class="fas fa-check"></i></button>
            <button class="remove-task"><i class="fas fa-trash"></i></button>
        `;

        // Mark task as done if it was previously completed
        if (task.completed) {
            taskItem.style.backgroundColor = "#f2f2f2";
            taskItem.querySelector(".mark-done").disabled = true;
        }

        taskList.appendChild(taskItem);

        // Add event listeners for Mark Done and Remove buttons
        taskItem.querySelector(".mark-done").addEventListener("click", () => {
            task.completed = true;
            saveTasksToLocalStorage(tasks);
            renderTasks(tasks);
        });

        taskItem.querySelector(".remove-task").addEventListener("click", () => {
            const index = tasks.indexOf(task);
            tasks.splice(index, 1);  // Remove task from the array
            saveTasksToLocalStorage(tasks);
            renderTasks(tasks);
        });
    });
}

// Event listener for adding a new task
addTaskButton.addEventListener("click", () => {
    const taskName = taskInput.value;
    const priority = priorityInput.value;
    const deadline = deadlineInput.value;

    if (taskName.trim() === "" || deadline === "") {
        alert("Please enter a task and select an upcoming date for the deadline.");
        return;
    }

    const selectedDate = new Date(deadline);
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
        alert("Please select a future deadline.");
        return;
    }


    const formattedDate = selectedDate.toLocaleDateString('en-GB');

    // Create a new task object
    const task = {
        name: taskName,
        priority: priority,
        deadline: formattedDate,
        completed: false
    };

    // Get existing tasks from localStorage, add new task, and save back to localStorage
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    saveTasksToLocalStorage(tasks);
    renderTasks(tasks);

    // Clear input fields
    taskInput.value = "";
    priorityInput.value = "top";
    deadlineInput.value = "";
});

// Load and render tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const tasks = getTasksFromLocalStorage();
    renderTasks(tasks);
});
