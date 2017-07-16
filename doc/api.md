```bash
json="content-type: application/json"
token=`curl -s -H $json -X POST -d '{"username":"pika", "password": "123456"}' http://localhost:8000/api/session-token | jq -r '.token'`
auth="authorization: bearer $token"

curl -h $auth http://localhost:8000/api/user
curl -h $auth http://localhost:8000/api/photos

curl -H $auth -H "Content-Type: multipart/form-data" -X POST -F "photo=@$HOME/Pictures/demo.jpg" http://localhost:8000/api/photos

curl -H $auth -H $json -X PATCH -d '{"photo": {"title":"Lorem Ipsum", "description": "Lorem ipsum dolor sit amet"}}' http://localhost:8000/api/photos/595959be1a7e2c02de15132e

```
