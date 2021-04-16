export function respond(body) {
	console.log("bbbooodddyyy",body)
	if (body.errors) {
		return { status: 401, body };
	}

	//const json = JSON.stringify(body.user);
    const json = JSON.stringify(body);

    //console.log('JSON',json)
	const value = Buffer.from(json).toString('base64');

    //console.log('VALUE',value)

	return {
		headers: {
			'set-cookie': `jwt=${value}; Path=/; HttpOnly`
		},
		body
	};
}