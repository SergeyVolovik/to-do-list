// All Selectors
const input__todo = document.querySelector('.input__todo'),
    btn__todo = document.querySelector('.btn__todo'),
    list__todo = document.querySelector('.list__todo'),
    filter__todo = document.querySelector('.filter__todo');

//Add Event Listener
document.addEventListener('DOMContentLoaded', getTodos);
input__todo.addEventListener('focusout', trimInput);
btn__todo.addEventListener('click', addTodo);
filter__todo.addEventListener('click', filterTodo);

//All Functions
function trimInput(trim__e) {
    trim__e.preventDefault();

    let input__str = input__todo.value;
        value__trim = input__str.trim();
        input__todo.value = value__trim;
};

function createTodos(input__str) {
    //Create todo div in todo__list
    const div__todo = document.createElement('div');
        div__todo.classList.add('todo');

    //Create li in todo div
    const li__todo = document.createElement('li');
        li__todo.innerHTML = input__str;
        li__todo.classList.add('todo__item');
        div__todo.appendChild(li__todo);

    //Create check btn
    const btn__check = document.createElement('button');
        btn__check.innerHTML = '<i class="fas fa-check-circle"></i>';
        btn__check.classList.add('check');
        div__todo.appendChild(btn__check);

    //Create delete btn
    const btn__delete = document.createElement('button');
        btn__delete.innerHTML = '<i class="fas fa-trash"></i>';
        btn__delete.classList.add('delete');
        div__todo.appendChild(btn__delete);

    list__todo.appendChild(div__todo);

    btn__check.addEventListener('click', deleteCheckTodo);
    btn__delete.addEventListener('click', deleteCheckTodo);
}

function addTodo(add__e) {
    add__e.preventDefault();

    let input__str = input__todo.value;

    if (input__str.length > 0) {
        createTodos(input__str);
        //Add to localStorage
        saveTodosLocal(input__str);
    } else {
        alert('Please, write your task')
    }

    input__todo.value = '';
}

function deleteCheckTodo(event) {
    const item = event.target;

    if (item.classList[0] === 'check') {
        const todo = item.parentElement;
            todo.classList.toggle('finished');
            item.classList.toggle('check__finished');
    }

    if (item.classList[0] === 'delete') {
        const todo = item.parentElement;
            todo.classList.add('fall');
            removeGetTodo(todo);

        setTimeout(function () {
            todo.remove();
        }, 400)
    }
}

function filterTodo(filter__e) {
    const todos = list__todo.childNodes;

    todos.forEach(function (todo) {
        switch (filter__e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'finished':
                if (todo.classList.contains('finished')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'unfinished':
                if (!todo.classList.contains('finished')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveTodosLocal(todo) {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function (todo) {
        createTodos(todo);
    });
}

function removeGetTodo(todo) {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todo__index = todo.childNodes[0].innerHTML;
        todos.splice(todos.indexOf(todo__index), 1);
        localStorage.setItem('todos', JSON.stringify(todos));
}