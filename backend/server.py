# import standard Python libraries
from BaseHTTPServer import BaseHTTPRequestHandler
from io import open
import json

# import helper Python scripts
import constants as c
import database_accessor as db

# Server inherits methods from BaseHTTPRequestHandler class
class Server(BaseHTTPRequestHandler):
	# built into BaseHTTPRequestHandler, which runs when we receive a GET request
	def do_GET(self):		
		# sets the path based on dev environment or build environment
		path = (c.dev_path if (c.environment == 'dev') else c.build_path) + self.path

		try:
			file_to_open = open(path[1:]).read()
			self.send_response(200)
		except Exception as e:
			file_to_open = 'File Not Found!'
			self.send_response(404)
			print 'Exception: ' + str(e)

		# required by the BaseHTTPRequestHandler class
		self.end_headers()
		
		# write the contents of the file onto the screen
		self.wfile.write(file_to_open.encode('utf-8'))

	# built into BaseHTTPRequestHandler, which runs when we receive a POST request
	def do_POST(self):
		exceptionHttpCode = 400

		try:
			# gets the path components after the '/api/' at the start of self.path
			path_components = self.path[5:].split('/')
			
			if len(path_components) == 0 or len(path_components) > 2:
				raise Exception("The path '" + self.path + "' is invalid.")

			table_name = path_components[0]
			if table_name not in c.table_list:
				raise Exception("The table '" + table_name + "' is invalid.")

			content_length = int(self.headers['Content-Length'])
			post_body_bytes = self.rfile.read(content_length)
			json_string = post_body_bytes.decode('utf8').replace("'", '"')
			
			data = None
			if len(json_string) > 0:
				data = json.loads(json_string)

			response_data = None

			operation = path_components[1]

			if operation == 'create':
				# removes the 'id' key because it will be null
				data.pop('id', None)

				if (table_name == c.users_table) and (db.user_exists(data['email'])):
					exceptionHttpCode = 409
					raise Exception('The username already exists!')
				
				db.insert_into_db(data, table_name)
			elif operation == 'update':
				db.update_db(data, table_name)
			elif operation == 'all':
				response_data = db.get_table_data(table_name)
			elif operation == 'get':
				# passes in 'data' as the filter to get a user object from the users table
				response_data = db.get_table_data(table_name, data)
				
				if table_name == c.users_table:
					# if the user exists, return the first element of the 'response_data' list
					if len(response_data) == 0:
						response_data = {'valid': False}
					else:
						response_data = {
							'valid': True,
							'user': response_data[0]
						}
			else:
				raise Exception("The operation '" + operation + "' is invalid.")

			self.send_response(200)
			self.end_headers()

			if response_data is not None:
				response_data_string = json.dumps(response_data)
				response_data_bytes = response_data_string.encode()
				self.wfile.write(response_data_bytes)
		except Exception as e:
			self.send_response(exceptionHttpCode)
			self.end_headers()
			print 'Exception: ' + str(e)