module.exports = {
  "development": {
    "username": "root",
    "password": process.env.PW,
    "database": "blogger",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": "3306"
  },
  "test": {
    "username": "root",
    "password": process.env.PW,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": process.env.PW,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
