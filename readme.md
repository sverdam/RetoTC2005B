

# Backend Setup
In there /back-end folder you must add a file named ".env" to store some local info for the database. It needs to have this structure:

```
DB_USERNAME = >>>your database user<<<
DB_PASSWORD = >>>your database password<<<
DB_NAME = >>>your database name<<<

SECRET_KEY = >>>any string<<<
NODE_ENV = dev
ALLOW_ALL_REQUESTS = true
ALLOW_JWT_IN_HEADER=true
```

The database itself should be empty at the start, running the code will create all of the tables.
