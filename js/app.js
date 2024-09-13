document.addEventListener("DOMContentLoaded", function () {
  const addListButton = document.getElementById("addListButton");
  const listNameInput = document.getElementById("listNameInput");
  const listsContainer = document.getElementById("listsContainer");

  // FUNCTION - CREATE NEW LIST
  addListButton.addEventListener("click", function () {
    const listName = listNameInput.value.trim();
    if (listName !== "") {
      createNewList(listName);
      listNameInput.value = ""; //CLEAR INPUT BOX
    }
  });

  // FUNCTION -- CREATE NEW LIST STICKY NOTE
  function createNewList(listName) {
    //NEW LIST CONTAINER
    const listColumn = document.createElement("div");
    listColumn.className = "col-md-4 mb-4";

    listColumn.innerHTML = `
      <div class="stickyNote">
        <h4 class="text-center">${listName}</h4>
        <div class="inputBox mb-3">
          <input type="text" class="form-control taskInput" placeholder="Add a task" />
          <div class="inputBoxAppend">
            <button class="btn btn-primary addTaskButton">Add Task</button>
          </div>
        </div>
        <ul class="list-group taskList"></ul>
      </div> 
    `;

    //ADD NEW LIST TO THE LIST CONTAINER
    listsContainer.appendChild(listColumn);

    // EVENT LISTENED FOR ADD TASK BUTTONS WITHIN THE LIST
    const addTaskButton = listColumn.querySelector(".addTaskButton");
    const taskInput = listColumn.querySelector(".taskInput");
    const taskList = listColumn.querySelector(".taskList");

    addTaskButton.addEventListener("click", function () {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        const listItem = document.createElement("li");
        listItem.className =
          "listGroupItem d-flex justify-content-between align-items-center";

        listItem.innerHTML = `
          <span>${taskText}</span>
          <div>
            <button class="btn btn-success btn-sm mr-2 completeTaskButton">Complete</button>
            <button class="btn btn-danger btn-sm removeTaskButton">Remove</button>
          </div>
        `;

        //ADD NEW TASK TO LIST
        taskList.appendChild(listItem);

        //CLEAR INPUT
        taskInput.value = "";

        //MARK TASKS AS COMPLETE
        listItem
          .querySelector(".completeTaskButton")
          .addEventListener("click", function () {
            listItem.querySelector("span").classList.toggle("taskCompleted");
            this.classList.toggle("btn-secondary");
            this.classList.toggle("btn-success");
            this.textContent =
              this.textContent === "Complete" ? "Undo" : "Complete";
          }); //END OF IF FUNCTION

        //REMOVE TASKS FROM LIST
        listItem
          .querySelector(".removeTaskButton")
          .addEventListener("click", function () {
            taskList.removeChild(listItem);
          });
      } //END OF IF STATEMENT
    }); //END OF ADD TASK FUNCTION

    //ADD TASK BY PRESSING ENTER
    taskInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        addTaskButton.click();
      }
    });
  }
});
