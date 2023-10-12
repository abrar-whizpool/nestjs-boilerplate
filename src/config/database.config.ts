import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

config();

export const databaseConfigs: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    migrations: ["dist/migrations/**/*.js"],
    entities: [__dirname + '/../**/*.entity.js'],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
    logging: true
}

const dataSource = new DataSource(databaseConfigs)
export default dataSource;