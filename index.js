#!/usr/bin/env node

const promptly = require("promptly")
const { spawn } = require('child_process')
const { Console } = require('console');
var command = 'certonly';
fs = require('fs')

async function generate () {
  console.log('**** Cloud Sites SSL certificate Generation and validator using Certbot v0.4.3')
  console.log('Please enter the domains you need certificates for, the first domain is going to be used as the directory for SFTP, for example "www.domain.com domain.com"')
  const sDomains = await promptly.prompt('Domains: ')
  const username = await promptly.prompt('SFTP username: ')
  const password = await promptly.password('SFTP password: ')
  const aDomains = sDomains.split(' ')
  const pDomains = []
  for (let p = 0; p < aDomains.length; p++) {
    pDomains.push('-d')
    pDomains.push(aDomains[p])
  }
  const directory = await promptly.prompt(`Directory: (Blank for /${aDomains[0]}/web/content)`, {default: `/${aDomains[0]}/web/content`})
  const domain = aDomains[0]
  const cmd = spawn('certbot', [command, '--manual', '--force-renewal', '--manual-public-ip-logging-ok', '--manual-auth-hook', `"csssluploader ${domain} ${username} ${password} ${directory}"`, '--preferred-challenges', 'http', ...pDomains], {shell: true})
  cmd.stdout.on('data', (data) => {
    console.log(`${data}`);
  });
  cmd.stderr.on('data', (data) => {
    console.log(`${data}`);
  });
  cmd.on('close', (code) => {
    console.log(`Certbot process exited with code ${code}`);
    let contents = 'Certificate:\n'
    contents += fs.readFileSync(`/etc/letsencrypt/archive/${domain}/cert1.pem`);
    contents += '\n\nPrivate Key:\n';
    contents += fs.readFileSync(`/etc/letsencrypt/archive/${domain}/privkey1.pem`);
    contents += '\n\nIntermediate:\n';
    contents += fs.readFileSync(`/etc/letsencrypt/archive/${domain}/chain1.pem`);
    contents += fs.readFileSync(`/etc/letsencrypt/archive/${domain}/fullchain1.pem`);

    fs.writeFileSync(domain + '.txt', contents);
    fs.chmodSync(domain + '.txt', 0o666);
    console.log("The certicitades can be read in "+domain + '.txt file');
  });
}

generate().catch((e) => {
  console.error(e)
})



