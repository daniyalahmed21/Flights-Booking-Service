export const sendSuccess = (res, data = null, message = "Success", statusCode = 200) => {
    res.status(statusCode).json({
      status: true,
      data,
      message,
      error: { explanation: [] },
    });
  };
  