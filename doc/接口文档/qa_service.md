# 问答服务接口文档


<a name="overview"></a>
## 概览
本文档定义了与提问以及回答有关的接口。


### 版本信息
*版本* : 2.0.0


### URI scheme
*域名* : localhost:8087  
*基础路径* : /


### 标签

* qa-controller : QA Controller
* query-controller : Query Controller
* recommend-controller : Recommend Controller




<a name="paths"></a>
## 资源

<a name="qa-controller_resource"></a>
### Qa-controller
与问题和回答相关的接口


<a name="addanswerusingpost"></a>
#### addAnswer
添加一个回答
```
POST /qa/answers
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Query**|**authorId**  <br>*必填*|回答用户的ID|string|
|**Query**|**description**  <br>*必填*|回答内容|string|
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
/qa/answers?authorId=string&description=string&questionId=string
```


<a name="updateanswerusingput"></a>
#### updateAnswer
修改回答
```
PUT /qa/answers
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Query**|**authorId**  <br>*必填*|回答用户的ID|string|
|**Query**|**description**  <br>*必填*|修改的回答内容|string|
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
/qa/answers?authorId=string&description=string&questionId=string
```


<a name="addcommentusingput"></a>
#### addComment
添加对回答的评论
```
PUT /qa/answers/comments
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Query**|**authorId**  <br>*必填*|回答用户的ID|string|
|**Query**|**commentatorId**  <br>*必填*|评论人ID|string|
|**Query**|**description**  <br>*必填*|评论内容|string|
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
/qa/answers/comments?authorId=string&commentatorId=string&description=string&questionId=string
```


<a name="deleteanswerusingdelete"></a>
#### deleteAnswer
删除用户回答
```
DELETE /qa/answers/{questionId}/{authorId}
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Path**|**authorId**  <br>*必填*|回答用户的ID|string|
|**Path**|**questionId**  <br>*必填*|问题ID|string|


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
/qa/answers/string/string
```


<a name="updatelikesusingput"></a>
#### updateLikes
回答点赞
```
PUT /qa/likes
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Query**|**authorId**  <br>*必填*|回答用户ID|string|
|**Query**|**likeUserId**  <br>*必填*|点赞人ID|string|
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
/qa/likes?authorId=string&likeUserId=string&questionId=string
```


<a name="addquestionusingpost"></a>
#### create a question by giving some details
添加问题
```
POST /qa/questions
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Query**|**askerId**  <br>*必填*|提问人ID|string|
|**Query**|**description**  <br>*必填*|问题内容描述|string|
|**Query**|**school**  <br>*必填*|发布学校|string|
|**Query**|**title**  <br>*必填*|标题|string|


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
/qa/questions?askerId=string&description=string&school=string&title=string
```


<a name="updatequestionusingput"></a>
#### updateQuestion
修改问题
```
PUT /qa/questions
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Query**|**description**  <br>*必填*|修改的问题内容|string|
|**Query**|**questionId**  <br>*必填*|问题ID|string|
|**Query**|**title**  <br>*必填*|修改的问题标题|string|


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
/qa/questions?description=string&questionId=string&title=string
```


<a name="deletequestionusingdelete"></a>
#### deleteQuestion
删除问题
```
DELETE /qa/questions/{questionId}
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Path**|**questionId**  <br>*必填*|问题ID|string|


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
/qa/questions/string
```


<a name="query-controller_resource"></a>
### Query-controller
与查询有关的接口


<a name="getquestionbyregexusingget"></a>
#### getQuestionByRegex
通过标题模糊查询问题
```
GET /answers/regex/{regex}/{school}
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Path**|**regex**  <br>*必填*|查询内容|string|
|**Path**|**school**  <br>*必填*|问题所属的区域|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|< [Question](#question) > array|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/answers/regex/string/string
```


##### HTTP响应示例

###### 响应 200
```json
[ {
  "answerList" : [ {
    "answerComments" : [ {
      "comment" : "string",
      "commentatorId" : "string"
    } ],
    "authorId" : "string",
    "description" : "string",
    "likes" : 0,
    "likesMap" : {
      "string" : true
    },
    "updateTime" : "string"
  } ],
  "askerId" : "string",
  "description" : "string",
  "questionId" : "string",
  "school" : "string",
  "title" : "string",
  "updateTime" : "string"
} ]
```


<a name="getquestionbyquestionidusingget"></a>
#### getQuestionByQuestionId
通过问题ID查询问题，并调用更新浏览记录的接口
```
GET /question/{questionId}/{userId}
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Path**|**questionId**  <br>*必填*|问题ID|string|
|**Path**|**userId**  <br>*必填*|查看问题的用户ID|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|[Question](#question)|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/question/string/string
```


##### HTTP响应示例

###### 响应 200
```json
{
  "answerList" : [ {
    "answerComments" : [ {
      "comment" : "string",
      "commentatorId" : "string"
    } ],
    "authorId" : "string",
    "description" : "string",
    "likes" : 0,
    "likesMap" : {
      "string" : true
    },
    "updateTime" : "string"
  } ],
  "askerId" : "string",
  "description" : "string",
  "questionId" : "string",
  "school" : "string",
  "title" : "string",
  "updateTime" : "string"
}
```


#### getQuestionByQuestionIdWithoutUpdatingHistoryList
在历史记录界面点击问题查看问题详情，不调用更新浏览记录的接口
```
GET /question/{questionId}/{userId}
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Path**|**questionId**  <br>*必填*|问题ID|string|
|**Path**|**userId**  <br>*必填*|查看问题的用户ID|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|[Question](#question)|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/question/string/string
```


##### HTTP响应示例

###### 响应 200
```json
{
  "answerList" : [ {
    "answerComments" : [ {
      "comment" : "string",
      "commentatorId" : "string"
    } ],
    "authorId" : "string",
    "description" : "string",
    "likes" : 0,
    "likesMap" : {
      "string" : true
    },
    "updateTime" : "string"
  } ],
  "askerId" : "string",
  "description" : "string",
  "questionId" : "string",
  "school" : "string",
  "title" : "string",
  "updateTime" : "string"
}
```


<a name="getquestionbyaskeridusingget"></a>
#### getQuestionByAskerId
查询用户提出的所有问题
```
GET /questions/{askerid}
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Path**|**askerid**  <br>*必填*|问题的人的ID|string|


##### 响应

|HTTP代码|说明|类型|
|---|---|---|
|**200**|OK|< [Map«string,string»](#ec171edd847026ed605d65393fdab658) > array|
|**401**|Unauthorized|无内容|
|**403**|Forbidden|无内容|
|**404**|Not Found|无内容|


##### 生成

* `\*/*`


##### HTTP请求示例

###### 请求 path
```
/questions/string
```


##### HTTP响应示例

###### 响应 200
```json
[ { } ]
```


<a name="getschoollistusingget"></a>
#### getSchoolList
查询当前的学校列表
```
GET /schools
```


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
/schools
```


##### HTTP响应示例

###### 响应 200
```json
[ "string" ]
```


<a name="recommend-controller_resource"></a>
### Recommend-controller
与推荐有关的接口


<a name="getrecommendsusingget"></a>
#### getRecommends
首页推荐
```
GET /recommends/{university}
```


##### 参数

|类型|名称|说明|类型|
|---|---|---|---|
|**Path**|**university**  <br>*必填*|用户学校|string|


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
/recommends/string
```


##### HTTP响应示例

###### 响应 200
```json
[ null ]
```




<a name="definitions"></a>
## 定义

<a name="answer"></a>
### Answer
回答实体类

|名称|说明|类型|
|---|---|---|
|**answerComments**  <br>*可选*|问题评论|< [Comment](#comment) > array|
|**authorId**  <br>*必填*|回答的人的ID|string|
|**description**  <br>*必填*|回答内容|string|
|**likes**  <br>*可选*|点赞数量|integer (int32)|
|**likesMap**  <br>*可选*|点赞的用户表|< string, boolean > map|
|**updateTime**  <br>*必填*|更新时间|string|


<a name="comment"></a>
### Comment
评论实体类

|名称|说明|类型|
|---|---|---|
|**comment**  <br>*必填*|评论内容|string|
|**commentatorId**  <br>*必填*|评论人ID|string|


<a name="ec171edd847026ed605d65393fdab658"></a>
### Map«string,string»
*类型* : < string, string > map


<a name="question"></a>
### Question
问题实体类

|名称|说明|类型|
|---|---|---|
|**answerList**  <br>*可选*|回答列表|< [Answer](#answer) > array|
|**askerId**  <br>*必填*|发布问题的用户ID|string|
|**description**  <br>*必填*|问题内容|string|
|**questionId**  <br>*必填*|问题ID|string|
|**school**  <br>*必填*|学校`|string|
|**title**  <br>*必填*|问题标题|string|
|**updateTime**  <br>*必填*|更新时间|string|





