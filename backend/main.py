# import standard Python libraries
import argparse
from BaseHTTPServer import HTTPServer

# import helper Python script
import server as my_server

# parses the arguments for address and port number
parser = argparse.ArgumentParser()
parser.add_argument('-a', '--address', dest='ADDRESS', help='This specifies the address to host the server on (for example, localhost).')
parser.add_argument('-p', '--port', dest='PORT_NUMBER', help='This specifies the port number to listen on.', type=int)
args = parser.parse_args()

# starts the HTTP Daemon
http_daemon = HTTPServer((args.ADDRESS, args.PORT_NUMBER), my_server.Server)
http_daemon.serve_forever()