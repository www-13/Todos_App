let todos = JSON.parse(localStorage.getItem('todos')) || [];

let app = document.createElement('div')
app.id = 'app';

let appHeader = document.createElement('div');
appHeader.id = 'app-header';

let appTitle = document.createElement('h1');
appTitle.textContent = 'Todos App';

let addTodosIcon = document.createElement('a');
addTodosIcon.innerHTML = "<i class='bx bxs-message-square-add'></i>";

let todosUl = document.createElement('ul');
todosUl.id = 'todos-ul';
todosUl.style.marginTop = '20px';
todosUl.style.width = '100%';

document.body.appendChild(app)
app.appendChild(appHeader)
app.appendChild(todosUl)
appHeader.appendChild(appTitle)
appHeader.appendChild(addTodosIcon)

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    todosUl.innerHTML = '';

    todos.forEach((todo, index) => {  
        let todoLi = document.createElement('li');
        todoLi.style.display = 'flex';
        todoLi.style.justifyContent = 'space-between';
        todoLi.style.alignItems = 'center';
        todoLi.style.width = '100%';
        todoLi.style.padding = '12px';
        todoLi.style.border = 'solid 2px orange';
        todoLi.style.borderRadius = '8px';
        todoLi.style.marginBottom = '10px';
        todoLi.style.background = todo.isFinished ? '#d4edda' : '#fff3cd';
        todoLi.style.color = '#333';
        todoLi.style.fontFamily = 'Arial, sans-serif';
        todoLi.style.fontSize = '16px';
        todoLi.style.boxShadow = '2px 2px 10px rgba(0,0,0,0.1)';
        todoLi.style.transition = '0.3s ease-in-out';
        todoLi.style.cursor = 'pointer';

        todoLi.addEventListener('mouseover', () => {
            todoLi.style.transform = 'scale(1.02)';
            todoLi.style.boxShadow = '4px 4px 15px rgba(0,0,0,0.2)';
        });
        todoLi.addEventListener('mouseout', () => {
            todoLi.style.transform = 'scale(1)';
            todoLi.style.boxShadow = '2px 2px 10px rgba(0,0,0,0.1)';
        });

        let todoName = document.createElement('h3');
        todoName.textContent = todo.name;
        todoName.style.flex = '1';
        todoName.style.margin = '0';
        todoName.style.color = todo.isFinished ? 'green' : 'black';

        let todoIcons = document.createElement('div');
        todoIcons.style.display = 'flex';
        todoIcons.style.gap = '10px';

        let todoDeleteIcon = document.createElement('i');
        todoDeleteIcon.className = 'bx bxs-trash';
        todoDeleteIcon.style.fontSize = '20px';
        todoDeleteIcon.style.color = 'red';
        todoDeleteIcon.style.cursor = 'pointer';
        todoDeleteIcon.addEventListener('click', () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });

        let todoFinishIcon = document.createElement('i');
        todoFinishIcon.className = 'bx bx-check-circle';
        todoFinishIcon.style.fontSize = '22px';
        todoFinishIcon.style.color = todo.isFinished ? 'gray' : 'green';
        todoFinishIcon.style.cursor = 'pointer';
        todoFinishIcon.addEventListener('click', () => {
            todos[index].isFinished = !todos[index].isFinished;
            saveTodos();
            renderTodos();
        });

        todosUl.appendChild(todoLi);
        todoLi.appendChild(todoName);
        todoLi.appendChild(todoIcons);
        todoIcons.appendChild(todoFinishIcon);
        todoIcons.appendChild(todoDeleteIcon);
    });

    saveTodos();
}

addTodosIcon.addEventListener('click', () =>{
    let todoNamee = prompt('Please enter your todo name.')
    todos.push({
        name: todoNamee,
        isFinished: false
    })
    renderTodos()
})
renderTodos();