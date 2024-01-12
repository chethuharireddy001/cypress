import { defineConfig } from 'cypress';
import mysql from 'mysql';

const connections = {
  wrenchDb: {
    host: "wrench-uat.cluster-cc8bg1samc0b.us-west-2.rds.amazonaws.com",
    user: "wrench",
    password: 'rds4Wr3nch!',
    database: "wrench"
  },
  lmDb: {
    host: 'lubemobile-uat.cm1bv1m4z1yi.ap-southeast-2.rds.amazonaws.com',
    user: 'wrench_readwrite',
    password: 'Wr3nch!',
    database: 'wrench',
  }
}

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
    wrenchAdminUrl: 'https://adminuat.wrench.com/',
    wrenchWebAppUrl: 'https://uat.wrench.com/',
    lmWebAppUrl: 'https://lmuat.wrench.com/',
    lubeMobile: "https://lmadmin-uat.wrench.com/",
    localJsAdminBaseUrl: "http://localhost:8888/#/",
    localWebappBaseUrl: "http://localhost:4200/",
    goToJob: '#/update_job?jobId=',
    loginPage: "/ng/login",
    legacyLoginPage: "/#/login",
    grepFilterSpecs: true,
    grepOmitFiltered: true,
  },
  e2e: {
    experimentalStudio: true,
    baseUrl: 'https://uat.wrench.com/',
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
