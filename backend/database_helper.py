# Vineet Joshi
# This file contains helper functions for developers to access the database file.

# import standard Python library for SQLite
import sqlite3

# imports libraries for getting current Epoch time (for sample data)
import calendar
import time

# import library for generating a random integer (for sample data)
from random import randint

# import helper Python scripts
import constants as c
import database_accessor

# This function prints database information (names of tables and their attributes).
# Parameters: [none]
# Return Type: void
def print_database_information():
	db = sqlite3.connect(c.database)

	cursor = db.cursor()

	print 'Names of Tables:'
	cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
	for row in cursor:
		print '\t' + row[0]
	print ''

	for table_name in c.table_list:
		cursor.execute("SELECT sql FROM sqlite_master WHERE tbl_name = '" + table_name + "' AND type='table'")
		print "Attributes of '" + table_name + "' table:"
		for row in cursor:
			for attribute in row:
				print attribute
		print ''

	db.close()

# This function print the contents of the given table.
# Parameters: the table name of the table to print
# Return Type: void
def print_table(table_name):
	db = sqlite3.connect(c.database)

	cursor = db.cursor()

	cursor.execute('SELECT * FROM ' + table_name)

	print "Data in '" + table_name + "' table:"
	row = None
	for row in cursor:
		rowStr = ''
		for attribute in row:
			rowStr += (str(attribute) + ' ')
		print rowStr
	if row is None:
		print '[EMPTY TABLE]'
	print ''

	db.close()

# This function clears the contents of the specified table.
# Parameters: the table name of the table to clear
# Return Type: void
def clear_db(table_name):
	db = sqlite3.connect(c.database)

	cursor = db.cursor()
	cursor.execute('DELETE FROM ' + table_name)
	# the following command resets the auto-incrementing primary key (id):
	cursor.execute("DELETE FROM sqlite_sequence WHERE name='" + table_name + "'")
	# the following command clears unused space (recommended)
	cursor.execute('VACUUM')

	db.close()

	print "The table '" + table_name + "' has been cleared."

# This function fills the specified table with a specified number of sample data fields.
# Parameters: the table name of the table to fill, and the number of data fields to fill
# Return Type: void
def fill_db(table_name, num_data):
	for counter in range(1, num_data + 1):
		data = c.sample_data[table_name].copy()
		# removes the 'id' key because it would be null before insertion
		data.pop('id', None)
		
		for key in data:
			value = data[key]
			if type(value) is str:
				data[key] = value + str(counter)
			elif type(value) is int:
				if key == 'created':
					data[key] = int(calendar.timegm(time.gmtime()))
				else:
					data[key] = randint(1, 1000)
			elif type(value) is list:
				sample_list = []
				for i in range(1, counter):
					sample_list.append(key + str(i))
				data[key] = sample_list

		database_accessor.insert_into_db(data, table_name)

	print "The table '" + table_name + "' has been filled with " + str(num_data) + (' entry' if (num_data == 1) else ' entries') + " of sample data."

# This is a helper function used by 'clear_or_fill_prompt' to check if the given index is valid.
# Parameters: the index to check the validity of
# Return Type: boolean indicating whether the index is valid or not
def is_valid(index):
	return (index >= 0 and index < len(c.table_list))

# This is a helper function used by code in main to prompt user for clearing or filling a table.
# Parameters: the intent of the user (either 'clear' or 'fill')
# Return Type: void
def clear_or_fill_prompt(intent):
	database_number = -1
	while is_valid(database_number) == False:
		print 'List of Tables:'
		for counter, table_name in enumerate(c.table_list):
			print '\t(' + str(counter + 1) + ') ' + table_name
		
		user_input = raw_input('Enter the number of the table to ' + intent + ' -> ')
		if user_input.isdigit():
			user_number = int(user_input) - 1
			if is_valid(user_number):
				database_number = user_number
				database_name = c.table_list[database_number]
			else:
				print '\nInvalid number.\n'
		else:
			print '\nInvalid input.\n'
	
	if intent == 'clear':
		print '\n'
		clear_db(database_name)
	else:
		num_data = -1
		while num_data < 1:
			user_input = raw_input('Enter the number of sample data to insert -> ')
			if user_input.isdigit():
				num_data = int(user_input)
				if num_data < 1:
					print 'Invalid number.'
			else:
				print 'Invalid input.'
		
		print '\n'
		fill_db(database_name, num_data)
	print ''

# START OF MAIN

user_input = ''
while user_input != 'q':
	print '\n\n\nHere are the possible input commands:'
	print "\t'i': print database information"
	print "\t'd': print table data"
	print "\t'c': clear a table"
	print "\t'f': fill a table"
	print "\t'q': quit"
	print ''
	user_input = raw_input("Enter an input command -> ").lower()

	if user_input == 'i':
		print '\n\n\n'
		print_database_information()
	elif user_input == 'd':
		print '\n\n\n'
		for table_name in c.table_list:
			print_table(table_name)
	elif user_input == 'c' or user_input == 'f':
		print '\n\n\n'
		intent = ('clear' if (user_input == 'c') else 'fill')
		clear_or_fill_prompt(intent)
	elif user_input != 'q':
		print 'Invalid input.'
print '\n\n\n'