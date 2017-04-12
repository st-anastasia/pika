```bash
json="Content-Type: application/json"
token=`curl -s -H $json -X POST -d '{"username":"pika", "password": "123456"}' http://localhost:8000/api/session-token | jq -r '.token'`
auth="Authorization: Bearer $token"

curl -H $auth http://localhost:8000/api/user
curl -H $auth http://localhost:8000/api/photos

curl -H $auth -H "Content-Type: multipart/form-data" -X PUT -F "photo=@$HOME/Pictures/demo.jpg" -F metadata='{"title":"Lorem Ipsum", "description": "Lorem ipsum dolor sit amet"};type=application/json' http://localhost:8000/api/photos

```
