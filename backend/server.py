# import standard Python libraries
import argparse
from http.server import HTTPServer, BaseHTTPRequestHandler
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
			content_length = int(self.headers['Content-Length'])
			post_body_bytes = self.rfile.read(content_length)
			json_string = post_body_bytes.decode('utf8').replace("'", '"')
			data = json.loads(json_string)

			db.execute_db_command(db.get_insert_command(data), False)
			db.execute_db_command('SELECT * FROM ' + constants.tickets_table, True)

			self.send_response(200)
			# self.send_header('Content-type', 'text/html')
		except:
			self.send_response(400)

		self.end_headers()

# START OF MAIN

# parses the arguments for  and port number
parser = argparse.ArgumentParser()
parser.add_argument('-a', '--address', dest='ADDRESS', help='This specifies the address to host the server on (for example, localhost).')
parser.add_argument('-p', '--port', dest='PORT_NUMBER', help='This specifies the port number to listen on.', type=int)
args = parser.parse_args()

# starts the HTTP Daemon
http_daemon = HTTPServer((args.ADDRESS, args.PORT_NUMBER), Server)
http_daemon.serve_forever()