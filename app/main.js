// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
// localStorage Saving
const localStorageTask = localStorage.getItem('tasks');
const tasks = localStorageTask ? JSON.parse(localStorageTask) : [];

// Load Event Listeners 

loadEventListeners();

function loadEventListeners() {

	document.addEventListener('DOMContentLoaded', getTasks)

	form.addEventListener('submit', addTask);

	taskList.addEventListener('click', removeTask);

	clearBtn.addEventListener('click', clearTasks)

	filter.addEventListener('keyup', filterTask)
}

function generateTaskLi(taskValue) {
	// Create li element
	const li = document.createElement('li');
	// Add a class
	li.className = 'collection-item';
	// Create a TextNode
	li.appendChild(document.createTextNode(taskValue));
	// Create a new link element
	const link = document.createElement('a');
	// Add a class
	link.className = 'delete-item secondary-content'; 
	// Add cursor pointer
	link.style.cursor = 'pointer'; 
	// Add icon html 
	link.innerHTML = '<i class="fa fa-remove"></i>';
	// Add link to li
	li.appendChild(link);
	// Add li to ul
	taskList.appendChild(li);
}

// Get tasks from LS
function getTasks() {
	tasks.forEach(function(task) {
		generateTaskLi(task);
	})
}

// Add task event
function addTask(e) {
	if (taskInput.value === '') {
		alert('Add a task');
		return false;
	}

	generateTaskLi(taskInput.value)
	// Store task in LS
	storeTaskInLocalStorage(taskInput.value)
	// Clear the input 
	taskInput.value = '';

	e.preventDefault();
}

// Store task in LS 
function storeTaskInLocalStorage(task) {

	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Remove task event 
function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are You Sure?')) {
			e.target.parentElement.parentElement.remove();

			removeTaskFromLocalStorage(e.target.parentElement.parentElement)
		}
	}
}

// Remove task from LS
function removeTaskFromLocalStorage(taskItem) {
	tasks.forEach(function(task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Clear tasks
function clearTasks() {
	// Faster
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	localStorage.clear();
}
// Filter tasks
function filterTask(e) {
	const text = e.target.value.toLowerCase();

	document.querySelectorAll('.collection-item').forEach(function(task) {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) !== -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});
}