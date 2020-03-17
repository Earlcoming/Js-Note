# 新增的数组API

## 静态方法

- Array.of(...args): 使用指定的数组项创建一个新数组
- Array.from(arg): 通过给定的类数组 或 可迭代对象 创建一个新的数组。

## 实例方法

- arr.find(callback): 用于查找满足条件的第一个元素
- arr.findIndex(callback)：用于查找满足条件的第一个元素的下标
- arr.fill(data)：用指定的数据填充满数组所有的内容(只能传一个参数)
- arr.copyWithin(target, start?, end?): 在数组内部完成复制
- arr.includes(data)：判断数组中是否包含某个值，使用Object.is匹配(ES7内容)


> find 如果只找一个就用find，找多个用filter  findIndex可以传回调，indexOf不能穿回调函数

```js
const arr = [
    {id: 1, name: 'a'},
    {id: 2, name: 'b'},
    {id: 3, name: 'c'},
    {id: 4, name: 'd'},
    {id: 5, name: 'e'}
]

const name = arr.find(item => item.id == 5)
const nameIndex = arr.findindex(item => item.id == 5)
console.log(name)  // {id: 5, name: "e"}
console.log(nameIndex) // 4

// includes
const arrb = [1, 2, 3, 4, 5, 100];
const narrb = arrb.includes(100)
console.log(narrb);
```

