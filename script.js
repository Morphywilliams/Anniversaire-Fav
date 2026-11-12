/* =========================================================
   ✏️ À MODIFIER : ces trois lignes suffisent à personnaliser le site
   ========================================================= */
const CONFIG = {
  prenom: "Ma Reine",                    // son prénom, affiché en grand en haut
  dateAnniversaire: "16 novembre 2026", // affichée au-dessus du titre
  dateRencontre: "2024-11-16"          // format AAAA-MM-JJ, sert au compteur de jours
};

/* ---------- Ne touche pas à ce qui suit (sauf si tu sais ce que tu fais) ---------- */

// Prénom, date et année
document.querySelectorAll("[data-prenom]").forEach(el => (el.textContent = CONFIG.prenom));
document.querySelectorAll("[data-date]").forEach(el => (el.textContent = CONFIG.dateAnniversaire));
document.querySelectorAll("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));
document.title = "Joyeux anniversaire " + CONFIG.prenom;

// Compteur de jours ensemble
(function () {
  const start = new Date(CONFIG.dateRencontre + "T00:00:00");
  const days = Math.floor((Date.now() - start.getTime()) / 86400000);
  document.getElementById("stat-days").textContent =
    Number.isFinite(days) && days > 0 ? days.toLocaleString("fr-FR") : "0";
})();

// Nombre de souvenirs = nombre de photos dans la galerie
document.getElementById("stat-memories").textContent =
  document.querySelectorAll(".polaroid").length;

// Surprise : affiche le message caché + pluie de coeurs
(function () {
  const btn = document.getElementById("surprise-btn");
  const box = document.getElementById("surprise-box");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function rain() {
    for (let i = 0; i < 28; i++) {
      const NS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(NS, "svg");
      const use = document.createElementNS(NS, "use");
      use.setAttribute("href", "#heart");
      svg.appendChild(use);
      svg.setAttribute("class", "heart rain-heart");
      const size = 14 + Math.random() * 22;
      svg.style.width = svg.style.height = size + "px";
      svg.style.left = Math.random() * 100 + "vw";
      svg.style.animationDuration = 3 + Math.random() * 3 + "s";
      svg.style.animationDelay = Math.random() * 1.2 + "s";
      svg.addEventListener("animationend", () => svg.remove());
      document.body.appendChild(svg);
    }
  }

  btn.addEventListener("click", () => {
    const opening = box.hidden;
    box.hidden = !opening;
    btn.setAttribute("aria-expanded", String(opening));
    btn.textContent = opening ? "Refermer ma surprise" : "Ouvrir ma surprise";
    if (opening && !reduceMotion) rain();
  });
})();
