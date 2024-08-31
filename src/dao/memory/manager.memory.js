import crypto from "crypto";

// Base Manager class for in-memory storage
class ManagerMemory {
  constructor() {
    this.items = [];
  }

  create(data) {
    const assignedId = crypto.randomBytes(12).toString("hex");
    const newItem = { ...data, _id: assignedId };
    this.items.push(newItem);
    return newItem;
  }

  read(filter = {}) {
    try {
      const filteredItems = this.items.filter(item =>
        Object.entries(filter).every(([key, value]) => item[key] === value)
      );
      return filteredItems;
    } catch (error) {
      throw error;
    }
  }

  readOne(_id) {
    const parsedList = this.items.filter(item => item._id === _id);
    if (parsedList.length > 1) {
      console.error("ERROR: REPEATED ID");
    }
    return parsedList[0];
  }

  paginate(filterObj = {}, paginationObj = { limit: 4, page: 1 }) {
    try {
      const filteredItems = this.items.filter(item =>
        Object.entries(filterObj).every(([key, value]) => item[key] === value)
      );
  
      const { limit, page } = paginationObj;
      const totalDocs = filteredItems.length;
      const totalPages = Math.ceil(totalDocs / limit);
      const start = (page - 1) * limit;
      const docs = filteredItems.slice(start, start + limit);
  
      return {
        docs,
        totalDocs,
        limit,
        totalPages,
        page,
        pagingCounter: start + 1,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null
      };
    } catch (error) {
      throw error;
    }
  }

  destroy(id) {
    this.items = this.items.filter(item => item._id !== id);
    return this.items;
  }

  async update(id, data) {
    try {
      const itemIndex = this.items.findIndex(item => item._id === id);
      if (itemIndex === -1) {
        throw new Error("Item not found");
      }

      // Update the item with new data
      this.items[itemIndex] = { ...this.items[itemIndex], ...data };
      return this.items[itemIndex];
    } catch (error) {
      throw error;
    }
  }

  validateData(data) {
    throw new Error("validateData method not implemented");
  }
}

export default ManagerMemory;
