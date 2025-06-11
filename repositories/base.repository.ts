import { FindOptions, Model, ModelStatic } from "sequelize";

export abstract class BaseRepository<T extends Model> {
  protected model: ModelStatic<T>;
  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  findAll(options?: FindOptions<T>): Promise<T[]> {
    return this.model.findAll(options);
  }

  findOne(options?: FindOptions<T>): Promise<T | null> {
    return this.model.findOne(options);
  }
}
