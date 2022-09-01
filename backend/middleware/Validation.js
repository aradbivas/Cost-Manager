const Joi = require('joi');
//register validation
const userValidation = (data) =>
{
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).max(12).required(),
    });
    return  schema.validate(data);
}

const addItemValidationValidation = (data) =>
{
    const schema = Joi.object({
        description:Joi.string(),
        sum: Joi.number().required(),
        category: Joi.string().required(),
    });
    return schema.validate(data);
}

const getReportValidation = (data) =>
{
    const schema = Joi.object({
        year: Joi.string().required(),
        month: Joi.string().required(),
    });
    return schema.validate(data);
}


module.exports = {
    userValidation,
    addItemValidationValidation,
    getReportValidation,
}