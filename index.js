const express = require("express")
const app = express()
const mongoose = require("mongoose")
const moviesRouter = require("./routes/movies")

const PORT = process.env.PORT || 3000

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost/movies"

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(DATABASE_URL)

const db = mongoose.connection
db.on("error", error=> console.error(error))
db.once("open", () => console.log("connected to Database"))

app.use(express.json())
app.use("/movies", moviesRouter)




// const lessons = [
//     {id:1, lesson: "Lesson 1"},
//     {id:2, lesson: "Lesson 2"},
//     {id:3, lesson: "Lesson 3"},
// ]
// app.get("/", (req, res) => {
//     res.send("Hello World!")
// })
//
// app.get("/api/lessons", (req, res) => {
//     res.send(lessons)
// })
//
// app.post("/api/lessons", (req, res) => {
//
//     validate(req, res)
//     const lesson = {
//         id: lessons.length + 1,
//         lesson: req.body.lesson
//     }
//     lessons.push(lesson)
//     res.send(lesson)
// })
//
// app.put("/api/lessons/:id", (req, res) => {
//     const lesson = lessons.find((l) => {
//         return l.id === parseInt(req.params.id)
//     })
//     if(!lesson) {
//         res.status(404).send("This lesson is not found")
//     }
//     validate(req, res)
//     lesson.lesson = req.body.lesson
//     res.send(lesson)
// })
//
// app.delete("/api/lessons/:id", (req, res) => {
//     const lesson = lessons.find((l) => {
//         return l.id === parseInt(req.params.id)
//     })
//     if (!lesson) {
//         res.status(404).send("This lesson is not found")
//     }
//     const index = lessons.indexOf(lesson)
//     lessons.splice(index, 1)
//     res.send(lesson)
// })
//
// app.get("/api/lessons/:id", (req, res) => {
//     const lesson = lessons.find((l) => {
//         return l.id === parseInt(req.params.id)
//     })
//     if(!lesson) {
//         res.status(404).send("This lesson is not found")
//     }
//     res.send(lesson)
// })
//
//
// app.get("/api/lessons/:year/:title", (req, res) => {
//     res.send(req.params)
// })


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})