# import standard Python libraries
from http.server import BaseHTTPRequestHandler
import json

# import helper Python scripts
import constants
import database_accessor as db

# Server inherits methods from BaseHTTPRequestHandler class
class Server(BaseHTTPRequestHandler):
	# built into BaseHTTPRequestHandler, which runs when we receive a GET request
	def do_GET(self):
		# required because the html, scss, and js files are in the app directory
		self.path = '/..' + self.path
		
		try:
			file_to_open = open(self.path[1:]).read()
			self.send_response(200)
		except:
			file_to_open = 'File Not Found!'
			self.send_response(404)

		# required by the BaseHTTPRequestHandler class
		self.end_headers()
		
		# write the contents of the file onto the screen
		self.wfile.write(bytes(file_to_open, 'utf-8'))

	# built into BaseHTTPRequestHandler, which runs when we receive a POST request
	def do_POST(self):
		try:
			print(self.path)

			content_length = int(self.headers['Content-Length'])
			post_body_bytes = self.rfile.read(content_length)
			json_string = post_body_bytes.decode('utf8').replace("'", '"')
			data = json.loads(json_string)

			db.execute_db_command(db.get_insert_command(data, constants.tickets_table), None)
			tickets_data = db.execute_db_command('SELECT * FROM ' + constants.tickets_table, constants.attributes[constants.tickets_table])
			print(json.dumps(tickets_data, indent=4))

			# self.wfile.write(bytes(json.dumps({"tickets_data": "data"}), 'utf-8'))
			self.send_response(200)
			# self.send_header('Content-type', 'text/html')
		except:
			self.send_response(400)

		self.end_headers()