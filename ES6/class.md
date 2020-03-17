## class 语法糖
> 传统的构造函数的问题
1. 属性和原型方法定义分离，降低可读性
2. 原型成员可以被枚举
3. 默认情况下，构造函数可以被当做普通函数使用
```js
function Animal(name, age, sex){
    this.name = name;
    this.age = age;
    this.sex = sex;
}
//实例方法(原型方法)
Animal.prototype.print = function () {
    console.log(`${this.name}`);
    console.log(`${this.age}`);
    console.log(`${this.sex}`);
}
const a = new Animal('狗',15, 'mail')
a.print();

for(var key in ani){
    console.log(key)
}
print是在原型上，我们默认是不可以被枚举的，传统函数可以被枚举
```

> class 构造类 特点
1. 类声明不会被提升，和let，const一样，存在暂时性死区
2. 类中所有的代码均在严格模式下执行
3. 类中所有的方法都是不可枚举的
4. 类的所有方法内部都不可当做构造函数来使用
5. 类的构造器必须使用new来调用

```js
class Animal{
    constructor(name, age, sex){
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    print () {
        console.log(`${this.name}`);
        console.log(`${this.age}`);
        console.log(`${this.sex}`);
    }
}
```
---

### 类的语法
1. 可计算的成员名
```js
const print = 'printName';
class Animal{
    constructor(name, age, sex){
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    [print] () {
        console.log(`${this.name}`);
        console.log(`${this.age}`);
        console.log(`${this.sex}`);
    }
}
```

2. getter 和 setter
```js
class Animal{
    constructor(name, age, sex){
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    //创建一个age属性，并给他加上getter，读取该属性时，会运行该函数
    get age(){
        return this.age + '岁';
    }
    //创建一个age属性，并给他加上setter，设置该属性时，会运行该函数
    set age(age) {
        if(age < 0){
            this.age = 0;
        }else{
            this.age = age;
        }
    }
}
```


3. 静态成员
```js
class Animal{
   a = 1;
   b = 2;
   static c = 3;
}
const A = new Animal();
console.log(A, Animal.c)
```

4. 字段初始化(ES7)
1) 使用static的字段初始化器，添加的是静态成员，在Animal上
2）未使用static的字段初始化器，添加的成员位于对象上
3) 箭头函数在字段初始化器位置上，指向当前对象(每次new构造函数时候，都会新创建一个print，占用内存，使用频率少的可以使用)
```js
class Test{
    constructor(a){
        this.a = 123;
    }
    print = () => {
        console.lot(this.a)
    }
}
```

5. 类表达式

```js
const A = class {
    a = 1; 
    b = 2;
}
```
---
### 类的继承 extends
```js
class Animal{
    constructor(type, name, age, sex){
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    print () {
        console.log(`${this.name}`);
        console.log(`${this.age}`);
        console.log(`${this.sex}`);
    }
    jiao () {
        return '叫';
    }
}
class Dogs extends Animal{
    constructor(name, age, sex){
        // super('狗', name, age, sex)
        super(type, name, age, sex)
    }
    jiao () {
        let a = super();
        console.log(a)
    }
}
```

1. super
```js
class Animal {
    constructor(type, name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    print() {
        console.log(`${this.name}`);
        console.log(`${this.age}`);
        console.log(`${this.sex}`);
    }
    jiao() {
        console.log('交');
    }
}
class Dogs extends Animal {
    constructor(type, name, age, sex) {
        // super('狗', name, age, sex)
        **super(type, name, age, sex)**
    }
    print() {
        super.print();
        console.log('myLove');
    }
}
const d = new Dogs('狗', '旺财', 1, 'mail');
console.log(d.jiao())
```

