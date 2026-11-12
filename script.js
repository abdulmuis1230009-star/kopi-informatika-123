
// NOMOR WHATSAPP TOKO
const nomorWhatsApp = "6285891362062";

// DATA MENU
const products = [
    {
        name: "Kopi Susu Gula Aren",
        category: "Coffee",
        price: 10000,
        description: "Espresso, susu segar dan gula aren asli.",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600"
    },
    {
        name: "Matcha Latte",
        category: "Non Coffee",
        price: 10000,
        description: "Matcha premium dengan susu segar.",
        image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600"
    }
];

// FORMAT RUPIAH
function formatRupiah(harga) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(harga);
}

// TAMPILKAN PRODUK
function tampilkanProduk(kategori = "Semua") {
    const productGrid = document.getElementById("productGrid");

    const filteredProducts = kategori === "Semua"
        ? products
        : products.filter(product => product.category === kategori);

    productGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">

            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>

                <div class="product-bottom">
                    <span class="product-price">
                        ${formatRupiah(product.price)}
                    </span>

                    <button class="order-btn"
                        onclick="pesanWhatsApp('${product.name}', ${product.price})">
                        Pesan ☕
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

// PESAN WHATSAPP
function pesanWhatsApp(nama, harga) {
    const pesan =
        `Woi Rehan Abdul Ghandi! \n\n` +
        `Gua mau pesen kopi lu:\n` +
        `Menu: ${nama}\n` +
        `Harga: ${formatRupiah(harga)}\n\n` +
        `Terima kasih!`;

    const url = `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;

    window.open(url, "_blank");
}

// FILTER MENU
document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", function() {
        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");
        tampilkanProduk(this.dataset.category);
    });
});

// NAVBAR MOBILE
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function() {
    navLinks.classList.toggle("show");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
    });
});

// KONTAK WHATSAPP
document.getElementById("contactWhatsapp").href =
    `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(
        "Halo Kopi Informatika, saya ingin memesan kopi."
    )}`;

// JALANKAN WEBSITE
tampilkanProduk();
