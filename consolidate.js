#!/usr/bin/env node

const promptly = require("promptly")
const { spawn } = require('child_process')
const { Console } = require('console');
fs = require('fs')

async function consolidate () {
  console.log('**** Consolidate certificates in a text file')
  console.log('Please enter the domain you need the certificates')
  const sDomain = await promptly.prompt('Domain: ')

  let contents = 'Certificate:\n'
  contents += fs.readFileSync(`/etc/letsencrypt/archive/${sDomain}/cert1.pem`);
  contents += '\n\nPrivate Key:\n';
  contents += fs.readFileSync(`/etc/letsencrypt/archive/${sDomain}/privkey1.pem`);
  contents += '\n\nIntermediate:\n';
  contents += fs.readFileSync(`/etc/letsencrypt/archive/${sDomain}/chain1.pem`);
  contents += fs.readFileSync(`/etc/letsencrypt/archive/${sDomain}/fullchain1.pem`);

  fs.writeFileSync(sDomain + '.txt', contents);
  fs.chmodSync(sDomain + '.txt', 0o666);
  console.log("The certicitades can be read in "+sDomain + '.txt file');
}

consolidate().catch((e) => {
  console.error(e)
})



