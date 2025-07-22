import { validate } from "class-validator";
import logger from "./logger";

export class Validator {
  static async validate(dto: any): Promise<string[]> {
    const errors = await validate(dto);
    if (errors.length > 0) {
      logger.log(`Validation errors: ${JSON.stringify(errors)}`);
      return errors.map((e) => Object.values(e.constraints || {}).join(", "));
    }
    return [];
  }
}
