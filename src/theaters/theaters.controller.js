const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const methodName = "list";
  req.log.debug({ __filename, methodName });

  const data = await service.list();
  res.json({ data });
  req.log.trace({ __filename, methodName, return: true, data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
