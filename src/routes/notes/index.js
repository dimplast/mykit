import db from '$lib/db'
import {Note} from '$lib/models/note'

export async function get(request){

    try {
        //const dbConnection = await connectToDatabase()
        //const db = dbConnection.db
        //onst collection = db.collection('notes')
        //const notes = await collection.find().toArray()
        const notes = await Note.find({})
        return {
            status:200,
            body: {
                notes: notes
            }
        }
    } catch(err){
            return {
                status :500,
                body: {
                    error:'Server error'
                }
            }
    }
    

}



