const taskInput = document.querySelector('#task');
const clearTask = document.querySelector('.clear-tasks');
const list = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const form = document.querySelector('#task-form');

loadEventListeners();

function loadEventListeners()
{
    form.addEventListener('submit',addTask);
    clearTask.addEventListener('click',removeAllTasks);
    list.addEventListener('click',removeTask);
    filter.addEventListener('keyup',filterTask);
    document.onload = showLocalStorage();
}

function showLocalStorage()
{
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove">X</i>';
        li.appendChild(link);
        list.appendChild(li);

    });
}
function addTask(e)
{
    if(taskInput.value === '' )
    {
        alert('add a task');
    }
    else{

    
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove">X</i>';
        li.appendChild(link);
        list.appendChild(li);

        saveTasks(taskInput.value);

        taskInput.value = '';

    }

    e.preventDefault();
}

function saveTasks(task)
{
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task); 
    
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeAllTasks()
{
   list.innerHTML='';
   clearTasksFromLS();
} 

function clearTasksFromLS()
{
   localStorage.clear();
}
function removeTask(e)
{
    if(e.target.parentElement.classList.contains("delete-item"))
    {
        
        e.target.parentElement.parentElement.remove();

        removefromLS(e.target.parentElement.parentElement);
        //  const tasks = JSON.parse(localStorage.getItem('tasks'));

    }
}

function removefromLS(taskIn)
{
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        correctTask = task + "X";

        console.log(taskIn.textContent + " " + correctTask);

        if(taskIn.textContent === correctTask)
        {
            tasks.splice(index, 1);
        }

    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
function filterTask(e)
{
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1)
        {
            task.style.display = 'block';
        }
        else
        {
            task.style.display = 'none';
        }
    });
}