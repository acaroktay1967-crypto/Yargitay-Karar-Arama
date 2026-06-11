# Yargitay-Karar-Arama

Suçlara ilişkin Yargıtay kararları için temel bir arama API MVP'si.

## Özellikler (MVP)

- Kararları metin bazlı arama (`q`)
- Suç türüne göre filtreleme (`offenseType`)
- Daireye göre filtreleme (`chamber`)
- Yıla göre filtreleme (`year`)
- Sayfalama (`page`, `pageSize`)

## Kurulum

```bash
npm install
```

## Çalıştırma

```bash
npm start
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışır.

## Test

```bash
npm test
```

## API

### Sağlık kontrolü

`GET /health`

### Karar arama

`GET /api/decisions`

Örnek:

```bash
curl "http://localhost:3000/api/decisions?q=uyu%C5%9Fturucu&year=2022"
```
