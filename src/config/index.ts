import AuthConfig from './auth.config';
import DatabaseConfig from './db.config';
import LogConfig from './log.config';

const configurations = [DatabaseConfig, LogConfig, AuthConfig];

export { AuthConfig, DatabaseConfig, LogConfig, configurations };
