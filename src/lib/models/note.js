import mongoose from 'mongoose';

const { Schema } = mongoose;

const noteSchema = new Schema({
    title:  String, 
    description: String
});

export const Note = mongoose.model('Note', noteSchema);



