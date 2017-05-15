require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var http = require('http');
var port = 7399;
var autoOpenBrowser = !!config.dev.autoOpenBrowser;
var proxyTable = config.dev.proxyTable;

//本地json文件读取
let musicJSON = require('../src/data/music-list');
var app = express()

var apiRoutes = express.Router();
// 获取 One 的接口
apiRoutes.get('/one/:page?', function(req, res) {
    let page = +req.params.page || 0;
    let url = 'http://v3.wufazhuce.com:8000/api/onelist/idlist/?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android';
    let idList = '';
    let getIdList = new Promise((resolve, reject) => {
        http.get(url, response => {
            response.on('data', data => {
                idList += data;
            });
            response.on('end', () => {
                resolve(idList);
            });
        })
    });
    let getOne = function(id) {
        let result = '';
        let url = 'http://v3.wufazhuce.com:8000/api/onelist/' + id + '/0?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android';
        return new Promise((resolve, reject) => {
            http.get(url, response => {
                response.on('data', data => {
                    result += data;
                });
                response.on('end', () => {
                    resolve(result);
                })
            })
        });
    }
    getIdList.then(idList => JSON.parse(idList).data).then(data => {
        return Promise.all(data.map((item) => {
            return getOne(item).then(data => JSON.parse(data));
        }))
    }).then(list => {
        list = JSON.parse(JSON.stringify(list));
        res.json(list[page]);
    })
});
//获取本地播放列表
apiRoutes.get('/music-list', function(req, res) {
    res.json({
        ret: 0,
        musicList: musicJSON
    });
});
// express代理请求
app.use('/api', apiRoutes);

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
        log: () => {}
    })
    // force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = {
            target: options
        }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
    _resolve = resolve
})

console.log('> 开启本地服务...')
devMiddleware.waitUntilValid(() => {
    console.log('> 监听 ' + uri + '\n')
        // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
    _resolve()
})

var server = app.listen(port)

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}