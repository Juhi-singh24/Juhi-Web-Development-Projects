 let editIndex = -1;
    
    function showTaskForm()
    {

    editIndex = -1;
    resetTaskform();

    document.getElementById('welcome').style.display = "none";
    document.getElementById('taskform').style.display = "block";
    

    }

    function resetTaskform(){
      document.getElementById('Name').value = "";
      document.getElementById('dueDate').value = "";
      document.getElementById('priority').value = "";
      document.getElementById('category').value = "";
    }

    function handleAddTask(){
      if(!validateform()){
        return false;

      }

      if(editIndex == -1){

         addtask();

      }

      else{
        updateTask();
      }

     
      resetTaskform();
      displayTask();
      document.getElementById('taskform').style.display = "none";
      document.getElementById('dashboard').style.display = "flex";

      return false
    
    }

    function validateform(){

      let taskname = document.getElementById("Name").value;
      let date = document.getElementById("dueDate").value;
      let Pri = document.getElementById("priority").value;
      let Cate = document.getElementById("category").value;
      if (taskname.trim() != "" && date != "" && Pri != "" && Cate != ""){ 
      
      return true;
    }
    return false;
  }

  function addtask(){

    let taskname = document.getElementById("Name").value;
    let date = document.getElementById("dueDate").value;
    let Pri = document.getElementById("priority").value;
    let Cate = document.getElementById("category").value;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let task = {
      name: taskname,
      date: date,
      priority: Pri,
      category: Cate,
      status:"⌛Pending"
    };

    tasks.push(task);

    localStorage.setItem("tasks",JSON.stringify(tasks));
    
  }

  function openTaskForm(){

    editIndex = -1;
    resetTaskform();
    document.getElementById('dashboard').style.display = "none";
    document.getElementById('taskform').style.display = "block";

    
  }

  function displayTask(){


    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let dashboard = document.getElementById('dashboard')

    dashboard.innerHTML = "";

    let total = tasks.length;
    let pending = 0;
    let completed = 0;

    for(let i = 0;i<tasks.length;i++){
      

      if(tasks[i].status === '⌛Pending'){

        pending++;

      }
      else{
        completed++;
      }

    }

    let summary = document.createElement("div");
    summary.className = 'summary-card';
    
    summary.innerHTML = `<p>📋 Total tasks: ${total}</p>
                         <p>⌛ Pending tasks: ${pending}</p>
                         <p>✅ Completed tasks: ${completed}</P>
                         <button class="add" onclick="openTaskForm()">➕ Add tasks</button>`
    

    dashboard.appendChild(summary);


    for(let i = 0 ; i<tasks.length;i++){
      let card = document.createElement("div");
      card.className = "task-card";
      

      card.innerHTML = `<h3>✨ ${tasks[i].name}</h3>
                        <p>🗓️ ${tasks[i].date}</p>
                        <p>⚡${tasks[i].priority}</p>
                        <p>🏷️ ${tasks[i].category}</p>
                        <p>${tasks[i].status}</p>

                        <div class="btn-container">
                        <button class="delete"onclick="deleteTask(${i})">Delete</button>

                        
                        
                        ${
                          tasks[i].status === "⌛Pending" ? `<button class="complete" onclick= "completeTask(${i})">Complete</button>`: ""
                        }

                        <button class="edit" onclick="editTask(${i})">✏️ Edit task</button>
                        </div>`

    dashboard.appendChild(card);
    }
  }

    function deleteTask(index){
      if(!confirm("Are you sure you want to delete this task?")){
        return;
      }

      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

      tasks.splice(index,1);

      localStorage.setItem("tasks",JSON.stringify(tasks));

      displayTask();
    }

    function editTask(index){
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      let task = tasks[index];

      document.getElementById("Name").value = task.name;
      document.getElementById("dueDate").value = task.date;
      document.getElementById("priority").value = task.priority;
      document.getElementById("category").value = task.category;

      editIndex = index;

      document.getElementById("dashboard").style.display = "none";
      document.getElementById("taskform").style.display = "block";
}

  function updateTask(){
  let taskname = document.getElementById("Name").value;
  let date = document.getElementById("dueDate").value;
  let Pri = document.getElementById("priority").value;
  let Cate = document.getElementById("category").value;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks[editIndex].name = taskname;
  tasks[editIndex].date = date;
  tasks[editIndex].priority = Pri;
  tasks[editIndex].category = Cate;

  localStorage.setItem("tasks", JSON.stringify(tasks));
  editIndex = -1;
}

    

    function completeTask(index){

      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

      tasks[index].status="✅ Completed";
      localStorage.setItem("tasks",JSON.stringify(tasks));
      displayTask();


    }

    window.onload = function(){
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


      if(tasks.length >= 1){
        displayTask();
        document.getElementById("welcome").style.display = "none";
        document.getElementById("taskform").style.display = "none";
        document.getElementById("dashboard").style.display = "flex";

      }

      else{

        document.getElementById("welcome").style.display = "block";
        document.getElementById("taskform").style.display = "none";
        document.getElementById("dashboard").style.display = "none";

      }
    }