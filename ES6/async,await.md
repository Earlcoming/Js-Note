## async  简化promise API

目的是简化在函数的返回值中对Promise的创建

async 用于修饰函数（无论是函数字面量还是函数表达式），放置在函数最开始的位置，被修饰函数的返回结果一定是 Promise 对象。

```js

async function test(){
    console.log(1);
    return 2;
}

//等效于

function test(){
    return new Promise((resolve, reject)=>{
        console.log(1);
        resolve(2);
    })
}

```

## await

**await关键字必须出现在async函数中！！！！**

await用在某个表达式之前，如果表达式是一个Promise，则得到的是thenable中的状态数据。

```js

async function test1(){
    console.log(1);
    return 2;
}

async function test2(){
    const result = await test1();
    console.log(result);
}

test2();
```

等效于

```js

function test1(){
    return new Promise((resolve, reject)=>{
        console.log(1);
        resolve(2);
    })
}

function test2(){
    return new Promise((resolve, reject)=>{
        test1().then(data => {
            const result = data;
            console.log(result);
            resolve();
        })
    })
}

test2();

```

如果await的表达式不是Promise，则会将其使用Promise.resolve包装后按照规则运行

//获取李华所在班级的老师信息
```js
// 辅助函数,把传进来的对象拼接成url的字符串
    function toData(obj) {
        if (obj === null) {
            return obj;
        }
        let arr = [];
        for (let i in obj) {
            let str = i + "=" + obj[i];
            arr.push(str);
        }
        return arr.join("&");
    }
    // 封装Ajax
    function ajax(obj) {
        return new Promise((resolve, reject) => {
            //指定提交方式的默认值
            obj.type = obj.type || "get";
            //设置是否异步，默认为true(异步)
            obj.async = obj.async || true;
            //设置数据的默认值
            obj.data = obj.data || null;
            // 根据不同的浏览器创建XHR对象
            let xhr = null;
            if (window.XMLHttpRequest) {
                // 非IE浏览器
                xhr = new XMLHttpRequest();
            } else {
                // IE浏览器
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            // 区分get和post,发送HTTP请求
            if (obj.type === "post") {
                xhr.open(obj.type, obj.url, obj.async);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                let data = toData(obj.data);
                xhr.send(data);
            } else {
                let url = obj.url + "?" + toData(obj.data);
                xhr.open(obj.type, url, obj.async);
                xhr.send();
            }
            // 接收返回过来的数据
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                        resolve(JSON.parse(xhr.responseText))
                    } else {
                        reject(xhr.status)
                    }
                }
            }
        })
    }
async function getTeacher() {
        //等待ajax请求返回的json数据
        const student = await ajax({
            url: './data/students.json'
        })
        // 以下代码相当与then的操作
        console.log(student);
        let cid;
        for (let i = 0; i < student.length; i++) {
            if (student[i].name === '李华') {
                cid = student[i].classId;
            }
        }

        //等待ajax请求返回的json数据
        const cls = await ajax({
            url: './data/classes.json?cid=' + cid
        })
        let ti;
        for (let i = 0; i < cls.length; i++) {
            if (cls[i].id == cid) {
                ti = cls[i].teacherId;
            }
        }

        //等待ajax请求返回的json数据
        const tc = await ajax({
            url: './data/teachers.json'
        })
        console.log(tc, 'tc 是url请求返回的数据');
        for (let i = 0; i < tc.length; i++) {
            if (tc[i].id === ti) {
                console.log(tc[i].name, tc[i].id, tc[i].gender)
            }
        }

    }
    getTeacher()
```