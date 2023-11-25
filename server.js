const app = require("./app");
const { PORT = 3001} = process.env
console.log(PORT)
app.listen(PORT, () => console.log("Server is running on port ", PORT));
