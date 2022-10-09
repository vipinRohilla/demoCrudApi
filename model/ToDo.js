import mongoose from "mongoose";

const toDoSchema = mongoose.Schema({
    text: {
        type : String,
        required : true
    },
    isCompleted: {
        type : Boolean,
        default : false
    }
});

export default mongoose.model('ToDo', toDoSchema);