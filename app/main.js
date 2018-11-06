// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load Event Listeners 

loadEventListeners();

function loadEventListeners() {
	form.addEventListener('submit', addTask);
}

function addTask(e) {
	if (taskInput.value === '') {
		alert('Add a task');
	}

	// Create li element
	const li = document.createElement('li');

	// Add a class
	li.className = 'collection-item';

	// Create a TextNode
	li.appendChild(document.createTextNode(taskInput.value));

	// Create a new link element
	const link = document.createElement('a');
	
	// Add a class
	link.className = 'delete-item secondary-content'; 

	// Add icon html 
	link.innerHTML = '<i class="fa fa-remove"></i>';

	// Add link to li
	li.appendChild(link);

	// Add li to ul
	taskList.appendChild(li);

	// Clear the input 
	taskInput.value = '';

	e.preventDefault();

}