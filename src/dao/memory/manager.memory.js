const crypto = require("crypto");

// Base Manager class
class ManagerMemory {
    constructor() {
      this.items = [];
    }
  
    create(data) {
      const assignedId = crypto.randomBytes(12).toString("hex");
      if (this.validateData(data)) {
        this.items.push({ ...data, id: assignedId });
        console.log(`${this.constructor.name} successfully added to the list`);
      } else {
        console.error("Wrong format");
      }
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
  
    readOne(id) {
      const parsedList = this.items.filter(item => item.id === id);
      if (parsedList.length > 1) {
        console.error("ERROR: REPEATED ID");
      }
      return parsedList[0];
    }
  
    destroy(id) {
      this.items = this.items.filter(item => item.id !== id);
      return this.items;
    }
  
    validateData(data) {
      throw new Error("validateData method not implemented");
    }
  }

export default ManagerMemory