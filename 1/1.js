const changeTheme = document.querySelector(".img");
const input = document.querySelector(".input");
const list = document.querySelector(".list");
const body = document.querySelector(".bod");
const header = document.querySelector(".header");
const itemLeft = document.querySelector(".itemLeft");
const spanNoOfItem = document.querySelector(".spanNoOfItem");
const clearComplete = document.querySelector(".clearComplete");
const all = document.querySelector(".all");
const active = document.querySelector(".active");
const complete = document.querySelector(".complete");

const appList = [];
let id = 0;
let noOfItemInTheList = 0;

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// input.addEventListener('keyup',createList)

// function createList(event){
//     if(event.keyCode === 13){
//         // if(input.value==""){
//         //     alert="you must write something"
//         // }else{
//             //creating li element
//             const li = document.createElement(`li`)
//             li.classList.add('item-space')
//             const text = document.createTextNode(input.value)
//             li.appendChild(text)

//             const span = document.createElement("SPAN")
//             const txt = document.createTextNode("\u00D7")
//             span.classList.add('close')
//             span.className = 'close'
//             span.appendChild(txt)
//             li.appendChild(span)

//             list.insertAdjacentElement('beforeend',li)

//         // }

//         input.value=""
//     }
// }

//Adding Event Listeners
//.....
//change Theme
changeTheme.addEventListener("click", changingTheme);
//input
input.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    const todo = input.value;
    if (todo) {
      addToDo(todo, id, false, false);
      appList.push({
        name: todo,
        id: id,
        done: false,
        trash: false,
      });

      id++;
    }
    input.value = "";
    spanNoOfItem.innerText = ++noOfItemInTheList;
    console.log(appList);
  }
});
//list
list.addEventListener("click", (event) => {
  //return a clicked element in the list
  const element = event.target;
  const elementJobAttribut = element.attributes.job.value;
  // console.log(elementJobAttribut)
  if (elementJobAttribut == "complete") {
    completeTask(element);
  } else if (elementJobAttribut == "delete") {
    removeTask(element);
  }
});
//other filters
clearComplete.addEventListener("click", clearCompleted);
all.addEventListener("click", showAll);
active.addEventListener("click", showActiveItems);
complete.addEventListener("click", showDoneItems);

//functions
//.....
//adding to the list
function addToDo(todo, id, done, trash) {
  if (trash) {
    return;
  }
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const li = document.createElement(`li`);
  li.classList.add("item-space");

  li.innerHTML = `<i class="fa ${DONE} co" job="complete" id=${id}></i>
                    <p class="text ${LINE}">${todo}</p>
                    <i class="fa fa-close de" job="delete" id=${id}></i>`;

  const position = "beforeend";
  list.insertAdjacentElement(position, li);
}
// addToDo("play");
// addToDo("Drink coffee1", 1, true, false);
// addToDo("Drink coffee2", 1, false, false);

//complete a tassk
function completeTask(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  appList[element.id].done = appList[element.id].done ? false : true;

  calculateNoOfItemInTheList();
}
//remove a task
function removeTask(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  appList[element.id].trash = true;
  calculateNoOfItemInTheList();
}
//calculate number of active items in the list
function calculateNoOfItemInTheList() {
  noOfItemInTheList = 0;
  appList.forEach((element) => {
    if (!element.done) {
      noOfItemInTheList++;
    }
  });
  spanNoOfItem.innerText = noOfItemInTheList;
}
//clearing all the completed tasks
function clearCompleted() {
  list.innerHTML = "";
  appList.forEach((element) => {
    if (!element.done) {
      addToDo(element.name, element.id, element.done, element.trash);
    } else {
      delete appList[element.id];
      console.log(appList);
    }
  });
}
//showing only active tasks
function showActiveItems() {
  list.innerHTML = "";
  appList.forEach((element) => {
    if (!element.done) {
      addToDo(element.name, element.id, element.done, element.trash);
    }
  });
}
//showing only done tasks
function showDoneItems() {
  list.innerHTML = "";
  appList.forEach((element) => {
    if (element.done) {
      addToDo(element.name, element.id, element.done, element.trash);
    }
  });
}
//showing all tasks
function showAll() {
  list.innerHTML = "";
  appList.forEach((element) => {
    addToDo(element.name, element.id, element.done, element.trash);
  });
}
//changeing Theme
function changingTheme() {
  body.classList.toggle("dark");
  body.classList.toggle("ligh");
  header.classList.toggle("header-light");
  header.classList.toggle("header-dark");
  changeTheme.classList.toggle("img-dark");
  changeTheme.classList.toggle("img-light");
}
