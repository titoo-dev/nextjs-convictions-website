---
mode: edit
---

# Add Missing Translations

## Task
Analyze the provided translation files (en.json, fr.json, es.json) and add any missing translation keys to ensure all files have complete translation coverage across all supported languages.

## Requirements
- Compare all three translation files to identify missing keys in any language
- Add missing translations for keys that exist in one or more files but not in others
- Maintain consistent translation structure and hierarchy across all files
- Use appropriate and contextually accurate translations for each language
- Preserve existing translations without modification
- Follow the established naming conventions for translation keys

## Constraints
- Do not modify existing translation values unless they are clearly incorrect
- Maintain the exact same JSON structure and key hierarchy across all files
- Use kebab-case for file names if creating new translation files
- Ensure translations are culturally appropriate for each target language
- Keep translation keys descriptive and hierarchical (e.g., `petition.form.title`)

## Success Criteria
- All three translation files (en.json, fr.json, es.json) contain identical key structures
- No missing translation keys across any of the supported languages
- All new translations are contextually appropriate and grammatically correct
- JSON files remain properly formatted and valid
- Translation hierarchy and naming conventions are consistent