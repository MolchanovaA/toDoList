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
  let editingInfo = {
    inputName: "",
    inputCategory: "",
    inputContent: "",
  };
  if (!placeForNewNote.classList.contains("createNewNote")) {
    // console.log(placeForNewNote.children[0].children, "clicked");
    // placeForNewNote.innerText = null;
  }

  let noteForm = document.createElement("form");
  noteForm.classList.add("createNoteform");
  let categoriesSelection = createSelectField(notesCategories);

  inputsInfo.forEach((item) => {
    if (item.type === "category") {
      noteForm.append(categoriesSelection);
    } else {
      noteForm.append(createInput(item));
    }
  });

  let li = document.createElement("li");
  li.classList.add("note");
  li.append(noteForm);
  placeForNewNote.before(li);
}

function collectInfo(form, categoriesT) {
  // console.log(categoriesT);
  let helper = [
    { noteName: form[1].value || "other" },
    { date: null },
    {
      selected: categoriesT[form[0].options.selectedIndex].optionHTMLtext,
    },

    { noteContent: form[2].value || "empty note" },
    { additionalDateFromNote: null },
    {
      editButtonsSection: `<span class="edit"
                ><i class="fa-solid fa-pen-to-square editNote"></i
              ></span>
              <span class="archive"
                ><i class="fa-solid fa-box-archive"></i
              ></span>
              <span class="delete"><i class="fa-solid fa-trash-can deleteNote"></i></span>`,
    },
  ];
  return helper;
}

function checkDateInContent(content) {
  if (!content) return " ";

  let splitedContent = content.split(" ");
  let dateFromContent = [];
  let dateDevidres = ["/", ".", "-", ","];
  splitedContent.forEach((word) => {
    let wordArray = word.split("");

    if (!isNaN(+wordArray[0])) {
      dateDevidres.forEach((dev) => {
        if (
          word.split(dev).length === 2 &&
          word.split(dev)[0] <= 12 &&
          word.split(dev)[1] <= 12
        ) {
          dateFromContent.push(word);
        } else if (
          word.split(dev).length === 3 &&
          word.split(dev)[0] <= 12 &&
          word.split(dev)[1] <= 12 &&
          word.split(dev)[2] >= 20
        ) {
          dateFromContent.push(word);
        }
      });
    }
  });

  return dateFromContent.join(", ");
}

function saveNote(info, placeToSave) {
  if (!info) return;
  let ul = document.createElement("ul");
  let date = new Date();
  let additionalDate = checkDateInContent(info[3].noteContent);

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  info[1].date = `${months[date.getMonth()]} ${
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  }, ${date.getFullYear()}`;
  info[4].additionalDateFromNote = additionalDate;
  info.forEach((field) => {
    let li = document.createElement("li");
    for (let key in field) {
      if (key === "editButtonsSection") {
        li.classList.add("editButtons");
        li.innerHTML = field[key];
      } else {
        li.innerText = field[key];
      }

      ul.append(li);
    }
  });

  placeToSave.append(ul);
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
      type: "category",
      inputName: "category",
      classToAdd: [],
      value: "",
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
    let infoFomFields = collectInfo(target.form, select);
    saveNote(infoFomFields, target.closest(".note"));
    target.closest("form").remove();
  }
  if (target.classList.contains("deleteNote")) {
    target.closest(".note").remove();
  }
  if (target.classList.contains("editNote")) {
    console.log(target.closest(".note"));
    toCreateANewNoteField(target.closest(".note"), select, inputs);
  }
}

let mainListsOfNotes = document.querySelectorAll(".mainList, .archivedList ");
mainListsOfNotes.forEach((item) => item.addEventListener("click", showClick));
