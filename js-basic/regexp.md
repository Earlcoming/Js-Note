### 正则

```
. 单个字符，除换行符和行结束符
\w 查找单词字符,包含 [1-9A-z_]
\B 匹配非单词边界。
?=n	匹配任何其后紧接指定字符串 n 的字符串。
\0 查找 NUL 字符。
n? 匹配任何包含零个或一个 n 的字符串。
?!n 匹配任何其后没有紧接指定字符串 n 的字符串。
```


##### 正则上的方法

```
reg.test(str);
reg.exec(str);
```

##### 字符串上的方法

```
str.replace(reg, 'xx');
str.search(reg);
str.match(reg);
str.split(reg);

var str = '111';
var reg = /0/g;
var ma = str.search(reg);
console.log(ma) // -1 匹配到了返回0，否则返回-1
```


##### the-first-name变成theFirstName;
```
var str = 'the-first-name';
var reg = /-([A-z])/g;
var nstr = str.replace(reg, function ($, $1) {
    return $1.toUpperCase();
})
```

##### '100000000' 用每3个数字,隔开

```
var str = '100000000';
var reg = /(?=(\B\d{3})+$)/g;
var newStr = str.replace(reg, ',');
```

##### 'aaabbbcccdddeee' 字符串去重(用正则方法)
```
var str = 'aaabbbcccdddeee'
var reg = /(.)\1+/g;
str.replace(reg, '$1');
```

##### 'aabb变成bbaa'

```
var str = 'aabb';
var reg = /(\w)\1*(\w)\2*/g;
str.replace(reg, '$2$2$1$1');
```