import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  token?: JwtPayload | unknown | string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    token: data.token,
    data: data.data,
    meta: data.meta && data.meta,
  });
};

export default sendResponse;
