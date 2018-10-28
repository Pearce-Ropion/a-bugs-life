# database file
database = 'bugs.db'

# table names
tickets_table = 'tickets'
users_table = 'users'

# table attributes
attributes = {tickets_table: ['id', 'summary','description', 'assignee', 'reporter', 'component', 'priority', 'severity', 'labels', 'status', 'resolution', 'created', 'modified', 'closed'],
			  users_table: ['id', 'username', 'password', 'role']}

# list of tables
table_list = [tickets_table, users_table]