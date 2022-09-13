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
  { optionValue: "Task", optionHTMLtext: "Home Task" },
  { optionValue: "Random", optionHTMLtext: "Random Thoughts" },
  { optionValue: "Idea", optionHTMLtext: "Idea" },
  { optionValue: "Quote", optionHTMLtext: "Quote" },
];
