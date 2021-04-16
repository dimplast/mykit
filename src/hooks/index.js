import * as cookie from 'cookie';
import  db  from '$lib/db'

export function getContext({ headers }) {
	const cookies = cookie.parse(headers.cookie || '');
	const jwt = cookies.jwt && Buffer.from(cookies.jwt, 'base64').toString('utf-8');

	//console.log(cookies)
	return {
		user: jwt ? JSON.parse(jwt) : null
	};
}

export function getSession({ context }) {

	console.log('CONTEXT',context)
	return {
		user: context.user && {
			username: context.user.username,
			email: context.user.email,
		}
	};
}

export async function handle({request, render}){
	//console.log(request)
	if(!db.ready) await db.init()
	return render(request)
}

