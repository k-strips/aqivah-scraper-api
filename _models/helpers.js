
function checkForId(path, id) {
  if (!id) throw new Error(`${path} : No id passed`);
}

module.exports = {
  checkForId,
};