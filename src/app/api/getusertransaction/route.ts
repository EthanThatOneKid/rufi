import { NextResponse, NextRequest } from 'next/server';
import { getSingleStoreConnection } from '../../../lib/db';

export async function GET(req: NextRequest, res: NextResponse) {
    try {

    const { searchParams } = new URL(req.url);

        // Extract specific query parameters
    const username = searchParams.get('username');
      const connection = await getSingleStoreConnection();
      if (!connection) {
        throw new Error('Failed to establish database connection');
      }
  
      // Query to select all rows from the signals table
      const [rows]: any = await connection.execute('SELECT * FROM transactions where username = ?',[username]);
  
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
