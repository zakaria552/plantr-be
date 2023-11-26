const app = require("./app");
const { PORT = 3005} = process.env
app.listen(PORT, () => console.log("Server is running on port ", PORT));
