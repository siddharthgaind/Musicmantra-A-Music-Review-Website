//Joi validator for validations
const Joi = require('joi');

const musicTablejoi = data => {
    const schema = Joi.object().keys({
        musicName: Joi.string().regex(new RegExp('^[a-zA-Z0-9_ ]*$')).required(),
        artist: Joi.string().regex(new RegExp('^[a-zA-Z0-9_ ]*$')).required(),
        album: Joi.string().regex(new RegExp('^[a-zA-Z0-9_ ]*$')).required(),
        year: Joi.number().required(),
        genre: Joi.string().required(),
        review:Joi.string().required()
    })
    return schema.validate(data)
}

const editMusicTablejoi = data => {
    const schema = Joi.object().keys({
        artist: Joi.string().regex(new RegExp('^[a-zA-Z0-9_ ]*$')),
        album: Joi.string().regex(new RegExp('^[a-zA-Z0-9_ ]*$')),
        year: Joi.number(),
        genre: Joi.string().regex(new RegExp('^[a-zA-Z0-9_ ]*$')),
        visibilty: Joi.string().valid('Yes', 'No')
    })
    return schema.validate(data)
}

const reviewTablejoi = data=>{
    const schema=Joi.object().keys({
        review:Joi.string().regex(new RegExp('^[a-zA-Z0-9_ ]*$')),
        rating:Joi.number(),
  })
   return schema.validate(data)
  }

const playlistTablejoi = data => {
    const schema = Joi.object().keys({
        title: Joi.string().regex(new RegExp('^[a-zA-Z0-9_ ]*$')).required(),
        description: Joi.string().regex(new RegExp('^[a-zA-Z0-9_ ]*$')),
        visibility: Joi.string().optional.valid('Private', 'Public'),
        createdBy: Joi.string().required(),
        addMusic: Joi.optional(),
    })
    return schema.validate(data)
}

const loginTable = data => {
    const schema = Joi.object().keys({
        userName: Joi.string().email().required(),
        userPassword: Joi.optional()
    })
    return schema.validate(data)
}

const editloginTable = data => {
    const schema = Joi.object().keys({
        userStatus: Joi.string().valid('Activated', 'Deactivated'),
        userType: Joi.string().valid('Admin', 'Normal')
    })
    return schema.validate(data)
}
const editPlaylist = data => {
    const schema = Joi.object().keys({
        description: Joi.string().regex(new RegExp('^[a-zA-Z0-9_ ]*$')),
        createdBy: Joi.string().regex(new RegExp('^[a-zA-Z0-9_ ]*$')),
        visibility: Joi.string().valid('Yes', 'No')
    })
    return schema.validate(data)
}
module.exports.loginTable = loginTable;
module.exports.musicTablejoi = musicTablejoi;
module.exports.playlistTablejoi = playlistTablejoi;
module.exports.editPlaylist = editPlaylist;
module.exports.editloginTable = editloginTable;
module.exports.editMusicTablejoi = editMusicTablejoi;
module.exports.reviewTablejoi = reviewTablejoi;
