const express = require("express")
const app = express()
const cors = require("cors")
const corsOptions = {
    origin: ["http://localhost:5173"],
}

app.use(cors(corsOptions))

app.get("/api", async (req, res) => {
    //TEST
    res.json({ colors: ["red", "blue", "yellow"]})
})

app.listen(3000, () => {
    console.log("Server listening on port 3000")
})

