const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Question = require("./models/productmodels");
app.use(express.json())
app.use(express.urlencoded({extended: false}));
//routes
app.get("/", (req,res) => {
    res.send("<h1>hello world</h1>")
})
app.get("/users", (req,res) => {
    res.send("<h1>welcome users</h1>")
});

app.get('/questions', async(req, res) =>{
    try {
        const questions = await Question.find({});
        res.status(200).json(questions)
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})


app.get('/questions/:id', async(req, res) =>{
    try {
        const{id} = req.params
        const question = await Question.findById(id);
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})


app.put('/questions/:id', async(req, res) =>{
    try {
        const{id} = req.params
        const question = await Product.findByIdAndUpdate(id, req.body);
        if(!question){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updateQuestion = await Question.findById(id);
        res.status(200).json(updateQuestion);
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})

app.delete('/questions/:id', async(req, res) =>{
    try {
        const{id} = req.params
        const question = await Question.findByIdAndDelete(id);
        if(!question){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})



app.post("/questions", async(req,res) =>{
    try{
        const question = await Question.create(req.body)
        res.status(200).json(question);
    }
    catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})



mongoose.set("strictQuery" , false)
mongoose.
connect("mongodb+srv://admin:admin8344@node-api.0jhscof.mongodb.net/Node-Api")
.then(() =>{
    app.listen(3000,() => {
        console.log(`server is running at the port 3000`);
    } );
    console.log("mongodb is connected");
})
.catch((error) =>{
    console.log(error);
})