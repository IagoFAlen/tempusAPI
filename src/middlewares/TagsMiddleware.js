const ParamCheck = require("../utils/ParamCheck");

class TagsMiddleware{
    checkUserParam(request, response, next){
        const user_id = request.user.id;

        ParamCheck([ user_id ]);

        next();
    }
}

module.exports = TagsMiddleware;