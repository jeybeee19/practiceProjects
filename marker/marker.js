let list = []; // This array will store all the tasks

function addTask() {
   input = document.getElementById("taskInput"); // Get the input box
   inputV = input.value; // Get the input value
   if (inputV !== '') { // If input is not empty
      list.push(inputV); // Add the task to the list
   }
   input.value = ""; // Clear the input box
   toShow(); // Update the task display
   save(); // Save the list to local storage
}

function toShow() {
   let html = ''; // Empty string to hold the HTML
   list.forEach((task, index) => { // Loop through the task list
      html += `
         <div class="grid"> 
            <p>${task}</p> 
            <button class="delete" onclick="deleteTask(${index})">delete</button> 
         </div>`; // Create HTML for each task with a delete button
   });
   document.querySelector('.taskList').innerHTML = html; // Show tasks in .taskList container
   console.log(list); // Log current list (for debugging)
}

function save() {
   localStorage.setItem("todoList", JSON.stringify(list)); 
   // Save list as a string to browser storage
}

function load() {
   list = JSON.parse(localStorage.getItem("todoList")) || []; 
   // Load saved list, or use empty list if none found
   toShow(); // Show the loaded list
}

function deleteTask(index) {
   list.splice(index, 1); // Remove the task at the given index
   save(); // Save the updated list
   toShow(); // Refresh the displayed tasks
}

load(); // Load saved tasks when the page starts
