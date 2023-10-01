const notFound = (_, res) => {
  return res
    .status(404)
    .json({ statusCode: 404, message: "Route Does'nt Exist", data: null });
};
module.exports = notFound;
