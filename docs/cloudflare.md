# Cloudflare — sosyo.org

Repo: [github.com/muratozden/sosyo](https://github.com/muratozden/sosyo)  
Origin sunucu: `178.104.131.90` (Hetzner, Caddy)

## DNS kayıtları

| Tip | Ad | İçerik | Proxy |
|-----|-----|--------|-------|
| A | `@` | `178.104.131.90` | Proxied (turuncu bulut) |
| A | `www` | `178.104.131.90` | Proxied |

Alternatif: `www` → CNAME → `sosyo.org`

## SSL/TLS

**SSL/TLS** → Overview → **Full (strict)**

- Origin’de Caddy Let’s Encrypt sertifikası var
- “Flexible” kullanma (origin HTTP kalır)

## Önerilen ayarlar

- **Always Use HTTPS**: On
- **Automatic HTTPS Rewrites**: On
- **Brotli**: On (Caddy zaten gzip/zstd veriyor; ikisi birlikte sorun çıkarmaz)

## Cache (statik Astro)

Deploy sonrası tam yayın için:

- **Caching** → **Purge Everything** (veya sadece `sosyo.org/*`)

Geliştirme sırasında sayfa HTML için kısa TTL veya Development Mode açılabilir.

## GitHub Actions (isteğe bağlı)

Repository → **Settings** → **Secrets and variables** → **Actions**:

| Secret | Değer |
|--------|--------|
| `DEPLOY_HOST` | `178.104.131.90` |
| `DEPLOY_USER` | `root` |
| `DEPLOY_SSH_KEY` | Sunucuya deploy yetkili private key (PEM) |

`main` branch’e her push’ta `/opt/sosyo/deploy-server.sh` çalışır. Kodigen etkilenmez.

## Manuel deploy (sunucuda)

```bash
/opt/sosyo/deploy-server.sh
```

## Lokal deploy (rsync)

```bash
./scripts/deploy-static.sh
```
