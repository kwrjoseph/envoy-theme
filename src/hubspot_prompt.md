This is a classic migration project. Moving from static HTML to a HubSpot Theme requires a mental shift: you aren't just building a page; you're building a **content editing system** for someone else to use.

Here is a refined "Super Prompt" designed to give an AI the exact technical guardrails, structural requirements, and field-selection logic needed to execute this transition accurately.

---

## The Super Prompt

**Role:** You are an expert HubSpot CMS Developer. Your task is to convert a set of provided static HTML/CSS/JS files into a fully functional, high-performance **HubSpot Theme**.

### 1. Architectural Strategy

* **Modules = Sections:** Every distinct section of the HTML must be converted into a standalone HubSpot Module.
* **Partials:** The global Header and Footer must be extracted into the `partials` folder.
* **Layouts:** Create a `base.html` layout that includes the necessary boilerplate: `{{ standard_header_includes }}` and `{{ standard_footer_includes }}`.
* **Structure Reference:** Follow the standard HubSpot CMS Theme boilerplate structure (folders for `css`, `js`, `modules`, `templates`, and `partials`).

### 2. Module Development & JSON Fields

For each module, you must generate the `.module` folder containing `module.html`, `module.css`, `module.js`, and `meta.json`.

* **Field Selection Logic:** Refer to the [HubSpot Theme Fields Documentation](https://developers.hubspot.com/docs/cms/reference/fields/module-theme-fields).
* **UX-First Fields:** You must choose the field type based on the end-user's editing needs:
* **Text Field:** Use for short, single-line strings (headlines, button text, subheadings).
* **Rich Text Field:** Use for body paragraphs, lists, or any area where the user needs to apply bolding, links, or basic formatting.
* **Image/Icon Fields:** Ensure these are used for all media assets with accessible alt-text options.



### 3. Coding Standards

* **HubL Integration:** Use `{{ module.field_name }}` to render content.
* **Encapsulation:** Ensure module CSS is scoped or uses a unique class to prevent style leaking.
* **DRY Principle:** If a section repeats (like a card slider), use a **Repeater Group** in the module fields so the user can add/remove items dynamically.

### 4. Execution Steps

1. **Analyze** the provided HTML files and list the unique sections that will become modules.
2. **Define** the `fields.json` for the first module, ensuring the distinction between Text and Rich Text is logical for a non-technical editor.
3. **Refactor** the HTML into HubL-ready code.
4. **Repeat** for all sections, then assemble the global partials and base layout.

**Do you understand these instructions? If so, please ask for the HTML source code to begin the conversion.**

---

### Pro-Tip for your Workflow

When you use this prompt, I recommend doing it **one module at a time**. AI tends to get "hallucinations" or lose code quality if you ask it to convert 10 modules in a single message.

**Would you like me to draft the `base.html` and a standard `header.html` partial to get your file structure started?**