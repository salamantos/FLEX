#!/usr/bin/env bash

if [[ "$#" -lt "1" ]]; then
    _SERVICE=""
    echo "Deploy everything!"
else
    _SERVICE=" $1"
    echo "Deploy${_SERVICE}"
fi

main(){
    ssh -K mdemyanenko@lc-dev.voxastro.org "cd /var/www/light_curves && git pull && docker-compose build${_SERVICE} && docker-compose up -d${_SERVICE}"
}

main
