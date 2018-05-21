## 动态假数据创建

### 遵循以下几点：

1. 按文件名称定义类型，如 `create.json`， 类型就是 create

2. 数据中 `jsid` 代表 sessionID，需要手动填写

3. 数据中 `users` 代表 模块名称(:name)，其中 `url` 代表访问路径， `data` 代表POST请求数据

4. 使用需在开发环境下访问，如：http://localhost:3000/test/:type/:name/:size 。 其中 (:size) 表示请求次数