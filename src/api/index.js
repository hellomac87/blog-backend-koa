const Router = require('koa-router');

const api = Router();

api.get('/test', (ctx) => {
    ctx.body = 'test success';
});

// ㄹㅏ우트를 내보냅니다.
module.exports = api;