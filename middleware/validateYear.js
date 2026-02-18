// Exercise 2: Input validation middleware
module.exports = function validateYear(req, res, next) {
  const { year } = req.body;

  if (year !== undefined) {
    if (!Number.isInteger(year)) {
      return res.status(400).json({ message: 'Year must be a valid integer' });
    }

    const currentYear = new Date().getFullYear();
    if (year < 1000 || year > currentYear + 1) {
      return res.status(400).json({
        message: `Year must be between 1000 and ${currentYear + 1}`
      });
    }
  }

  next();
};