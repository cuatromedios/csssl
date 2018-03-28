# Cloud Sites SSL Certificate Generator
**Create and validate a certificate in 1 minute!** 

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
3. The shell will ask you for sudo password
4. Provide the domains you will need certificates for separated by spaces, normally the www and not www variations of one domain, starting with the www variation because is going to be used to locate the remote folder to upload the challenges
5. Provide the SFTP username and password for your Cloud Sites web (it will automatically connect to ftp2.ftptoyoursite.com server)
  ```
  Password:
  **** Cloud Sites SSL certificate Generation and validator using Certbot
  Please enter the domains you need certificates for, the first domain is going to be used as the directory for SFTP, for example "www.domain.com domain.com"
  Domains: www.domain.com domain.com
  SFTP username: theusername
  SFTP password: 
  ```
6. The script will run certbot and upload the needed files to Cloud Sites.
7. Once finished, the script is going to generate a file in current directory with the certificates needed in Cloud Sites Control Panel, for example www.domain.com.txt
8. Open the generated txt file and copy / paste the certificates in each control panel fields (Certificate, Private Key and Intermediate), please note the intermediate certificate includes three certificates, copy all them in the field.
9. There is no need to use a dedicated IP, so you could uncheck that checkbox.
10. Thats all!

##### TODO:
* Catch errors
* Support certificate renewals


##### License:
[MIT LICENSE](LICENSE.txt)