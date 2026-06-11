# Yargıtay-Karar-Arama

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

## Açık kaynak kaynaktan karar çekme ve suç türüne göre kaydetme

Kararlar açık bir JSON API kaynağından çekilir, metin içeriğine göre suç türü sınıflandırılır ve
`src/data/by-offense` altında suç türü bazlı JSON dosyalarına yazılır.

### Beklenen kaynak formatı

Kaynak yanıtı aşağıdaki formatlardan birini dönebilir:

- Doğrudan dizi: `[{...}, {...}]`
- `items` alanı: `{ "items": [{...}] }`
- `results` alanı: `{ "results": [{...}] }`

Her kayıt için kullanılabilen alanlar: `id`, `decisionId`, `no`, `title`, `summary`, `text`,
`content`, `year`, `chamber`, `daire`, `offenseType`, `lawArticles`.

### Kullanım

```bash
npm run ingest -- \
  --source "https://ornek-kaynak.org/api/kararlar" \
  --query "hırsızlık"
```

Birden çok kaynak verilebilir:

```bash
npm run ingest -- \
  --source "https://kaynak1.org/api/kararlar" \
  --source "https://kaynak2.org/api/kararlar" \
  --query "uyuşturucu"
```

Opsiyonel çıktı dizini:

```bash
npm run ingest -- \
  --source "https://ornek-kaynak.org/api/kararlar" \
  --query "kasten yaralama" \
  --output "src/data/by-offense"
```
