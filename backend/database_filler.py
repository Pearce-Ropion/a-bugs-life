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

def is_valid(index):
	return (index >= 0 and index < len(c.table_list))

# START OF MAIN

user_input_1 = ''
while user_input_1 != 'q':
	print ''
	user_input_1 = raw_input("Enter 'c' to clear a table, 'i' to fill a table, or 'q' to quit -> ").lower()
	print ''
	if user_input_1 == 'c' or user_input_1 == 'i':
		database_number = -1
		while is_valid(database_number) == False:
			print 'List of Tables:'
			for counter, table_name in enumerate(c.table_list):
				print '\t(' + str(counter + 1) + ') ' + table_name
			user_input_2 = raw_input('Enter the number of the table to ' + ('clear' if (user_input_1 == 'c') else 'fill') + ' -> ')
			if user_input_2.isdigit():
				user_number = int(user_input_2) - 1
				if is_valid(user_number):
					database_number = user_number
					database_name = c.table_list[database_number]
				else:
					print '\nInvalid number.\n'
			else:
				print '\nInvalid input.\n'
		if user_input_1 == 'c':
			print '\n'
			clear_db(database_name)
		else:
			num_data = -1
			while num_data < 1:
				user_input_3 = raw_input('Enter the number of sample data to insert -> ')
				if user_input_3.isdigit() == False:
					print 'Invalid input.'
				else:
					num_data = int(user_input_3)
					if num_data < 1:
						print 'Invalid number.'
			print '\n'
			fill_db(database_name, num_data)
		print ''
	elif user_input_1 == 'q':
		break
	else:
		print 'Invalid input.'
print ''