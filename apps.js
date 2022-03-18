// animation

const labels = document.querySelector('.form-control label');
const label2 = document.querySelector('.form-control label.second')

labels.innerHTML = labels.innerText.split('').map((letter, idx) => `<span style="transition-delay: ${idx * 50}ms">${letter}</span>`).join('');

label2.innerHTML = label2.innerText.split('').map((letter, idx) => `<span style="transition-delay: ${idx * 100}ms">${letter}</span>`).join('');

// dom manipulation

const submit = document.querySelector('.myButton')
const input = document.querySelector('input.input.first')
const ul = document.querySelector('ul')
const clearbtn = document.querySelector('a.clear-tasks')
const filter = document.querySelector('input.input.filter')
const card = document.querySelector('.card');

// //event listeners

card.addEventListener('mousemove',(e)=>{

    document.body.style.backgroundColor = `rgb(${e.offsetX},${e.offsetY},0)`;
})
document.addEventListener('DOMContentLoaded', gettasks)
submit.addEventListener('click' , addTask)
clearbtn.addEventListener('click', removeTasks)
document.body.addEventListener('click',deleteitem)
filter.addEventListener('keyup', (e)=>{
        let search = e.target.value.toLowerCase()
        document.querySelectorAll('.list-item').forEach((ele)=>{
            let item = ele.textContent
            if(item.toLowerCase().indexOf(search) != -1){
                ele.style.display = "block";
            } else{
                ele.style.display = "none";
            }
        })
    
})

//get tasks
function gettasks(){
    if(localStorage.getItem('tasks') === null){
        return;
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.className = 'list-item';
        li.innerHTML = task;
        let a = document.createElement('a');
        a.setAttribute('href','#');
        a.className = 'delete-task';
        let img = '<img class="delete-icon" src="./delete.jpg" alt="delete"/>';
        a.innerHTML = img;
        li.appendChild(a);
        ul.appendChild(li);
    });
}

//add task
function addTask(e){
    if(input.value === ''){
        alert('enter a message')
        return;
    }
    let val = input.value;
    console.log(val);
    let li = document.createElement('li');
    li.className = 'list-item';
    li.innerHTML = val;
    let a = document.createElement('a');
    a.setAttribute('href','#');
    a.className = 'delete-task';
    let img = '<img class="delete-icon" src="./delete.jpg" alt="delete"/>';
    a.innerHTML = img;
    li.appendChild(a);
    ul.appendChild(li);
    addlocalstorage(val);
    input.value = '';

}

//store in localstorage
function addlocalstorage(val){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(val)
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

//removetask
function removeTasks(e){
    let tasks = ul.children;
    let arr = Array.from(tasks);
    arr.forEach(ele => {
        ele.remove();
    });
    e.preventDefault();
}

function deleteitem(e){
    if(e.target.className === 'delete-icon'){
        tasks = JSON.parse(localStorage.getItem('tasks'))
        const task = tasks.filter((x)=>{
            return x !== e.target.parentElement.parentElement.innerText
        })
        localStorage.setItem('tasks',JSON.stringify(task))
        e.target.parentElement.parentElement.remove();
    }
    e.preventDefault();
}

