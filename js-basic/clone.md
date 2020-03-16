##### 深入克隆(利用递归)
```
var obj = {
    name : 'abc',
    age : 123,
    card : ['visa', 'master'],
    wife : {
        name : 'bcd',
        son : {
            name : 'aaa'
        }
    }
};
var obja = {

}

1、判断是不是原始值
2、判断是数组还是对象
3、建立相应的数组或对象

function deepClone(origin, target) {
    var target = target || {};
    for(var key in origin){
        if(origin.hasOwnProperty(key)){
            if(typeof origin[key] === 'object' && origin[key] != 'null'){
                if(Object.prototype.toString.call(origin[key]) === 'object Object'){
                    target[key] = {}
                }else if(Object.prototype.toString.call(origin[key]) === 'object Array'){
                    target[key] = []
                }
                deepClone(origin[key], target[key])
            }else{
                target[key] = origin[key];
            }
        }
    }
    return target;
}
```