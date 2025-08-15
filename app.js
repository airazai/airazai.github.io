const products = [
    {name: "Spaghetti Classic", category: "Spaghetti", price: 35000, stock: true, rating: 4, img: "assets/images/slide1.svg"},
    {name: "Fusilli Cheese", category: "Fusilli", price: 40000, stock: true, rating: 5, img: "assets/images/slide2.svg"},
    {name: "Penne Carbonara", category: "Penne", price: 45000, stock: false, rating: 3, img: "assets/images/slide3.svg"}
];

const productList = document.getElementById("productList");
const cart = [];
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckout = document.getElementById("closeCheckout");
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutSummary = document.getElementById("checkoutSummary");
const search = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");
const cartCount = document.getElementById("cartCount");

// Render products
function renderProducts() {
    productList.innerHTML = "";
    const searchVal = search.value.toLowerCase();
    const catVal = categoryFilter.value;
    products.filter(p => 
        p.name.toLowerCase().includes(searchVal) && 
        (catVal === "all" || p.category === catVal)
    ).forEach(p => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <img src="${p.img}" alt="${p.name}" style="width:100%">
            <h3>${p.name}</h3>
            <p>Rp ${p.price.toLocaleString()}</p>
            <p>${"★".repeat(p.rating)}${"☆".repeat(5-p.rating)}</p>
            <p>${p.stock ? "Tersedia" : "Habis"}</p>
            <button ${p.stock ? "" : "disabled"}>+ Keranjang</button>
        `;
        div.querySelector("button").addEventListener("click", () => addToCart(p));
        productList.appendChild(div);
    });
}
renderProducts();

search.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);

function addToCart(product) {
    cart.push(product);
    cartCount.textContent = cart.length;
}

// Cart modal
cartBtn.addEventListener("click", () => {
    cartModal.classList.remove("hidden");
    renderCart();
});
closeCart.addEventListener("click", () => cartModal.classList.add("hidden"));

function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach(p => {
        const div = document.createElement("div");
        div.textContent = `${p.name} - Rp ${p.price.toLocaleString()}`;
        cartItems.appendChild(div);
        total += p.price;
    });
    if (cart.length > 3) {
        total *= 0.9; // diskon 10%
        cartItems.innerHTML += "<p>Diskon 10% untuk pembelian > 3 item!</p>";
    }
    cartTotal.textContent = "Total: Rp " + total.toLocaleString();
}

// Checkout
checkoutBtn.addEventListener("click", () => {
    checkoutModal.classList.remove("hidden");
    checkoutSummary.innerHTML = cartItems.innerHTML;
});
closeCheckout.addEventListener("click", () => checkoutModal.classList.add("hidden"));

// Audio
const audio = document.getElementById("bgMusic");
document.getElementById("audioToggle").addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});
