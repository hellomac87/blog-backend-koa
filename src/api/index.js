const Router = require('koa-router');
const posts = require('./posts');

const api = Router();

api.use('/posts', posts.routes());

// ㄹㅏ우트를 내보냅니다.
module.exports = api;