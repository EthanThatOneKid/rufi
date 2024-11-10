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

def drop_all_tables():
    connection = get_singlestore_connection()
    if not connection:
        print("Failed to establish a connection to SingleStore.")
        return

    try:
        with connection.cursor() as cursor:
            # Drop each table if it exists
            tables = ["transactions", "supported_charities", "supported_crypto", "user_pref_charity", "user_pref_crypto", "user_table"]
            for table in tables:
                query = f"DROP TABLE IF EXISTS {table};"
                cursor.execute(query)
                print(f"Table '{table}' dropped successfully.")

        connection.commit()
        print("All tables dropped successfully.")
    except Exception as e:
        print(f"Error dropping tables in SingleStore: {e}")
    finally:
        connection.close()

# Run to drop all tables
drop_all_tables()
