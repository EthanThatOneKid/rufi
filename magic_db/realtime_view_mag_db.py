import time
import pandas as pd
import singlestoredb as s2

# Function to connect to SingleStore
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

# Function to fetch and display data from a specified table
def fetch_table_data(table_name, interval=5):
    connection = get_singlestore_connection()
    if not connection:
        print("Failed to establish a connection to SingleStore.")
        return

    try:
        while True:
            # Query to get the latest data from the table
            query = f"SELECT * FROM {table_name} ORDER BY timestamp;"  # Adjust the LIMIT as needed
            df = pd.read_sql(query, connection)

            # Clear the console (works in most environments)
            print("\033c", end="")  # For Linux and MacOS; use `cls` for Windows

            print(f"Latest data from '{table_name}':")
            print(df)

            # Wait for the specified interval before refreshing
            time.sleep(interval)

    except Exception as e:
        print(f"Error fetching data from table '{table_name}': {e}")
    finally:
        connection.close()

# Specify the table to view and the refresh interval (in seconds)
table_name = "transactions"  # Replace with your actual table name
refresh_interval = 5  # Set the refresh interval in seconds

# Start fetching and displaying data
fetch_table_data(table_name, interval=refresh_interval)
