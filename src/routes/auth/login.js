//import {connectToDatabase} from '$lib/db'
//import  db  from '$lib/db'
import {User} from '$lib/models/user'
import bcrypt from 'bcrypt'
import { respond } from './_respond';

export async function post(request) {

    const user = {
        email: request.body.email,
        password: request.body.password
    }
    
	const body = await User.findOne({email:user.email})

    if(body){
        const auth = await bcrypt.compare(user.password, body.password);  //bcrypt.compare(plainPasswordToCheck, hashedPasswordOnStorage) sos
        if(auth){
            return respond(body)
        } else {
            return {
                status:401,
                body: {
                    errors: {
                        1: 'incorrect password'
                    }
                }
            }
        }
    }  else {
        return {
                status:401,
                body: {
                    errors: {
                        1: 'incorrect email'
                    }
                }
            
        }
    }
}

