document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  const year = document.getElementById("year");

  year.textContent = new Date().getFullYear();

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  });

  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Reveal-on-scroll animation
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Gallery lightbox
  const modal = document.getElementById("galleryModal");
  const modalImage = document.getElementById("modalImage");
  const modalClose = document.getElementById("modalClose");

  document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {
      modalImage.src = item.dataset.image;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    });
  });

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    modalImage.src = "";
    document.body.classList.remove("modal-open");
  };

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  // Quote form: create a mailto enquiry without requiring a server.
  const form = document.getElementById("quoteForm");
  const toast = document.getElementById("toast");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const data = new FormData(form);
    const get = name => (data.get(name) || "").toString().trim();

    const subject = `Haulage Quote Request - ${get("company") || "New Client"}`;
    const body = [
      "SEGViC LOGISTICS SERVICES - REQUEST A QUOTE",
      "",
      `Company / Client Name: ${get("company")}`,
      `Contact Person: ${get("contact")}`,
      `Phone Number: ${get("phone")}`,
      `Email Address: ${get("email")}`,
      `Pickup Location: ${get("pickup")}`,
      `Delivery / Destination: ${get("destination")}`,
      `Type of Goods: ${get("goods")}`,
      `Approximate Tonnage: ${get("tonnage")}`,
      `Required Truck Capacity: ${get("truck")}`,
      `Preferred Date: ${get("date")}`,
      "",
      "Additional Information:",
      get("message"),
      "",
      "Sent from the SEGViC Logistics Services website."
    ].join("\n");

    const mailto = `mailto:segviclogisticservices@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 4500);
  });

  // Set a sensible minimum date for preferred delivery date.
  const dateInput = form.querySelector('input[name="date"]');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }
});
