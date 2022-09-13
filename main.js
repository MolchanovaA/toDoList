function showClick(e) {
  e.preventDefault();
  let target = e.target;
  let countedCategories = null;

  if (target.closest(`.createNewNote`)) {
    let placeToInsertNewNote = target.closest("li.createNewNote");
    toCreateANewNoteField(placeToInsertNewNote, select, inputs);
  }

  if (target.classList.contains("saveNote")) {
    let infoFomFields = collectInfo(target.form, select);
    saveNote(infoFomFields, target.closest(".note"));
    //categoriesCount&Update
    let arrayOfCategories = pickOutCategories(archiveList);
    target.closest("form").remove();
    let oldShortList = document.querySelectorAll(".shortlistNote");
    oldShortList.forEach((item) => item.remove());
    countedCategories = countCategories(arrayOfCategories);
    updateShortlistNote(countedCategories);
  }
  if (target.classList.contains("deleteNote")) {
    target.closest(".note").remove();
    //categoriesCount&Update
    let arrayOfCategories = pickOutCategories(archiveList);
    let oldShortList = document.querySelectorAll(".shortlistNote");
    oldShortList.forEach((item) => item.remove());
    countedCategories = countCategories(arrayOfCategories);
    updateShortlistNote(countedCategories);
  }
  if (target.classList.contains("editNote")) {
    toCreateANewNoteField(target.closest(".note"), select, inputs);
  }
  if (target.classList.contains("archiveNote")) {
    createArchive(target.closest(".note"), archiveList);
    target.closest(".note").remove();
    let arrayOfCategories = pickOutCategories(archiveList);
    let oldShortList = document.querySelectorAll(".shortlistNote");
    oldShortList.forEach((item) => item.remove());
    countedCategories = countCategories(arrayOfCategories);
    updateShortlistNote(countedCategories);
  }

  if (target.classList.contains("showArchiveButton")) {
    if (!archiveList.length) return;
    let archiveTable = document.querySelector(".archivedList");
    archiveTable.classList.toggle("show");

    renderArchive(archiveTable, archiveList);

    if (archiveTable.classList.contains("show")) {
      target.textContent = "hide archive";
    } else {
      target.textContent = "show archive";
    }
  }
  if (target.classList.contains("returnToActive")) {
    let fromArchiveToActiveNoteAttr = target
      .closest(".note")
      .getAttribute("id");
    let activeList = document.querySelector("li.createNewNote");
    archiveList.forEach((item, i) => {
      if (item && item.getAttribute("id") === fromArchiveToActiveNoteAttr) {
        toCreateANewNoteField(activeList, null, null, item);
        archiveList.splice(i, 1);
      }
    });

    let arrayOfCategories = pickOutCategories(archiveList);
    let oldShortList = document.querySelectorAll(".shortlistNote");
    oldShortList.forEach((item) => item.remove());
    countedCategories = countCategories(arrayOfCategories);
    updateShortlistNote(countedCategories);
  }
}

let mainListsOfNotes = document.querySelectorAll(
  ".mainList, .shortlistList, .archivedList"
);
mainListsOfNotes.forEach((item) => item.addEventListener("click", showClick));
