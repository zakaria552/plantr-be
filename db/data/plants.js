const plantsJson = require("../../output.json")
const mappedPlans = plantsJson.map((plant) => {
    return {
        plantId: plant.id,
        commonName: plant.common_name,
        scientificName: plant.scientific_name,
        otherName: plant.other_name,
        watering: plant.watering,
        sunlight: plant.sunlight,
        cycle: plant.cycle,
        images: plant.default_image
    }
})

module.exports = mappedPlans