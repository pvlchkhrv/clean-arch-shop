import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';
import * as schema from './schema/index.js';

export const DRIZZLE = Symbol('DRIZZLE');

export type DrizzleDB = PostgresJsDatabase<typeof schema>;

export const DrizzleProvider: Provider = {
  provide: DRIZZLE,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<DrizzleDB> => {
    const connectionString = configService.getOrThrow('POSTGRES_DB_URL');
    const client = postgres(connectionString);

    const db = drizzle(client, { schema });
    await db.execute(sql`SELECT 1`);
    return db;
  }
}