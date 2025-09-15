export default class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async get(modelId) {
    return await this.model.findByPk(modelId);
  }

  async getAll() {
    return await this.model.findAll();
  }

  async create(data) {
    return await this.model.create(data);
  }

  async update(modelId, data) {
    return await this.model.update(data, {
      where: { id: modelId }
    });
  }

  async destroy(modelId) {
    return await this.model.destroy({
      where: { id: modelId }
    });
  }
}
