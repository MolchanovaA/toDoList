function createInput({ inputName, content, classToAdd, type, value }) {
  let noteFormName = document.createElement("input");
  noteFormName.type = type;
  content ? (noteFormName.placeholder = content) : "";
  value ? (noteFormName.value = value) : "";
  noteFormName.name = inputName;
  classToAdd.forEach((item) => noteFormName.classList.add(item));

  return noteFormName;
}

function createSelectField(categories) {
  let select = document.createElement("select");

  categories.forEach((item) => {
    let option = document.createElement("option");
    option.value = item.optionValue;
    option.innerText = item.optionHTMLtext;
    select.append(option);
  });

  return select;
}

function toCreateANewNoteField(placeForNewNote, notesCategories, inputsInfo) {
  let noteForm = document.createElement("form");
  noteForm.classList.add("createNoteform");
  let categoriesSelection = createSelectField(notesCategories);

  noteForm.append(categoriesSelection);
  inputsInfo.forEach((item) => {
    noteForm.append(createInput(item));
  });

  let li = document.createElement("li");
  li.classList.add("note");
  li.append(noteForm);
  placeForNewNote.before(li);
}

function collectInfo(form) {
  //   console.log( "kkk");
  let helper = {
    selected: form[0].options.selectedIndex,
    noteName: form[1].value,
    noteContent: form[2].value,
  };
  console.log(helper);
}
function showClick(e) {
  e.preventDefault();
  let target = e.target;
  let inputs = [
    {
      type: "text",
      inputName: "NoteName",
      content: "NoteName",
      classToAdd: ["nameField"],
    },
    {
      type: "text",
      inputName: "NoteContent",
      content: "right your Note",
      classToAdd: ["contentField"],
    },
    {
      type: "submit",
      inputName: "buttonSubmit",
      classToAdd: ["saveNote", "tableButton"],
      value: "Save",
    },
    {
      type: "reset",
      inputName: "buttonReset",
      classToAdd: ["deleteNote", "tableButton"],
      value: "Delete",
    },
  ];

  let select = [
    { optionValue: "Task", optionHTMLtext: "Task" },
    { optionValue: "Random", optionHTMLtext: "Random Thoughts" },
    { optionValue: "Idea", optionHTMLtext: "Idea" },
    { optionValue: "Quote", optionHTMLtext: "Quote" },
  ];

  let createButton = "createNewNote";

  if (
    target.closest(`.${createButton}`) ||
    target.classList.contains(`.${createButton}`)
  ) {
    let placeToInsertNewNote = target.closest("li.createNewNote");

    toCreateANewNoteField(placeToInsertNewNote, select, inputs);
  }

  if (target.classList.contains("saveNote")) {
    // console.log(target.form);
    collectInfo(target.form);
  }
  if (target.classList.contains("deleteNote")) {
    target.closest(".note").remove();
  }
}

let mainListsOfNotes = document.querySelectorAll(".mainList, .archivedList ");
mainListsOfNotes.forEach((item) => item.addEventListener("click", showClick));
