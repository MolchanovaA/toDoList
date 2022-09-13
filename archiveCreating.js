let archiveList = [];

function createArchive(noteToArchive, archive) {
  let childEditButtonsArray =
    noteToArchive.children[0].lastElementChild.childNodes;
  childEditButtonsArray.forEach((button) => {
    // console.log(button, button.className);
    let childrenIcon = button.lastChild;
    if (button.className != "active" && button.nodeType === 1) {
      childrenIcon.classList.add("hideButtons");
      // console.log(childrenIcon);
    } else if (button.className === "active" && button.nodeType === 1) {
      childrenIcon.classList.remove("hideButtons");
    }
  });
  let value = archive.length;
  noteToArchive.setAttribute("id", value);
  archive.push(noteToArchive);

  return archive;
}

function renderArchive(table, archivedListInput) {
  let archiveHeader = table.querySelector(".tableHeader");

  archivedListInput.forEach((item) => archiveHeader.after(item));
}
