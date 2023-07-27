//variable sobre el estadio visible del carrito
var carritoVisible = false;

//Esperamos que todos los elementos se carguen con el script

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready);
} else{
        ready();
    }
function ready(){
    //Agregamos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0; i < botonesEliminarItem.length;i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }
    //Agrego funcionalidad a los boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0; i < botonesSumarCantidad.length;i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }
    //Agrego funcionalidad a los boton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0; i < botonesRestarCantidad.length;i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }
//Agrego funcionalidad a los botones agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length; i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click',agregarAlCarritoClicked);
    }
//Agregar funcionalidad al boton pagar
document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}


//Elimino el item selecionado del carrito
function eliminarItemCarrito(event){
    alert();
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    //Actualizamos el total del carrito una vez hemos eliminado
    actualizarTotalCarrito();
    //La siguiente funcion controla si hay elementos en el carrito una vez que se elimino, sino debo ocultar el carrito
    ocultarCarrito();
}
//Actualiza el total del carrito
function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito

    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;

    //recorremos cada elemento del carrito para actualizar el total

    for(var i = 0; i < carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        console.log(precioElemento);
        //quitamos el simbolo precio y el punto de milesimo
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        console.log(precio);
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        console.log(cantidad);
        total = total + (precio*cantidad);
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("es")+',00';
}
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false

        //ahora maximizo el contenedor de los elementos 
        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}

//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    //Actualizamos el total
    actualizarTotalCarrito();
}

function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;
    //controlamos que sea menor que 1
    if(cantidadActual>=1){
            selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
            //Actualizamos el total
            actualizarTotalCarrito();
    }
}
function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    console.log(titulo);
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imageSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imageSrc);

    //La siguiente funcion agrega el elemento al carrito. Le mando por parametros los valores
    agregarItemAlCarrito(titulo,precio,imageSrc);

    //Hacemos visible el carrito cuando agrega por primera vez
    hacerVisibleCarrito();
}
function agregarItemAlCarrito(titulo,precio,imageSrc){
    var item = document.createElement('div');
    item.classList.add = 'item';
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    //Vamos a controlar que el item que se esta ingresando no se encuentra ya en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0;i<nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText == titulo){
            alert("El item ya se encuentra en carrito");
            return;
        }
    }
    var itemCarritoContenid = `
        <div class="carrito-item">
            <img src="${imageSrc}" alt="" width="80px">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <span class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </span>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //agregamos funcionalidad eliminar del nuevo item
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click',eliminarItemCarrito);
    
    //Agregamos la funcionalidad de sumar del nuevo item
    var botomSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botomSumarCantidad.addEventListener('click',sumarCantidad);

    //Agregamos la funcionalidad de restar del nuevo item
    var botonesRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonesRestarCantidad.addEventListener('click',restarCantidad);
}

function pagarClicked(event){
    alert("Gracias por su compra!");
    //elimino todos los elementos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();

    //Funcion ocultar el carrito
    ocultarCarrito();
}
function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}