import {
  DB_LOGGING,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from '@environments';
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NamingStrategy } from 'database/typeorm';
import { join } from 'path';

export default registerAs<TypeOrmModuleOptions>('database', () => ({
  type: 'postgres',
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  logging: DB_LOGGING,
  autoLoadEntities: true,
  keepConnectionAlive: true,
  entities: [join(__dirname, '../../**/*.entity{.ts,.js}')],
  namingStrategy: new NamingStrategy(),
}));
