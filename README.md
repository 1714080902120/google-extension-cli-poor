# a poor cli for google extension
it can only crate a default project which you can download in https://developer.chrome.com/docs/extensions/mv3/getstarted/ .

you can custom the project manifest

commands:
```bash
npm install google-extension-cli-poor
```

create a script in your package.json such as
```json
{
  "scripts": {
    "create": "create-extension --default"
  },
}
or quickly crate by adding --default

```
then you can use
```bash
npm run create
```