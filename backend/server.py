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
		except:
			file_to_open = 'File Not Found!'
			self.send_response(404)
			print 'Exception: ' + str(e)

		# required by the BaseHTTPRequestHandler class
		self.end_headers()
		
		# write the contents of the file onto the screen
		self.wfile.write(file_to_open.encode('utf-8'))

	# built into BaseHTTPRequestHandler, which runs when we receive a POST request
	def do_POST(self):
		try:
			# gets the path components after the '/api/' at the start of self.path
			path_components = self.path[5:].split('/')
			
			if len(path_components) == 0 or len(path_components) > 2:
				raise Exception

			table_name = path_components[0]
			if table_name not in c.table_list:
				raise Exception

			content_length = int(self.headers['Content-Length'])
			post_body_bytes = self.rfile.read(content_length)
			json_string = post_body_bytes.decode('utf8').replace("'", '"')
			data = json.loads(json_string)

			response_data = None

			# if path == 'test1':
			# 	db.insert_into_db(data, c.tickets_table)
			# elif path == 'test2':
			# 	response_data = db.get_table_data(c.tickets_table)
			# elif path == 'test3':
			# 	filter1 = ('id', 2)
			# 	print json.dumps(db.get_table_data(c.tickets_table, filter1), indent=4)

			# 	filter2 = (
			# 		('labels', ["test1","test2"]),
			# 		('assignee', 'a1'),
			# 		('severity', 10),
			# 		('attachments', None)
			# 	)
			# 	print json.dumps(db.get_table_data(c.tickets_table, filter2), indent=4)
			# else:
			# 	raise Exception

			operation = path_components[1]

			if operation == 'create':
				# removes the 'id' key because it will be null
				data.pop('id', None)
				db.insert_into_db(data, table_name)
			elif operation == 'update':
				db.update_db(data, table_name)
			elif operation == 'data':
				response_data = db.get_table_data(table_name)
			else:
				raise Exception

			self.send_response(200)
			self.end_headers()

			if response_data is not None:
				response_data_string = json.dumps(response_data)
				response_data_bytes = response_data_string.encode()
				self.wfile.write(response_data_bytes)
		except Exception as e:
			self.send_response(400)
			self.end_headers()
			print 'Exception: ' + str(e)