import singlestoredb as s2

def get_singlestore_connection():
    try:
        connection = s2.connect(
            host='svc-329595bc-ac49-4e79-aa70-20e712670e83-dml.aws-oregon-3.svc.singlestore.com',
            port=3306,
            user='admin',
            password='VyGMrRsHJ1fLxTlOw5ukEnXGxnXXcFEh',
            database='magic_db'  # Replace with your actual database name
        )
        return connection
    except Exception as e:
        print(f"Error connecting to SingleStore: {e}")
        return None

def create_signals_table():
    connection = get_singlestore_connection()
    if not connection:
        print("Failed to establish a connection to SingleStore.")
        return

    try:
        with connection.cursor() as cursor:
            # Define the CREATE TABLE SQL command for signals table with `signal` column escaped
            query = """
            CREATE TABLE IF NOT EXISTS signals (
                id INT AUTO_INCREMENT PRIMARY KEY,
                stock VARCHAR(10) NOT NULL,
                `signal` VARCHAR(10) NOT NULL,
                algorithm VARCHAR(50) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            """
            cursor.execute(query)
        connection.commit()
        print("Table 'signals' created successfully.")
    except Exception as e:
        print(f"Error creating table in SingleStore: {e}")
    finally:
        connection.close()

# Run to create the 'signals' table
create_signals_table()
