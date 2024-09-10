import swal from "sweetalert";
import { animate } from "motion";

import "./styles/style.css";
import "./components/note-item.js";
import "./components/archive-item.js";

import "./components/app-bar.js";
import "./components/footer-bar.js";
import "./components/skeleton-card.js";
import "./components/skeleton-title.js";

import "./components/input-bar.js";
// import { notesData, findNoteIndex } from "../notesData.js";

const baseUrl = "https://notes-api.dicoding.dev/v2";
const RENDER_EVENT = "render-note";
const notesContainer = document.getElementsByClassName("notes__container")[0];
const archiveContainer =
  document.getElementsByClassName("archive__container")[0];

document.addEventListener(RENDER_EVENT, async function () {
  notesContainer.innerHTML = `<skeleton-card></skeleton-card><skeleton-card></skeleton-card>`;
  archiveContainer.innerHTML = `<skeleton-title></skeleton-title>`;

  try {
    const noteResponse = await fetch(baseUrl + "/notes");

    const { data: noteData } = await noteResponse.json();
    // swal({
    //   text: "Data berhasil di-load",
    //   icon: "success",
    // });

    const noteItems = noteData
      .map(
        (note) =>
          `<note-item title="${note.title}" body="${note.body}" data-id="${note.id}"></note-item>`,
      )
      .join("");

    notesContainer.innerHTML = noteItems;

    const archiveResponse = await fetch(baseUrl + "/notes/archived");
    const { data: archiveData } = await archiveResponse.json();

    const archiveItems = archiveData
      .map(
        (archive) =>
          `<archive-item title="${archive.title}" data-id="${archive.id}"></archive-item>`,
      )
      .join("");

    archiveContainer.innerHTML = archiveItems;
  } catch (error) {
    swal({
      text: "Data gagal dimuat",
      icon: "error",
    });
  }
});

document.dispatchEvent(new Event(RENDER_EVENT));

// listener to delete button on Notes
document.addEventListener("delete-note", async (event) => {
  const noteElement = event.target.closest("note-item");

  const noteId = noteElement.getAttribute("data-id");
  const willDelete = await swal({
    title: "Menghapus catatan",
    text: "Anda yakin menghapus catatan?",
    buttons: ["Batal", "Hapus"],
    dangerMode: true,
  });

  if (willDelete) {
    animate(noteElement, { x: -1000 }, { duration: 1 });
    try {
      await fetch(`${baseUrl}/notes/${noteId}`, {
        method: "DELETE",
      });
      swal({
        text: "Catatan berhasil dihapus",
        icon: "success",
      });
    } catch (error) {
      swal({
        text: "Catatan gagal dihapus",
        icon: "error",
      });
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
  }
});

// Listener to archive button on Notes
document.addEventListener("archive", async function (event) {
  const noteElement = event.target.closest("note-item");

  const noteId = noteElement.getAttribute("data-id");

  try {
    animate(noteElement, { x: 1000 }, { duration: 1 });

    await fetch(`${baseUrl}/notes/${noteId}/archive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    swal({
      text: "Catatan berhasil diarsipkan",
      icon: "success",
    });
  } catch (error) {
    swal({
      text: "Catatan gagal diarsipkan",
      icon: "error",
    });
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
});

// Listener to delete on Archive
document.addEventListener("delete-archive", async function (event) {
  const archiveElement = event.target.closest("archive-item");

  const archiveId = archiveElement.getAttribute("data-id");

  const willDelete = await swal({
    title: "Menghapus catatan",
    text: "Anda yakin menghapus catatan?",
    buttons: ["Batal", "Hapus"],
    dangerMode: true,
  });

  if (willDelete) {
    animate(archiveElement, { x: -1000 }, { duration: 1 });
    try {
      await fetch(`${baseUrl}/notes/${archiveId}`, {
        method: "DELETE",
      });

      swal({
        text: "Catatan berhasil dihapus",
        icon: "success",
      });
    } catch (error) {
      swal({
        text: "Catatan gagal dihapus",
        icon: "error",
      });
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
  }
});

// Listener to unarchive button on Archive
document.addEventListener("unarchive", async function (event) {
  const archiveElement = event.target.closest("archive-item");

  const archiveId = archiveElement.getAttribute("data-id");

  try {
    animate(archiveElement, { x: -500 }, { duration: 1 });

    await fetch(`${baseUrl}/notes/${archiveId}/unarchive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    swal({
      text: "Catatan berhasil dipindahkan dari arsip",
      icon: "success",
    });
  } catch (error) {
    swal({
      text: "Catatan gagal dipindahkan dari arsip",
      icon: "error",
    });
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
});

// listener to form
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("submit-event", function () {
    addNote();
    // document.body.scrollIntoView({ behavior: "smooth", block: "end" });

    // setTimeout(function () {
    //   document.body.scrollIntoView({ behavior: "smooth", block: "start" });
    // }, 1500);
  });
});

function generateNote(title, body) {
  return {
    title,
    body,
  };
}

async function addNote() {
  const noteTitle = document.getElementById("note-title").value;
  const noteBody = document.getElementById("note-body").value;
  const noteObject = generateNote(noteTitle, noteBody);

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteObject),
    };

    await fetch(`${baseUrl}/notes`, options);

    swal({
      text: "Catatan berhasil ditambahkan",
      icon: "success",
    });
  } catch (error) {
    swal({
      text: "Catatan gagal ditambahkan",
      icon: "error",
    });
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}
