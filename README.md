# kikadica-vue

> Frontend part of the « who said it » project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8888
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# Install Apache
On Windows, run services.msc, stop "Service de publication du World Wide Web"
Port 80 is now free to use
Check that modules "mod_proxy_http" and "mod_proxy" are enabled
Add the following VirtualHost in "httpd.conf" file

<VirtualHost *:80>
    ProxyPreserveHost On

    # setup the proxy
    <Proxy *>
        Order allow,deny
        Allow from all
    </Proxy>                          
    ProxyPass /api/ http://localhost:3000/
    ProxyPassReverse /api/ http://localhost:3000/
    ProxyPass / http://localhost:8888/
    ProxyPassReverse / http://localhost:8888/
</VirtualHost>

Back can be reached by this kind of URL : http://localhost/api/quotes/page/1/perpage/1
Front can be reached by this kind of URL : http://localhost