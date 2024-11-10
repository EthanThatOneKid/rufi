import cron from 'node-cron';
import { NextResponse } from 'next/server'
import { getSingleStoreConnection } from '../../lib/db';

export async function GET(req: Request) {
    try {
        const connection = await getSingleStoreConnection();
        if (!connection) {
            throw new Error('Failed to establish database connection'); 
        }
        // Schedule a job to run every minute for demonstration
        cron.schedule('* * * * * *', async () => {
            const [unprocessed_rows]: any = await connection.execute(
                'SELECT user_id,price FROM transactions where processed = ?',
                [0]
              );
        
        for(let k=0;k<unprocessed_rows.length;k++){
            const [rows]: any = await connection.execute(
                'SELECT user_id,charity_percentage,crypto_percentage FROM transactions where user_id = ?',
                [unprocessed_rows[k].user_id]
              );
            for(let i=0;i<rows.length;i++){
                if(rows[i].charity_percentage > 0){
                    const [usersCharityRows]: any = await connection.execute(
                        'SELECT charity_id FROM user_pref_charity where user_id = ?',
                        [rows[i].user_id]
                    );
                    for(let j=0;j<usersCharityRows.length;j++) {
                        const [usersCharityNameRows]: any = await connection.execute(
                            'SELECT charity_name FROM supported_charities where charity_ID = ?',
                            [usersCharityRows[j].charity_id]
                        );

                        for(let d=0;d<usersCharityNameRows;d++){
                            const [result]: any = await connection.execute(
                                'INSERT INTO user_investments (user_id, timestamp, source, amount) VALUES (?, ?, ?, ?)',
                                [rows[i].user_id, new Date(), usersCharityNameRows[d]]
                              )
                        }
                    }                    
                }

                if(rows[i].crypto_percentage > 0){
                    const [usersCryptoRows]: any = await connection.execute(
                        'SELECT crypto_id FROM user_pref_crypto where user_id = ?',
                        [rows[i].user_id]
                    );
                    for(let j=0;j<usersCryptoRows.length;j++) {
                        const [usersCryptoNameRows]: any = await connection.execute(
                            'SELECT crypto_name FROM supported_crypto where crypto_ID = ?',
                            [usersCryptoRows[j].charity_id]
                        );

                        for(let d=0;d<usersCryptoNameRows;d++){
                            const [result]: any = await connection.execute(
                                'INSERT INTO user_investments (user_id, timestamp, source, amount) VALUES (?, ?, ?, ?)',
                                [rows[i].user_id, new Date(), usersCryptoNameRows[d]]
                              )
                        }
                    }
                }
            }
        }

        });
        return NextResponse.json({ message: 'Cron job set up successfully' ,status: 200});
    } catch {
        return NextResponse.json({ message: 'Method not allowed' });
    }
}