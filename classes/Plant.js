const PlantModel = require("../db/schema/plants")

class Plant {
   async getPlants(total = 100) {
        try {
            const plants = await PlantModel.find({})
            return plants.slice(0, total)
        } catch(e) {
            throw e
        }
    }
}

module.exports =  Plant