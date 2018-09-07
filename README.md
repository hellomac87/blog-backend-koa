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
result :
```terminal
listening to port 4000!
1
2
bye
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
result :
```terminal
listening to port 4000!
1
2
bye
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