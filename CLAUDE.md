# HubSpot CMS Theme — AI Build Guide

This is a starter skeleton for building HubSpot CMS themes. It contains the **minimum required files** only — no templates or modules are included. Those are built per-project based on the client's static HTML/design.

---

## Authentication & Setup

### 1. Install HubSpot CLI

```bash
npm install -g @hubspot/cli
```

If installed locally or in a custom path, locate it:
```bash
which hs
# or check: ~/.npm-global/bin/hs
```

### 2. Authenticate

```bash
hs init
```

This opens a browser to generate a **Personal Access Key** (not API key). Select these scopes:
- **Content** (required for CMS uploads)
- **Design Manager** (required for theme/module management)

This creates `hubspot.config.yml` in the project root:
```yaml
defaultPortal: account-name
portals:
  - name: account-name
    portalId: 12345678
    authType: personalaccesskey
    personalAccessKey: >-
      pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

**IMPORTANT:** Never commit `hubspot.config.yml` to git — it contains secrets.

### 3. Verify Auth

```bash
hs accounts list
```

If auth expires, re-authenticate:
```bash
hs auth personalaccesskey
```

---

## Minimum Theme Structure

```
theme-name/
├── theme.json          ← Theme config (REQUIRED)
├── fields.json         ← Theme-level settings (REQUIRED)
├── css/
│   └── main.css        ← Global stylesheet
├── js/                 ← JavaScript (optional)
├── images/             ← Theme images (optional)
├── modules/            ← Custom modules (built per project)
│   └── example.module/
│       ├── meta.json
│       ├── fields.json
│       └── module.html
└── templates/
    ├── layouts/
    │   └── base.html   ← Base layout (REQUIRED)
    └── home.html       ← Page templates
```

Only 3 files are truly required: `theme.json`, `fields.json`, and `templates/layouts/base.html`. Everything else is built as needed.

---

## Upload Commands

### Full theme upload
```bash
hs cms upload --account=<PORTAL_ID> theme-name theme-name
```

### Single file upload (faster for iterating)
```bash
hs cms upload --account=<PORTAL_ID> theme-name/css/main.css theme-name/css/main.css
```

### Single module upload
```bash
hs cms upload --account=<PORTAL_ID> theme-name/modules/my-module.module theme-name/modules/my-module.module
```

### Watch mode (auto-upload on save)
```bash
hs watch --account=<PORTAL_ID> theme-name theme-name
```

---

## Building Modules

Each module is a directory with `.module` suffix containing 3 files:

### meta.json
```json
{
  "label": "Module Display Name",
  "css_assets": [{ "path": "../../css/main.css" }],
  "js_assets": [],
  "other_assets": [],
  "global": false,
  "host_template_types": ["PAGE"],
  "is_available_for_new_content": true
}
```

`host_template_types` options: `PAGE`, `BLOG_POST`, `BLOG_LISTING`, `EMAIL`

### fields.json
Array of field definitions. Common field types:

```json
[
  {
    "name": "title",
    "label": "Title",
    "type": "text",
    "required": false,
    "default": "Default Title"
  },
  {
    "name": "description",
    "label": "Description",
    "type": "richtext",
    "required": false,
    "default": "<p>Default description</p>"
  },
  {
    "name": "image",
    "label": "Image",
    "type": "image",
    "required": false,
    "responsive": true,
    "default": { "size_type": "auto", "src": "", "alt": null, "loading": "lazy" }
  },
  {
    "name": "link",
    "label": "Link",
    "type": "link",
    "required": false,
    "supported_types": ["EXTERNAL", "CONTENT"],
    "default": {
      "url": { "content_id": null, "type": "EXTERNAL", "href": "" },
      "open_in_new_tab": false,
      "no_follow": false
    }
  },
  {
    "name": "show_section",
    "label": "Show Section",
    "type": "boolean",
    "display": "toggle",
    "default": true
  },
  {
    "name": "layout",
    "label": "Layout",
    "type": "choice",
    "display": "select",
    "choices": [["option-value", "Option Label"], ["option-2", "Option 2"]],
    "default": "option-value"
  },
  {
    "name": "icon",
    "label": "Icon",
    "type": "icon",
    "icon_set": "fontawesome-5.0.10",
    "default": { "name": "check", "unicode": "f00c", "type": "SOLID" }
  },
  {
    "name": "bg_color",
    "label": "Background Color",
    "type": "color",
    "default": { "color": "#ffffff" }
  }
]
```

### Repeater/Group Fields
```json
{
  "name": "cards",
  "label": "Cards",
  "type": "group",
  "occurrence": {
    "min": null,
    "max": null,
    "default": 3,
    "sorting_label_field": "title"
  },
  "children": [
    { "name": "title", "label": "Title", "type": "text", "default": "Card Title" },
    { "name": "description", "label": "Description", "type": "text", "default": "Card description" }
  ],
  "default": [
    { "title": "Card 1", "description": "Description 1" },
    { "title": "Card 2", "description": "Description 2" }
  ]
}
```

### module.html (HubL Template)
```html
<section class="my-module">
  <div class="container">
    {% if module.title %}
    <h2>{{ module.title }}</h2>
    {% endif %}

    {% if module.description %}
    <div>{{ module.description }}</div>
    {% endif %}

    {% for card in module.cards %}
    <div class="card">
      <h3>{{ card.title }}</h3>
      <p>{{ card.description }}</p>
    </div>
    {% endfor %}
  </div>
</section>
```

---

## Building Templates

### Page Template (extends base layout)
```html
<!--
  templateType: page
  isAvailableForNewContent: true
  label: Page Name
  screenshotPath: ../images/template-previews/page-name.png
-->
{% extends "./layouts/base.html" %}

{% block body %}
<main id="main-content" class="body-container-wrapper">
  {% dnd_area 'dnd_area' class='body-container p-0', label='Main section' %}

    {% dnd_section %}
      {% dnd_module "module_instance_01"
        path='../modules/module-name'
        label='Display Label'
        title='Page Specific Title'
        description='<p>Page specific description</p>'
      %}
      {% end_dnd_module %}
    {% end_dnd_section %}

  {% end_dnd_area %}
</main>
{% endblock body %}
```

### Passing Repeater/Group Values in Templates
```html
{% dnd_module "cards_section"
  path='../modules/card-list'
  label='Cards'
  title='Our Services'
  cards=[{"title": "Service 1", "description": "Desc 1"}, {"title": "Service 2", "description": "Desc 2"}]
%}
{% end_dnd_module %}
```

### System Templates
For 404, 500, blog listing, blog post, search results, etc. These go in `templates/system/` or `templates/`:

```html
<!--
  templateType: error_page
  isAvailableForNewContent: false
  label: 404 Error
-->
```

Template types: `page`, `blog_listing`, `blog_post`, `error_page`, `search_results`, `membership_login`, `membership_register`, `membership_reset`, `password_prompt`, `subscription_preferences`, `unsubscribe_confirmation`

---

## Blog Templates

### Blog Listing
```html
<!--
  templateType: blog_listing
  isAvailableForNewContent: true
  label: Blog Listing
-->
{% extends "./layouts/base.html" %}
{% block body %}
<main>
  {% for content in contents %}
    <article>
      <h2><a href="{{ content.absolute_url }}">{{ content.name }}</a></h2>
      <p>{{ content.post_summary|truncatewords(30) }}</p>
    </article>
  {% endfor %}

  {% if contents.total_page_count > 1 %}
    <nav>{{ blog_page_listing(contents.total_page_count, current_page_num) }}</nav>
  {% endif %}
</main>
{% endblock body %}
```

### Blog Post
```html
<!--
  templateType: blog_post
  isAvailableForNewContent: true
  label: Blog Post
-->
{% extends "./layouts/base.html" %}
{% block body %}
<main>
  <article>
    <h1>{{ content.name }}</h1>
    <div>{{ content.post_body }}</div>
    {% if content.tag_list %}
      {% for tag in content.tag_list %}
        <a href="{{ blog_tag_url(group.id, tag.slug) }}">{{ tag.name }}</a>
      {% endfor %}
    {% endif %}
  </article>
</main>
{% endblock body %}
```

---

## CRITICAL ERRORS & FIXES

### 1. Reserved Field Name "label"
**Error:** `"field name cannot be 'label'"`
**Cause:** HubSpot reserves `"label"` as a system property for fields.
**Fix:** Never use `"name": "label"` in fields.json children. Use alternatives:
- `"name": "item_text"`, `"name": "card_label"`, `"name": "hub_text"`, `"name": "node_text"`

```json
// BAD - will fail
{ "name": "label", "label": "Label Text", "type": "text" }

// GOOD
{ "name": "item_text", "label": "Label Text", "type": "text" }
```

### 2. Icon Tag Disabled in Context
**Error:** `"'icon' is disabled in this context"`
**Cause:** The `{% icon %}` HubL tag is sometimes blocked in module contexts (inconsistent).
**Fix:** Use plain Font Awesome `<i>` tags instead:

```html
<!-- BAD - may fail -->
{% icon name="{{ item.icon.name }}" style="{{ item.icon.type }}" unicode="{{ item.icon.unicode }}" %}

<!-- GOOD - always works -->
<i class="{% if item.icon.type == 'REGULAR' %}far{% elif item.icon.type == 'LIGHT' %}fal{% else %}fas{% endif %} fa-{{ item.icon.name }}"></i>
```

**NOTE:** Some existing modules may work fine with `{% icon %}` — the error is inconsistent. If you hit it, switch to `<i>` tags.

### 3. Font Awesome Brands Not Available in Icon Field
**Error:** HubSpot's icon field type only supports SOLID, REGULAR, LIGHT — not BRANDS.
**Cause:** Cannot use `fab fa-hubspot`, `fab fa-linkedin`, etc. through the icon picker.
**Fix:** Use a `text` field for the CSS class instead:

```json
{
  "name": "icon_class",
  "label": "Icon Class",
  "type": "text",
  "default": "fab fa-hubspot",
  "inline_help_text": "Full Font Awesome class (e.g. fab fa-hubspot, fas fa-check)"
}
```

Then in module.html:
```html
<i class="{{ item.icon_class }}"></i>
```

### 4. Richtext Fields Return HTML
**Cause:** `richtext` fields already contain `<p>` tags.
**Fix:** Don't wrap in extra `<p>` tags:

```html
<!-- BAD - double wrapping -->
<p>{{ module.description }}</p>

<!-- GOOD -->
<div>{{ module.description }}</div>
<!-- Or just output directly -->
{{ module.description }}
```

### 5. Image Field src is Empty by Default
**Cause:** When no image is uploaded, `module.image.src` is an empty string, not null.
**Fix:** Check for empty string:

```html
{% if module.image.src %}
  <img src="{{ module.image.src }}" alt="{{ module.image.alt }}">
{% else %}
  <!-- Fallback image or placeholder -->
  <img src="{{ get_asset_url('../../images/placeholder.jpg') }}" alt="Placeholder">
{% endif %}
```

### 6. Link Field Nested Structure
**Cause:** Link fields have a deeply nested structure.
**Fix:** Always access the href through the full path:

```html
{% set href = module.button_link.url.href %}
{% if module.button_link.url.type is equalto "EMAIL_ADDRESS" %}
  {% set href = "mailto:" ~ href %}
{% endif %}
<a href="{{ href }}"
  {% if module.button_link.open_in_new_tab %}target="_blank" rel="noopener"{% endif %}>
  {{ module.button_text }}
</a>
```

### 7. Upload Errors with Special Characters in Text Fields
**Cause:** Unescaped quotes or special chars in default field values.
**Fix:** Use HTML entities in fields.json defaults and template parameters:
- `&rsquo;` for right single quote
- `&ldquo;` / `&rdquo;` for double quotes
- `&mdash;` for em dash
- `&amp;` for ampersand

---

## CSS Custom Properties Pattern

Define theme variables in `:root` and use throughout:

```css
:root {
    --black: #111111;
    --white: #ffffff;
    --off-white: #f8f8f6;
    --gray: #555555;
    --gray-light: #888888;
    --gray-border: #e5e5e5;
    --accent-gold: #e25db7;  /* Primary accent — change per project */
    --heading-font: 'Playfair Display', serif;
    --body-font: 'Inter', sans-serif;
}
```

**Page-specific theming:** Override `--accent-gold` on a wrapper class:
```css
.hubspot-page { --accent-gold: #ff5c35; }
```
Then add the class to the template's `<main>`:
```html
<main id="main-content" class="body-container-wrapper hubspot-page">
```

---

## Workflow: Converting Static HTML to HubSpot Theme

### Step 1: Analyze the static site
- Identify repeated sections (these become modules)
- Identify page layouts (these become templates)
- Extract CSS variables and design tokens
- List all fonts, icons, and external assets

### Step 2: Create the base layout
- Build `templates/layouts/base.html` with the header, footer, nav, and global scripts
- Include `{{ standard_header_includes }}` and `{{ standard_footer_includes }}`

### Step 3: Build modules
For each repeated section:
1. Create `modules/section-name.module/` directory
2. Create `meta.json` with label and asset references
3. Create `fields.json` with all editable fields + sensible defaults
4. Create `module.html` with HubL template logic
5. Add CSS to `css/main.css`

### Step 4: Build templates
For each page:
1. Create `templates/page-name.html`
2. Add template metadata comment
3. Extend base layout
4. Use `{% dnd_area %}` → `{% dnd_section %}` → `{% dnd_module %}` structure
5. Pass actual page content as module parameters (titles, descriptions, feature arrays)

### Step 5: Upload and test
```bash
hs cms upload --account=<PORTAL_ID> theme-name theme-name
```

### Step 6: Create pages in HubSpot
Pages are created in HubSpot's UI (Marketing → Website → Website Pages → Create), selecting the template. The default content from templates populates automatically.

---

## HubL Quick Reference

### Variables
```
{{ variable }}
{{ module.field_name }}
{{ content.name }}  ← page title
{{ content.absolute_url }}  ← page URL
```

### Conditionals
```
{% if module.title %}...{% endif %}
{% if module.layout is equalto "image-left" %}...{% endif %}
{% if "keyword" in variable|lower %}...{% endif %}
```

### Loops
```
{% for item in module.items %}
  {{ loop.index }}    ← 1-based
  {{ loop.index0 }}   ← 0-based
  {{ loop.first }}    ← boolean
  {{ loop.last }}     ← boolean
{% endfor %}
```

### Filters
```
{{ text|truncatewords(30) }}
{{ text|lower }}
{{ text|upper }}
{{ text|split(",") }}
{{ text|trim }}
{{ richtext|striptags }}
{{ date|datetimeformat('%B %d, %Y') }}
```

### Asset URLs
```
{{ get_asset_url("../../images/photo.jpg") }}
{{ get_public_template_url("custom/page/page-url") }}
```

### Blog-specific
```
{{ content.post_body }}
{{ content.post_summary }}
{{ content.featured_image }}
{{ content.publish_date }}
{{ content.blog_author.display_name }}
{{ content.tag_list }}
{{ blog_recent_posts('default', 3) }}
```

---

## HubSpot Resources

- **CMS CLI Docs:** https://developers.hubspot.com/docs/guides/cms/setup/getting-started-with-local-development
- **HubL Reference:** https://developers.hubspot.com/docs/reference/cms/hubl/overview
- **Module Fields:** https://developers.hubspot.com/docs/reference/cms/modules/fields
- **DnD Areas:** https://developers.hubspot.com/docs/reference/cms/hubl/tags/dnd-tags
- **Theme Structure:** https://developers.hubspot.com/docs/guides/cms/content/themes/overview
- **Blog HubL Variables:** https://developers.hubspot.com/docs/reference/cms/hubl/variables#blog-variables
- **Icon Field Reference:** https://developers.hubspot.com/docs/reference/cms/modules/fields#icon
- **CMS Boilerplate (official):** https://github.com/HubSpot/cms-theme-boilerplate

---

## Tips for AI Agents

1. **Always upload after changes** — HubSpot CMS is server-rendered. You cannot preview locally.
2. **Upload single files when iterating** — Full theme upload is slow. Upload just the changed file.
3. **Check upload output for errors** — Errors appear inline. Grep for `ERROR`, `error`, `FAIL`.
4. **Read the original static HTML first** — Before building any module, read the source to get exact content.
5. **Pass ALL content in templates** — Don't rely on field defaults matching the page. Pass titles, descriptions, features, button text explicitly.
6. **Use `get_asset_url()` for images** — Don't hardcode paths. Use HubSpot's asset URL function.
7. **Test with `hs cms upload`** — The upload validates fields.json, module.html, and template syntax.
8. **Avoid `{% icon %}` in new modules** — Use `<i class="fas fa-name">` to avoid the inconsistent "icon disabled" error.
9. **Never use `"name": "label"` in fields** — It's reserved. This is the most common gotcha.
10. **Font Awesome is pre-loaded** — HubSpot includes FA 5. No need to add CDN links in base.html (but you can upgrade to FA 6 if needed).
