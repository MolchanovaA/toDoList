function toCreateANewNoteField(
  placeForNewNote,
  notesCategories,
  inputsInfo,
  archived
) {
  let noteForm;
  if (placeForNewNote && !notesCategories && !inputsInfo && archived) {
    let newActiveNote = archived.children[0];

    let arrayOfEditButtons = archived.children[0].lastElementChild.childNodes;
    arrayOfEditButtons.forEach((button) => {
      if (button.nodeType === 1 && button.className != "active") {
        button.childNodes[0].classList.remove("hideButtons");
      } else if (button.nodeType === 1 && button.className === "active") {
        button.childNodes[0].classList.add("hideButtons");
      }
    });
    let archiveUl = document.querySelector(".archivedList");
    archiveUl.classList.toggle("show");
    noteForm = newActiveNote;
  } else {
    if (!placeForNewNote.classList.contains("createNewNote")) {
      var editingInfo = {
        inputName: placeForNewNote.children[0].children[0].innerText || "",
        inputCategory: placeForNewNote.children[0].children[2].innerText || " ",
        inputContent: placeForNewNote.children[0].children[3].innerText || " ",
        date: placeForNewNote.children[0].children[1].innerText || " ",
      };
      placeForNewNote.innerText = null;
    }

    noteForm = document.createElement("form");
    noteForm.classList.add("createNoteform");
    let categoriesSelection = createSelectField(notesCategories);

    inputsInfo.forEach((item) => {
      if (item.type === "category") {
        noteForm.append(categoriesSelection);
      } else {
        let inputToEdit = createInput(item);
        if (
          item.inputName === "NoteName" &&
          editingInfo &&
          editingInfo.inputName
        ) {
          inputToEdit.value = editingInfo.inputName;
        } else if (
          item.inputName === "NoteContent" &&
          editingInfo &&
          editingInfo.inputName
        ) {
          inputToEdit.value = editingInfo.inputContent;
        }
        noteForm.append(inputToEdit);
      }
    });
  }

  let li = document.createElement("li");
  li.classList.add("note");
  li.append(noteForm);
  placeForNewNote.before(li);
}

function collectInfo(form, categoriesT) {
  let helper = [
    { noteName: form[0].value || "other" },
    { date: null },
    {
      selected: categoriesT[form[1].options.selectedIndex].optionHTMLtext,
    },

    { noteContent: form[2].value || "empty note" },
    { additionalDateFromNote: null },
    {
      editButtonsSection: `<span class="edit"
                ><i class="fa-solid fa-pen-to-square editNote"></i
              ></span>
              <span class="active"><i class="fa-solid fa-plus returnToActive hideButtons"></i></span>
              <span class="archive"
                ><i class="fa-solid fa-box-archive archiveNote"></i
              ></span>
              <span class="delete"><i class="fa-solid fa-trash-can deleteNote"></i></span>`,
    },
  ];
  return helper;
}
