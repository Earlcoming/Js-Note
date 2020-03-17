# Proxy 应用

有一个对象，是观察者，它用于观察另外一个对象的属性值变化，当属性值变化后会收到一个通知，可能会做一些事。

## VUE 3.0 数据双向绑定原理

```js

const div = document.getElementById('container');
function observer(target, dom) {
    const proxy = new Proxy(target, {
        set(target, keys, value) {
            Reflect.set(target, keys, value);
            render();
        },
        get(target, keys) {
            return Reflect.get(target, keys);
        }
    })
    render();
    function render() {
        let html = '';
        for (const prop of Object.keys(target)) {
            html += `
            <p>
                <span>${prop}</span>
                <span>${target[prop]}</span>
            </p>
            `
        }
        dom.innerHTML = html;
    }
    return proxy;
}
const ob = observer({
    a: 1,
    b: 2
}, div)
ob.c = 10; //dom里面也会变成10
```

---

## 应用于构造函数

```js

class User {
    // 代理下面的构造函数赋值
    /* constructor(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    } */
}

function CreatConstructor(Class, ...name) {
    return proxy = new Proxy(Class, {
        construct(target, argumentsList) {
            const obj = Reflect.construct(target, argumentsList);
            name.forEach((item, i) => {
                obj[item] = argumentsList[i];
            })
            return obj;
        }
    })
}
const Useproxy = CreatConstructor(User, '姓名', '年龄', '性别');
const obj = new Useproxy('王大哥', 18, 'mail');

console.log(obj)

// User {姓名: "王大哥", 年龄: 18, 性别: "mail"}
```

---

## 验证函数参数
```js
function sum(a, b) {
    return a + b;
}

function validFunc(fn, ...types) {
    return new Proxy(fn, {
        apply(target, thisArgument, argumentsList) {
            console.log(argumentsList, types);
            types.forEach((t, i) => {
                if(typeof argumentsList[i] !== t){
                    throw Error(`第${i + 1}个参数${argumentsList[i]}与${t}不匹配`);
                }
            })
            return Reflect.apply(target, thisArgument, argumentsList) ;
        }
    })
}
const sumProxy = validFunc(sum, 'number', 'number');
console.log(sumProxy('1', 2))  // index.html:83 Uncaught Error: 第1个参数1与number不匹配
console.log(sumProxy(1, 2))  // 3


```