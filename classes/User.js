const UsersModel = require("../db/schema/user");
class User {
    async getUser(userId) {
        try {
            const user = await UsersModel.findOne({_id: userId})
            if(!user) return Promise.reject({ status: 404, message: "user not found"})
            return user
        } catch(e) {
            throw e
        }

    }
    async getUserByEmail(email) {
        try {
            const user = await UsersModel.findOne({email})
            if(!user) return Promise.reject({ status: 404, message: "user not found"})
            return user
        } catch(e) {
            throw e
        }
    }
    async createUser({email, passwordHash, name}) {
        try {
            const user = await UsersModel.findOne({email})
            if(user) return Promise.reject({ status: 400, message: "user already exists"})
            return await UsersModel.create({ name, email, passwordHash})
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
            await UsersModel.findOneAndUpdate({_id: userId}, { $push: { plants: plant } })
            const plants = await this.getPlants(userId)
            return plants.at(-1)
        } catch(e) {
            throw e
        }
    }
    async getPlantById(userId, plantId) {
        try {
            const plants = await this.getPlants(userId)
            const index = plants.findIndex(plant => plant.plantId == plantId)
            if(index === -1)  return Promise.reject({ status: 404, message: "plant not found"})
            return plants[index]
        } catch(e) {
            throw e
        }

    }
    async updatePlant(userId, plantId, lastWatered) {
        try {
            const plant = await this.getPlantById(userId, plantId)
            plant.lastWatered = lastWatered
            console.log(plant)
            const plants = await this.getPlants(userId)
            console.log(plants)
            const index = plants.findIndex(plant => plant.plantId == plantId)
            console.log(index)
            plants.splice(index,1,plant);
            console.log(plants)
            await UsersModel.findOneAndUpdate({_id: userId}, {plants})
            return plant
        } catch(e) {
            console.log(e)
            throw e
        }
    }
}


module.exports = User
