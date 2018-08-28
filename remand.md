# 事项 

## 1、路由 设计

| 路径        | 方法   | get参数 | post参数                 | 是否需要登录 | 备注     |
| --------- | ---- | ----- | ---------------------- | ------ | ------ |
| /         | Get  |       |                        |        | 首页     |
| /register | get  |       |                        |        | 渲染注册页面 |
| /register | post |       | email /name / password |        | 处理注册请求 |
| /login    | get  |       |                        |        | 渲染登录页面 |
| /login    | post |       | email /password        |        | 处理登录请求 |
| /logout   | get  |       |                        |        | 处理退出请求 |

