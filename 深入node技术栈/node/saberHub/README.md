# saberHub
一个基于node动态分享的小项目



# 用户请求

## 注册

<a id=注册> </a>

### 基本信息

**Path：** /users

**Method：** POST

**接口描述：**


### 请求参数

**Headers**

| 参数名称     | 参数值           | 是否必须 | 示例 | 备注 |
| ------------ | ---------------- | -------- | ---- | ---- |
| Content-Type | application/json | 是       |      |      |

**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> username</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap"></span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> password</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap"></span></td><td key=5></td></tr>
               </tbody>
              </table>


### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> username</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">用户名</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> password</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">密码</span></td><td key=5></td></tr>
               </tbody>
              </table>


## 测试授权

<a id=测试授权> </a>

### 基本信息

**Path：** /test

**Method：** GET

**接口描述：**


### 请求参数

**Headers**

| 参数名称      | 参数值       | 是否必须 | 示例                                                         | 备注          |
| ------------- | ------------ | -------- | ------------------------------------------------------------ | ------------- |
| Authorization | Bearer token | 是       | Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoic2FiZXIiLCJpYXQiOjE2MjIwNzg4NTgsImV4cCI6MTYyMjA4MjQ1OH0.T-fhBJbvjyg5NdhrZrH8_KQHQA3IaxLAhwDShRVXD6H10WhVQmkDaFTsU-Ijp1lFkmPmLfyZlybehrx8ORLq1oTS_caGfHpE8URwgiwjt_xoi_ib5ZZH3o9K_cnjExTsEXXRJsMr29ZXsgGfEROU7lIShod1r1qCET-m9UGeVrw | 测试token有效 |

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>


## 登录

<a id=登录> </a>

### 基本信息

**Path：** /login

**Method：** POST

**接口描述：**


### 请求参数

**Headers**

| 参数名称     | 参数值           | 是否必须 | 示例 | 备注 |
| ------------ | ---------------- | -------- | ---- | ---- |
| Content-Type | application/json | 是       |      |      |

**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> username</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap"></span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> password</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap"></span></td><td key=5></td></tr>
               </tbody>
              </table>


### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>


# 动态接口

## 为动态添加标签

<a id=为动态添加标签> </a>

### 基本信息

**Path：** /moment/:momentId/labels

**Method：** POST

**接口描述：**


### 请求参数

**Headers**

| 参数名称      | 参数值           | 是否必须 | 示例 | 备注 |
| ------------- | ---------------- | -------- | ---- | ---- |
| Content-Type  | application/json | 是       |      |      |
| Authorization | Bearer token     | 是       |      |      |

**路径参数**

| 参数名称 | 示例 | 备注 |
| -------- | ---- | ---- |
| momentId | 28   |      |

**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> labels</span></td><td key=1><span>string []</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">标签数组</span></td><td key=5><p key=3><span style="font-weight: '700'">item 类型: </span><span>string</span></p></td></tr><tr key=array-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> </span></td><td key=1><span></span></td><td key=2>非必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">标签名称</span></td><td key=5></td></tr>
               </tbody>
              </table>


## 修改动态

<a id=修改动态> </a>

### 基本信息

**Path：** /moment/:momentId

**Method：** PATCH

**接口描述：**


### 请求参数

**Headers**

| 参数名称      | 参数值           | 是否必须 | 示例 | 备注 |
| ------------- | ---------------- | -------- | ---- | ---- |
| Content-Type  | application/json | 是       |      |      |
| Authorization | Bearer token     | 是       |      |      |

**路径参数**

| 参数名称 | 示例 | 备注             |
| -------- | ---- | ---------------- |
| momentId | 28   | 需要修改的动态id |

**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> content</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">修改内容</span></td><td key=5></td></tr>
               </tbody>
              </table>


## 删除动态

<a id=删除动态> </a>

### 基本信息

**Path：** /moment/:momentId

**Method：** DELETE

**接口描述：**


### 请求参数

**Headers**

| 参数名称      | 参数值                            | 是否必须 | 示例 | 备注 |
| ------------- | --------------------------------- | -------- | ---- | ---- |
| Content-Type  | application/x-www-form-urlencoded | 是       |      |      |
| Authorization | Bearer token                      | 是       |      |      |

**路径参数**

| 参数名称 | 示例 | 备注         |
| -------- | ---- | ------------ |
| momentId | 28   | 删除动态的id |

## 发表动态

<a id=发表动态> </a>

### 基本信息

**Path：** /moment

**Method：** POST

**接口描述：**


### 请求参数

**Headers**

| 参数名称      | 参数值           | 是否必须 | 示例                                                         | 备注 |
| ------------- | ---------------- | -------- | ------------------------------------------------------------ | ---- |
| Content-Type  | application/json | 是       |                                                              |      |
| Authorization | Bearer token     | 是       | Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoic2FiZXIiLCJpYXQiOjE2MjIwNzg4NTgsImV4cCI6MTYyMjA4MjQ1OH0.T-fhBJbvjyg5NdhrZrH8_KQHQA3IaxLAhwDShRVXD6H10WhVQmkDaFTsU-Ijp1lFkmPmLfyZlybehrx8ORLq1oTS_caGfHpE8URwgiwjt_xoi_ib5ZZH3o9K_cnjExTsEXXRJsMr29ZXsgGfEROU7lIShod1r1qCET-m9UGeVrw |      |

**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> content</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">动态内容</span></td><td key=5></td></tr>
               </tbody>
              </table>


### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>


## 获取多条动态

<a id=获取多条动态> </a>

### 基本信息

**Path：** /moment

**Method：** GET

**接口描述：**


### 请求参数

**Query**

| 参数名称 | 是否必须 | 示例 | 备注                       |
| -------- | -------- | ---- | -------------------------- |
| offset   | 是       | 0    | 动态在数据库开始查找的位置 |
| size     | 是       | 4    | 查找多少条                 |

## 获取某一条动态

<a id=获取某一条动态> </a>

### 基本信息

**Path：** /moment/:momentId

**Method：** GET

**接口描述：**


### 请求参数

**路径参数**

| 参数名称 | 示例 | 备注   |
| -------- | ---- | ------ |
| momentId | 28   | 动态id |

# 评论接口

## 修改评论

<a id=修改评论> </a>

### 基本信息

**Path：** /comment/:commentId

**Method：** PATCH

**接口描述：**


### 请求参数

**Headers**

| 参数名称      | 参数值           | 是否必须 | 示例 | 备注 |
| ------------- | ---------------- | -------- | ---- | ---- |
| Content-Type  | application/json | 是       |      |      |
| Authorization | Bearer token     | 是       |      |      |

**路径参数**

| 参数名称  | 示例 | 备注 |
| --------- | ---- | ---- |
| commentId |      |      |

**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> content</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">内容</span></td><td key=5></td></tr>
               </tbody>
              </table>


## 删除评论

<a id=删除评论> </a>

### 基本信息

**Path：** /comment/:commentId

**Method：** DELETE

**接口描述：**


### 请求参数

**Headers**

| 参数名称      | 参数值                            | 是否必须 | 示例 | 备注 |
| ------------- | --------------------------------- | -------- | ---- | ---- |
| Content-Type  | application/x-www-form-urlencoded | 是       |      |      |
| Authorization | Bearer token                      | 是       |      |      |

**路径参数**

| 参数名称  | 示例 | 备注       |
| --------- | ---- | ---------- |
| commentId | 2    | 删除评论id |

## 发表评论

<a id=发表评论> </a>

### 基本信息

**Path：** /comment

**Method：** POST

**接口描述：**


### 请求参数

**Headers**

| 参数名称      | 参数值           | 是否必须 | 示例 | 备注 |
| ------------- | ---------------- | -------- | ---- | ---- |
| Content-Type  | application/json | 是       |      |      |
| Authorization | Bearer token     | 是       |      |      |

**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> momentId</span></td><td key=1><span>number</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">动态id</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> content</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">内容</span></td><td key=5></td></tr>
               </tbody>
              </table>


## 回复评论

<a id=回复评论> </a>

### 基本信息

**Path：** /comment/:comentId/reply

**Method：** POST

**接口描述：**


### 请求参数

**Headers**

| 参数名称      | 参数值           | 是否必须 | 示例 | 备注 |
| ------------- | ---------------- | -------- | ---- | ---- |
| Content-Type  | application/json | 是       |      |      |
| Authorization | Bearer token     | 是       |      |      |

**路径参数**

| 参数名称 | 示例 | 备注         |
| -------- | ---- | ------------ |
| comentId | 10   | 回复评论的id |

**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> content</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">评论内容</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> momentId</span></td><td key=1><span>number</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">动态id</span></td><td key=5></td></tr>
               </tbody>
              </table>


## 获取某条动态的评论

<a id=获取某条动态的评论> </a>

### 基本信息

**Path：** /comment

**Method：** GET

**接口描述：**


### 请求参数

**Query**

| 参数名称 | 是否必须 | 示例 | 备注     |
| -------- | -------- | ---- | -------- |
| momentId | 是       | 28   | 动态的id |

# 标签接口

## 添加标签

<a id=添加标签> </a>

### 基本信息

**Path：** /label

**Method：** POST

**接口描述：**


### 请求参数

**Headers**

| 参数名称      | 参数值           | 是否必须 | 示例 | 备注 |
| ------------- | ---------------- | -------- | ---- | ---- |
| Content-Type  | application/json | 是       |      |      |
| Authorization | Bearer token     | 是       |      |      |

**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> name</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">标签名</span></td><td key=5></td></tr>
               </tbody>
              </table>


## 获取标签

<a id=获取标签> </a>

### 基本信息

**Path：** /label

**Method：** GET

**接口描述：**


### 请求参数

**Query**

| 参数名称 | 是否必须 | 示例 | 备注           |
| -------- | -------- | ---- | -------------- |
| offset   | 是       | 2    | 标签查找起始点 |
| limit    | 是       | 4    | 条数           |

# 上传图片

## 上传动态配图

<a id=上传动态配图> </a>

### 基本信息

**Path：** /upload/picture

**Method：** POST

**接口描述：**


### 请求参数

**Headers**

| 参数名称      | 参数值              | 是否必须 | 示例 | 备注 |
| ------------- | ------------------- | -------- | ---- | ---- |
| Content-Type  | multipart/form-data | 是       |      |      |
| Authorization | Bearer token        | 是       |      |      |

**Query**

| 参数名称 | 是否必须 | 示例 | 备注   |
| -------- | -------- | ---- | ------ |
| momentId | 是       | 1    | 动态id |

**Body**

| 参数名称 | 参数类型 | 是否必须 | 示例 | 备注                           |
| -------- | -------- | -------- | ---- | ------------------------------ |
| picture  | file     | 是       |      | 图片,可上传多张,参数名称都一样 |



## 上传头像

<a id=上传头像> </a>

### 基本信息

**Path：** /upload/avatar

**Method：** POST

**接口描述：**


### 请求参数

**Headers**

| 参数名称      | 参数值              | 是否必须 | 示例 | 备注 |
| ------------- | ------------------- | -------- | ---- | ---- |
| Content-Type  | multipart/form-data | 是       |      |      |
| Authorization | Bearer token        | 是       |      |      |

**Body**

| 参数名称 | 参数类型 | 是否必须 | 示例 | 备注 |
| -------- | -------- | -------- | ---- | ---- |
| avatar   | file     | 是       |      |      |



## 展示某动态的某张图片

<a id=展示某动态的某张图片> </a>

### 基本信息

**Path：** /moment/images/:filename

**Method：** GET

**接口描述：**


### 请求参数

**路径参数**

| 参数名称 | 示例                                 | 备注       |
| -------- | ------------------------------------ | ---------- |
| filename | e149d7c0-bbc0-11eb-abf0-77d17140fe51 | 图片的名称 |

**Query**

| 参数名称 | 是否必须 | 示例  | 备注                                      |
| -------- | -------- | ----- | ----------------------------------------- |
| size     | 否       | large | 指定图片的尺寸有三种,small, middel, large |

## 展示用户头像

<a id=展示用户头像> </a>

### 基本信息

**Path：** /users/:userId/avatar

**Method：** GET

**接口描述：**


### 请求参数

**路径参数**

| 参数名称 | 示例 | 备注   |
| -------- | ---- | ------ |
| userId   | 15   | 用户id |