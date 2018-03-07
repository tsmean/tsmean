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
- development.properties.json
- production.properties.json
- test.properties.json

Where `development`, `production` or `test` are the value of `NODE_ENV` env variable on runtime (default `development`).

They are added to .gitignore so they won't be pushed to the repository.
