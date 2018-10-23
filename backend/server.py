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

			self.execute_db_command(self.get_insert_command(data), False)
			self.execute_db_command('''SELECT * FROM tickets''', True)

			self.send_response(200)
			# self.send_header('Content-type', 'text/html')
		except:
			self.send_response(400)

		self.end_headers()

	def execute_db_command(self, command, traverse_cursor):
		db = sqlite3.connect('bugs.db')

		# gets a cursor object
		cursor = db.cursor()

		cursor.execute(command)
		db.commit()

		if traverse_cursor:
			for row in cursor:
				rowStr = ''''''
				for attribute in row:
					rowStr += (str(attribute) + ''' ''')
				print(rowStr)

		db.close()

	def get_insert_command(self, data):
		# ASSUME THAT KEYS ARE IN THE PROPER ORDER!		
		command = '''INSERT INTO tickets('''
		
		# insert keys into command
		for key in data:
			command += (key + ',')
		command = command[:-1]
		command += ''') VALUES('''

		# insert values into command
		for key in data:
			command += ("'" + str(data[key]) + "',")
		command = command[:-1]
		command += ''')'''

		return command

# starts the HTTP Daemon
http_daemon = HTTPServer(('localhost', args.PORT_NUMBER), Serv)
http_daemon.serve_forever()