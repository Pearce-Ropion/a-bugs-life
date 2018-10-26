# database file
database = 'bugs.db'

# table names
tickets_table = 'tickets'
attachments_table = 'attachments'
users_table = 'users'

# table attributes
attributes = {tickets_table: ['id', 'summary','description', 'assignee', 'reporter', 'components', 'priority', 'severity', 'labels', 'attachments', 'status', 'resolution', 'created', 'modified', 'closed'],
			  attachments_table: ['id', 'ticketid', 'name'],
			  users_table: ['id', 'username', 'password', 'role']}

# list of tables
table_list = [tickets_table, attachments_table, users_table]