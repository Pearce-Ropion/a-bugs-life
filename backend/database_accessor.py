# import standard Python library for SQLite
import sqlite3

# import helper Python script
import constants

def execute_db_command(command):
	db = sqlite3.connect(constants.database)

	cursor = db.cursor()
	cursor.execute(command)
	db.commit()

	db.close()

def get_insert_command(data, table_name):
	# ASSUME THAT KEYS ARE IN THE PROPER ORDER!		
	command = 'INSERT INTO ' + table_name + '('
	
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