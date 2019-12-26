# 学·知项目接口文档


<a name="overview"></a>
## 概览
本接口文档定义了用户服务中的所有接口。


### 版本信息
*版本* : 2.0.0


### URI scheme
*域名* : localhost:8081  
*基础路径* : /


### 标签

* login-controller : Login Controller
* register-controller : Register Controller
* user-controller : User Controller




<a name="paths"></a>
## 资源

<a name="login-controller_resource"></a>
### Login-controller
用户登录的相关接口


<a name="checkusingpost"></a>
#### check
用户登录
```
POST /login
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Query**|**email**  <br>*必填*|邮箱|string|
|**Query**|**password**  <br>*必填*|密码|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|object|
|**201**|Created|无内容|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 消耗

* `application/json`


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/login?email=string&password=string
```


##### HTTP响应示例

###### 响应 200
```json
"object"
```


<a name="register-controller_resource"></a>
### Register-controller
用户注册相关接口


<a name="adduserusingpost"></a>
#### addUser
添加一个用户
```
POST /register
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Query**|**email**  <br>*必填*|邮箱|string|
|**Query**|**password**  <br>*必填*|密码|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|boolean|
|**201**|Created|无内容|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 消耗

* `application/json`


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/register?email=string&password=string
```


##### HTTP响应示例

###### 响应 200
```json
true
```


<a name="checkandsendmailusingpost"></a>
#### checkAndSendMail
查询注册邮箱是否存在并发送验证码
```
POST /register/checkcode
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Query**|**email**  <br>*必填*|邮箱|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|string|
|**201**|Created|无内容|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 消耗

* `application/json`


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/register/checkcode?email=string
```


##### HTTP响应示例

###### 响应 200
```json
"string"
```


<a name="user-controller_resource"></a>
### User-controller
与用户有关的接口


<a name="setavatarusingpost"></a>
#### setAvatar
设置头像
```
POST /users/avatar
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Query**|**id**  <br>*必填*|用户ID|string|
|**FormData**|**multipartFile**  <br>*必填*|图片信息|file|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|boolean|
|**201**|Created|无内容|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 消耗

* `multipart/form-data`


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/users/avatar?id=string
```


###### 请求 formData
```json
"file"
```


##### HTTP响应示例

###### 响应 200
```json
true
```


<a name="avatarusingget"></a>
#### avatar
根据用户ID获取用户头像
```
GET /users/avatar/{id}
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Path**|**id**  <br>*必填*|用户ID|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|string (byte)|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 生成

* `image/png`
* `image/jpeg`


##### HTTP请求示例

###### 请求 path
```
/users/avatar/string
```


##### HTTP响应示例

###### 响应 200
```json
"string"
```


<a name="sendmodifymailusingpost"></a>
#### sendModifyMail
发送修改密码的提示邮件
```
POST /users/checkcode
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Query**|**id**  <br>*必填*|用户ID|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|string|
|**201**|Created|无内容|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 消耗

* `application/json`


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/users/checkcode?id=string
```


##### HTTP响应示例

###### 响应 200
```json
"string"
```


<a name="addfollowquestionidusingpost"></a>
#### addFollowQuestionId
添加收藏的问题ID
```
POST /users/followList
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Query**|**id**  <br>*必填*|用户ID|string|
|**Query**|**questionId**  <br>*必填*|问题ID|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|boolean|
|**201**|Created|无内容|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 消耗

* `application/json`


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/users/followList?id=string&questionId=string
```


##### HTTP响应示例

###### 响应 200
```json
true
```


<a name="getfollowquestionidusingget"></a>
#### getFollowQuestionId
获取用户收藏的所有问题的ID
```
GET /users/followList/{id}
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Path**|**id**  <br>*必填*|用户ID|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|< string > array|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/users/followList/string
```


##### HTTP响应示例

###### 响应 200
```json
[ "string" ]
```


<a name="deletefollowquestionidusingdelete"></a>
#### deleteFollowQuestionId
取消对某个问题的收藏，在收藏列表中删除该问题的ID
```
DELETE /users/followList/{id}/{questionId}
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Path**|**id**  <br>*必填*|用户ID|string|
|**Path**|**questionId**  <br>*必填*|问题ID|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|boolean|
|**204**|No Content|无内容|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/users/followList/string/string
```


##### HTTP响应示例

###### 响应 200
```json
true
```


<a name="gethistoryusingget"></a>
#### getHistory
获取用户的浏览记录
```
GET /users/history/{userId}
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Path**|**userId**  <br>*必填*|用户ID|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|< [History](#history) > array|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/users/history/string
```


##### HTTP响应示例

###### 响应 200
```json
[ {
  "id" : "string",
  "time" : 0
} ]
```


<a name="updatehistoryusingput"></a>
#### updateHistory
更新用户的浏览历史
```
PUT /users/history/{userId}
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Path**|**userId**  <br>*必填*|用户ID|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|无内容|
|**201**|Created|无内容|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 消耗

* `application/json`


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/users/history/string
```


<a name="updateuserusingput"></a>
#### updateUser
修改用户信息
```
PUT /users/information
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Query**|**age**  <br>*必填*|年龄|integer (int32)|
|**Query**|**id**  <br>*必填*|用户ID|string|
|**Query**|**name**  <br>*必填*|用户昵称|string|
|**Query**|**sex**  <br>*必填*|性别|string|
|**Query**|**signature**  <br>*必填*|个性签名|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|boolean|
|**201**|Created|无内容|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 消耗

* `application/json`


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/users/information?age=0&id=string&name=string&sex=string&signature=string
```


##### HTTP响应示例

###### 响应 200
```json
true
```


<a name="modifypasswordusingput"></a>
#### modifyPassword
修改密码
```
PUT /users/password
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Query**|**id**  <br>*必填*|用户ID|string|
|**Query**|**password**  <br>*必填*|密码|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|boolean|
|**201**|Created|无内容|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 消耗

* `application/json`


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/users/password?id=string&password=string
```


##### HTTP响应示例

###### 响应 200
```json
true
```


<a name="addquestionidusingpost"></a>
#### addQuestionId
用户发布一个问题，添加该问题的ID
```
POST /users/questions
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Query**|**id**  <br>*必填*|用户ID|string|
|**Query**|**questionId**  <br>*必填*|问题ID|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|无内容|
|**201**|Created|无内容|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 消耗

* `application/json`


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/users/questions?id=string&questionId=string
```


<a name="deletequestionidusingdelete"></a>
#### deleteQuestionId
删除一个问题
```
DELETE /users/questions
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Query**|**id**  <br>*必填*|用户ID|string|
|**Query**|**questionId**  <br>*必填*|问题ID|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|无内容|
|**204**|No Content|无内容|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/users/questions?id=string&questionId=string
```


<a name="getquestionidusingget"></a>
#### getQuestionId
获得用户所发布的所有问题的ID
```
GET /users/questions/{id}
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Path**|**id**  <br>*必填*|用户ID|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|< string > array|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/users/questions/string
```


##### HTTP响应示例

###### 响应 200
```json
[ "string" ]
```


<a name="updateschoolusingput"></a>
#### updateSchool
审核完成后，更新用户学校信息
```
PUT /users/verification
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Query**|**id**  <br>*必填*|用户ID|string|
|**Query**|**school**  <br>*必填*|学校名称|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|无内容|
|**201**|Created|无内容|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 消耗

* `application/json`


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/users/verification?id=string&school=string
```


<a name="getuserusingget"></a>
#### getUser
根据用户ID查询用户
```
GET /users/{id}
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Path**|**id**  <br>*必填*|用户ID|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|[User](#user)|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/users/string
```


##### HTTP响应示例

###### 响应 200
```json
{
  "age" : 0,
  "avatar" : {
    "data" : "string",
    "type" : 0
  },
  "email" : "string",
  "followList" : [ "string" ],
  "historyList" : [ {
    "id" : "string",
    "time" : 0
  } ],
  "id" : "string",
  "name" : "string",
  "password" : "string",
  "questionIdList" : [ "string" ],
  "sex" : "string",
  "signature" : "string",
  "telephone" : "string",
  "university" : "string"
}
```




<a name="definitions"></a>
## 定义

<a name="binary"></a>
### Binary

|名称|说明|类型|
|---|---|---|
|**data**  <br>*必填*|**模式** : `"^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==\|[A-Za-z0-9+/]{3}=)?$"`  <br>**样例** : `"string"`|string (byte)|
|**type**  <br>*可选*|**最小值** : `-128`  <br>**最大值** : `127`  <br>**样例** : `0`|integer (int32)|


<a name="history">用户浏览历史</a>
### History

|名称|说明|类型|
|---|---|---|
|**id**  <br>*必填*|用户ID|string|
|**time**  <br>*必填*|访问时间|integer (int64)|


<a name="user">用户实体类</a>
### User

|名称|说明|类型|
|---|---|---|
|**age**  <br>*可选*|年龄|integer (int32)|
|**avatar**  <br>*可选*|头像|[Binary](#binary)|
|**email**  <br>*必填*|邮箱|string|
|**followList**  <br>*可选*|问题收藏列表|< string > array|
|**historyList**  <br>*可选*|浏览历史列表|< [History](#history) > array|
|**id**  <br>*必填*|用户ID|string|
|**name**  <br>*可选*|昵称|string|
|**password**  <br>*必填*|密码|string|
|**questionIdList**  <br>*可选*|发布的问题列表|< string > array|
|**sex**  <br>*可选*|性别|string|
|**signature**  <br>*可选*|个性签名|string|
|**telephone**  <br>*可选*|电话|string|
|**university**  <br>*可选*|学校名称|string|





