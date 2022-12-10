import joi from "joi";

export const gameSchema = joi.object({
    name: joi.string().required(),
    stockTotal: joi.number().greater(0),
    pricePerDay: joi.number().greater(0),
    categoryId: joi.required()
});