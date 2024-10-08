class Service {
    constructor(repository) {
      this.repository = repository;
    }
    createService = async (data) => {
      try {
        const one = await this.repository.createRepository(data);
        return one;
      } catch (error) {
        throw error;
      }
    };
    readService = async (filter) => {
      try {
        const all = await this.repository.readRepository(filter);
        return all;
      } catch (error) {
        throw error;
      }
    };

    readByEmailService = async (email) => {
      try {
        const all = await this.repository.readRepository(email);
        return all;
      } catch (error) {
        throw error;
      }
    }

    paginateService = async (filter, opts) => {
      try {
        const all = await this.repository.paginateRepository(filter, opts);
        return all;
      } catch (error) {
        throw error;
      }
    };

    readOneService = async (uid) => {
      try {
        const one = await this.repository.readOneRepository(uid);
        console.log("My one is", one, uid)
        return one;
      } catch (error) {
        throw error;
      }
    };
    updateService = async (uid, data) => {
      try {
        const one = await this.repository.updateRepository(uid, data);
        return one;
      } catch (error) {
        throw error;
      }
    };
    destroyService = async (uid) => {
      try {
        const one = await this.repository.destroyRepository(uid);
        return one;
      } catch (error) {
        throw error;
      }
    };
  }
  
  export default Service;