var path = require('path');
// Load environment variables from .env file if available
var configPath = './';
if (process.env.USER === 'jenkins') {
  configPath = path.resolve(__dirname, '../../');
  console.log('Config path: ' + configPath);
}

require('dotenv').load({path: configPath});

var port = process.env.PORT || 5050;

console.log('Dashboard user : ' + process.env.USER);
console.log('Dashboard will run on : ' + port);

var config = {
    env:  'prod',

    host: 'localhost',
    port: port,

    // Available themes:
    // + bordeau
    // + harlequin
    // + light-grey
    // + light-yellow
    // + night-blue
    // + snow
    // + yellow
    theme: 'night-blue',

    // clients configs
    api: {
        aws: {
            region: 'eu-west-1'
        },
        jenkins: {
            baseUrl: process.env.JENKINS_API_BASE_URL,
            auth: {
                user:     process.env.JENKINS_API_BASIC_AUTH_USER,
                password: process.env.JENKINS_API_BASIC_AUTH_PASSWORD
            }
        }
    },

    // define duration between each dashboard rotation (ms)
    rotationDuration: 8000,

    // define the interval used by Mozaïk Bus to call registered APIs
    apisPollInterval: 15000,

    dashboards: [

        // first dashboard
        {
            // 4 x 3 dashboard
            columns: 4,
            rows:    3,
            widgets: [
                {
                    type: 'jenkins.view',
                    view: 'dev-env',
                    columns: 1, rows: 1,
                    x: 0, y: 0
                },
                {
                    type: 'github.repository_contributors_stats',
                    repository: 'plouc/mozaik',
                    columns: 1, rows: 1,
                    x: 2, y: 0
                },

                {
                    type: 'time.clock',
                    columns: 1, rows: 1,
                    x: 3, y: 0
                },
                {
                    type: 'github.status',
                    columns: 1, rows: 1,
                    x: 0, y: 2
                }
            ]
        },
      { // 4 x 3 dashboard
        columns: 4,
        rows:    3,
        widgets: [
          {
            type: 'jenkins.job_builds_histogram',
            job: 'Backup_all_Platform_sites',
            columns: 2, rows: 2,
            x: 0, y: 0
          },
        ]

      }
    ]
};

module.exports = config;
