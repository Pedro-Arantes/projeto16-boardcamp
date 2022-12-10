import joi from "joi";

export const customerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().required().max(11).min(10),
    cpf: joi.string().required().length(11),
    birthday: joi.date().iso().required(),
});