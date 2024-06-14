const knex = require('../database/knex');
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const authConfig = require('../configs/auth');
const { sign } = require('jsonwebtoken');

class SessionsController{
    async create(request, response){
        const { email, password } = request.body;

        const user = await knex.select('*').from('users').where('email', email).first();

        if(!user){
            throw new AppError("Invalid credentials.", 401);
        }

       const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new AppError("Invalid credentials.", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return response.json({ user, token });

    }
}

module.exports = SessionsController;