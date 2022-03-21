import { plainToClass } from "class-transformer";
import { IsNumber, IsString, validateSync } from "class-validator";

class EnvironmentVariables {
  @IsString()
  JWT_SECRET: string;

  @IsNumber()
  JWT_EXPIRATION_TIME: number;
}

export const validate = (
  config: EnvironmentVariables
): EnvironmentVariables => {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
};
