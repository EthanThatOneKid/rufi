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

# Ensure the transactions table exists
def create_transactions_table():
    connection = get_singlestore_connection()
    if not connection:
        print("Failed to establish a connection to SingleStore.")
        return

    try:
        with connection.cursor() as cursor:
            # Define the CREATE TABLE SQL command with username column
            query = """
            CREATE TABLE IF NOT EXISTS transactions (
                transaction_id VARCHAR(36) PRIMARY KEY,
                timestamp DATETIME NOT NULL,
                bank VARCHAR(255),
                product VARCHAR(255),
                price DECIMAL(10, 2),
                username VARCHAR(50)
            );
            """
            cursor.execute(query)
        connection.commit()
        print("Table 'transactions' created successfully with 'username' column.")
    except Exception as e:
        print(f"Error creating table in SingleStore: {e}")
    finally:
        connection.close()

# Ensure additional tables exist
def create_additional_tables():
    connection = get_singlestore_connection()
    if not connection:
        print("Failed to establish a connection to SingleStore.")
        return

    try:
        with connection.cursor() as cursor:
            # Create supported_charities table if it doesn't exist
            query_charities = """
            CREATE TABLE IF NOT EXISTS supported_charities (
                charity_ID VARCHAR(36) PRIMARY KEY,
                charity_name VARCHAR(255) NOT NULL
            );
            """
            cursor.execute(query_charities)

            # Create supported_crypto table if it doesn't exist
            query_crypto = """
            CREATE TABLE IF NOT EXISTS supported_crypto (
                crypto_ID VARCHAR(36) PRIMARY KEY,
                crypto_name VARCHAR(255) NOT NULL,
                timestamp_for_invest DATETIME
            );
            """
            cursor.execute(query_crypto)

            # Create user_pref_charity table if it doesn't exist (without foreign key constraint)
            query_user_pref_charity = """
            CREATE TABLE IF NOT EXISTS user_pref_charity (
                username VARCHAR(50),
                charity_id VARCHAR(36),
                PRIMARY KEY (username, charity_id)
            );
            """
            cursor.execute(query_user_pref_charity)

            # Create user_pref_crypto table if it doesn't exist (without foreign key constraint)
            query_user_pref_crypto = """
            CREATE TABLE IF NOT EXISTS user_pref_crypto (
                username VARCHAR(50),
                crypto_id VARCHAR(36),
                PRIMARY KEY (username, crypto_id)
            );
            """
            cursor.execute(query_user_pref_crypto)

            # Create user_table if it doesn't exist without additional unique constraint on email
            query_user_table = """
            CREATE TABLE IF NOT EXISTS user_table (
                username VARCHAR(50) NOT NULL,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                card_no VARCHAR(16),
                CVV VARCHAR(4),
                card_expiry DATE,
                bank_account_no VARCHAR(20),
                crypto_percentage DECIMAL(5, 2),
                charity_percentage DECIMAL(5, 2)
            );
            """
            cursor.execute(query_user_table)

        connection.commit()
        print("Tables 'supported_charities', 'supported_crypto', 'user_pref_charity', 'user_pref_crypto', and 'user_table' created successfully if they didn't exist.")
    except Exception as e:
        print(f"Error creating tables in SingleStore: {e}")
    finally:
        connection.close()

# Run to ensure all necessary tables exist before data insertion
create_transactions_table()  # Ensure 'transactions' table exists
create_additional_tables()   # Ensure other tables exist
