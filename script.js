// Pega aquí la URL que te da Google Apps Script al implementar (termina en /exec)
const SHEET_URL = "https://script.google.com/macros/s/XXXXXXXXXXXX/exec";

document.addEventListener("DOMContentLoaded", () => {
  const mousePreview = document.getElementById("mouse-preview");
  const columns = document.querySelectorAll(".column");
  const footer = document.querySelector("footer");
  const form = document.getElementById("inscription-form");
  const msg = document.getElementById("form-msg");

  /* ---------- FOOTER: aparece solo al hacer scroll ---------- */
  const checkScroll = () => {
    footer.classList.toggle("visible", window.scrollY > 40);
  };
  window.addEventListener("scroll", checkScroll, { passive: true });
  checkScroll();

  /* ---------- PREVIEW QUE SIGUE AL RATÓN ---------- */
  columns.forEach(col => {
    col.addEventListener("mouseenter", () => {
      const img = col.getAttribute("data-image");
      if (img) {
        mousePreview.src = img;
        mousePreview.style.display = "block";
      }
    });

    col.addEventListener("mousemove", (e) => {
      mousePreview.style.left = `${e.clientX + 15}px`;
      mousePreview.style.top = `${e.clientY + 15}px`;
    });

    col.addEventListener("mouseleave", () => {
      mousePreview.style.display = "none";
    });
  });

  /* ---------- FORMULARIO → GOOGLE SHEETS ---------- */
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const button = form.querySelector("button");
      const data = new URLSearchParams(new FormData(form));

      button.disabled = true;
      button.textContent = "ENVIANDO…";
      msg.textContent = "";

      try {
        // no-cors: Google no deja leer la respuesta, pero los datos llegan
        await fetch(SHEET_URL, { method: "POST", mode: "no-cors", body: data });
        form.reset();
        msg.textContent = "¡Gracias! Hemos recibido tu inscripción.";
      } catch (err) {
        msg.textContent = "No se ha podido enviar. Inténtalo de nuevo.";
      } finally {
        button.disabled = false;
        button.textContent = "INSCRIBIRME";
      }
    });
  }
});