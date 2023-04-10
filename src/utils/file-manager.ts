import fs from 'fs';

const ROOT_DIRECTORY = require('path').resolve('./') + '/dist';

export function createStorageFolder(dir: string) {
    dir = `${ROOT_DIRECTORY}/${dir}`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

export function unlinkStorageFile(file: string) {
    file = `${ROOT_DIRECTORY}/${file}`;
    console.log(file)
    fs.unlink(file, () => { })
}