##### this 
```
this指向
1、函数预编译时候this指向是windows
2、全局作用域里的 this --> windows
3、call/apply 可以改变函数运行时this指向
4、obj.func(); func()里面的this指向obj
```

```
var foo = 123;
function print(){
    this.foo = 234;
    console.log(foo);
}
new print();
```

```
var name = "222";
var a = {
        name : "111",
        say :function () {
            console.log(this.name);
        }
    }
var fun = a.say;
fun();		
a.say(); 
var b = {
        name : '333',
        say :fucntion (fun) {
            fun();
        }
    }
b.say(a.say); 
b.say = a.say;
b.say();	
```

```
function print() {
    var marty = {
    name : 'marty',
    printName : function () {console.log(this.name)}
}
var test1 = {name : 'test1'};
var test2 = {name : 'test2'};
var test3 = {name : 'test3'};
test3.printName = marty.printName;
var printName2 = marty.printName.bind({name:123});
marty.printName.call(test1);
marty.printName.apply(test2);
marty.printName();
printName2();
test3.printName();
}
print();
```
