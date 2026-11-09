document.addEventListener("DOMContentLoaded", () => {
  const mousePreview = document.getElementById("mouse-preview");
  const columns = document.querySelectorAll(".column");
  const footer = document.querySelector("footer");
  const form = document.getElementById("inscription-form");

  const checkScroll = () => {
    let scrolled = window.scrollY > 5;
    columns.forEach(col => {
      if (col.scrollTop > 5) scrolled = true;
    });

    if (scrolled) {
      footer.classList.add("visible");
    } else {
      footer.classList.remove("visible");
    }
  };

  // Comprueba la visibilidad al cargar la página por si hay contenido amplio
  checkScroll();

  window.addEventListener("scroll", checkScroll, { passive: true });
  columns.forEach(col => col.addEventListener("scroll", checkScroll, { passive: true }));

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
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("email").value;

      const data = [
        { Nombre: nombre, Email: email, Fecha: new Date().toLocaleString() }
      ];

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Inscripciones");

      XLSX.writeFile(workbook, "inscritos_agua_edificada.xlsx");
      form.reset();
    });
  }
});