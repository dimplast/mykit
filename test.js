import { UserModel } from '../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const verifyToken = async ({ req, tokenType, secret }) => {
    console.log(req?.cookies[tokenType])
    try {
        if (req?.cookies[tokenType]) {
            return jwt.verify(req.cookies[tokenType], secret);
        } else {
            return false
        }
    } catch (error) {
        return false
    }

}

const createToken = async ({ tokenType, secret, user }) => {
    const options = {
        expiresIn: '30m'
    }
    if (tokenType !== 'accessToken') {
        options.expiresIn = '30d'
    }
    return jwt.sign({
        user: {
            hash: user.hash,
            email: user.email
        }
    }, secret, options);

}

export const authorize = async (req, res, next) => {
    try {
        const accessTokenInfo = await verifyToken({ req, tokenType: 'accessToken', secret: process.env.SESSION_SECRET });
        if (accessTokenInfo.user) {
            next()
            return
        }

        const refreshTokenInfo = await verifyToken({ req, tokenType: 'refreshToken', secret: process.env.REFESH_SECRET })

        if (refreshTokenInfo.user) {
            console.log('NEW ACCESS TOKEN')
            // NEW ACCESS TOKEN
            const accessToken = await createToken({ tokenType: 'accessToken', secret: process.env.SESSION_SECRET, user: refreshTokenInfo.user });

            res.cookie('accessToken', accessToken, {
                httpOnly: process.env.ENVIRONMENT === 'PRODUCTION' ? true : false,
                sameSite: process.env.ENVIRONMENT === 'PRODUCTION' ? true : false,
                signed: true,
                secure: process.env.ENVIRONMENT === 'PRODUCTION' ? true : false
            });
            next();
            return
        } else {
            // res.clearCookie('accessToken').clearCookie('refreshToken').send();
            res.status(401);
            res.json({
                error: true,
                message: 'Not Authenticated'
            });
            // res.redirect('/session/logout');
        }

    } catch (error) {
        throw new Error(error)
    }
}


export const signIn = async ({ email, password }) => {
    const user = await UserModel.findOne({ where: { email: email }, attributes: ['id', 'email', 'password', 'salt', 'hash'] });

    if (!user) {
        throw new Error('Incorrect login credentials.');
    }

    const hash = bcrypt.hashSync(password, user.salt);
    if (!hash) {
        throw new Error('Incorrect login credentials.');
    }

    try {

        const accessToken = await createToken({ tokenType: 'accessToken', secret: process.env.SESSION_SECRET, user });

        const refreshToken = await createToken({ tokenType: 'refreshToken', secret: process.env.REFESH_SECRET, user })

        return {
            accessToken,
            refreshToken
        };

    } catch (error) {
        throw new Error(error)
    }
}