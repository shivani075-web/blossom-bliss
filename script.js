// ================= NAVBAR TOGGLE =================
const toggler = document.getElementById("toggler");
const navbar = document.querySelector(".navbar");

toggler.addEventListener("change", () => {
    if (toggler.checked) {
        navbar.classList.add("active");
    } else {
        navbar.classList.remove("active");
    }
});
// ===== RESPONSIVE NAVBAR AUTO-CLOSE (for mobile) =====
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener("click", function () {
        document.getElementById("toggler").checked = false;
        navbar.classList.remove("active");
    });
});

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
        toggler.checked = false;
        navbar.classList.remove("active");
    });
});

// ================= CART FUNCTIONALITY =================
let cart = [];
let userAddress = ""; // yahan address save hoga

const cartIcon = document.querySelector(".fa-shopping-cart");
const cartModal = document.getElementById("cart-modal");
const closeBtn = document.querySelector(".close");
const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

// Cart count badge
const cartCount = document.createElement("span");
cartCount.classList.add("cart-count");
cartIcon.appendChild(cartCount);

function updateCart() {
    cartItemsList.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ₹${item.price}`;
        cartItemsList.appendChild(li);
        total += item.price;
    });
    cartTotal.textContent = total;
    cartCount.textContent = cart.length;
}

// Add to cart
document.querySelectorAll(".product-card .btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const productCard = btn.closest(".product-card");
        const name = productCard.querySelector("h3").textContent;
        const price = parseInt(productCard.querySelector("p").textContent.replace("₹", ""));
        cart.push({ name, price });
        updateCart();
        cartModal.style.display = "block";
    });
});

// Open cart modal
cartIcon.addEventListener("click", (e) => {
    e.preventDefault();
    cartModal.style.display = "block";
});

// Close cart modal
closeBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
});
window.addEventListener("click", (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = "none";
    }
});

// Checkout
checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    if (userAddress === "") {
        alert("Please fill your address in the contact form before checkout!");
        window.location.href = "#contact"; // contact section par bhej do
        return;
    }
    alert(`Thank you for your purchase 🌸\nYour order will be delivered to: ${userAddress}`);
    cart = [];
    updateCart();
    cartModal.style.display = "none";
});

// ================= CONTACT FORM =================
const contactForm = document.querySelector(".contact form");
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const addressInput = document.getElementById("address").value.trim();
    if (addressInput === "") {
        alert("Please enter your address!");
        return;
    }
    userAddress = addressInput; // address save ho gaya
    alert("Thank you for contacting us! We'll get back to you soon 🌸");
    contactForm.reset();
});

// ================= BACK TO TOP =================
const backToTopBtn = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
});
backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ================= FADE-IN ANIMATION =================
const fadeElems = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

fadeElems.forEach(elem => observer.observe(elem));

