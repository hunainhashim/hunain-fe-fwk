'use strict'

var newToDoInput = document.getElementById('new-todo-input');
var addToDoButton = document.getElementById('new-todo-button');
var toDoListContainer = document.getElementById('todo-list-container');
var todoValue = null;
var isSaveClicked = false;
var todos = [];

newToDoInput.oninput = updateAddButtonState;
newToDoInput.addEventListener('keypress', function (e){
    if(e.key === 'Enter' && newToDoInput.value.length > 2) addButtonOnClick();

})
addToDoButton.onclick = addButtonOnClick;

function addButtonOnClick(){
    if(todos.indexOf(newToDoInput.value) === -1){
        todos.push(newToDoInput.value);
        readTodo(newToDoInput.value);
        addToDoButton.disabled = true;
        createToDos(newToDoInput.value);
        newToDoInput.value = null;
    }else{
        alert("Todo Already Exist in the List!")
    }

}

function updateAddButtonState(){
    addToDoButton.disabled = newToDoInput.value.length < 3;
}

function createToDos(value){
    var newToDoWrapper = document.createElement('div');
    newToDoWrapper.classList.add('todo-wrapper');
    toDoListContainer.appendChild(newToDoWrapper);

    var todoTextBox = document.createElement('div');
    todoTextBox.classList.add('todo-text-box');
    newToDoWrapper.appendChild(todoTextBox);

    var newTodo = document.createElement('div');
    newTodo.classList.add('todo-text-area');
    newTodo.innerText = value;
    todoTextBox.appendChild(newTodo);
    newTodo.onclick = toDoOnClicked.bind(this, newTodo)
    newTodo.contentEditable = 'true';

    var doneButton = document.createElement('button');
    doneButton.innerText = 'Done';
    doneButton.classList.add('button');
    newToDoWrapper.appendChild(doneButton);
    doneButton.onmousedown = onDoneClicked.bind(this, doneButton)

    var cancelButton = document.createElement('button');
    cancelButton.innerText = 'Cancel';
    cancelButton.classList.add('hide');
    cancelButton.classList.add('button');
    newToDoWrapper.appendChild(cancelButton);

    newTodo.onclick = toDoOnClicked.bind(this, doneButton, cancelButton);

    newTodo.addEventListener('focusout', function(){
        focusout();
    });

    newTodo.addEventListener('focusin', function(){
        focusin();
    });
    var focusout = todoFocusOut.bind(this, newTodo, doneButton, cancelButton)
    var focusin = todoFocusIn.bind(this, newTodo)
}

function todoFocusOut(ele, doneBtn, cancelBtn){
    if(!isSaveClicked){
        ele.innerText = todoValue;
    }
    doneBtn.innerText = 'Done';
    cancelBtn.classList.add('hide');
    doneBtn.onmousedown = null;
    isSaveClicked = false;
    doneBtn.onmousedown = onDoneClicked.bind(this, doneBtn);
}

function todoFocusIn(ele){
    todoValue = ele.innerText;
}

function toDoOnClicked(doneBtn, cancelBtn){
    doneBtn.innerText = 'Save';
    cancelBtn.classList.remove('hide');
    doneBtn.onmousedown = null;
    doneBtn.onmousedown = onSavedClicked;
}

function onSavedClicked(){
    isSaveClicked = true;
}

function onDoneClicked(ele){
    ele.classList.add('hide');
    var toDoWrapperElement = ele.parentNode;
    var textBox = toDoWrapperElement.getElementsByClassName('todo-text-box')[0];
    var textArea = textBox.firstChild;
    textBox.style.textDecoration = "line-through";
    textArea.contentEditable = 'false';
    textArea.onclick = null
}

function readTodo(msg){
    var speechMessage = new SpeechSynthesisUtterance();
    speechMessage.text = msg;
    speechSynthesis.speak(speechMessage);
}
