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
        cron.schedule('* * * * *', async () => {
            const [unprocessed_rows]: any = await connection.execute(
                'SELECT username,price FROM transactions where processed = ?',
                [0]
              );
        
        for(let k=0;k<unprocessed_rows.length;k++){
            console.log("Checkpoint 1",unprocessed_rows[k])
            const amount = Math.ceil(unprocessed_rows[k].price) - unprocessed_rows[k].price
            const [rows]: any = await connection.execute(
                'SELECT username,charity_percentage,crypto_percentage FROM user_table where username = ?',
                [unprocessed_rows[k].username]
              );
            for(let i=0;i<rows.length;i++){
                console.log("Checkpoint 2",rows[i])
                if(rows[i].charity_percentage > 0){
                    const char_per = (amount * rows[i].charity_percentage)/100
                    const [usersCharityRows]: any = await connection.execute(
                        'SELECT charity_id FROM user_pref_charity where username = ?',
                        [rows[i].username]
                    );
                    const numofFChar = char_per/usersCharityRows.length
                    for(let j=0;j<usersCharityRows.length;j++) {
                            const [result]: any = await connection.execute(
                                'INSERT INTO user_investments (username, timestamp, category, amount) VALUES (?, ?, ?, ?)',
                                [rows[i].username, new Date(), "charity",numofFChar]
                              )
                            console.log('Database result:', result);
                        console.log("What's up")
                    }    
                console.log("Heyllo!!!!!!!!!")                
                }
                console.log("Yooo")
                if(rows[i].crypto_percentage > 0){
                    const crypto_per = (amount * rows[i].crypto_percentage)/100
                    const [usersCryptoRows]: any = await connection.execute(
                        'SELECT crypto_id FROM user_pref_crypto where username = ?',
                        [rows[i].username]
                    );
                    const numOfCrypto = crypto_per/usersCryptoRows.length 
                    for(let j=0;j<usersCryptoRows.length;j++) {
                        const [usersCryptoNameRows]: any = await connection.execute(
                            'SELECT crypto_name FROM supported_crypto where crypto_id = ?',
                            [usersCryptoRows[j].crypto_id]
                        );

                        for(let d=0;d<usersCryptoNameRows.length;d++){
                            const [result]: any = await connection.execute(
                                'INSERT INTO user_investments (username, timestamp, category, amount) VALUES (?, ?, ?, ?)',
                                [rows[i].username, new Date(), "crypto",numOfCrypto]
                              )
                        }
                    }
                }
            }
        }

        for(let i=0;i<unprocessed_rows.length;i++){
        const [result] = await connection.query(
            'UPDATE transactions SET processed = ? WHERE username = ?',
            [1,unprocessed_rows[i].username]
          );
        }

        });
        return NextResponse.json({ message: 'Cron job set up successfully' ,status: 200});
    } catch {
        return NextResponse.json({ message: 'Method not allowed' });
    }
}
