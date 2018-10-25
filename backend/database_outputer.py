# import standard Python library for SQLite
import sqlite3

# import helper Python script
import constants

# print database information (names of tables and their attributes)
def print_database_information():
	db = sqlite3.connect(constants.database)

	cursor = db.cursor()

	print('Names of Tables:')
	cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
	for row in cursor:
		print(row[0])
	print('')

	for table_name in constants.table_list:
		cursor.execute("SELECT sql FROM sqlite_master WHERE tbl_name = '" + table_name + "' AND type='table'")
		print("Attributes of '" + table_name + "' table:")
		for row in cursor:
			for attribute in row:
				print(attribute)
		print('')

	db.close()

# print the contents of the given table
def print_table(table_name):
	db = sqlite3.connect(constants.database)

	cursor = db.cursor()

	cursor.execute('SELECT * FROM ' + table_name)

	print("Data in '" + table_name + "' table:")
	row = None
	for row in cursor:
		rowStr = ''
		for attribute in row:
			rowStr += (str(attribute) + ' ')
		print(rowStr)
	if row is None:
		print('[EMPTY TABLE]')
	print('')

	db.close()

# START OF MAIN

user_input = ''
while user_input != 'q':
	print('')
	user_input = input("Enter 'i' for database information, 'd' for table data, or 'q' to quit -> ").lower()
	print('')
	if user_input == 'i':
		print_database_information()
	elif user_input == 'd':
		for table_name in constants.table_list:
			print_table(table_name)
	elif user_input == 'q':
		break
	else:
		print('Invalid input.')
print('')