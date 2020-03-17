# set 集合

> 一直以来，JS只能使用数组和对象来保存多个数据，缺乏像其他语言那样拥有丰富的集合类型。因此，ES6新增了两种集合类型（set 和 map），用于在不同的场景中发挥作用。

**set用于存放不重复的数据**

1. 如何创建set集合

```js
new Set(); //创建一个没有任何内容的set集合

new Set(iterable); //创建一个具有初始内容的set集合，内容来自于可迭代对象每一次迭代的结果

```

2. 如何对set集合进行后续操作

- add(数据): 添加一个数据到set集合末尾，如果数据已存在，则不进行任何操作
  - set使用Object.is的方式判断两个数据是否相同，但是，针对+0和-0，set认为是相等
- has(数据): 判断set中是否存在对应的数据
- delete(数据)：删除匹配的数据，返回是否删除成功
- clear()：清空整个set集合
- size: 获取set集合中的元素数量，只读属性，无法重新赋值

3. 如何与数组进行相互转换

```js
const s = new Set([x,x,x,x,x]);
// set本身也是一个可迭代对象，每次迭代的结果就是每一项的值
const arr = [...s];  //数组去重

//字符串去重
const str = 'aaavvvbbbasdfsfsfsgg'; 
const strarr = [...new Set(str)].join('');
```

4. 如何遍历

1). 使用for-of循环
2). 使用set中的实例方法forEach

注意：set集合中不存在下标，因此forEach中的回调的第二个参数和第一个参数是一致的，均表示set中的每一项

### set 应用

```js
//  两个数组的并集、交集、差集 （不能出现重复项），得到的结果是一个新数组
    const arr1 = [33, 22, 55, 33, 11, 33, 5];
    const arr2 = [22, 55, 77, 88, 88, 99, 99];

    //并集
    // const result = [...new Set(arr1.concat(arr2))];
    console.log("并集", [...new Set([...arr1, ...arr2])]);

    const cross = [...new Set(arr1)].filter(item => arr2.indexOf(item) >= 0);
    //交集
    console.log("交集", cross)

    //差集
    // console.log("差集", [...new Set([...arr1, ...arr2])].filter(item => arr1.indexOf(item) >= 0 && arr2.indexOf(item) < 0 || arr2.indexOf(item) >= 0 && arr1.indexOf(item) < 0))
    console.log("差集", [...new Set([...arr1, ...arr2])].filter(item => cross.indexOf(item) < 0))
```
***

# map集合

键值对（key value pair）数据集合的特点：键不可重复

map集合专门用于存储多个键值对数据。

在map出现之前，我们使用的是对象的方式来存储键值对，键是属性名，值是属性值。

使用对象存储有以下问题：

1. 键名只能是字符串
2. 获取数据的数量不方便
3. 键名容易跟原型上的名称冲突


1. 如何创建map

```js
new Map(); //创建一个空的map
new Map(iterable); //创建一个具有初始内容的map，初始内容来自于可迭代对象每一次迭代的结果，但是，它要求每一次迭代的结果必须是一个长度为2的数组，数组第一项表示键，数组的第二项表示值

const mp = new Map([["a", 1], ["b", 2], ["c", 3]])
console.log(mp)
```

2. 如何进行后续操作

- size：只读属性，获取当前map中键的数量
- set(键, 值)：设置一个键值对，键和值可以是任何类型
  - 如果键不存在，则添加一项
  - 如果键已存在，则修改它的值
  - 比较键的方式和set相同
- get(键): 根据一个键得到对应的值
- has(键)：判断某个键是否存在
- delete(键)：删除指定的键
- clear(): 清空map

```js
const mp = new Map([["a", 1], ["b", 2], ["c", 3]]);
mp.set({}, 'a');
mp.set("a", 'a')
console.log(mp)
// Map(4) {"a" => "a", "b" => 2, "c" => 3, {…} => "a"}

```

3. 和数组互相转换

和set一样

4. 遍历

- for-of，每次迭代得到的是一个长度为2的数组
- forEach，通过回调函数遍历
  - 参数1：每一项的值
  - 参数2：每一项的键
  - 参数3：map本身

```js
const mp = new Map([["a", 1], ["b", 2], ["c", 3]]);
mp.forEach((key, value, self) => {
    console.log(key, value, self)
})

// a a Map(4) {"a" => "a", "b" => 2, "c" => 3, {…} => "a"}
// index.html:144 2 "b" Map(4) {"a" => "a", "b" => 2, "c" => 3, {…} => "a"}
// index.html:144 3 "c" Map(4) {"a" => "a", "b" => 2, "c" => 3, {…} => "a"}
// index.html:144 a {} Map(4) {"a" => "a", "b" => 2, "c" => 3, {…} => "a"}

```