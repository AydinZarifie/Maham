class APIFeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}

	filter() {
		const queryObj = { ...this.queryString };
		const exlcludedFields = ['limit', 'sort', 'page', 'fields'];
		exlcludedFields.forEach((el) => {
			delete queryObj[el];
		});
		let queryStr = JSON.stringify(queryObj);
		// if dosen't match any if parameters then it wont replace anything
		queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

		this.query = this.query.find(JSON.parse(queryStr));

		return this;
		// returns the entire object
	}

	sort() {
		if (this.queryString.sort) {
			// sort ('price' 'duration')
			const sortBy = this.queryString.sort.split(',').join(' ');
			this.query = this.query.sort(sortBy);
		} else {
			this.query = this.query.sort('-createdAt');
		}
		return this;
	}

	fieldLimit() {
		if (this.queryString.fields) {
			const fields = this.queryString.fields.split(',').join(' ');
			this.query = this.query.select(fields);
		} else {
			this.query = this.query.select('-__v');
		}
		return this;
	}

	paging() {
		const page = this.query.page * 1 || 1;
		const limit = this.query.limit * 1;
		const skip = (page - 1) * limit;
		this.query = this.query.skip(skip).limit(limit);

		return this;
	}
}

module.exports = APIFeatures;
