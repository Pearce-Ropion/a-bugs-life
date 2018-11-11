#!/usr/bin/env

# import standard Python libraries
import argparse
from BaseHTTPServer import HTTPServer
import socket
import webbrowser

# import helper Python script
import constants as c
import server as my_server

# gets the IP address of the local machine
this_ip = socket.gethostbyname(socket.gethostname())

# parses the arguments for address, port number, and environment
parser = argparse.ArgumentParser()
parser.add_argument('-a', '--address', dest='ADDRESS', help='This specifies the address to host the server on (for example, localhost).', default=this_ip)
parser.add_argument('-p', '--port', dest='PORT_NUMBER', help='This specifies the port number to listen on.', type=int, default=8080)
parser.add_argument('-e', '--environment', dest='ENVIRONMENT', help='This specifies whether the app should run in dev or build environment.', choices=['dev', 'build'], default='build')
args = parser.parse_args()

# sets the environment variable in constants file
c.environment = args.ENVIRONMENT

if args.ENVIRONMENT == 'build':
	# open the webpage
	url = args.ADDRESS + ':' + str(args.PORT_NUMBER) + '/index.html'
	print '\nServer is running at this address:\n' + url + '\n'
	webbrowser.open(url)

# starts the HTTP Daemon
http_daemon = HTTPServer((args.ADDRESS, args.PORT_NUMBER), my_server.Server)
http_daemon.serve_forever()