import singlestoredb as s2

def get_singlestore_connection():
    try:
        connection = s2.connect(
            host='svc-329595bc-ac49-4e79-aa70-20e712670e83-dml.aws-oregon-3.svc.singlestore.com',
            port=3306,
            user='admin',
            password='VyGMrRsHJ1fLxTlOw5ukEnXGxnXXcFEh',
            database='magic_db',  # Replace with your actual database name
        )
        return connection
    except Exception as e:
        print(f"Error connecting to SingleStore: {e}")
        return None

# Create transactions table with processed column
def create_transactions_table():
    connection = get_singlestore_connection()
    if not connection:
        print("Failed to establish a connection to SingleStore.")
        return

    try:
        with connection.cursor() as cursor:
            # Create the transactions table with a new processed column
            query = """
            CREATE TABLE IF NOT EXISTS transactions (
                transaction_id VARCHAR(36) PRIMARY KEY,
                timestamp DATETIME NOT NULL,
                bank VARCHAR(255),
                product VARCHAR(255),
                price DECIMAL(10, 2),
                username VARCHAR(50),
                processed TINYINT DEFAULT 0  -- New column with default value 0
            );
            """
            cursor.execute(query)
        connection.commit()
        print("Table 'transactions' created successfully with 'processed' column.")
    except Exception as e:
        print(f"Error creating table in SingleStore: {e}")
    finally:
        connection.close()

# Create additional tables
def create_additional_tables():
    connection = get_singlestore_connection()
    if not connection:
        print("Failed to establish a connection to SingleStore.")
        return

    try:
        with connection.cursor() as cursor:
            # Create supported_charities table
            query_charities = """
            CREATE TABLE IF NOT EXISTS supported_charities (
                charity_id INT AUTO_INCREMENT PRIMARY KEY,
                charity_name VARCHAR(255) NOT NULL,
                url VARCHAR(255),
                category VARCHAR(50),
                description TEXT
            );
            """
            cursor.execute(query_charities)

            # Create supported_crypto table
            query_crypto = """
            CREATE TABLE IF NOT EXISTS supported_crypto (
                crypto_id INT AUTO_INCREMENT PRIMARY KEY,
                crypto_name VARCHAR(255) NOT NULL,
                url VARCHAR(255),
                category VARCHAR(50),
                description TEXT
            );
            """
            cursor.execute(query_crypto)

            # Create user_pref_charity table without foreign key constraint
            query_user_pref_charity = """
            CREATE TABLE IF NOT EXISTS user_pref_charity (
                username VARCHAR(50),
                charity_id INT,
                PRIMARY KEY (username, charity_id)
            );
            """
            cursor.execute(query_user_pref_charity)

            # Create user_pref_crypto table without foreign key constraint
            query_user_pref_crypto = """
            CREATE TABLE IF NOT EXISTS user_pref_crypto (
                username VARCHAR(50),
                crypto_id INT,
                PRIMARY KEY (username, crypto_id)
            );
            """
            cursor.execute(query_user_pref_crypto)

            # Create user_table without additional unique constraint on email
            query_user_table = """
            CREATE TABLE IF NOT EXISTS user_table (
                username VARCHAR(50) NOT NULL,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                card_no VARCHAR(16),
                CVV VARCHAR(4),
                card_expiry VARCHAR(7),
                bank_account_no VARCHAR(20),
                crypto_percentage DECIMAL(5, 2),
                charity_percentage DECIMAL(5, 2),
                phone VARCHAR(15)
            );
            """
            cursor.execute(query_user_table)

            # Create user_investments table
            query_user_investments = """
            CREATE TABLE IF NOT EXISTS user_investments (
                username VARCHAR(50),
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                category VARCHAR(50),
                amount DECIMAL(10, 2),
                PRIMARY KEY (username, timestamp)
            );
            """
            cursor.execute(query_user_investments)

        connection.commit()
        print("Tables 'supported_charities', 'supported_crypto', 'user_pref_charity', 'user_pref_crypto', 'user_table', and 'user_investments' created successfully.")
    except Exception as e:
        print(f"Error creating tables in SingleStore: {e}")
    finally:
        connection.close()

# Run to ensure all necessary tables exist before data insertion
create_transactions_table()  # Ensure 'transactions' table exists
create_additional_tables()   # Ensure other tables exist
