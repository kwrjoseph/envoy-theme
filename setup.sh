#!/bin/bash

# ==========================================
# HubSpot Theme Starter — Setup Script
# ==========================================
# Run this script to configure your project.
# Usage: bash setup.sh
# ==========================================

set -e

echo ""
echo "=========================================="
echo "  HubSpot Theme Starter — Setup"
echo "=========================================="
echo ""

# ---- Theme Name ----
read -p "Theme name (folder name, lowercase, no spaces) [theme-name]: " THEME_NAME
THEME_NAME=${THEME_NAME:-theme-name}

# ---- Theme Label ----
read -p "Theme display label [My Theme]: " THEME_LABEL
THEME_LABEL=${THEME_LABEL:-My Theme}

# ---- HubSpot Account ID ----
read -p "HubSpot Account/Portal ID (e.g. 23969332): " ACCOUNT_ID
while [ -z "$ACCOUNT_ID" ]; do
    echo "  Account ID is required."
    read -p "HubSpot Account/Portal ID: " ACCOUNT_ID
done

# ---- Accent Color ----
read -p "Primary accent color [#e25db7]: " ACCENT_COLOR
ACCENT_COLOR=${ACCENT_COLOR:-#e25db7}

# ---- Fonts ----
read -p "Heading font [Playfair Display]: " HEADING_FONT
HEADING_FONT=${HEADING_FONT:-Playfair Display}

read -p "Body font [Inter]: " BODY_FONT
BODY_FONT=${BODY_FONT:-Inter}

echo ""
echo "Configuring..."

# ---- Update config.json ----
cat > config.json << EOF
{
  "account_id": "$ACCOUNT_ID",
  "theme_name": "$THEME_NAME",
  "theme_label": "$THEME_LABEL",
  "accent_color": "$ACCENT_COLOR",
  "heading_font": "$HEADING_FONT",
  "body_font": "$BODY_FONT"
}
EOF

# ---- Rename theme directory if needed ----
if [ "$THEME_NAME" != "theme-name" ] && [ -d "theme-name" ]; then
    mv "theme-name" "$THEME_NAME"
    echo "  Renamed theme-name/ -> $THEME_NAME/"
fi

THEME_DIR="$THEME_NAME"

# ---- Update theme.json ----
if [ -f "$THEME_DIR/theme.json" ]; then
    # Use sed to update the label
    sed -i '' "s/\"label\": \"Theme Name\"/\"label\": \"$THEME_LABEL\"/" "$THEME_DIR/theme.json"
    echo "  Updated theme.json label"
fi

# ---- Update CSS accent color ----
if [ -f "$THEME_DIR/css/main.css" ]; then
    sed -i '' "s/--accent-gold: #e25db7/--accent-gold: $ACCENT_COLOR/" "$THEME_DIR/css/main.css"
    sed -i '' "s/--heading-font: 'Playfair Display'/--heading-font: '$HEADING_FONT'/" "$THEME_DIR/css/main.css"
    sed -i '' "s/--body-font: 'Inter'/--body-font: '$BODY_FONT'/" "$THEME_DIR/css/main.css"
    echo "  Updated CSS variables"
fi

# ---- Check HubSpot CLI ----
echo ""
HS_CMD=""
if command -v hs &> /dev/null; then
    HS_CMD="hs"
elif [ -f "$HOME/.npm-global/bin/hs" ]; then
    HS_CMD="$HOME/.npm-global/bin/hs"
fi

if [ -z "$HS_CMD" ]; then
    echo "  HubSpot CLI not found. Install it:"
    echo "    npm install -g @hubspot/cli"
    echo ""
    echo "  Then authenticate:"
    echo "    hs init"
else
    echo "  HubSpot CLI found: $HS_CMD"

    # Check if already authenticated
    if $HS_CMD accounts list 2>/dev/null | grep -q "$ACCOUNT_ID"; then
        echo "  Already authenticated with account $ACCOUNT_ID"
    else
        echo ""
        echo "  You need to authenticate. Run:"
        echo "    $HS_CMD init"
        echo ""
        echo "  Or if you have an existing config:"
        echo "    $HS_CMD auth personalaccesskey"
    fi
fi

# ---- Create upload/deploy scripts ----
cat > upload.sh << EOF
#!/bin/bash
# Upload full theme to HubSpot
ACCOUNT_ID=\$(python3 -c "import json; print(json.load(open('config.json'))['account_id'])")
THEME=\$(python3 -c "import json; print(json.load(open('config.json'))['theme_name'])")
HS_CMD=\$(command -v hs || echo "\$HOME/.npm-global/bin/hs")

echo "Uploading \$THEME to account \$ACCOUNT_ID..."
\$HS_CMD cms upload --account=\$ACCOUNT_ID \$THEME \$THEME
EOF
chmod +x upload.sh

cat > watch.sh << EOF
#!/bin/bash
# Watch for changes and auto-upload
ACCOUNT_ID=\$(python3 -c "import json; print(json.load(open('config.json'))['account_id'])")
THEME=\$(python3 -c "import json; print(json.load(open('config.json'))['theme_name'])")
HS_CMD=\$(command -v hs || echo "\$HOME/.npm-global/bin/hs")

echo "Watching \$THEME for changes (account \$ACCOUNT_ID)..."
\$HS_CMD watch --account=\$ACCOUNT_ID \$THEME \$THEME
EOF
chmod +x watch.sh

echo ""
echo "=========================================="
echo "  Setup Complete!"
echo "=========================================="
echo ""
echo "  Theme:    $THEME_DIR/"
echo "  Account:  $ACCOUNT_ID"
echo "  Accent:   $ACCENT_COLOR"
echo "  Fonts:    $HEADING_FONT / $BODY_FONT"
echo ""
echo "  Next steps:"
echo "  1. Authenticate:  hs init"
echo "  2. Build modules and templates"
echo "  3. Upload:        bash upload.sh"
echo "  4. Watch:         bash watch.sh"
echo ""
