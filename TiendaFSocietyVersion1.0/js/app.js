const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}

document.addEventListener("DOMContentLoaded",function(event){
    
    cargaProductos();
    
});

   
// Eventos
// El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado
//document.addEventListener('DOMContentLoaded', e => { fetchData() });
cards.addEventListener('click', e => { addCarrito(e) });
items.addEventListener('click', e => { btnAumentarDisminuir(e) })

// Traer productos
// const fetchData = async () => {
//     const res = await fetch('api.json');
//     const data = await res.json()
//     // console.log(data)
//     pintarCards(data)
// }


function cargaProductos(){
    var obj= [
          {
            "precio": 1200,
            "id": 1,
            "title": "Tablet",
            "thumbnailUrl": "https://img.global.news.samsung.com/cl/wp-content/uploads/2020/03/Tab-A-Perspectiva_Gold-1.jpg"
          },
          {
            "precio": 1600,
            "id": 2,
            "title": "Nintendo Switch",
            "thumbnailUrl": "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/c/o/consola-nintendo-switch-neon-47030-default-1.jpg"
          },
          {
            "precio": 3500,
            "id": 3,
            "title": "PS5",
            "thumbnailUrl": "https://www.muycomputer.com/wp-content/uploads/2020/10/Sony-PS5-pre-venta-aumento-demanda-e1603881786569.jpg"
          },
          {
            "precio": 2100,
            "id": 4,
            "title": "Refrigeradora",
            "thumbnailUrl": "https://images.samsung.com/is/image/samsung/pe-ref-sbs-rs5300-rs27t5561b1-pe-jetblack-003-221963443?$720_576_PNG$"
          },
          {
            "precio": 5200,
            "id": 5,
            "title": "Máquina helado",
            "thumbnailUrl": "https://ventuscorp.pe/wp-content/uploads/2019/10/VSP-40SMART-600x630.jpg"
          },
          {
            "precio": 2300,
            "id": 6,
            "title": "Laptop",
            "thumbnailUrl": "https://d598hd2wips7r.cloudfront.net/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/h/a/hagrid_lumiere_blue_3.png"
          }
        ]

    pintarCards(obj);
}

// Pintar productos
const pintarCards = data => {
    data.forEach(item => {
        templateCard.querySelector('h5').textContent = item.title
        templateCard.querySelector('p').textContent = item.precio
        templateCard.querySelector('button').dataset.id = item.id
        templateCard.querySelector('img').setAttribute("src", item.thumbnailUrl)
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

// Agregar al carrito
const addCarrito = e => {
    if (e.target.classList.contains('btn-dark')) {
        // console.log(e.target.dataset.id)
        // console.log(e.target.parentElement)
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = item => {
    // console.log(item)
    const producto = {
        title: item.querySelector('h5').textContent,
        precio: item.querySelector('p').textContent,
        id: item.querySelector('button').dataset.id,
        cantidad: 1
    }
    // console.log(producto)
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = { ...producto }
    
    pintarCarrito()
}

const pintarCarrito = () => {
    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('span').textContent = producto.precio * producto.cantidad
        
        //botones
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()
}

const pintarFooter = () => {
    footer.innerHTML = ''
    
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - compre algo</th>
        `
        return
    }
    
    // sumar cantidad y sumar totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
    // console.log(nPrecio)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })

}

const btnAumentarDisminuir = e => {
    // console.log(e.target.classList.contains('btn-info'))
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = {...producto}
        }
        pintarCarrito()
    }
    e.stopPropagation()
}