const SHEET_URL = "https://script.google.com/macros/s/XXXXXXXXXXXX/exec";

document.addEventListener("DOMContentLoaded", () => {
  const mousePreview = document.getElementById("mouse-preview");
  const columns = document.querySelectorAll(".column");
  const footer = document.querySelector("footer");
  const form = document.getElementById("inscription-form");
  const msg = document.getElementById("form-msg");

  const menu = document.getElementById("menu");
  const menuOpen = document.getElementById("menu-open");
  const menuClose = document.getElementById("menu-close");

  const setMenu = (open) => {
    menu.classList.toggle("open", open);
    menuOpen.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  };

  document.getElementById("to-top").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  menuOpen.addEventListener("click", () => setMenu(true));
  menuClose.addEventListener("click", () => setMenu(false));
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  const checkScroll = () => {
    footer.classList.toggle("visible", window.scrollY > 40);
  };
  window.addEventListener("scroll", checkScroll, { passive: true });
  checkScroll();

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

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const button = form.querySelector("button");
      const data = new URLSearchParams(new FormData(form));

      button.disabled = true;
      button.textContent = "ENVIANDO…";
      msg.textContent = "";

      try {
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