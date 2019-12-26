# 学·知项目邮件服务接口文档


<a name="overview"></a>
## 概览
本文档定义了邮件服务相关的接口


### 版本信息
*版本* : 2.0.0


### URI scheme
*域名* : localhost:8083  
*基础路径* : /


### 标签

* mail-controller : Mail Controller




<a name="paths"></a>
## 资源

<a name="mail-controller_resource"></a>
### Mail-controller
与邮件服务有关的接口


<a name="getcheckcodeusingget"></a>
#### getCheckCode
获取验证码
```
GET /checkcode/{email}
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Path**|**email**  <br>*必填*|邮箱|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|string|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/checkcode/string
```


##### HTTP响应示例

###### 响应 200
```json
"string"
```


<a name="sendnoanswerusingget"></a>
#### sendNoAnswer
发送删除回答的提醒邮件
```
GET /notifications/answers/{email}/{title}
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Path**|**email**  <br>*必填*|邮箱|string|
|**Path**|**title**  <br>*必填*|回答的问题的标题|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|boolean|
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


##### HTTP响应示例

###### 响应 200
```json
true
```


<a name="sendnoidusingget"></a>
#### sendNoId
发送封禁账号的提醒邮件
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


<a name="sendnoquestionusingget"></a>
#### sendNoQuestion
发送删除问题的提醒邮件
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
|**200**|OK|boolean|
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


##### HTTP响应示例

###### 响应 200
```json
true
```


<a name="getupdatecheckcodeusingget"></a>
#### getUpdateCheckCode
发送修改密码的验证码
```
GET /password_checkcode/{email}
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Path**|**email**  <br>*必填*|email|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|string|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/password_checkcode/string
```


##### HTTP响应示例

###### 响应 200
```json
"string"
```







