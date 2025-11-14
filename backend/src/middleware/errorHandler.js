// backend/src/middleware/errorHandler.js

// 404
export const notFound = (req, res, next) => {
  const error = new Error(`Không tìm thấy route: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Error handler chung
export const errorHandler = (err, req, res, next) => {
  console.error("🔥 Lỗi:", err);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  res.json({
    message: err.message || "Có lỗi xảy ra",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};
