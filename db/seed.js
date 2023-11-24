const db = require("./connection");
const usersData = require("./data/users");
const UsersModel = require("./schema/user");
async function seed({ usersData }) {
    return db.then(async (mongoose) => {
        await mongoose.connection.db.dropDatabase()
        await UsersModel.insertMany(usersData)
        return mongoose
    })
}
    
seed({usersData}).then(() => console.log("seeding"))