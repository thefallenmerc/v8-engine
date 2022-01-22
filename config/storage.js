
const { promises: fs } = require('fs');
const path = require('path');
const AppConfig = require('./app');

const storagePath = path.join(process.cwd(), "public");

module.exports = {
    storageDir: 'public',
    storagePath,


    // methods
    deleteFile: async (filePath) => {
        try {
            await fs.lstat(filePath);
        } catch (err) {
            return err;
        }

        return fs.unlink(filePath);
    }
}