const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// 라우터 설정
router.get('/', (ctx) => {
    ctx.body = 'home';
});

router.get('/about/:name?', (ctx) => {
    const { name } = ctx.params;
    // name 의 존재 유무에 따라 다른 결과 출력
    ctx.body = name ? `About ${name}` : `About`;
});

router.get('/posts', (ctx) => {
    const { id } = ctx.query;
    // id 의 존재 유무에 따라 다른 결과 출력
    ctx.body = id ? `Post #${id}` : `No Post id`;
});

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log('listening to port 4000!');
})