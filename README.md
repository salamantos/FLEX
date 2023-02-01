# FLEX
### Light curve visualization site

http://lc-dev.voxastro.org

FLEX - **F**ulu **L**ibrary **EX**amples - is a website visualizing light curves of astronomical transients (SN, TDE etc.) and Active Galactic Nucleas (AGN)

It uses approximation neural network models from Fulu library: https://github.com/HSE-LAMBDA/fulu

Light curves from Zwicky Transient Facility [(ZTF)](https://www.ztf.caltech.edu/)


### Development
#### Start Docker locally
1. Install [Docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04-ru) and [Docker Compose](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04-ru)
2. Run in terminal `docker-compose up -d`. If you need to restart just one container, run `docker-compose build flex_frontend && sudo docker-compose up -d flex_frontend`
3. Replace `HOST` in frontend/fulu.html and frontend/valc.html with `'http://localhost:7001/api'`. **IMPORTANT: don't forget to return it back to PROD value!**
4. Open frontend/index.html in browser (preferably Firefox). You may need to disable CORS. To do this, install adn enable CORS Everywhere Firefox extension
5. Now you need to upload data to your local setup. Simply replace host in upload script to `http://localhost:7001`