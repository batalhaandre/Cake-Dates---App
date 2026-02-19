// URL do Google Forms fornecido.
const formsBaseUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLScAoIkxE4fd80FmEEU8FrIAY52kHDUWpxHJj7jUKnPbwUerTA/viewform?usp=header";

// Estado global simples para guardar a categoria escolhida.
let selectedCategory = "";

const tabLinks = document.querySelectorAll(".tab-link");
const pages = document.querySelectorAll(".tab-page");
const categoryCards = document.querySelectorAll(".category-card");
const chosenCategoryText = document.getElementById("chosen-category");
const orderButton = document.getElementById("order-button");
const whatsappButton = document.getElementById("whatsapp-button");

/**
 * Atualiza o texto visual da categoria e o link do WhatsApp.
 */
function refreshOrderState() {
  const categoryLabel = selectedCategory || "Nenhuma";
  chosenCategoryText.textContent = `Categoria escolhida: ${categoryLabel}`;

  const whatsappMessage = selectedCategory
    ? `Olá Cake Dates! Gostaria de fazer uma encomenda. Categoria: ${selectedCategory}.`
    : "Olá Cake Dates! Gostaria de fazer uma encomenda.";

  whatsappButton.href = `https://wa.me/351929299029?text=${encodeURIComponent(whatsappMessage)}`;
}

/**
 * Mostra apenas o separador selecionado.
 * @param {string} pageId - ID da secção que deve ficar visível.
 */
function showTab(pageId) {
  pages.forEach((page) => {
    page.classList.toggle("active", page.id === pageId);
  });

  tabLinks.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.target === pageId);
  });
}

// Navegação pelas tabs inferiores.
tabLinks.forEach((tab) => {
  tab.addEventListener("click", () => {
    showTab(tab.dataset.target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Seleção da categoria por clique ou teclado.
categoryCards.forEach((card) => {
  const selectCard = () => {
    selectedCategory = card.dataset.category || "";

    categoryCards.forEach((otherCard) => {
      otherCard.classList.toggle("selected", otherCard === card);
    });

    refreshOrderState();
  };

  card.addEventListener("click", selectCard);

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectCard();
    }
  });
});

// Botão principal de encomenda.
orderButton.addEventListener("click", () => {
  // Tentativa opcional de enviar categoria por query string.
  const url = new URL(formsBaseUrl);

  if (selectedCategory) {
    url.searchParams.set("entry.category", selectedCategory);
  }

  window.open(url.toString(), "_blank", "noopener,noreferrer");
});

// Estado inicial da interface.
refreshOrderState();
