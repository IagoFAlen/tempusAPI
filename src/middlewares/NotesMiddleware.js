const ParamCheck = require('../utils/ParamCheck');

class notesMiddleware {
    noteCreateCheck(request, response, next){
        const { title, description, ratings, tags } = request.body;
        
        ParamCheck([ title, description, ratings, tags ]);

        next();
    }

    noteUpdateCheck(request, response, next){
        const { email, password, old_password } = request.body;
        const { id } = request.params;
        
        ParamCheck([ email, password, old_password, id ]);
        
        next();
    }

    singleNoteCheck(request, response, next){
        const { id } = request.params;

        ParamCheck([ id ]);

        next();
    }

}

module.exports = notesMiddleware;