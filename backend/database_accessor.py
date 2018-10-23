# import standard Python library for SQLite
import sqlite3

# import helper Python scripts
import constants

def execute_db_command(command, traverse_cursor):
	db = sqlite3.connect(constants.database)

	# gets a cursor object
	cursor = db.cursor()

	cursor.execute(command)

	if traverse_cursor:
		for row in cursor:
			rowStr = ''
			for attribute in row:
				rowStr += (str(attribute) + ' ')
			print(rowStr)
	else:
		db.commit()

	db.close()

def get_insert_command(data):
	# ASSUME THAT KEYS ARE IN THE PROPER ORDER!		
	command = 'INSERT INTO ' + constants.tickets_table + '('
	
	# insert keys into command
	for key in data:
		command += (key + ',')
	command = command[:-1]
	command += ') VALUES('

	# insert values into command
	for key in data:
		command += ("'" + str(data[key]) + "',")
	command = command[:-1]
	command += ')'

	return command