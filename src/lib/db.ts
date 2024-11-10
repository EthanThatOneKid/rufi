import { createConnection, Connection } from 'mysql2/promise';

export async function getSingleStoreConnection(): Promise<Connection | null> {
    try {
        const connection = await createConnection({
            host: process.env.DB_HOST || 'test',
            port: Number(process.env.DB_PORT) || 3306,
            user: process.env.DB_USER|| 'test',
            password: process.env.DB_PASSWORD|| 'test',
            database: process.env.DB_NAME|| 'test',
        });
        console.log('Connected to SingleStore successfully.');
        console.log("Hi da")
        return connection;
    } catch (error) {
        console.error(`Error connecting to SingleStore: ${error}`);
        return null;
    }
}