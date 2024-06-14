const knex = require('../database/knex');

class Tags{
    async index(request, response){
        const user_id = request.user.id;

        const tags = await knex.select('*').from('tags').where('user_id', user_id).groupBy('title'); // groupBy to group the same title

        return response.status(200).json(tags);
    }
}

module.exports = Tags;