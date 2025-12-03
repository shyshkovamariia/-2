const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
};

const elements = {
  list: document.getElementById('todo-list'),
  itemCount: document.getElementById('item-count'),
  uncheckedCount: document.getElementById('unchecked-count'),
  input: document.getElementById('todo-input'),
  addBtn: document.getElementById('add-btn'),
};

let counters = {
  total: 0,
  unchecked: 0,
};

function toggleInput() {
  const visible = elements.input.style.display === 'inline';

  elements.input.style.display = visible ? 'none' : 'inline';
  elements.addBtn.style.display = visible ? 'none' : 'inline';

  if (!visible) elements.input.focus();
}

function updateCounters() {
  elements.itemCount.textContent = counters.total;
  elements.uncheckedCount.textContent = counters.unchecked;
}

function createTodoElement(text) {
  const li = document.createElement('li');
  li.className = classNames.TODO_ITEM;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = classNames.TODO_CHECKBOX;
  checkbox.addEventListener('change', () => {
    counters.unchecked += checkbox.checked ? -1 : 1;
    updateCounters();
  });

  const span = document.createElement('span');
  span.className = classNames.TODO_TEXT;
  span.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'delete';
  deleteBtn.className = classNames.TODO_DELETE;
  deleteBtn.addEventListener('click', () => {
    if (!checkbox.checked) counters.unchecked--;
    counters.total--;
    elements.list.removeChild(li);
    updateCounters();
  });

  li.append(checkbox, span, deleteBtn);
  return li;
}

function newTodo() {
  const text = elements.input.value.trim();

  if (!text) {
    alert('Field is empty');
    return;
  }

  const todoItem = createTodoElement(text);
  elements.list.appendChild(todoItem);

  counters.total++;
  counters.unchecked++;

  elements.input.value = '';
  elements.input.style.display = 'none';
  elements.addBtn.style.display = 'none';

  updateCounters();
}


