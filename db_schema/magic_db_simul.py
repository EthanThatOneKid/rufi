import pandas as pd
import numpy as np
import random
import time
import uuid
import singlestoredb as s2
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timedelta

# List of possible banks, products, and users
banks = ['Bank of America', 'Chase', 'Wells Fargo', 'Citi', 'Capital One']
products = ['Electronics', 'Furniture', 'Clothing', 'Groceries', 'Books']
users = ['alice', 'bob', 'carol', 'dave', 'eve']  # Hardcoded usernames

# Generate random prices as decimal values in the range $10.00 to $1000.00
prices = [round(random.uniform(10, 1000), 2) for _ in range(100)]

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

# Function to store a chunk of transaction data into the database
def store_transaction_data_chunk(chunk):
    connection = get_singlestore_connection()
    if not connection:
        print("Failed to establish a connection to SingleStore.")
        return

    try:
        with connection.cursor() as cursor:
            query = """
            INSERT INTO transactions (transaction_id, timestamp, bank, product, price, username) 
            VALUES (%s, %s, %s, %s, %s, %s)
            """
            for index, row in chunk.iterrows():
                formatted_timestamp = row['timestamp'].strftime('%Y-%m-%d %H:%M:%S')
                cursor.execute(query, (row['transaction_id'], formatted_timestamp, row['bank'], row['product'], row['price'], row['username']))
        connection.commit()
        print("Data chunk successfully stored in SingleStore.")
    except Exception as e:
        print(f"Error storing data in SingleStore: {e}")
    finally:
        connection.close()

# Function to generate a batch of transactional data within a specified interval
def generate_transaction_data(batch_size, interval_start, interval_end):
    transaction_data = []
    for _ in range(batch_size):
        transaction_id = str(uuid.uuid4())  # Generate a unique UUID for each transaction
        timestamp = interval_start + timedelta(seconds=random.uniform(0, (interval_end - interval_start).total_seconds()))
        bank = random.choice(banks)
        product = random.choice(products)
        price = random.choice(prices)
        username = random.choice(users)  # Select a random username

        transaction_data.append([transaction_id, timestamp, bank, product, price, username])

    # Create a DataFrame
    return pd.DataFrame(transaction_data, columns=['transaction_id', 'timestamp', 'bank', 'product', 'price', 'username'])

# Infinite loop to continuously generate and insert data at user-defined intervals
def continuously_update_database(time_frame, min_batch_size=5, max_batch_size=10):
    current_time = datetime.now()  # Initialize the start time
    while True:
        # Calculate the start and end time of the current interval
        interval_start = current_time
        interval_end = interval_start + timedelta(seconds=time_frame)

        # Generate a random batch size
        batch_size = random.randint(min_batch_size, max_batch_size)
        df_transactions = generate_transaction_data(batch_size, interval_start, interval_end)

        # Process and store the generated data
        process_transactions_in_threads(df_transactions, num_threads=2)

        # Wait for the specified time frame before generating the next batch
        print(f"Sleeping for {time_frame} seconds before inserting the next batch...")
        time.sleep(time_frame)

        # Update current_time to the end of this interval for the next batch
        current_time = interval_end

# Function to split the DataFrame into chunks and process them with threads
def process_transactions_in_threads(df, num_threads=2):
    df_split = np.array_split(df, num_threads)
    with ThreadPoolExecutor(max_workers=num_threads) as executor:
        futures = [executor.submit(store_transaction_data_chunk, chunk) for chunk in df_split]
        for future in futures:
            future.result()

# Get user input for the time interval (in seconds)
time_frame = float(input("Enter the time interval between each batch (in seconds): "))

# Start continuously updating the database
continuously_update_database(time_frame)

# Uncomment and run to ensure table exists before data insertion
# def create_transactions_table():
#     connection = get_singlestore_connection()  # Use the connection function you already defined
#     if not connection:
#         print("Failed to establish a connection to SingleStore.")
#         return

#     try:
#         with connection.cursor() as cursor:
#             # Define the CREATE TABLE SQL command with username column
#             query = """
#             CREATE TABLE IF NOT EXISTS transactions (
#                 transaction_id VARCHAR(36) PRIMARY KEY,
#                 timestamp DATETIME NOT NULL,
#                 bank VARCHAR(255),
#                 product VARCHAR(255),
#                 price DECIMAL(10, 2),
#                 username VARCHAR(50)
#             );
#             """
#             cursor.execute(query)
#         connection.commit()
#         print("Table 'transactions' created successfully with 'username' column.")
#     except Exception as e:
#         print(f"Error creating table in SingleStore: {e}")
#     finally:
#         connection.close()

# create_transactions_table()  # Ensure table exists before data insertion
