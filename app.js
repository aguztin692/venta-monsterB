const productos = {
   "Hamburguesas": [
    { nombre: "Tradicional", precio: 85 },
    { nombre: "Pollo", precio: 90 },
    { nombre: "Champi-Búrger", precio: 100 },
    { nombre: "Hawaiana", precio: 100 },
    { nombre: "Mexicana", precio: 100 },
    { nombre: "Rin-Búrger", precio: 100 },
    { nombre: "Camarón", precio: 115 },
    { nombre: "Bacon", precio: 120 },
    { nombre: "Bacon Especial", precio: 130 },
    { nombre: "Big-Búrger", precio: 135 },
    { nombre: "Monstruosa", precio: 135 },
  ],
  "Hot Dogs": [
    { nombre: "Sencillo", precio: 50 },
    { nombre: "Especial", precio: 60 },
    { nombre: "Gordog", precio: 70 },
    { nombre: "Combinadog", precio: 75 },
    { nombre: "Chilidog", precio: 75 },
  ],
  "Alitas y Boneless": [
    { nombre: "10 pzas", precio: 120 },
    { nombre: "15 pzas", precio: 170 },
    { nombre: "20 pzas", precio: 200 },
  ],
  "Papas y Botanas": [
    { nombre: "Papas Gajo", precio: 60 },
    { nombre: "Papas Gajo gratinadas con tocino", precio: 100 },
    { nombre: "Papas Gajo gratinadas con boneless", precio: 110 },
    { nombre: "Dedos de queso", precio: 75 },
    { nombre: "Aros de cebolla", precio: 60 },
    { nombre: "Papas a la francesa", precio: 60 },
    { nombre: "Salchipapa", precio: 70 },
  ],
  "Combos": [
    { nombre: "Combo Hamburguesa", precio: 160 },
    { nombre: "Combo Hot Dog", precio: 115 },
    { nombre: "Combo Botanero", precio: 110 },
    { nombre: "Combo Pareja", precio: 300 },
    { nombre: "Combo Monster", precio: 500 },
  ],
  "Bebidas": [
    { nombre: "Agua fresca", precio: 25 },
    { nombre: "Té", precio: 25 },
    { nombre: "Coca", precio: 25 },
  ],
  "Extras": [
    { nombre: "Aderezo Ranch", precio: 10 },
    { nombre: "Salsa BBQ", precio: 10 },
    { nombre: "Salsa BBQH", precio: 10 },
    { nombre: "Salsa Búfalo", precio: 10 },
    { nombre: "Salsa Mango Habanero", precio: 10 },
  ],
};

const productosDiv = document.getElementById("productos");
const listaVentasDiv = document.getElementById("lista-ventas");
const totalDiaSpan = document.getElementById("total-dia");

let ventasDelDia = [];

Object.keys(productos).forEach(categoria => {
  const seccion = document.createElement("div");
  seccion.classList.add("categoria");

  const boton = document.createElement("button");
  boton.textContent = `▶️ ${categoria}`;
  boton.classList.add("categoria-btn");

  const contenedor = document.createElement("div");
  contenedor.classList.add("productos-categoria");
  contenedor.style.display = "none"; // Oculto por defecto

  productos[categoria].forEach(producto => {
    const label = document.createElement("label");
    label.textContent = `${producto.nombre} ($${producto.precio}) `;

    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.value = "0";
    input.dataset.precio = producto.precio;
    input.dataset.nombre = producto.nombre;

    contenedor.appendChild(label);
    contenedor.appendChild(input);
    contenedor.appendChild(document.createElement("br"));
  });

  boton.addEventListener("click", () => {
    if (contenedor.style.display === "none") {
      contenedor.style.display = "block";
      boton.textContent = `🔽 ${categoria}`;
    } else {
      contenedor.style.display = "none";
      boton.textContent = `▶️ ${categoria}`;
    }
  });

  seccion.appendChild(boton);
  seccion.appendChild(contenedor);
  productosDiv.appendChild(seccion);
});


function agregarVenta() {
  const fecha = document.getElementById("fecha").value;
  if (!fecha) {
    alert("Selecciona una fecha primero.");
    return;
  }

  let totalOrden = 0;
  const resumen = [];

  const inputs = productosDiv.querySelectorAll("input");
  inputs.forEach(input => {
    const cantidad = parseInt(input.value);
    if (cantidad > 0) {
      const nombre = input.dataset.nombre;
      const precio = parseFloat(input.dataset.precio);
      const subtotal = cantidad * precio;
      totalOrden += subtotal;
      resumen.push(`${cantidad} x ${nombre}`);
      input.value = "0";
    }
  });

  if (resumen.length > 0) {
    // Guardar la venta en el arreglo
    ventasDelDia.push({
      fecha,
      resumen,
      total: totalOrden
    });

    // Mostrar resumen corto (solo productos y total de la orden) en la página
    alert(`Orden agregada:\n${resumen.join(", ")}\nTotal: $${totalOrden}`);

  } else {
    alert("No se agregó ningún producto.");
  }
}

function mostrarVentasDelDia() {
  listaVentasDiv.innerHTML = ""; // Limpiar listado

  let sumaTotal = 0;

  if (ventasDelDia.length === 0) {
    listaVentasDiv.textContent = "No hay ventas registradas para hoy.";
    totalDiaSpan.textContent = "0";
    return;
  }

  ventasDelDia.forEach(venta => {
    const li = document.createElement("li");
    li.textContent = `[${venta.fecha}] ${venta.resumen.join(" | ")} - Total: $${venta.total}`;
    listaVentasDiv.appendChild(li);
    sumaTotal += venta.total;
  });

  totalDiaSpan.textContent = sumaTotal;
}
