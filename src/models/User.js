class User {
    constructor(email, username, name, address, age, phone, password, avatar) {
        this.id = "",
        this.email = email.toString(),
        this.name = name.toString(),
        this.age = age.toString(),
        this.address = address.toString(),
        this.phone = phone.toString(),
        this.username = username.toString(),
        this.password = password.toString(),
        this.avatar = avatar.toString()
    }
}

export default User;
