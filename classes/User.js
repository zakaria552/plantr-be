const UsersModel = require("../db/schema/user");

class User {
    async getUser(userId) {
        try {
            const user = await UsersModel.findOne({userId})
            if(!user) return Promise.reject({ status: 404, message: "user not found"})
            return user
        } catch(e) {
            throw e
        }

    }
    async createUser({userId, name}) {
        try {
            return await UsersModel.create({ userId, name})
        } catch (e) {
            throw e
        }
    }
    async getPlants(userId) {
        try {
            const user = await this.getUser(userId)
            return user.plants
        } catch (e) {
            throw e
        }
    }
    async addPlant(userId, plant) {
        try {
            await UsersModel.findOneAndUpdate({userId}, { $push: { plants: plant } })
            const plants = await this.getPlants(userId)
            return plants.at(-1)
        } catch(e) {
            throw e
        }
    }
}


module.exports = User