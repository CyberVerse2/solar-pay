import { catchAsync } from '../utils/errorHandler.js';
import AppError from '../utils/appError.js';
import { decodeToken } from '../utils/helper.js';
import { UserModel } from '../../modules/schemas/user.schema.js';
import { UserTransformer } from '../transformers/index.js';

export const authenticate = catchAsync(async (req, res, next) => {
  const reqHeader = req.headers;

  if (!reqHeader.authorization) {
    throw new AppError('Unauthorized', 401);
  }

  const token = reqHeader.authorization.split(' ')[1];

  const { email } = decodeToken(token);

  const user = await UserModel.findOne({ email });

  req.user = UserTransformer(user);

  next();
});
