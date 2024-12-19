// Variables
let commande = [];
const commandeCount = document.getElementById("commande-count");
const commandeItems = document.getElementById("commande-items");
const totalPriceElement = document.getElementById("total-price");

// Fonction pour ajouter un produit au panier
function ajouterAuPanier(productId, productName, productPrice) {
    commande.push({ id: productId, name: productName, price: productPrice });
    mettreAJourCommande();
}

// Fonction pour afficher les articles dans la commande
function afficherCommande() {
    commandeItems.innerHTML = "";
    let total = 0;

    commande.forEach(item => {
        total += item.price;
        commandeItems.innerHTML += `
            <div class="item">
                <span>${item.name} - ${item.price} article </span>
                <button onclick="supprimerDeCommande(${item.id})">Supprimer</button>
            </div>
        `;
    });

    totalPriceElement.textContent = `${total} Article (s)`;
    commandeCount.textContent = commande.length;
}

// Fonction pour supprimer un produit de la commande
function supprimerDeCommande(productId) {
    commande = commande.filter(item => item.id !== productId);
    mettreAJourCommande();
}

// Fonction pour mettre à jour la commande
function mettreAJourCommande() {
    afficherCommande();
}

// Ajout des événements sur les boutons "Ajouter au panier"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product');
        const productName = button.getAttribute('data-name');
        const productPrice = parseFloat(button.getAttribute('data-price'));
        ajouterAuPanier(productId, productName, productPrice);
    });
});



// Fonction pour acheter
document.getElementById("acheter-btn").addEventListener("click", () => {
    if (commande.length === 0) {
        alert("Votre panier est vide.");
    } else {
        // Redirection vers WhatsApp avec le contenu du panier
        const panierMessage = commande.map(item => `${item.name} - ${item.price}/ `).join("\n");
        const totalMessage = `Total : ${totalPriceElement.textContent}`;
        const message = `Je souhaite acheter les produits suivants :\n${panierMessage}\n${totalMessage}`;
        window.location.href = `https://wa.me/+242040590093?text=${encodeURIComponent(message)}`;
    }
});



// Menu hamburger
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

