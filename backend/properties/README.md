# Configuration properties

Based on `properties.template.json` file:
```json
{
  "db": {
    "host": "yourdatabase.com",
    "dbuser": "dbuser",
    "dbpassword": "secretpassword",
    "port": 12345,
    "dbname": "yourDbName",
    "testsMayDropDb": "true"
  }
}
```

Create you own properties.json like:
- local.properties.json
- prod.properties.json
- test.properties.json

Where `local`, `prod` or `test` are the command line arguments passed to the main node process (default `local`).

They are added to .gitignore so they won't be pushed to the repository.
