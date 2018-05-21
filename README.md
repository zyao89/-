## 旧项目模块化开发迁移方案

### 支持以下几点:

1. 基于gulp的 `less` 和 `stylus` 动态编译
2. 基于gulp的 `lint` 检查
3. 基于express的开发环境babel实时编译，需要以 `*.es6.js` 命名
3. 基于webpack的模块化打包等


### 功能及运行方法：

- 开发环境运行
```
npm run dev
```

- 开发环境及部署环境同时运行（帮助检测gulp压缩后的内容是否有问题）
```
npm run start
```

- Less 实时监听编译服务
```
npm run lessw
```

- Stylus 实时监听编译服务
```
npm run stylusw
```

- Lint 检测
```
npm run lint
```

- Webpack 模块化编译，自动检测根目录下 `src` 目录中的文件进行编译，输出到根目录下 `Component` 目录下。
```
npm run wp
```

- Webpack 模块化实时编译。
```
npm run wpw
```
