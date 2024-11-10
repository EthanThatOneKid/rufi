import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { getSingleStoreConnection } from '../../../lib/db';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const connection = await getSingleStoreConnection();
    if (!connection) {
      throw new Error('Failed to establish database connection');
    }

    // Query to select all rows from the signals table
    const [rows]: any = await connection.execute('SELECT * FROM signals');

    // Close the connection after the query
    await connection.end();

    // Respond with the rows in JSON format
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
