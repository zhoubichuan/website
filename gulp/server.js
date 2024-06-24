const browserSync = require('browser-sync');
const path = require('path');

 const serve = () => {
    return browserSync.create().init({
        notify: false,
        server: {
            baseDir: './',
            routes: {
                '/node_modules': path.resolve('node_modules')
            }
        }
    });
}
module.exports =serve