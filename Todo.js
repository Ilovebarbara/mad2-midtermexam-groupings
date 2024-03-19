


function fetchTodoList() {
  return fetch('Todo.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function displayTodoList(data) {
  var todoListDiv = document.getElementById('todo-list');
  var html = '';

  data.TodoList.forEach(function(item) {
    html += '<div class="todo-item">';
    html += '<h2>' + item.Title + '</h2>';
    html += '<p><strong>Date:</strong> ' + item.DATE + '</p>';
    html += '<p><strong>Status:</strong> ' + item.STATUS + '</p>';
    html += '<input type="checkbox" id="todo_' + item.ID + '" class="todo-checkbox"' + (item.STATUS === "Completed" ? ' checked' : '') + '>';
    html += '<img src="' + item.IMAGE_PATH + '" alt="' + item.IMAGE_PATH + '" class="todo-image">';
    html += '</div>';
  });

  todoListDiv.innerHTML = html;

  // Add event listeners for checkboxes
  var checkboxes = document.querySelectorAll('.todo-checkbox');
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      var id = this.id.split('_')[1];
      var status = this.checked ? 'Completed' : 'Not Started';
      updateStatus(id, status);
    });
  });
}

function filterTodoList(data) {
  var searchInput = document.getElementById('searchInput');
  var filterValue = searchInput.value.toUpperCase();
  var filteredData = data.TodoList.filter(function(item) {
    return item.Title.toUpperCase().includes(filterValue);
  });
  displayTodoList({ TodoList: filteredData });
}

function updateStatus(id, status) {
  fetch('Todo.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    })
    .then(data => {
      var todoItem = data.TodoList.find(item => item.ID == id);
      if (todoItem) {
        todoItem.STATUS = status;
        displayTodoList(data);
      }
    })
    .catch(error => {
      console.error('Error updating status:', error);
    });
}

window.onload = function() {
  fetchTodoList()
    .then(data => {
      displayTodoList(data);
      var searchInput = document.getElementById('searchInput');
      searchInput.addEventListener('input', function() {
        filterTodoList(data);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};

let timer;
let timerDisplay = document.getElementById('timerDisplay');
let startButton = document.getElementById('startButton');
let stopButton = document.getElementById('stopButton');
let resetButton = document.getElementById('resetButton');
let startTime;
let elapsedTime = 0;
let isRunning = false;

function displayTime(time) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = time % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timer = setInterval(function() {
      elapsedTime = Date.now() - startTime;
      timerDisplay.textContent = displayTime(Math.floor(elapsedTime / 1000));
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  timerDisplay.textContent = '00:00:00';
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);


