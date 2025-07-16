import {
  Attributes,
  CreateOptions,
  CreationAttributes,
  FindOptions,
  Model,
  ModelStatic,
  UpdateOptions,
  WhereOptions,
} from "sequelize";
import { MakeNullishOptional } from "sequelize/types/utils";

export class BaseRepository<T extends Model> {
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

  create(
    data: MakeNullishOptional<CreationAttributes<T>>,
    options?: CreateOptions<T>
  ): Promise<T> {
    return this.model.create(data, options);
  }

  update(
    data: Partial<T>,
    options: Omit<UpdateOptions<Attributes<T>>, "returning"> & {
      returning?: boolean;
      where?: WhereOptions<T>;
    }
  ): Promise<[count: number]> {
    return this.model.update(data, options);
  }

  destroy(options: FindOptions<T>): Promise<number> {
    return this.model.destroy(options);
  }
}
