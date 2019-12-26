# 管理员服务接口文档


<a name="overview"></a>
## 概览
本文档主要定义了与管理员有关的服务


### 版本信息
*版本* : 2.0.0


### URI scheme
*域名* : localhost:8082  
*基础路径* : /


### 标签

* login-controller : Login Controller
* notification-controller : Notification Controller
* report-controller : Report Controller
* verify-controller : Verify Controller


<a name="login-controller_resource"></a>
### Login-controller
管理员登录的相关接口


<a name="checkusingpost"></a>
#### check
验证登录
```
POST /administrators/login
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Query**|**name**  <br>*必填*|用户名|string|
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
/administrators/login?name=string&password=string
```


##### HTTP响应示例

###### 响应 200
```json
"object"
```


<a name="notification-controller_resource"></a>
### Notification-controller
与发送通知有关的接口


<a name="notifyanswerusingget"></a>
#### notifyAnswer
通知回答已被删除
```
GET /notifications/answers/{email}/{title}
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Path**|**email**  <br>*必填*|邮箱|string|
|**Path**|**title**  <br>*必填*|回答所处的问题的标题|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|无内容|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/notifications/answers/string/string
```


<a name="notifyidusingget"></a>
#### notifyId
通知账号已被封禁
```
GET /notifications/id/{email}
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Path**|**email**  <br>*必填*|邮箱|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|无内容|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/notifications/id/string
```


<a name="notifyquestionusingget"></a>
#### notifyQuestion
通知所发布的问题已被删除
```
GET /notifications/questions/{email}/{title}
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Path**|**email**  <br>*必填*|邮箱|string|
|**Path**|**title**  <br>*必填*|问题标题|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|无内容|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/notifications/questions/string/string
```


<a name="report-controller_resource"></a>
### Report-controller
与举报处理有关的接口


<a name="addreportusingpost"></a>
#### addReport
添加举报
```
POST /reports
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Query**|**authorId**  <br>*必填*|回答的人的ID|string|
|**Query**|**questionId**  <br>*必填*|问题ID|string|
|**Query**|**type**  <br>*必填*|举报的类型|string|


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
/reports?authorId=string&questionId=string&type=string
```


<a name="getreportsusingget"></a>
#### getReports
查询所有的举报信息
```
GET /reports
```


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|< [Report](#report) > array|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/reports
```


##### HTTP响应示例

###### 响应 200
```json
[ {
  "authorId" : "string",
  "count" : 0,
  "id" : "string",
  "questionId" : "string",
  "type" : "string"
} ]
```


<a name="deletereportusingdelete"></a>
#### deleteReport
删除一个举报
```
DELETE /reports/{id}
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Path**|**id**  <br>*必填*|举报的ID|string|


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
/reports/string
```


<a name="verify-controller_resource"></a>
### Verify-controller
与用户审核有关的接口


<a name="addverificationusingpost"></a>
#### addVerification
请求审核
```
POST /verification
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Query**|**intention**  <br>*必填*|意向分组|string|
|**Query**|**remark**  <br>*必填*|备注|string|
|**Query**|**userId**  <br>*必填*|用户ID|string|
|**FormData**|**multipartFile**  <br>*必填*|审核照片|file|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|无内容|
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
/verification?intention=string&remark=string&userId=string
```


###### 请求 formData
```json
"file"
```


<a name="getverificationusingget"></a>
#### getVerification
获取所有的审核信息
```
GET /verification
```


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|< [Map«string,object»](#b9842b7e7bafdd3f108cf03c5f61e1b2) > array|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/verification
```


##### HTTP响应示例

###### 响应 200
```json
[ null ]
```


<a name="getverimageusingget"></a>
#### getVerImage
获取审核的图片
```
GET /verification/images/{id}
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Path**|**id**  <br>*必填*|审核的图片ID|string|


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
/verification/images/string
```


##### HTTP响应示例

###### 响应 200
```json
"string"
```


<a name="deleteverificationusingdelete"></a>
#### deleteVerification
删除一个审核信息
```
DELETE /verification/{id}
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Path**|**id**  <br>*必填*|审核ID|string|


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
/verification/string
```




<a name="definitions"></a>
## 定义


<a name="report"></a>
### Report
举报实体类

|名称|说明|类型|
|---|---|---|
|**authorId**  <br>*必填*|回答的人的ID|string|
|**count**  <br>*必填*|举报次数|integer (int32)|
|**id**  <br>*必填*|举报ID|string|
|**questionId**  <br>*必填*|问题ID|string|
|**type**  <br>*必填*|举报类型|string|


<a name="view"></a>
### View

|名称|说明|类型|
|---|---|---|
|**contentType**  <br>*可选*|**样例** : `"string"`|string|





