// ADMIN LOGIN (you set your username and password here)
const adminCreds = {
  username: "yourAdmin",
  password: "yourPassword123"
};

document.addEventListener("DOMContentLoaded", () => {
  // LOGIN
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const user = document.getElementById("username").value;
      const pass = document.getElementById("password").value;
      if (user === adminCreds.username && pass === adminCreds.password) {
        localStorage.setItem("isAdmin", "true");
        window.location.href = "dashboard.html";
      } else {
        document.getElementById("loginMsg").textContent = "Invalid credentials!";
      }
    });
  }

  // DASHBOARD COUNTS
  if (document.getElementById("productCount")) {
    document.getElementById("productCount").textContent =
      JSON.parse(localStorage.getItem("products") || "[]").length;
    document.getElementById("pluginCount").textContent =
      JSON.parse(localStorage.getItem("plugins") || "[]").length;
  }

  // PRODUCT ADD
  const productForm = document.getElementById("productForm");
  if (productForm) {
    productForm.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("productName").value;
      const desc = document.getElementById("productDesc").value;
      const products = JSON.parse(localStorage.getItem("products") || "[]");
      products.push({ name, desc });
      localStorage.setItem("products", JSON.stringify(products));
      displayProducts();
      productForm.reset();
    });
    displayProducts();
  }

  // PLUGIN ADD
  const pluginForm = document.getElementById("pluginForm");
  if (pluginForm) {
    pluginForm.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("pluginName").value;
      const desc = document.getElementById("pluginDesc").value;
      const plugins = JSON.parse(localStorage.getItem("plugins") || "[]");
      plugins.push({ name, desc });
      localStorage.setItem("plugins", JSON.stringify(plugins));
      displayPlugins();
      pluginForm.reset();
    });
    displayPlugins();
  }
});

// DISPLAY PRODUCTS
function displayProducts() {
  const list = document.getElementById("productList");
  if (list) {
    list.innerHTML = "";
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    products.forEach(p => {
      const li = document.createElement("li");
      li.textContent = `${p.name} - ${p.desc}`;
      list.appendChild(li);
    });
  }
}

// DISPLAY PLUGINS
function displayPlugins() {
  const list = document.getElementById("pluginList");
  if (list) {
    list.innerHTML = "";
    const plugins = JSON.parse(localStorage.getItem("plugins") || "[]");
    plugins.forEach(pl => {
      const li = document.createElement("li");
      li.textContent = `${pl.name} - ${pl.desc}`;
      list.appendChild(li);
    });
  }
}