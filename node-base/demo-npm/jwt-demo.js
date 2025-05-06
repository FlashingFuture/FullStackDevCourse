const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
// 서명: 토큰 발행
// {페이로드, 나만의 암호키} + SHA256
const payload = { foo: "bar" };
const secret = process.env.SECRET_KEY;

const token = jwt.sign(payload, secret);

console.log("token: ", token);
// 검증
const decoded = jwt.verify(token, secret);
console.log("decoded: ", decoded);

// 결과
// token:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE3NDYyODkwN
// DJ9.UtKKYueCSs_jqDKsYbgjooFCHOqpdwMn-7mnfYKmae4
// decoded:  { foo: 'bar', iat: 1746289042 }
