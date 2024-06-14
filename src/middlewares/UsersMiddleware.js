const AppError = require( '../utils/AppError');
const ParamCheck = require('../utils/ParamCheck');

class UsersMiddleware {
    userCreateCheck(request, response, next){
        const { name, email, password } = request.body;

        ParamCheck([ name, email, password ]);

        next();
    }

    userUpdateCheck(request, response, next){
        const { name, email } = request.body;
        
         ParamCheck([ name, email ]);
        
        next();
    }
}

module.exports = UsersMiddleware;