const Joi = require('joi');

const loginTable = data => {
    const schema = Joi.object().keys({
        userName: Joi.string().email().required(),
        userPassword: Joi.optional()
    })
    return schema.validate(data)
}

const musicTablejoi = data => {
    const schema = Joi.object().keys({
        musicName: Joi.string().regex(new RegExp('^[a-zA-Z]+(\s[a-zA-Z]+)?$')).required(),
        artist: Joi.string().regex(new RegExp('^[a-zA-Z]+(\s[a-zA-Z]+)?$')).required(),
        album: Joi.string().regex(new RegExp('^[a-zA-Z]+(\s[a-zA-Z]+)?$')).required(),
        year: Joi.number().required(),
        genre: Joi.string().required(),
    })
    return schema.validate(data)
}

const playlistTablejoi = data => {
    const schema = Joi.object().keys({
        title: Joi.string().regex(new RegExp('^[a-zA-Z]+(\s[a-zA-Z]+)?$')).required(),
        createdBy: Joi.string().regex(new RegExp('^[a-zA-Z]+(\s[a-zA-Z]+)?$')).required(),
        description: Joi.string().regex(new RegExp('^[a-zA-Z]+(\s[a-zA-Z]+)?$')),
        visibility: Joi.string().required().valid('Yes', 'No')
    })
    return schema.validate(data)
}

const editloginTable = data => {
    const schema = Joi.object().keys({
        userStatus: Joi.string().valid('Active', 'Deactive'),
        userType: Joi.string().valid('Admin', 'Normal')
    })
    return schema.validate(data)
}
const editPlaylist = data => {
    const schema = Joi.object().keys({
        createdBy: Joi.string().regex(new RegExp('^[a-zA-Z]+(\s[a-zA-Z]+)?$')),
        description: Joi.string().regex(new RegExp('^[a-zA-Z]+(\s[a-zA-Z]+)?$')),
        visibility: Joi.string().valid('Yes', 'No')
    })
    return schema.validate(data)
}
module.exports.loginTable = loginTable;
module.exports.musicTablejoi = musicTablejoi;
module.exports.playlistTablejoi = playlistTablejoi;
module.exports.editPlaylist = editPlaylist;
module.exports.editloginTable = editloginTable;