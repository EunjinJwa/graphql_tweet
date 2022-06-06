import {ApolloServer, gql} from "apollo-server";

let tweets = [
    {
        id: "1",
        text: "hello! first"
    },
    {
        id: "2",
        text: "hello! second"
    },
    {
        id: "3",
        text: "hello! third"
    },
];

let users = [{
    id: "1",
    firstName: "jinny",
    lastName: "J"
},
{
    id: "2",
    firstName: "Kassy",
    lastName: "J"
}]


// restAPI 로 보자면, GET /text, GET /hello 를 작성한 것과 같음.
const typeDefs = gql`

    type User {
        id: ID!,
        firstName: String!
        lastName: String
        fullName: String!
    }
    type Tweet {
        id: ID!,
        text: String!,
        author: User
    }
    type Query {
        allUsers: [User]
        allTweets: [Tweet]
        tweet(id: ID!): Tweet
        }    
    type Mutation {
        postTweet(text: String!, userId: ID): Tweet!
        deleteTweet(id: ID!): Boolean!
    }
`;

// GET /tweets  ==> allTweets: [Tweet]
// GET /tweet/:id  ==> tweet(id: ID). argument 추가.
// POST, PUT, DELETE => type Mutation 내에 작성함.

const resolvers = {
    Query: {
        allUsers() {
            return users;
        },
        allTweets() {
            return tweets;
        },
        tweet(root, {id}) {     // root의 위치는 고정이고, argument는 두 번째 인자값에 위치함.
            return tweets.find(tweet  => tweet.id == id);
        }
    },
    Mutation: {
        postTweet(_, {text, userId}) {
            const newTweet = {
                id: tweets.length + 1,
                text: text
            };
            tweets.push(newTweet);
            return newTweet;
        },
        deleteTweet(_, {id}) {
            const tweet = tweets.find(tweet => tweet.id === id);
            if(!tweet) return false;
            tweets = tweets.filter(tweet => tweet.id !== id);
            return true;
        }
    },
    User: {
        fullName({firstName, lastName}) {       // 앞서 실행한 User 타입의 결과인 User 데이터가 첫 번째 인자(root)에 담겨있음. 
            return `${firstName} ${lastName}`;
        }
    }
}


const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`Running on ${url}`)
});