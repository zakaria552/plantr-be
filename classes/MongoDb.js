const connection = require("../db/connection");

const User = require("./User");

class MongoDb {
    constructor() {
        this.userModel = new User()
    }
}

module.exports = new MongoDb()