import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import config from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../User/user.model';
import AppError from '../../errors/AppError';
// import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req?.body?.email });
  console.log('user', user);
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  /* // Set cookies using headers
  res.setHeader('Set-Cookie', [
    `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict`, // 15 minutes
    `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict`, // 7 days
  ]); */

  /*   // Set accessToken as HTTP-only cookie
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production', // Send only over HTTPS in production
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days expiration
  });

  // Optionally set refreshToken as a cookie if needed
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days expiration
  }); */

  const decoded = jwt.verify(
    // tokenSplit[1],
    accessToken,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { email: decodedEmail } = decoded;

  if (user?.email !== decodedEmail) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Mis Information');
  }

  res.cookie('accessToken', accessToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully!',
    token: accessToken,
    data: {
      accessToken,
      refreshToken,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  });
});
const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  refreshToken,
  registerUser,
};
