import { Request, Response, NextFunction } from "express";

export const exceptionFilter = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.message === "Duplicate Email") {
    return res.status(400).json({
      statusCode: 400,
      errorMessage: "Пользователь с таким email уже существует",
    });
  }

  if (err.message === "Duplicate phone") {
    return res.status(400).json({
      statusCode: 400,
      errorMessage: "Пользователь с таким номером уже существует",
    });
  }

  return res.status(500).json({
    statusCode: 500,
    errorMessage: "Произошла ошибка на стороне сервера",
  });
};
