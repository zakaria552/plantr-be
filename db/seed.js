const db = require("./connection");
const usersData = require("./data/users");
const plantsData = require("./data/plants")
const UsersModel = require("./schema/user");
const PlantsModel = require("./schema/plants")
async function seed({ usersData }) {
    return db.then(async (mongoose) => {
        await mongoose.connection.db.dropDatabase()
        await UsersModel.insertMany(usersData)
        await PlantsModel.insertMany(plantsData)
        return mongoose
    })
}
    
seed({usersData}).then(() => console.log("seeding"))