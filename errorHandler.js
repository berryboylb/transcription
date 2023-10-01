
const errorHandler = (err, req, res, next) => {
  if (err instanceof Error) {
    res.status(err.statusCode).json({ msg: err.message });
  } else {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = errorHandler;
