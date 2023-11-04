import jwt from 'jsonwebtoken';

import { config } from 'dotenv';
config();
import UserModel from '../user/user.schema.js';
import {
  NotFoundError,
  AuthenticationError,
  DatabaseError
} from '../../common/utils/appError.js';
import { createId } from '../../common/utils/uuid.util.js';
import { ENVIRONMENT } from '../../common/config/environment.js';

async function findUser(email) {
  const existingUser = await UserModel.findOne({ email });
  return existingUser;
}

async function createNewUser(name, email, password) {
  const user = await findUser(email);
  console.log(user);
  if (user) {
    throw new AuthenticationError('User already exists');
  } else {
    const ownerId = createId();
    const newUser = new UserModel({ name, email, password });
    await newUser.save();

    const token = jwt.sign({ userId: newUser.id }, ENVIRONMENT.JWT.KEY, {
      expiresIn: '24h'
    });
    return token;
  }
}

async function loginUser(email, password) {
  console.log(email);
  const authenticatedUser = await findUser(email);
  console.log(authenticatedUser);
  if (!authenticatedUser) {
    throw new AuthenticationError(
      'User does not exist. Please register an account'
    );
  }
  if (authenticatedUser.password !== password) {
    throw new NotFoundError('Incorrect email or password');
  }
  const token = jwt.sign(
    { userId: authenticatedUser.id },
    ENVIRONMENT.JWT.KEY,
    {
      expiresIn: '24h'
    }
  );
  return token;
}

export { createNewUser, loginUser };
