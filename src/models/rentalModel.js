import joi from "joi";

export const rentalSchema = joi.object({
    daysRented: joi.string(),
    customerId: joi.number(),
    gameId:joi.number()
});