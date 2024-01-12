

function queryTestDb(connectInfo, query) {
  const connection = mysql.createConnection(connectInfo)
  connection.connect();
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        return reject(error);
      } else {
        connection.end();
        return resolve(results);
      }
    })
  })
}

export default defineConfig({
  chromeWebSecurity: false,
  scrollBehavior:'top',
  video: false,
  watchForFileChanges: false,
  viewportHeight: 1000,
  viewportWidth: 1280,
  pageLoadTimeout: 60000,
  defaultCommandTimeout: 25000,
  requestTimeout: 25000,
  responseTimeout: 20000,
  retries: {
    runMode: 0,
    openMode: 0,
  },
  env: {
    loginPage: "/ng/login",
    legacyLoginPage: "/#/login",
    grepFilterSpecs: true,
    grepOmitFiltered: true,
  },
  e2e: {
    experimentalStudio: true,
    baseUrl: 'https://uat.startk.com/',
    setupNodeEvents(on, config) {
      on('task', {
        queryDb: ({ dbName, query}) => {
          const connectInfo = connections[dbName];
          if (!connectInfo) {
            throw new Error(`There is no DB connection with the name ${dbName}`);
          }
          return queryTestDb(connectInfo, query);
        },
      });
      require('./cypress/plugins/index.js')(config);
      return config;
    },
  },
})
