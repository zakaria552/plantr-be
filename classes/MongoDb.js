const connection = require("../db/connection");
const User = require("./User");
const Plant = require("./Plant")
class MongoDb {
    constructor() {
        this.userModel = new User()
        this.plantModel = new Plant()
    }
}

module.exports = new MongoDb()