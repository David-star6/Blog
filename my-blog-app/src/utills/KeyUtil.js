let key = {
    USER_LOGIN: 'userLogin',
    USER_Authorization: 'Authorization',
    USER_CENTER_ICON_HOME: 'home',
    USER_CENTER_ICON_UPLOAD: 'upload',
    // BASE_URL: ' http://127.0.0.1:8000'
    BASE_URL: 'http://47.104.227.20:9000',
}

export default key;


/*
nginx 配置
user root;

events {
    worker_connections  1024;
}

http{
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    include             /root/python/mysite/mime.types;
    default_type        application/octet-stream;
    #include /etc/nginx/conf.d/*.conf;
      gzip on;
        gzip_disable "msie6";
    server {
           listen       80;
      # listen       80 default_server;
      # listen       [::]:80 default_server;
      server_name  127.0.0.1;
     #proxy_set_header Host $host:$server_port;
     #proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header REMOTE-HOST $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
     charset     utf-8;
     # index index.html;
     # root /root/python/mysite;
    client_max_body_size 75M;
    access_log      /root/python/mysite/nginx_access.log;
    error_log       /root/python/mysite/nginx_error.log;


    location /media{
       alias /root/python/mysite/media;
    }

    location /static {
         alias /root/python/mysite/static;
    }

     location / {
        root /root/python/mysite;
        include     /etc/nginx/uwsgi_params;
        uwsgi_pass  127.0.0.1:8000;
        proxy_pass http://127.0.0.1:8000/;
     }

}
}
*/