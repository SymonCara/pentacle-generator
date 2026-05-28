const https = require('https');

https.get({
  hostname: 'api.github.com',
  path: '/repos/SymonCara/pentacle-generator/actions/runs',
  headers: { 'User-Agent': 'Node.js' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const runs = JSON.parse(data);
    const runId = runs.workflow_runs[0].id;
    console.log('Run ID:', runId);
    
    https.get({
      hostname: 'api.github.com',
      path: `/repos/SymonCara/pentacle-generator/actions/runs/${runId}/jobs`,
      headers: { 'User-Agent': 'Node.js' }
    }, (res2) => {
      let data2 = '';
      res2.on('data', chunk => data2 += chunk);
      res2.on('end', () => {
        const jobs = JSON.parse(data2);
        const jobId = jobs.jobs[0].id;
        console.log('Job:', jobs.jobs[0].name, jobs.jobs[0].conclusion);
        
        https.get({
          hostname: 'api.github.com',
          path: `/repos/SymonCara/pentacle-generator/actions/jobs/${jobId}/logs`,
          headers: { 'User-Agent': 'Node.js' }
        }, (res3) => {
          let data3 = '';
          res3.on('data', chunk => data3 += chunk);
          res3.on('end', () => {
            if (res3.statusCode === 302) {
              const loc = res3.headers.location;
              https.get(loc, (res4) => {
                let data4 = '';
                res4.on('data', chunk => data4 += chunk);
                res4.on('end', () => {
                  console.log(data4);
                });
              });
            } else {
              console.log(data3);
            }
          });
        });
      });
    });
  });
});
