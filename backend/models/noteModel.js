const mongoose = require('mongoose')

//Modele for create users.
const noteSchema = mongoose.Schema({

    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
        
    },
    category: {
        type: String,
        require: true,

    },
    user:{
        //just in case we need
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",

    },
        
},

{
    timestamps:true,
}

);


const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
