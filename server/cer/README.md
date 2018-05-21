## 放置证书

### HTTP证书分为两个

1. *.crt

2. *.key

服务会动态加载证书返回为:

```js
{
  crt: [Object],
  certificate: [String], // cer内容
  key: [Object],
  privateKey: [String], // key内容
}
```