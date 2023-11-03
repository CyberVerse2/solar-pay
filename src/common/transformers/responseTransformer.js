import { ENVIRONMENT } from '../config/environment.js';

export default function ResponseTransformer(req, res, next) {
  if (res.statusCode === 200 || res.statusCode === 201) {
    const original = res.json;
    console.log(res.statusCode);
    res.json = function (body) {
      body = {
        success: body.stack ? false : true,
        statusCode: res.statusCode,
        message: body.message,
        stack: ENVIRONMENT.APP.ENV === 'local' ? body.stack : null,
        data: body.data
      };

      original.call(this, body);
    };
  }
  next();
}
