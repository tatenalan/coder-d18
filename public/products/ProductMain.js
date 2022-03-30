const socket = io();


socket.on("newProduct", product => {
    $("#table").append(`
    <tr>
        <th scope="row">${product.id}</th>
        <td>${product.name}</td>
        <td>$${product.price}</td>
        <td><img style="width:50px;" src="${product.photo}" alt=""></td>
        <form action="/cart/addToCart" method="post">
            <input type="hidden" name="id" value="${product.id}">
            <input type="hidden" name="name" value="${product.name}">
            <input type="hidden" name="price" value="${product.price}">
            <input type="hidden" name="description" value="${product.description}">
            <input type="hidden" name="photo" value="${product.photo}">
            <td><button type="submit" class="btn btn-primary">Add to cart</button></td>
        </form>
    </tr>`)
})

socket.on("error", () => {
    alert("Hubo un error")
})

$("#form-product").submit( e => {
    e.preventDefault();
    createProduct()
})

function createProduct() {
    let product = {
        id: 0,
        name: $("#name")[0].value,
        price: $("#price")[0].value,
        photo: $("#photo")[0].value
    }
    socket.emit("newProduct", product);
}
