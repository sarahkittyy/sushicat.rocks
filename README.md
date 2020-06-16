# sushicat.rocks

my cute lil homepage <33

## setup

first, edit the .env file

```
cp .env.example .env
```

create ur own self-signed cert for local https dev
```
openssl req -nodes -new -x509 -keyout server.key -out server.cert
```

then launch vagrant :)

```
vagrant up --provision-with deps,dev
```
