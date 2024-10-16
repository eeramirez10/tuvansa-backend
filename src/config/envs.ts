import 'dotenv/config'
import { get } from 'env-var'

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  NODE_ENV: get('NODE_ENV').asString(),
  MONGO_DB_URI: get('MONGO_DB_URI').required().asString(),
  MONGO_DB_URI_TEST: get('MONGO_DB_URI_TEST').required().asString(),
  MONGO_DB_URI_DEV: get('MONGO_DB_URI_DEV').required().asString(),
  SEED: get('SEED').required().asString(),
  USERNAME_TO_TESTING: get('USERNAME_TO_TESTING').required().asString(),
  PASSWORD_TO_TESTING: get('PASSWORD_TO_TESTING').required().asString(),
  MYSQL_HOST: get('MYSQL_HOST').required().asString(),
  MYSQL_USER: get('MYSQL_USER').required().asString(),
  MYSQL_PASSWORD: get('MYSQL_PASSWORD').required().asString(),
  MYSQL_DATABASE: get('MYSQL_DATABASE').required().asString(),
  PATH_CERT: get('PATH_CERT').asString(),
  PRIVKEY: get('PRIVKEY').asString(),
  CERT: get('CERT').asString(),
  CHAIN: get('CHAIN').asString(),
}