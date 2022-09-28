export const manifestJsonStr = `{
    "name": "__name",
    "description": "__description",
    "version": "__version",
    "manifest_version": __manifest_version,
    "background": {
        "service_worker": "__backgroundScript"
    },
    "permissions": __permissions,
    "action": {
        "default_popup": "__actionDefaultPopup"
    },
    "options_page": "__optionsPage"
}`