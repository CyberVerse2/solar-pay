import { FormError, NotFoundError } from '../../common/utils/appError.js';
import { createNewUser, loginUser } from './auth.services.js';
import { catchAsync } from '../../common/utils/errorHandler.js';

export const httpCreateNewUser = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name && !email && !password ) {
    throw new FormError('All fields are required');
  }
  const token = await createNewUser(name, email, password);
  return res
    .status(200)
    .json({ message: 'User created successfully', data: token });
});

export const httpLoginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    throw new FormError('name and email required');
  }
  const existingUser = await loginUser(email, password);
  return res
    .status(200)
    .json({ message: 'Login Successful', data: existingUser });
});

