# Vineet Joshi
# This file contains functions that access the database through various operations, such as inserting, updating, and retrieving.

# import standard Python library for SQLite
import sqlite3

# import helper Python script
import constants as c

# This function checks whether the user, with the indicated email, exists in the database or not.
# Parameters: the email of the user to check the existence of
# Return Type: boolean (indicating whether the user exists or not)
def user_exists(email):
	db = sqlite3.connect(c.database)
	cursor = db.cursor()
	cursor.execute('SELECT * FROM ' + c.users_table + " WHERE email='" + email + "'")

	exists = False
	for row in cursor:
		exists = True
		break

	db.close()

	return exists

# This function inserts the given data into the table with the given table name.
# Parameters: the data to insert, and the table name of the table to insert into
# Return Type: void
def insert_into_db(data, table_name):
	db = sqlite3.connect(c.database)

	cursor = db.cursor()

	# gets the list of attributes for this table (except for id, because it is automatically generated by sqlite)
	attributes_list = c.attributes[table_name][1:]

	command = 'INSERT INTO ' + table_name + '('
	
	# insert attributes into command
	for attribute in attributes_list:
		command += (attribute + ',')
	command = command[:-1]
	
	command += ') VALUES('
	
	# insert '?,' for each of the attributes in the table
	# IMPORTANT: by parameterizing the query, this avoids SQL injection!
	# (see Python docs: https://docs.python.org/2/library/sqlite3.html)
	command += ('?,' * len(attributes_list))
	
	command = command[:-1]
	command += ')'

	values_list = []
	for attribute in attributes_list:
		if attribute == 'labels':
			value = ','.join(data['labels']) if (len(data['labels']) > 0) else None
		else:
			value = data[attribute]
		values_list.append(value)

	db.execute(command, tuple(values_list))
	db.commit()
	db.close()

# This function updates the table, with given table name, with the given data using its ID field.
# Parameters: the data to update, and the table name of the table to update
# Return Type: void
def update_db(data, table_name):
	db = sqlite3.connect(c.database)

	cursor = db.cursor()

	command = 'UPDATE ' + table_name + ' SET '

	values_list = []

	# gets the list of attributes for this table (except for id, because it is automatically generated by sqlite)
	attributes_list = c.attributes[table_name][1:]

	if table_name == c.users_table:
		attributes_list.remove('password')
	
	# insert attributes into command
	for attribute in attributes_list:
		if attribute == 'labels':
			if len(data['labels']) > 0:
				command += ('labels=?,')
				value = ','.join(data['labels'])
				values_list.append(value)
			else:
				command += ('labels=NULL,')
		else:
			command += (attribute + '=?,')
			value = data[attribute]
			values_list.append(value)

	command = command[:-1]
	
	command += ' WHERE id=?'
	values_list.append(data['id'])

	db.execute(command, tuple(values_list))
	db.commit()
	db.close()

# This function retrieves data from the table, with the given table name, and using optional filters.
# Parameters: the table name of the table to retrieve data from, and filters dictionary (with default value to None, indicating no filters)
# Return Type: dictionary of the retrieved data
def get_table_data(table_name, filters=None):
	db = sqlite3.connect(c.database)

	cursor = db.cursor()

	command = get_data_command(table_name, filters)
	cursor.execute(command)

	# gets the list of attributes for this table
	attributes_list = c.attributes[table_name]
	
	data = []
	for row in cursor:
		rowObject = {}
		counter = 0
		
		for attribute in row:
			key = attributes_list[counter]
			
			value = attribute
			# if the attribute is labels, convert a comma-separated String to a list of Strings
			if key == 'labels':
				value = attribute.split(',') if (attribute is not None) else []
			
			rowObject[key] = value
			counter += 1
		
		data.append(rowObject)

	db.close()

	return data

# This function is a helper function used by 'get_table_data' to get the command to retrieve data.
# Parameters: the table name of the table to retrieve data from, and dictionary with filters
# Return Type: string containing the command to retrieve data
def get_data_command(table_name, filters):
	command = 'SELECT * FROM ' + table_name
	
	if filters is not None:
		command += ' WHERE '
		
		# traverses the filters
		for key in filters:
			command += str(key)
			value = filters[key]
			
			if value is None:
				command += ' IS NULL AND '
			elif type(value) is list:
				# this is a date filter
				lower_bound, upper_bound = value[0], value[1]
				if lower_bound is not None:
					command += ('>=' + str(lower_bound) + ' AND ')
				if upper_bound is not None:
					if lower_bound is not None:
						command += str(key)
					command += ('<=' + str(upper_bound) + ' AND ')
			else:
				if key == 'labels':
					value = ','.join(value)
				
				if type(value) is int:
					command += ('=' + str(value) + ' AND ')
				else:
					command += ("='" + value + "' AND ")
		
		# removes the ' AND ' after the last filter
		command = command[:-5]
	
	return command