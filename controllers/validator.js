const Joi = require('joi');

const loginTable = data => {
    const schema = Joi.object().keys({
        userName: Joi.string().email().required(),
        userPassword: Joi.optional()
    })
    return schema.validate(data)
}

module.exports.loginTable = loginTable; 