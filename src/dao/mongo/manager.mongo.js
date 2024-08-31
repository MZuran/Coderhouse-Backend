class Manager {
  constructor(Model) {
    this.Model = Model;
  }

  async create(data) {
    try {
      const one = await this.Model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async read(filter) {
    if (!filter) {filter = {}} 
    try {
      const all = await this.Model.find(filter);
      return all;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const one = await this.Model.findOne({ _id: id });
      return one;
    } catch (error) {
      throw error;
    }
  }

  /*
    You use this one by passing to filter an object that has one key and one value
    For example {email: "test@hotmail.com"}
    In routesApi, you can do something like
    const { email } = req.params;
    And it will work
    */
  async readOneFilter(filter) {
    try {
      const one = await this.Model.findOne({ filter });
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const one = await this.Model.findByIdAndUpdate(id, data, { new: true });
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = await this.Model.findByIdAndDelete(id);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async paginate(filterObj = {}, paginationObj = { limit: 4, page: 1 }) {
    try {
      const all = await this.Model.paginate(filterObj, paginationObj)
      console.log(all)
      return all
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email) {
    try {
      const one = await this.Model.findOne({ email });
      return one;
    } catch (error) {
      throw error;
    }
  }

  async readByVerifyCode(verifyCode) {
    try {
      const one = await this.Model.findOne({ verifyCode });
      return one;
    } catch (error) {
      throw error;
    }
  }
}

export default Manager;
