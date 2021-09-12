const express = require("express");
const notes = require("./data/Notes");
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");

const app = express();
dotenv.config();

//Mongoos DB scrept and connaction. 
connectDB();

app.use(express.json())



//Local get fron folder
//app.get("/api/notes", (req, res) => {
 //   res.json(notes);
//});

//Router for register and loging.
app.use('/api/users', userRoutes)
app.use('/api/notes', noteRoutes)

//-------------------Deployment-----------------------

__dirname=path.resolve()
if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "fronted", "build", "index.html"))
    })

}else{
    app.get("/", (req, res) => {
        res.send("API is running..");
    });
}

//-------------------Deployment-----------------------


//For handle the error. 
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
