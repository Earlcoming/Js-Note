## promise 没有消除回调，只是让回调变的可控
**unsettled => settled => thenable / catchable** 
> 未决状态 => 已决状态 => 后续数据处理   整件事叫promise
```
示例
const pro = new Promise((resolve, reject) => {
    // 未决阶段的处理
    setTimeout(() => {
        if (Math.random() > 0.5) {
            resolve(123)
        } else {
            reject(456)
        }
    }, 1000)
})
pro.then(data => {
    console.log(data)
}, err => {
    console.log(err)
})

```

> thenable // catchable 是异步执行
```
const proa = new Promise((resolve, reject) => {
    console.log('a');
    resolve(1);
    reject(234) //无效
    resolve('111) //无效
    console.log('b')
})
proa.then(data => {
    console.log(data)
})
console.log('c')
打印顺序 a b c 1
```
> catchable 单独注册
```
const pro = new Promise((resolve, reject) => {
    reject(122)
})
pro.catch( err => {
    console.log(err)
})
```

> 数据串联
```
const pro1 = new Promise((resolve, reject) => {
    throw 1;
})
const pro2 = pro1.then(result => {
    return result * 2
}, err => {
    return err * 3;
});
pro1.catch(err => {
    return err * 2;
})
//pro2类型：Promise对象
//pro2的状态：只管pro2 = 后面的pro1内容，不管下面pro1.catch的内容
pro2.then(result => console.log(result * 2), err => console.log(err * 3))

//输出：6
```
---
> 获取李华所在班级的老师信息
```
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
    // 获取李华所在班级的老师信息
    const pro = ajax({
        url: './data/students.json'
    }).then(result => {
        for (let i = 0; i < result.length; i++) {
            if (result[i].name === '李华') {
                return result[i].classId;
            }
        }
    }).then(cId => {
        // 返回的是李华班级所在的ID
        console.log(cId)
        return ajax({
            url: './data/classes.json?cId=' + cId
        }).then(cls => {
            // 返回的是classes
            console.log(cls, cId);
            for (let i = 0; i < cls.length; i++) {
                if (cls[i].id == cId) {
                    return cls[i].teacherId;
                }
            }
        })
    }).then(ti => {
        // 返回的是teacherId  ti
        console.log(ti);
        return ajax({
            url: './data/teachers.json'
        }).then(ts => {
            // ts 是url请求返回的数据
            console.log(ts, 'ts 是url请求返回的数据');
            for (let i = 0; i < ts.length; i++) {
                if (ts[i].id === ti) {
                    console.log(ts[i].name, ts[i].id,ts[i].gender )
                }
            }
        })
    })
```