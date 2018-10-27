# import standard Python libraries
from http.server import BaseHTTPRequestHandler
import json

# import helper Python scripts
import constants as c
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
			content_length = int(self.headers['Content-Length'])
			post_body_bytes = self.rfile.read(content_length)
			json_string = post_body_bytes.decode('utf8').replace("'", '"')
			data = json.loads(json_string)

			db.insert_into_db(data, c.tickets_table)
			tickets_data = db.get_table_data(c.tickets_table, None)
			first_ticket_data = db.get_table_data(c.tickets_table, 1)
			print(first_ticket_data)

			self.send_response(200)
			self.end_headers()

			tickets_data_string = json.dumps(tickets_data)
			tickets_data_bytes = tickets_data_string.encode()
			self.wfile.write(tickets_data_bytes)
		except:
			self.send_response(400)
			self.end_headers()