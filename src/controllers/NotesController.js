const knex = require('../database/knex');

class NotesController{
    async create(request, response){
        const { title, description, ratings, tags } = request.body;
        const user_id = request.user.id;

        const [ note_id ] = await knex("notes").insert({
            title,
            description,
            ratings,
            user_id
        });

        const tagsInsert = tags.map(name => {
            return{
                name,
                note_id,
                user_id,
            }
        })

        await knex('tags').insert(tagsInsert);

        return response.status(201).json();
    }

    async index(request, response){
        const { title, tags } = request.query;
        const user_id = request.user.id;

        let notes;
        
        if(tags && title){
            const filterTags = tags.split(',').map(tag => tag.trim());

            notes = await knex('tags').select([
                'notes.id',
                'notes.title',
                'notes.description',
                'notes.user_id',
                'notes.ratings',
            ]).where('notes.user_id', user_id)
            .whereLike('notes.title', `%${title}%`)
            .whereIn('name', filterTags)
            .innerJoin('notes', 'notes.id', 'tags.note_id')
            .orderBy('title');

        }else if(title){
            notes = await knex.select("*").from("notes").where('user_id', user_id).whereLike('title', `%${title}%`).orderBy('title');

        } else if(tags){
            const filterTags = tags.split(',').map(tag => tag.trim());

            notes = await knex('tags').select([
                'notes.id',
                'notes.title',
                'user_id',
                'notes.description',
                'notes.ratings',
            ]).where('notes.user_id', user_id)
            .whereIn('name', filterTags)
            .innerJoin('notes', 'notes.id', 'tags.note_id')
            .orderBy('title');

        } else {
            notes = await knex.select("*").from("notes").where('user_id', user_id).orderBy('title');
        }
    
        const userTags = await knex('tags').where('user_id', user_id);

        const notesWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id);

            return{
                ...note,
                tags: noteTags
            }
        });

        return response.status(200).json(notesWithTags);
    }

    async show(request, response){
        const { id } = request.params;

        const note = await knex.select('*').from('notes').where('id', id).first();
        const tags = await knex.select('*').from('tags').where('note_id', id).orderBy('name');

        return response.status(200).json({
            ...note,
            tags
        });
        
    }

    async delete(request, response){
        const { id } = request.params;

        await knex.delete('*').from('notes').where('id', id)

        return response.status(204).json();
    }
}

module.exports = NotesController;