//creating input and select fields in case of editing

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
