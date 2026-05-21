# Sosyo sunucu kurulumu (178.104.131.90)

Repo: https://github.com/muratozden/sosyo  
Cloudflare ayrıntıları: [docs/cloudflare.md](../docs/cloudflare.md)

## Yapı

| Site | Dizin | Caddy |
|------|-------|-------|
| Kodigen Datahub | `/opt/kodigen` (değişmedi) | `manager.datascraper.net` → `localhost:4321` |
| Sosyo (statik) | `/opt/sosyo/dist` | `sosyo.org`, `www.sosyo.org` → `file_server` |
| Sosyo kaynak | `/opt/sosyo/repo` | `git pull` + `npm run build` |

## Deploy

**Sunucu (GitHub’dan):**

```bash
/opt/sosyo/deploy-server.sh
```

**Lokal (rsync):**

```bash
./scripts/deploy-static.sh
```

**GitHub Actions:** `main` push → `.github/workflows/deploy.yml` (secrets gerekli)

## Caddy yedek

Yedekler: `/etc/caddy/Caddyfile.bak.*`
