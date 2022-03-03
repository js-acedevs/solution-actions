import Joi from 'joi';

export const LoginValidator = Joi.object({
    email: Joi.string()
        .email({
            tlds: {
                allow: false
            }
        })
        .trim()
        .required()
        .label('Email'),
    password: Joi.string().trim().min(8).required().label('Password')
});
