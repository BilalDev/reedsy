import * as Joi from "joi";

const BookReq = Joi.object().keys({
    bookId: Joi.string().required(),
    state: Joi.string().valid('pending', 'finished'),
    created_at: Joi.date(),
    updated_at: Joi.date(),
    processing_time: Joi.number()
});

export const ExportReq = BookReq.keys({
    type: Joi.string().valid('epub', 'pdf').required(),
    url: Joi.string().uri().required()
});

export const ImportReq = BookReq.keys({
    type: Joi.string().valid('word', 'pdf', 'wattpad', 'evernote')
});
