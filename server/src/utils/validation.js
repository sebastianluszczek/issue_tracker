const Joi = require('@hapi/joi');

const issueValidation = data => {
    const schema = Joi.object({
        title: Joi.string()
            .min(5)
            .max(50)
            .required(),
        description: Joi.string()
            .min(5)
            .required(),
        state: Joi.string()
            .valid("open", "pending", "closed")
    });

    return schema.validate(data);
}

module.exports = issueValidation;