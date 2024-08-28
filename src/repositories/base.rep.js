class BaseRepository {
    constructor(model, DTOClass) {
      this.model = model;
      this.DTOClass = DTOClass;
    }
  
    createRepository = async (data) => {
      try {
        if (this.DTOClass) {
          data = new this.DTOClass(data);
        }
        const result = await this.model.create(data);
        return result;
      } catch (error) {
        throw error;
      }
    };
  
    readRepository = async (role) => {
      try {
        const result = await this.model.read(role);
        return result;
      } catch (error) {
        throw error;
      }
    };
  
    paginateRepository = async (filter, opts) => {
      try {
        const result = await this.model.paginate(filter, opts);
        return result;
      } catch (error) {
        throw error;
      }
    };
  
    readOneRepository = async (id) => {
      try {
        const result = await this.model.readOne(id);
        return result;
      } catch (error) {
        throw error;
      }
    };
  
    updateRepository = async (id, data) => {
      try {
        const result = await this.model.update(id, data);
        return result;
      } catch (error) {
        throw error;
      }
    };
  
    destroyRepository = async (id) => {
      try {
        const result = await this.model.destroy(id);
        return result;
      } catch (error) {
        throw error;
      }
    };
  }
  
  export default BaseRepository;