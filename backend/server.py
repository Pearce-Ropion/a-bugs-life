# Vineet Joshi
# This is a class file for Server, which extends the BaseHTTPRequestHandler class and overrides the callback methods for GET and POST requests.

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

		# load fonts properly
		# https://stackoverflow.com/questions/40867447/python-simple-http-server-not-loading-font-awesome-fonts
		try:
			lookup = c.pathend_to_mimetype
			for key in lookup:
				extension = '.' + key
				if path.endswith(extension):
					mimetype = lookup[key]
					
					# open the static file requested and send it
					f = open(path, 'rb')
					self.send_response(200)
					self.send_header('Content-type', mimetype)
					self.end_headers()
					self.wfile.write(f.read())
					f.close()
                    
					break
		except IOError:
			self.send_error(404, 'File Not Found: %s' % path)

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

			data = None

			content_length = int(self.headers['Content-Length'])
			if content_length > 0:
				post_body_bytes = self.rfile.read(content_length)
				json_string = post_body_bytes.decode('utf8')
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