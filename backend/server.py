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
		# initially, the js files were in the parent directory, but got moved to backend directory (this one!)
		self.path = '/..' + self.path

		try:
			file_to_open = open(self.path[1:]).read()
			self.send_response(200)
		except:
			file_to_open = 'File Not Found!'
			# self.send_response(404)

		# required by the BaseHTTPRequestHandler class
		self.end_headers()
		
		# write the contents of the file onto the screen
		self.wfile.write(file_to_open.encode('utf-8'))

	# built into BaseHTTPRequestHandler, which runs when we receive a POST request
	def do_POST(self):
		try:
			# removes the '/app/' from the start of self.path
			path = self.path[5:]
			if len(path) == 0:
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

			if path == 'create':
				# removes the 'id' key because it will be null
				data.pop('id', None)
				db.insert_into_db(data, c.tickets_table)
			elif path == 'update':
				db.update_db(data, c.tickets_table)
			elif path == 'tickets':
				response_data = db.get_table_data(c.tickets_table)
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
			print 'Exception: ' + e