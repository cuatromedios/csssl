console.log('Uploader!!')

/*
process.env.CERTBOT_VALIDATION = 'TESTCONTENT'
process.env.CERTBOT_TOKEN = 'test'
process.argv[2] = 'www.cuatromedios.com'
process.argv[3] = 'cuatromedios'
process.argv[4] = 'cu20A13tro'
*/



async function upload() {

  let Client = require('ssh2-sftp-client');

  const FILECONTENT = Buffer.from(process.env.CERTBOT_VALIDATION, 'utf8');
  const FILENAME = process.env.CERTBOT_TOKEN
  const DOMAIN = process.argv[2]
  const USERNAME = process.argv[3]
  const PASSWORD = process.argv[4]
  const DIR = `/${DOMAIN}/web/content/.well-known/acme-challenge/`

  let sftp = new Client();
  sftp.connect({
    host: 'ftp2.ftptoyoursite.com',
    port: '22',
    username: USERNAME,
    password: PASSWORD
  }).then(() => {
    console.log('Creating directory ', DIR)
    return sftp.mkdir(DIR, true);
  }).then((data) => {
    console.log('Puting file ' + (DIR + FILENAME))
    return sftp.put(FILECONTENT, DIR + FILENAME);
  }).then ((data) => {
    process.exit(0)
  }).catch((err) => {
    console.log(err, 'catch error');
  });
  return sftp;
}
upload().catch((e) => {
  console.error(e)
})