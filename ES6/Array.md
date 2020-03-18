# Array 方法

## filter(cb(ele, i, arr));

callback

用来测试数组的每个元素的函数。返回 true 表示该元素通过测试，保留该元素，false 则不保留。它接受以下三个参数：ele i arr

返回值是一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组

```js
const arr = [1, 2, 3, 4, 5];
const arra = arr.filter( ele => ele >= 3);
console.log(arra);  //3 4 5

const arr1 = ['a', 'b', 'c', 'd'];
const arr2 = ['a', 'b'];
console.log(arr1.filter(ele => !arr2.includes(ele)));  //c d

```

## map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

## every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

> 注意：若收到一个空数组，此方法在一切情况下都会返回 true。




