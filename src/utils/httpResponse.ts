import type { Response } from "express";

const sucess = (res: Response, message: string = "Sucess", status: number = 200) => {
  res.status(status).json({
    error: false,
    status: status,
    message: message,
  });
};

const error = (res: Response, message: string = "Internal server error", status: number = 500) => {
  res.status(status).json({
    error: true,
    status: status,
    message: message,
  });
};

export default { sucess, error };
