#!/usr/bin/env

# import standard Python libraries
import argparse
from BaseHTTPServer import HTTPServer

# import helper Python script
import constants as c
import server as my_server

# parses the arguments for address, port number, and environment
parser = argparse.ArgumentParser()
requiredNamed = parser.add_argument_group('required named arguments')
requiredNamed.add_argument('-a', '--address', dest='ADDRESS', help='This specifies the address to host the server on (for example, localhost).', required=True)
requiredNamed.add_argument('-p', '--port', dest='PORT_NUMBER', help='This specifies the port number to listen on.', type=int, required=True)
requiredNamed.add_argument('-e', '--environment', dest='ENVIRONMENT', help='This specifies whether the app should run in dev or build environment.', choices=['dev', 'build'], required=True)
args = parser.parse_args()

# sets the environment variable in constants file
c.environment = args.ENVIRONMENT

# starts the HTTP Daemon
http_daemon = HTTPServer((args.ADDRESS, args.PORT_NUMBER), my_server.Server)
http_daemon.serve_forever()