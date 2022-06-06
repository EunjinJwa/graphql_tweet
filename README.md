### GraphQL로 영화 API 만들기

노마드 코더 강의 실습
링크 : https://nomadcoders.co/graphql-for-beginners/lectures/3704

### Spec
node.js
Apollo Server

### setting
```sh
> npm init -y
> npm install apollo-server graphql
> npm install nodemon -D
```

### nodemon
코드가 수정될때마다 server.js를 실행시켜주는 dev tool. 


### 내용 정리
* graphql은 data의 shape을 미리 알고있어야 한다. 그렇지 못한채로 서버가 기동되면 아래와 같은 에러가 발생함.
```
throw Error('Apollo Server requires either an existing schema, modules or typeDefs');
Error: Apollo Server requires either an existing schema, modules or typeDefs
```
* SDL (Schema Definition Language): Schema를 설명하는 문법
```javascript 
const typeDefs = gql`
    type Query {
        text: String
        hello: String
    }    
`;
```
* `type Query`
    * 스키마 정의로, 필수로 작성해야함.
    * type Query { hello: String} 는 restAPI의 GET /hello 와 같음.
* `type Mutation`
    * 데이터를 조회하는 GET 은 Query로 작성하되, 변경이 생기는 작업은 Mutation 에 작성한다.







