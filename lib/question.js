
import inquirer from 'inquirer';

import { basename } from 'path';

export async function question(path) {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            default: basename(path)
        },
        {
            type: 'input',
            name: 'description',
            default: 'google extension'
        },
        {
            type: 'input',
            name: 'version',
            default: '1.0.0'
        },
        {
            type: 'number',
            name: 'manifest_version',
            default: 3
        },
        {
            type: 'input',
            name: 'backgroundScript',
            default: 'background.js'
        },
        {
            type: 'list',
            name: 'permissions',
            default: 'default',
            message: 'permissions: default selection contain storage、activeTab and scripting, while custom selection is empty',
            choices: ['default', 'custom']
        },
        {
            type: 'input',
            name: 'customPermissions',
            message: `custom permissions: use space to split your words`,
            when: function ({ permissions }) {
                return permissions === 'custom'
            }
        },
        {
            type: 'input',
            name: 'actionDefaultPopup',
            default: 'popup.html',
            suffix: 'html'
        },
        {
            type: 'input',
            name: 'optionsPage',
            default: 'options.html',
            suffix: 'html'
        }
    ])
}
