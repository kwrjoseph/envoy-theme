# Envoy

## HubSpot CLI Setup

### 1. Authenticate

```bash
/Users/kjoseph/.npm-global/bin/hs account auth
```

- Choose **"Open HubSpot to copy your personal access key"**
- Log into the Envoy Medical HubSpot account (ID: **4188804**)
- Copy the personal access key and paste it back

### 2. Set Envoy as Default

```bash
/Users/kjoseph/.npm-global/bin/hs account use
```

### 3. Upload Theme

```bash
cd /Users/kjoseph/Documents/Antigravity_projects/atombase_clients/envoy
/Users/kjoseph/.npm-global/bin/hs cms upload envoy-theme envoy-theme
```

### 4. Watch for Changes

```bash
/Users/kjoseph/.npm-global/bin/hs cms watch envoy-theme envoy-theme
```

## Account Info

| Field      | Value             |
|------------|-------------------|
| Account    | Envoy Medical     |
| Account ID | 4188804           |
| Auth Type  | personalaccesskey |
