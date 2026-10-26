# Yargıtay-Karar-Arama

Suçlara ilişkin Yargıtay kararları için temel bir arama API MVP'si.

## Özellikler (MVP)

- Kararları metin bazlı arama (`q`)
- Suç türüne göre filtreleme (`offenseType`, kısmi ve büyük/küçük harf duyarsız)
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

Yanıttaki her karar için şu alanlar da döner:
- `detailUrl`: Karar detay API adresi
- `shareUrl`: Kararın paylaşım sayfası adresi

Örnek:

```bash
curl "http://localhost:3000/api/decisions?q=uyu%C5%9Fturucu&offenseType=hirsiz&year=2022"
```

### Karar detayı

`GET /api/decisions/:id`

Örnek:

```bash
curl "http://localhost:3000/api/decisions/2024-1CD-1001"
```

### Karar paylaşım sayfası

`GET /decisions/:id/share`

Bu sayfada karar metnine tıklayarak veya **Tümünü Seç** butonuyla metnin tamamı seçilebilir.
**Kopyala** butonu karar metnini panoya kopyalar.
**Kaydet (.txt)** butonu karar metnini indirilebilir dosya olarak kaydeder.
**Kararı Paylaş** butonu destekleniyorsa cihazın paylaşım penceresini açar, değilse bağlantıyı kopyalar.

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
