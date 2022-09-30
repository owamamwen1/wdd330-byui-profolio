let addToDo = document.getElementById('addToDoList');
let container = document.getElementById('container');
let inputValue = document.getElementById('inputValue');

// Add to do list 
addToDo.addEventListener('click', function(){
    var ptag = document.createElement('p');
    ptag.classList.add('paragraph');
    ptag.innerText = inputValue.value;
    container.appendChild(ptag);
    inputValue.value = "";
    // Work done
    ptag.addEventListener('click', function(){
        ptag.classList.add('line-through');
    })
    // Remove work done
    ptag.addEventListener('dblclick', function(){
        container.removeChild(ptag);
    })
})