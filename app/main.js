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

	taskList.addEventListener('click', removeTask);

	clearBtn.addEventListener('click', clearTasks)

	filter.addEventListener('keyup', filterTask)
}


// Add task event
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

// Remove task event 
function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are You Sure?')) {
			e.target.parentElement.parentElement.remove();
		}
	}
	
}

// Clear tasks
function clearTasks() {
	// taskList.innerHTML = '';

	// Faster
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

}

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