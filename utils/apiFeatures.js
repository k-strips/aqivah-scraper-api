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

    console.log(queryObj);

    // Pagination
    const limitNum = 5;
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
