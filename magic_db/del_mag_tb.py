import singlestoredb as s2

# Function to connect to SingleStore
def get_singlestore_connection():
    try:
        connection = s2.connect(
            host='svc-329595bc-ac49-4e79-8707-3f0fe65235b3-dml.aws-oregon-3.svc.singlestore.com',
            port=3306,
            user='admin',
            password='K4mX6ueujc4IFYWKd9yixQU1X5GEYize',
            database='magic_db'  # Replace with your actual database name
        )
        return connection
    except Exception as e:
        print(f"Error connecting to SingleStore: {e}")
        return None

# Function to delete all data from a specified table
def delete_all_data_from_table(table_name):
    connection = get_singlestore_connection()
    if not connection:
        print("Failed to establish a connection to SingleStore.")
        return

    try:
        with connection.cursor() as cursor:
            # SQL command to delete all data from the specified table
            query = f"DELETE FROM {table_name};"
            cursor.execute(query)
        connection.commit()
        print(f"All data from table '{table_name}' has been deleted successfully.")
    except Exception as e:
        print(f"Error deleting data from table '{table_name}': {e}")
    finally:
        connection.close()

# Specify the table you want to clear
table_name = "transactions"  # Replace with your actual table name

# Run the function to delete all data
delete_all_data_from_table(table_name)


# import singlestoredb as s2

# # Function to connect to SingleStore
# def get_singlestore_connection():
#     try:
#         connection = s2.connect(
#             host='svc-329595bc-ac49-4e79-8707-3f0fe65235b3-dml.aws-oregon-3.svc.singlestore.com',
#             port=3306,
#             user='admin',
#             password='K4mX6ueujc4IFYWKd9yixQU1X5GEYize',
#             database='magic_db'  # Replace with your actual database name
#         )
#         return connection
#     except Exception as e:
#         print(f"Error connecting to SingleStore: {e}")
#         return None

# # Function to add the 'username' column to the 'transactions' table
# def add_username_column():
#     connection = get_singlestore_connection()
#     if not connection:
#         print("Failed to establish a connection to SingleStore.")
#         return

#     try:
#         with connection.cursor() as cursor:
#             # SQL command to add a new 'username' column
#             query = "ALTER TABLE transactions ADD COLUMN username VARCHAR(50);"
#             cursor.execute(query)
#         connection.commit()
#         print("Column 'username' added successfully to the 'transactions' table.")
#     except Exception as e:
#         print(f"Error modifying table in SingleStore: {e}")
#     finally:
#         connection.close()

# # Run the function to add the new column
# add_username_column()
