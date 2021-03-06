# Vineet Joshi
# This file contains constants used by other backend files.

# database file
database = 'bugs.db'

# table names
tickets_table = 'tickets'
users_table = 'users'

# list of tables
table_list = [tickets_table, users_table]

# table attributes
attributes = {
    tickets_table: ['id', 'summary', 'description', 'comments', 'assignee', 'reporter', 'component', 'priority', 'severity', 'labels', 'status', 'resolution', 'created', 'modified', 'closed'],
	users_table: ['id', 'name', 'email', 'password', 'role']
}

# sample table data
tickets_sample_data = {
    'id': 0,
    'summary': 'sample summary',
    'description': 'sample description',
    'comments': 'sample comments',
    'assignee': 'sample assignee',
    'reporter': 'sample reporter',
    'component': 'sample component',
    'priority': 0,
    'severity': 0,
    'labels': [],
    'status': 'sample status',
    'resolution': 'some resolution',
    'created': 0,
    'modified': None,
    'closed': None
}

users_sample_data = {
    'id': 0,
    'name': 'fl',
    'email': 'u',
    'password': 'p',
    'role': 'user'
}

sample_data = {
    tickets_table: tickets_sample_data,
	users_table: users_sample_data
}

# paths for GET Request
dev_path = '../dist'
build_path = '../build'

# the current environment ('dev' or 'build'), which will be set after server.py runs
environment = None

# the mapping from path end to mimetype (used to load fonts properly)
pathend_to_mimetype = {
	"html": "text/html",
	"jpg": "image/jpg",
	"png": "image/png",
	"gif": "image/gif",
	"svg": "image/svg+xml",
	"css": "text/css",
	"js": "application/javascript",
	"ttf": "application/x-font-ttf",
	"otf": "application/x-font-opentype",
	"woff": "application/font-woff"
}