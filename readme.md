
# General Use
Manual for general usage of the app:
https://tecmx-my.sharepoint.com/:w:/g/personal/a01255663_tec_mx/IQBQ-mBeVlaATrv2b4LxFHEhAcI223qu0bu_Ndyp7k_vW9E?e=HnPihE


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

# Running seeder
To run the seeder, you need to be in the back-end folder and run:
```
npm run dev
```

Afterwards, in another terminal while the back-end is running, run:
```
npm run seed
```

Finally, to adjust the db tables for correct auto-increment, run:
```
npm run syncKeys
```

Note: The seed doesnt add files, but it creates empty slots for them in the database. They can be updated to have the actual file via postman. This only happens with the seeder, uploading files from the app works as expected. 