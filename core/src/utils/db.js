const path = require('path');
const fsExtra = require('fs-extra');
const lodashId = require('lodash-id');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const { DATABASE_PATH } = require('../constants');

const DATABASE_SCHEMA = {
  "client_configs": [],
  "server_configs": [],
  "users": [],
  "auto_start_services": [],
  "runtime": {
    "ip": "",
  },
};

fsExtra.mkdirpSync(path.dirname(DATABASE_PATH));

const db = lowdb(new FileSync(DATABASE_PATH, {
  defaultValue: DATABASE_SCHEMA,
  serialize: (data) => JSON.stringify(data, null, 2),
  deserialize: JSON.parse,
}));

db.defaults(DATABASE_SCHEMA).write();
db._.mixin(lodashId);

module.exports = db;
