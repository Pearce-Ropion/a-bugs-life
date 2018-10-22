import argparse
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import sqlite3

parser = argparse.ArgumentParser()
parser.add_argument('PORT_NUMBER', help='This specifies the port number to run the server.', type=int)
args = parser.parse_args()

# Server inherits methods from BaseHTTPRequestHandler class
class Serv(BaseHTTPRequestHandler):
	# built into BaseHTTPRequestHandler, which runs when we receive a GET request
	def do_GET(self):
		# required because the html, scss, and js files are in the app directory
		self.path = '/../app' + self.path
		
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

	def do_POST(self):
		try:
			content_length = int(self.headers['Content-Length'])
			post_body_bytes = self.rfile.read(content_length)
			json_string = post_body_bytes.decode('utf8').replace("'", '"')
			data = json.loads(json_string)

			for key in data:
				print(key + ": " + str(data[key]))

			self.send_response(200)
			# self.send_header('Content-type', 'text/html')
		except:
			self.send_response(400)

		self.end_headers()

# starts the HTTP Daemon
http_daemon = HTTPServer(('localhost', args.PORT_NUMBER), Serv)
http_daemon.serve_forever()