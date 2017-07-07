```bash
json="content-type: application/json"
token=`curl -s -h $json -x post -d '{"username":"pika", "password": "123456"}' http://localhost:8000/api/session-token | jq -r '.token'`
auth="authorization: bearer $token"

curl -h $auth http://localhost:8000/api/user
curl -h $auth http://localhost:8000/api/photos

curl -H $auth -H "Content-Type: multipart/form-data" -X POST -F "photo=@$HOME/Pictures/demo.jpg" http://localhost:8000/api/photos

curl -H $auth -H $json -X PUT -F photo='{"title":"Lorem Ipsum", "description": "Lorem ipsum dolor sit amet"} http://localhost:8000/photos/:id'

```
