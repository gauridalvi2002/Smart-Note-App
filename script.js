let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function addNote() {
  let title = document.getElementById("title").value;
  let desc = document.getElementById("desc").value;

  if (title === "" || desc === "") {
    alert("Please fill all fields");
    return;
  }

  notes.unshift({ title, desc });
  saveNotes();
  displayNotes();

  document.getElementById("title").value = "";
  document.getElementById("desc").value = "";
}

function displayNotes(filteredNotes = notes) {
  let notesDiv = document.getElementById("notes");
  notesDiv.innerHTML = "";

  filteredNotes.forEach(note => {
    notesDiv.innerHTML += `
      <div class="note">
        <h4>${note.title}</h4>
        <p>${note.desc}</p>
      </div>
    `;
  });
}

function searchNotes() {
  let query = document.getElementById("search").value.toLowerCase();

  let filtered = notes.filter(note =>
    note.title.toLowerCase().includes(query) ||
    note.desc.toLowerCase().includes(query)
  );

  let highlighted = filtered.map(note => {
    return {
      title: highlightText(note.title, query),
      desc: highlightText(note.desc, query)
    };
  });

  displayNotes(highlighted);
}

function highlightText(text, query) {
  if (!query) return text;

  let regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, `<span class="highlight">$1</span>`);
}

filteredNotes.forEach((note, index) => {
  notesDiv.innerHTML += `
    <div class="note">
      <h4>${note.title}</h4>
      <p>${note.desc}</p>
      <button onclick="deleteNote(${index})">Delete</button>
    </div>
  `;
});

