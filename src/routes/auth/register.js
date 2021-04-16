//import  db  from '$lib/db'
import {User} from '$lib/models/user'
import { respond } from './_respond';

export async function post(request) {
        //console.log('Η ΚΑΤΑΣΤΑΣΗ ΤΗΣ ΒΑΣΗΣ',db.ready)
        //const dbConnection = await connectToDatabase()
        //const db = dbConnection.db
        //onst collection = db.collection('notes')
        //const notes = await collection.find().toArray()
        const user = await User.create(request.body)
        return respond(user);
}

