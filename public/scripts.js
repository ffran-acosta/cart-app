document.addEventListener("DOMContentLoaded", () => {
    fetchData();
})

const fetchData = async () => {
    try {
        const data = await(await fetch("/api/products")).json(); 
        crearProductos(data);
        agregarDetect(data);
        pagar();
        //console.log(data);  
    } catch (error){
        //console.log(error);
    }
}

const contenedorProductos = document.querySelector("#contenedor-productos");
const crearProductos = (data) => {
    const template = document.querySelector("#id-content").content;
    const fragment = document.createDocumentFragment();
    data.forEach(producto => {
        template.querySelector("img").setAttribute("src", producto.image);
        template.querySelector("h2").textContent = producto.title;
        template.querySelector(".span-price").textContent = producto.precio;
        template.querySelector("button").dataset.id = producto.id;
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    });
    contenedorProductos.appendChild(fragment);
}

let carritoBack = [];
let carrito = {};
const botonPagar = document.querySelector(".button-pay");
const agregarDetect = (data) => {
    const boton = document.querySelectorAll(".product-container .button");
    boton.forEach(btn => {
        const product = data.find(item => item.id === parseInt(btn.dataset.id));
        blockBtn(product, btn);
        btn.addEventListener("click", () => {
            product.stock--;
            blockBtn(product, btn);
            product.cantidad = 1;
            if (carrito.hasOwnProperty(product.id)){
                product.cantidad = carrito[product.id].cantidad +1;
            }
            carrito[product.id] = {...product};
            const total = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0);
            botonPagar.innerHTML = "Pagar " + total;
            carritoBack.push(product.id);
            //console.log(carrito);
            console.log(product);
        })
    })
}

const blockBtn = (product, btn) => {
    if (product.stock === 0){
        btn.disabled = true;
        btn.innerHTML = "Sin Stock";
    }
}

const pagar = () => {
    botonPagar.addEventListener("click", () =>{
        const total = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0);
        botonPagar.innerHTML = "Pagar";
        console.log("Tenes que pagar $"+total);
        console.log(carrito);
        pagarBack();
        detalleBack();
        carritoBack = [];
        carrito = {};
    })
}

const pagarBack = async () => {
    try{
        const pago = await(await fetch("/api/pagar",{
            method: "post",
            body: JSON.stringify(carritoBack),
            headers: 
                {
                    "Content-Type": "application/json"
                },
            })).json();  
    } catch {
        alert("Sin Stock, por favor actualice la página");
    }
}

const detalleBack = async () => {
    const a = await(await fetch("/api/detalle",{
        method: "post",
        body: JSON.stringify(carrito),
        headers: 
            {
                "Content-Type": "application/json"
            },
        })).json();            
}
