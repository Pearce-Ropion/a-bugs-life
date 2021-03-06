#!/usr/bin/env

# Vineet Joshi
# This file is the entry point into starting the backend server. Execute 'python main.py -h' to view descriptions of optional script parameters.

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

# generates the URL of this web app
url = args.ADDRESS + ':' + str(args.PORT_NUMBER) + '/index.html'
print '\nApplication is running at this address:\n' + url + '\n'

# Automatically opening a web browser doesn't work on Design Center Linux machines, so this code is commented out
# if args.ENVIRONMENT == 'build':
# 	# open the webpage
# 	webbrowser.open(url)

# starts the HTTP Daemon
http_daemon = HTTPServer((args.ADDRESS, args.PORT_NUMBER), my_server.Server)
http_daemon.serve_forever()