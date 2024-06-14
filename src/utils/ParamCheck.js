const AppError = require('./AppError');

function checkUndefined(param){
    return param ? true : false;
}

function ParamCheck(params){
    const verifyParams = params.map(param => {
        return checkUndefined(param);
         
    })
    
    if(verifyParams.includes(false)){
        throw new AppError('A param is missing, verify it, please!');
    }

}

module.exports = ParamCheck;