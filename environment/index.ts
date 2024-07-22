import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

export const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT, 10)
  : 3000;

// * POSTGRES
export const POSTGRES_HOST: string = process.env.POSTGRES_HOST || 'localhost';
export const POSTGRES_PORT: number = process.env.POSTGRES_PORT
  ? parseInt(process.env.POSTGRES_PORT, 10)
  : 5436;
export const POSTGRES_USER: string = process.env.POSTGRES_USER || 'postgres';
export const POSTGRES_PASSWORD: string =
  process.env.POSTGRES_PASSWORD || 'postgres';
export const POSTGRES_DB: string = process.env.POSTGRES_DB || 'postgres';
export const DB_LOGGING: boolean = process.env.DB_LOGGING === 'true' || false;
