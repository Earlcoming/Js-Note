## Symbol 符合
- 符号是使用函数来创建的
const sym = Symbol();
- 符号设计的初衷，为了给对象设置私有属性
- 只能在对象内部使用，不能在外部使用
> 特点
- 符号没有字面量
- typeof 得到的类型是 symbol
- **每次调用Symbol() 函数得到的符号永远不相等，无论符号名是否相同**
- 符号可以作为对象的属性名存在，这种属性称之为符号属性
    - 开发者通过精心设计让这些属性无法通过常规方式被外界访问
    - 符号属性不能被枚举，因此在for-in 循环中无法获取到符号属性，Object.keys 方法也无法获取
    - Object.getOwnPropertyNames 尽管可以得到所有无法枚举的属性，但是仍然无法获取符号属性
    - ES6 Object.getOwnPropertySymbols 方法可以获取符号属性
- 符号无法被隐式转换，因此不能被用于数学运算、字符串拼接或者其他隐时转换的场景，但符号可以显示的转换成字符串，通过String构造函数即可，console.log之所以能输出，是因为它在内部进行了显示转换

```
const sym = Symbol('这是一个对象的属性')
const obj = {
    a : 1,
    b : 2,
    [sym]: 3
}
```

### 共享符号
 获取共享符号 Symbol.for()
```
const sym1 = Symbol.for();
const sym2 = Symbol.for();
console.log(sym1 === sym2) //true
```