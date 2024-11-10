import { NextResponse ,NextRequest} from 'next/server'
import { getSingleStoreConnection } from '../../lib/db';

export async function POST(request: NextRequest){
    const { searchParams } = new URL(request.url);

  // Extract specific query parameters
  const name = searchParams.get('name');
  const category = searchParams.get('category');
  const url = searchParams.get('url');
  const description = searchParams.get('description');

    if(category== "charity"){
        const connection = await getSingleStoreConnection();
        if (!connection) {
            throw new Error('Failed to establish database connection');
        }
    
        const [result]: any = await connection.execute(
        'INSERT INTO supported_charities (charity_name, url, category, description) VALUES (?, ?, ?, ?)',
        [name, url, category,description]
      )
      return NextResponse.json({ message: 'charity entity added successfully' }, { status: 201 })
    }
    
    if(category== "crypto"){
        const connection = await getSingleStoreConnection();
        if (!connection) {
            throw new Error('Failed to establish database connection');
        }
    
        const [result]: any = await connection.execute(
        'INSERT INTO supported_crypto (crypto_name, url, category, description) VALUES (?, ?, ?, ?)',
        [name, url, category,description]
      )
      return NextResponse.json({ message: 'crypto entity added successfully' }, { status: 201 })
    }

    return NextResponse.json({ error: 'Invalid source' }, { status: 400 })
    
}

export async function GET(request: NextRequest){
    const connection = await getSingleStoreConnection();
    if (!connection) {
        throw new Error('Failed to establish database connection');
    }
     // Execute the first query
     const [scr]:any = await connection.query('SELECT * FROM supported_crypto');
    
     // Execute the second query
     const [sch]:any = await connection.query('SELECT * FROM supported_charities');
     const combinedData = [...scr, ...sch];
    return NextResponse.json(combinedData)
}