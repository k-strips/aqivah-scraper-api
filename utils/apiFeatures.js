class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filterAndPaginate() {
    // Filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "role"];
    excludedFields.forEach((el) => delete queryObj[el]);

    if (queryObj.required) {
      queryObj.isRequired = queryObj.required;
      delete queryObj.required;
    }

    // Pagination
    const limitNum = 20;
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || limitNum;
    const skip = (page - 1) * limit;

    this.page = page;

    this.query = this.query.findAll({
      where: queryObj,
      include: { all: true },
      offset: skip,
      limit,
    });

    return this;
  }
}
module.exports = APIFeatures;
