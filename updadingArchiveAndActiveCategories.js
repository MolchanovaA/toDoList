// updating info in shortList
function pickOutCategories(archive) {
  let parentTable = document.querySelector(".mainList");
  let notesList = parentTable.childNodes;
  let notesArray = Array.from(notesList);

  let objOfCategories = {};
  let archiveCategories;

  let activeCategories = notesArray.reduce((acc, liItem) => {
    if (
      liItem.className != "tableHeader" &&
      liItem.className != "createNewNote" &&
      liItem.nodeType === 1
    ) {
      let arrayOfnoteInfo = liItem.innerText.split("\n");

      if (arrayOfnoteInfo[2]) {
        acc.push(arrayOfnoteInfo[2]);
      }
    }
    return acc;
  }, []);

  if (archive) {
    archiveCategories = archive.reduce((acc, liItem) => {
      acc.push(liItem.children[0].children[2].textContent);
      return acc;
    }, []);
  }
  objOfCategories.active = activeCategories;
  objOfCategories.archive = archiveCategories;

  return objOfCategories;
}
function countCategories({ active, archive }) {
  let catObject = {};
  let archiveListArray = null;
  let activeListArray = active.reduce((acc, item) => {
    if (acc[item]) {
      acc[item] += 1;
    } else {
      acc[item] = 1;
    }
    return acc;
  }, {});

  if (archive) {
    archiveListArray = archive.reduce((acc, item) => {
      if (acc[item]) {
        acc[item] += 1;
      } else {
        acc[item] = 1;
      }
      return acc;
    }, {});
  }

  catObject.archiveListArray = archiveListArray;
  catObject.activeListArray = activeListArray;
  return catObject;
}

function updateShortlistNote({ activeListArray, archiveListArray }) {
  let arrayOfCategoriesObject = [];
  for (let key in activeListArray) {
    if (key && archiveListArray[key]) {
      arrayOfCategoriesObject.push([
        key,
        activeListArray[key],
        archiveListArray[key],
      ]);

      delete archiveListArray[key];
    } else if (key) {
      arrayOfCategoriesObject.push([key, activeListArray[key], "0"]);
    }
  }

  if (archiveListArray) {
    for (let key in archiveListArray) {
      if (key && archiveListArray[key]) {
        arrayOfCategoriesObject.push([key, "0", archiveListArray[key]]);
        delete archiveListArray[key];
      }
    }
  }

  let archiveList = document.querySelector(".shortlistList .tableHeader");

  let fragmenet = new DocumentFragment();

  arrayOfCategoriesObject.forEach((noteInArchList) => {
    let liNoteLine = document.createElement("li");
    let ulLineInArchNote = document.createElement("ul");

    noteInArchList.forEach((fieldName) => {
      let liFieldName = document.createElement("li");
      liFieldName.innerText = fieldName;
      ulLineInArchNote.append(liFieldName);
    });
    liNoteLine.classList.add("shortlistNote");
    liNoteLine.append(ulLineInArchNote);
    fragmenet.append(liNoteLine);
  });
  archiveList.after(fragmenet);
}
