import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

const { MONGODB_URI, MONGODB_DB } = process.env
//import.meta.env.MONGODB_URI

export default class db {

    static ready = false

    static async init() {
        try {
        const conn = await mongoose.connect(MONGODB_URI,{
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify:false,
            useUnifiedTopology:true
        });
        console.log('Έγινε σύνδεση με mongo database')
        this.ready = true
        } catch (e) {
            console.log('Υπάρχει σφάλμα στη σύνδεση με mongo database')
        }
    }
  
}
