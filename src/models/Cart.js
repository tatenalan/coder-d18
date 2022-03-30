class Cart {
    constructor(idUser) {
        this.timestamp = new Date().toLocaleTimeString();
        this.products = [];
        this.idUser = idUser;
    }
}
export default Cart;
        