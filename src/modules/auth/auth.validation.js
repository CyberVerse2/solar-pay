import Joi from "joi";

const authSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] }
  }),
  password: Joi.string().min(8).required()
}).options({ abortEarly: false });

export default authSchema;
