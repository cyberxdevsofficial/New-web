// ADMIN LOGIN (set your own credentials)
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
      const price = document.getElementById("productPrice").value;
      const whatsapp = document.getElementById("productWhatsApp").value;
      const products = JSON.parse(localStorage.getItem("products") || "[]");
      products.push({ name, desc, price, whatsapp });
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
      const script = document.getElementById("pluginScript").value;
      const plugins = JSON.parse(localStorage.getItem("plugins") || "[]");
      plugins.push({ name, desc, script });
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
      li.innerHTML = `<strong>${p.name}</strong> - ${p.desc}<br>
        💲 Price: $${p.price}<br>
        📱 WhatsApp: <a href="https://wa.me/${p.whatsapp}" target="_blank">${p.whatsapp}</a>`;
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
      li.innerHTML = `<strong>${pl.name}</strong> - ${pl.desc}<br>
        <textarea readonly>${pl.script}</textarea><br>
        <button onclick="copyScript(\`${pl.script.replace(/`/g, "\\`")}\`)">Copy</button>
        <button onclick="downloadScript('${pl.name}', \`${pl.script.replace(/`/g, "\\`")}\`)">Download</button>`;
      list.appendChild(li);
    });
  }
}

// COPY SCRIPT
function copyScript(script) {
  navigator.clipboard.writeText(script).then(() => {
    alert("Script copied!");
  });
}

// DOWNLOAD SCRIPT
function downloadScript(name, script) {
  const blob = new Blob([script], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${name}.txt`;
  link.click();
}
