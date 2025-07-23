import { Request, Response } from "express";
import { inject, injectable } from "inversify";

import TYPES from "../../types/DI";
import { AuthService } from "./auth.service";

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.AuthService)
    private authService: AuthService
  ) {
	}
	public signUp = async (req: Request, res: Response) => {
		
	}
}
