let deleteAllNotes = document.querySelector(".delete-all-notes");
let notesContainer = document.querySelector(".notes");

let noteTitle = document.querySelector("#note-title");
let noteContent = document.querySelector("#note-content");
let createNoteBtn = document.querySelector("#create-note-btn");

createNoteBtn.addEventListener("click", () => {
  let uniqueID = "note" + Math.floor(Math.random() * 1000); //will be added as class to the mainDiv while creating the function

  let note = {
    title: noteTitle.value,
    content: noteContent.value,
  };
  if (note.title.length !== 0 && note.content.length !== 0) {
    createNewNote(note, uniqueID); //create new note and render on the website
    addToLocalStorage(note, uniqueID); //will add the rendered element to local storage
  } else {
    alert("Please enter a title and content to add new note..!!");
  }
});

function createNewNote(note, uniqueID) {
  let mainDiv = document.createElement("div");
  mainDiv.classList.add("note", uniqueID);
  //   mainDiv.style.backgroundColor = randomColorGenerator();

  let title = document.createElement("h4");
  title.textContent = note.title;

  let content = document.createElement("p");
  content.textContent = note.content;

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete Note";
  deleteBtn.addEventListener("click", () => {
    deleteNoteWithID(uniqueID);
  });

  mainDiv.append(title, content, deleteBtn);
  notesContainer.append(mainDiv);

  noteTitle.value = "";
  noteContent.value = "";
  noteTitle.focus();
}

let AllNotes = []; //to store the note along with unique id as object for adding to local storage

function addToLocalStorage(note, uniqueID) {
  note = { ...note, uniqueID }; //note and uniqueID are saved in note
  AllNotes.push(note); //note is pushed into the empty array
  localStorage.setItem("Notes", JSON.stringify(AllNotes)); //And adding to local storage
}

//This function is going to render elements on the screen even after refresh
function renderLocalStorageNotes() {
  if (localStorage.getItem("Notes")) {
    JSON.parse(localStorage.getItem("Notes")).forEach((Note) =>
      createNewNote(Note, Note.uniqueID)
    );
  }
}

renderLocalStorageNotes(); //Calling the above function

function deleteNoteWithID(id) {
  document.querySelector(`.${id}`).remove();
  let localNotes = JSON.parse(localStorage.getItem("Notes"));
  let index = localNotes.findIndex((note) => note.uniqueID === id);
  localNotes.splice(index, 1);
  localStorage.setItem("Notes", JSON.stringify(localNotes));
}

deleteAllNotes.addEventListener("click", () => {
  let allNotes = document.querySelectorAll(".note");
  allNotes.forEach((note) => note.remove());
  localStorage.clear();
});

function randomColorGenerator() {
  const red = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  return `rgb(${red}, ${blue}, ${green})`;
}
