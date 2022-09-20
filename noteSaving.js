//save note in case of any changes

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

function checkDateInContent(content) {
  if (!content) return " ";

  let splitContent = content.split(" ");
  let dateFromContent = [];
  let dateDeviders = ["/", ".", "-", ","];
  splitContent.forEach((word) => {
    let wordArray = word.split("");

    if (!isNaN(+wordArray[0])) {
      dateDeviders.forEach((dev) => {
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
