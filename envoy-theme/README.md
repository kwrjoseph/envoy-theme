# Envoy Medical — HubSpot Theme

## Getting Started

### 1. Install HubSpot CLI

```bash
npm install -g @hubspot/cli
```

### 2. Authenticate

```bash
/Users/kjoseph/.npm-global/bin/hs account auth
```

- Choose **"Open HubSpot to copy your personal access key"**
- Log into the Envoy Medical HubSpot account (ID: **4188804**)
- Copy the personal access key and paste it back into the terminal

To verify auth:

```bash
/Users/kjoseph/.npm-global/bin/hs account list
```

### 3. Set Envoy as Default Account

```bash
/Users/kjoseph/.npm-global/bin/hs account use
```

Select the envoy account from the list.

### 4. Upload Theme

```bash
cd /Users/kjoseph/Documents/Antigravity_projects/atombase_clients/envoy
/Users/kjoseph/.npm-global/bin/hs cms upload envoy-theme envoy-theme
```

### 5. Watch for Changes (Dev Mode)

```bash
/Users/kjoseph/.npm-global/bin/hs cms watch envoy-theme envoy-theme
```

---

## Theme Structure

```
envoy-theme/
  css/main.css            — Global styles
  fields.json             — Theme-level settings (colors, fonts)
  theme.json              — Theme config
  modules/                — 26 custom modules
  templates/              — 28 page templates
    layouts/              — base.html, landing.html
    system/               — 404.html, under-construction.html
  images/template-previews/
```

## Account Info

| Field      | Value       |
|------------|-------------|
| Account    | Envoy Medical |
| Account ID | 4188804     |
| Auth Type  | personalaccesskey |

## Useful Commands

```bash
# Upload single file
/Users/kjoseph/.npm-global/bin/hs cms upload envoy-theme/css/main.css envoy-theme/css/main.css

# List remote files
/Users/kjoseph/.npm-global/bin/hs cms list envoy-theme

# Fetch remote file
/Users/kjoseph/.npm-global/bin/hs cms fetch envoy-theme/css/main.css

# Validate theme for marketplace
/Users/kjoseph/.npm-global/bin/hs cms theme marketplace-validate envoy-theme
```
