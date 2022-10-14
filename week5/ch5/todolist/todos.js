
function main() {

  newTodo();
  document.querySelector(".todo").addEventListener("dragover", function (e) {
    e.preventDefault();
    if (
      !e.target.classList.contains("dragging") &&
      e.target.classList.contains("cardtodo")
    ) {
      const dragCard = document.querySelector(".dragging");
      const card = [...this.querySelectorAll(".cardtodo")];
      const currentPost = card.indexOf(dragCard);
      const newPost = card.indexOf(e.target);
      if (currentPost > newPost) {
        this.insertBefore(dragCard, e.target);
      } else {
        this.insertBefore(dragCard, e.target.nextSibling);
      }
    const todo = JSON.parse(localStoreGet("todo"));
      const removePost = todo.splice(currentPost, 1);
      todo.splice(newPost, 0, removePost[0]);
      localStoreSet("todo",todo);
    //   localStorage.setItem("todo", JSON.stringify(todo));
    }
  });
  // add new todo
  const add = document.getElementById("add-btn");
  const todoTxtInput = document.querySelector(".txt-input");
  add.addEventListener("click", function () {
    const item = todoTxtInput.value.trim();
    if (item) {
      todoTxtInput.value = "";
      const todo = !localStoreGet("todo")
        ? [] : JSON.parse(localStoreGet("todo"));
      const currentTodo = {
        item,isCompleted: false,
      };
      newTodo([currentTodo]);
      todo.push(currentTodo);
      localStoreSet("todo",todo)
    //   localStorage.setItem("todo", JSON.stringify(todo));
    }
    todoTxtInput.focus();
  });
  // add todo key event
  todoTxtInput.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      add.click();
    }
  });
  // filter with all, active, completed
  document.querySelector(".todo-filter").addEventListener("click", function (e) {
    const id = e.target.id;
    if (id) {
      document.querySelector(".on").classList.remove("on");
      document.getElementById(id).classList.add("on");
      document.querySelector(".todo").className = `todo ${id}`;
    }
  });
  // clear todo
  document
    .getElementById("clear-todo")
    .addEventListener("click", function () {
      deleteIndexes = [];
      document.querySelectorAll(".cardtodo.checked").forEach(function (card) {
        deleteIndexes.push(
          [...document.querySelectorAll(".todo .cardtodo")].indexOf(card)
        );
        card.classList.add("fall");
        card.addEventListener("animationend", function (e) {
          setTimeout(function () {
            card.remove();
          }, 100);
        });
      });
      removeMultiTodo(deleteIndexes);
    });
}
// initializ 
main();

/* stageTodo */

function stageTodo(index, completed) {
  const todo = JSON.parse(localStoreGet("todo"));
  todo[index].isCompleted = completed;
  localStoreSet("todo",todo);
//   localStorage.setItem("todo", JSON.stringify(todo));
}

/* removeMultiTodo */

function removeTodo(index) {
  const todo = JSON.parse(localStoreGet("todo"));
  todo.splice(index, 1);
  localStoreSet("todo",todo);
//   localStorage.setItem("todo", JSON.stringify(todo));
}

/* removeMultiTodo */

function removeMultiTodo(indexes) {
  let todo = JSON.parse(localStoreGet("todo"));
  todo = todo.filter(function (todo, index) {
    return !indexes.includes(index);
  });
  localStoreSet("todo",todo);
//   localStorage.setItem("todo", JSON.stringify(todo));
}

/* newTodo */

function newTodo(todo = JSON.parse(localStoreGet("todo"))) {
  if (!todo) {
    return null;
  }
  const todoItemsLeft = document.getElementById("todo-left");
  // create card
  todo.forEach(function (todo) {
    const card = document.createElement("li");
    const addContainer = document.createElement("div");
    const cbInput = document.createElement("input");
    const check = document.createElement("span");
    const item = document.createElement("p");
    const button = document.createElement("button");
    const img = document.createElement("img");

    // Add classes
    card.classList.add("cardtodo");
    button.classList.add("clear");
    addContainer.classList.add("add-container");
    cbInput.classList.add("cb-input");
    item.classList.add("item");
    check.classList.add("check");
    button.classList.add("clear");
    
    // Set attributes remove from list
    card.setAttribute("draggable", true);
    img.setAttribute("src", "./assets/images/delete-svgrepo-com.svg");
    img.setAttribute("alt", "Remove");
    cbInput.setAttribute("type", "checkbox");

    // Todo item for card
    item.textContent = todo.item;
    if (todo.isCompleted) {
      card.classList.add("checked");
      cbInput.setAttribute("checked", "checked");
    }
    // Drag listener
    card.addEventListener("dragstart", function () {
      this.classList.add("dragging");
    });
    card.addEventListener("dragend", function () {
      this.classList.remove("dragging");
    });
    // Add click listener to checkbox
    cbInput.addEventListener("click", function () {
      const todoCorrespondCard = this.parentElement.parentElement;
      const checked = this.checked;
      stageTodo(
        [...document.querySelectorAll(".todo .cardtodo")].indexOf(
          todoCorrespondCard
        ),
        checked
      );
      checked
        ? todoCorrespondCard.classList.add("checked")
        : todoCorrespondCard.classList.remove("checked");
      todoItemsLeft.textContent = document.querySelectorAll(
        ".todo .cardtodo:not(.checked)"
      ).length;
    });
    // Clear button
    button.addEventListener("click", function () {
      const todoCorrespondCard = this.parentElement;
      todoCorrespondCard.classList.add("fall");
      removeTodo(
        [...document.querySelectorAll(".todo .cardtodo")].indexOf(
          todoCorrespondCard
        )
      );
      todoCorrespondCard.addEventListener("animationend", function () {
        setTimeout(function () {
          todoCorrespondCard.remove();
          todoItemsLeft.textContent = document.querySelectorAll(
            ".todo .cardtodo:not(.checked)"
          ).length;
        }, 100);
      });
    });

    button.appendChild(img);
    addContainer.appendChild(cbInput);
    addContainer.appendChild(check);
    card.appendChild(addContainer);
    card.appendChild(item);
    card.appendChild(button);
    document.querySelector(".todo").appendChild(card);
  });
  // Update
  todoItemsLeft.textContent = document.querySelectorAll(
    ".todo .cardtodo:not(.checked)"
  ).length;
}

function localStoreGet (todo){
    return localStorage.getItem(`${todo}`)
 }

 function localStoreSet (todo1,todo2){
    return localStorage.setItem(`${todo1}`, JSON.stringify(todo2));
 }