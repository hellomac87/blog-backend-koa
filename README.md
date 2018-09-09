# blog-backend-koa

## Getting start

```terminal
$node src
```
---
### middleware
koa 어플리케이션은 미들워웨어 배열로 구성되어 있다.
app.use 함수는 미들웨어를 애플리케이션에 등록한다.

```js
app.use((ctx) => {
    ctx.body = 'hello world!';
})
```
app.use 의 파라미터로 하수가 하나의 미들웨어다. koa 미들웨어 함수는 두가지의 파라미터를 갖는다. `ctx`, `next`.

> `ctx` - 웹 요청과 응답 정보를 갖고있음

> `next` - 현재 처리 중인 미들웨어의 다음 미들웨어를 호출하는 함수

> 미들웨어는 `app.use`로 등록하는 순서대로 처리한다.

#### next()는 프로미스다.
next를 실행하면 프로미스를 반환한다. 따라서 다음 작업들이 끝나고 특정 작업을 수행할 수도 있다.
```js
app.use((ctx, next) => {
    console.log(1);
    next().then(() => {
        console.log('bye');
    });
});
```

#### async/await 사용
Koa는 async/await 정식 지원.

example
```js
app.use(async (ctx, next) => {
    console.log(1);
    await next();
    console.log('bye');
});
```

### Nodemon 사용
설치
```terminal
$yarn add --dev nodemon
```
pakage.json 수정

script 객체 추가
```json
...
"scripts": {
    "start": "node src",
    "start:dev": "nodemon --watch src/ src/index.js"
  }
```
실행 명령어
```terminal
$yarn start
$yarn start:dev
```
---

### koa-router
설치
```terminal
$yarn add koa-router
```
```js
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
```
첫번째 파라미터로 라우트의 path, 두번째 파라미터로 처리할 함수를 받는다.

#### 라우트 파라미터와 쿼리
- 라우터의 파라미터를 설정할 때는 /about/:name 형식으로 콜론(:)을 사용하여 라우트 경로를 설정한다
- 파라미터가 있을수도 없을수도 있다면 /about/:name? 의 형식으로 설정한다
- 이렇게 설정한 파라미터는 함수의 ctx.params 객체에서 조호 할 수 있다.

- URL 쿼리의 경우 /posts/?id=10 같은 형식으로 요청했다면 { id: 10}의 형태의 객체를 ctx.query 객체에서 조회할 수 있다. 쿼리스트링을 자동으로 객체 형태로 파싱해 주므로 별도의 파싱 함수를 돌릴 필요가 없다. 하지만 문자열 형태의 쿼리스트링을 조회해야 할 때는 ctx.querystring을 사용한다.
---

## REST API

> 메서드 종류

| 메서드 | 설명 |
| ---- | ---- |
| GET | 데이터를 조회할 때 사용합니다. |
| POST | 데이터를 등록할 때 사용합니다. 인증 작업을 거칠 때 사용하기도 합니다. |
| DELETE | 데이터를 지울 때 사용합니다. |
| PUT | 데이터를 새 정보로 통째로 교체할 때 사용합니다. |
| PATCH | 데이터의 특정 필드를 수정할 때 사용합니다. |

> 블로그 포스트용 REST API

| 종류 | 기능 |
| ---- | ---- |
| POST/posts | 포스트 작성 |
| GET/posts | 포스트 목록 조회 |
| GET/posts/:id | 특정 포스트 조회 |
| DELETE/posts/:id | 특정 포스트 삭제 |
| PATCH/posts/:id | 특정 포스트 업데이트(구현 방식에 따라 PUT으로도 사용 가능) |
| POST/posts/:id/comments | 특정 포스트에 덧글 등록 |
| GET/posts/:id/comments | 특정 포스트의 덧글 목록 조호 |
| DELETE/posts/:id/comments/:commentId | 특정 포스트의 특정 덧글 삭제 |

### 라우트 모듈화
src/api/index.js
```js
const Router = require('koa-router');
const api = new Router();

api.get('/test', (ctx) => {
    ctx.body = 'test';
});
// 라우터 내보내기
module.exports = api;
```

src/index.js
```js
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('./api', api.routes()); // api 라우트 적용

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log('listening to port 4000!');
})
```
---

