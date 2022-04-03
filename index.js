const express = require("express")
const mongoose = require("mongoose")
const port = 5000
const app = express()
app.use(express.json())
app.listen(port, () => console.log(`Server running on port ${port}`))

const userSchema = require("./schema")

const dbname = 'first'
const dburl = `mongodb+srv://krishna:krishna123@cluster0.epqt2.mongodb.net/ecommerce?retryWrites=true&w=majority`
mongoose.connect(dburl)
    .then(() => console.log("Mongoose is connected"))
    .catch((err) => console.log(err.message))

app.get("/celebrities", async (req, res) => {
    try {
        const result = await userSchema.find()
        res.json(result)
    } catch (error) {
        console.error(error.message);
    }
})

app.get("/celebrities/:name", async (req, res) => {
    try {
        const result = await userSchema.findOne({ name: req.params.name })
        res.send(result)
    } catch (error) {
        console.error(error.message);
    }
})

app.post("/celebrities", async (req, res) => {
    try {
        const result = userSchema.create(req.body)
        console.log(req.body);
        res.send(result)
    } catch (error) {
        console.error(error.message);
    }
})

app.put('/celebrities/:name', async function (req, res) {

    try {

        const user = await userSchema.findOne({ name: req.params.name })
        if (user) {
            const updatedUser = await userSchema.updateMany({ name: req.params.name }, { $set: { name: req.body.name } })
            res.send('Record Updated')
        }
        else {
            res.send('Record not found')
        }
    }
    catch (err) {
        console.log(err)
    }
})


app.delete("/celebrities/:name/delete", async (req, res) => {
    try {
        const result = await userSchema.deleteMany({ name: req.params.name })
        res.send(result)
    } catch (error) {
        console.error(error.message);
    }
})