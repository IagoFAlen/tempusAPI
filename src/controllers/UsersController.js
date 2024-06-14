const knex = require('../database/knex');
const { hash, compare } = require('bcryptjs');
const AppError = require('../utils/AppError.js');

class UserController {

    async create (request, response) {
        const { name, email, password } = request.body;

        const checkUserEmail = await knex.select('*').from('users').where('email', email);
        if(checkUserEmail.length !== 0){
            throw new AppError('Este email está indisponível. Por favor, tente outro!');
        }
        
        const hashedPassword = await hash(password, 8);
        await knex('users').insert({
            name,
            email,
            password: hashedPassword,

        });

        return response.status(201).json();
    }

    async index (request, response){
        
        const users = await knex.select('*').from('users');

        return response.status(200).json(users);
    }

    async update(request, response){
        const { name, email, password, old_password } = request.body;
        const user_id = request.user.id;

        
        const user = await knex.select('*').from('users').where('id', user_id).first();
        if(password && old_password){
            
            const checkUserEmail = await knex.select('*').from('users').where('email', email).first();
    
            if(checkUserEmail && checkUserEmail.id !== user.id){
                throw new AppError('You can\'t change a password from another user');
            }
    
            const checkOldPassword = await compare(old_password, user.password);
    
            if(!checkOldPassword){
                throw new AppError('The password doesn\'t match');
            }
            user.password = await hash(password, 8);
            
        }
        
        
        user.name = name ? name : user.name;
        user.email = email ? email : user.email;
        user.updated_at = knex.fn.now();
        
        await knex('users').update(user).where('id', user_id);

        return response.status(204).json();
    }

    async delete(request, response){
        const user_id = request.user.id;

        await knex('users').where('id', user_id).delete()

        return response.status(204).json();
    }
}

module.exports = UserController;