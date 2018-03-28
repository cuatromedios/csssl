# Cloud Sites SSL Certificate Generator
**Create and install a certificate in 2 minutes!** 

_By Ramses Moreno_

This script is based in the article published in the Liquid Web Help Center:
https://help.liquidweb.com/s/article/Installing-Let-s-Encrypt-SSL-in-Cloud-Sites

### Instlallation
(only tested on MacOS X)
1. Install Certbot locally: https://certbot.eff.org/all-instructions/#macos-none-of-the-above
2. Test certbot is installed running in the shell (may ask for user creation):
   ```
   sudo -H certbot certonly --manual --preferred-challenges http -d domain.com -d www.domain.com
   ```
3. Install Cloud Sites SSL Certificate Generator globally:
   ```
   npm install csssl -g
   ```

### Running
This script will run certbot, upload the http challenges contents using SFTP to Cloud Sites and then read the generated content in `/etc/letsencrypt` to create a file with the certificated needed in Cloud Sites Control Panel
1. Have handly your Secure FTP username and password. The user used has to have access to the root of the account where the domains folders are created, because the script is going to look for these folders, like `/www.domain.com/web/content`
2. Run `csssl` using sudo, because certbot will need it that way
   ```
   sudo csssl
   ```



[MIT LICENSE](LICENSE.txt)