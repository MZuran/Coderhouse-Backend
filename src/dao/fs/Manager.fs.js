import fs from "fs";
import crypto from "crypto";

class FileManager {
  constructor(filePath) {
    this.path = filePath;
    this.init();
  }

  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
    } 
  }

  async create(data, Constructor) {
    try {
      const itemList = await this.read();
      const assignedId = crypto.randomBytes(12).toString("hex");

      if (data instanceof Constructor || this.hasValidProps(data, Constructor)) {
        itemList.push({ ...data, id: assignedId });
        this.writeToFile(itemList);
        console.log("Item successfully added to the list");
        return { ...data, id: assignedId };
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      throw error;
    }
  }

  async read(filter = {}) {
    try {
      let data = await fs.promises.readFile(this.path, "utf-8");
      data = JSON.parse(data);

      // Apply filter if provided
      const filterKeys = Object.keys(filter);
      if (filterKeys.length > 0) {
        data = data.filter(item => 
          filterKeys.every(key => item[key] === filter[key])
        );
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const itemList = await this.read();
      const filteredItem = itemList.find(item => item.id === id);

      if (!filteredItem) {
        console.error("Item not found");
        return null;
      }

      return filteredItem;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      let itemList = await this.read();
      const itemIndex = itemList.findIndex(item => item.id === id);

      if (itemIndex === -1) {
        throw new Error("Item not found");
      }

      itemList[itemIndex] = { ...itemList[itemIndex], ...data };
      this.writeToFile(itemList);

      return itemList[itemIndex];
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      let itemList = await this.read();
      itemList = itemList.filter(item => item.id !== id);
      this.writeToFile(itemList);
    } catch (error) {
      throw error;
    }
  }

  writeToFile(data) {
    const parsedData = JSON.stringify(data, null, 2);
    fs.writeFileSync(this.path, parsedData);
  }

  hasValidProps(data, Constructor) {
    const sampleInstance = new Constructor();
    const requiredProps = Object.keys(sampleInstance);
    return requiredProps.every(prop => prop in data && data[prop]);
  }
}

export default FileManager;
