import argparse
from http.server import HTTPServer, BaseHTTPRequestHandler

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

# starts the HTTP Daemon
http_daemon = HTTPServer(('localhost', args.PORT_NUMBER), Serv)
http_daemon.serve_forever()

# write a function that accepts a POST request
# also write more functions for database interactions (add to table, update table, etc.)