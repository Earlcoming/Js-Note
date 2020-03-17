## 文件上传 (ajax不刷新页面上传)

流程：

1. 客户端将文件数据发送给服务器
2. 服务器保存上传的文件数据到服务器端
3. 服务器响应给客户端一个文件访问地址

> 测试地址：http://101.132.72.36:5100/api/upload
> 键的名称（表单域名称）：imagefile

请求方法：POST
请求的表单格式：multipart/form-data
请求体中必须包含一个键值对，键的名称是服务器要求的名称，值是文件数据

> HTML5中，JS仍然无法随意的获取文件数据，但是可以获取到input元素中，被用户选中的文件数据
> 可以利用HTML5提供的FormData构造函数来创建请求体


```js
async function upload() {
    const inp = document.querySelector('#autor');
    console.log(inp.files);
    if(inp.files.length === 0) {
        alert('请选择您要上传的文件');
        return;
    }
    const formData = new FormData(); //构建请求体
    formData.append('imagefile', inp.files[0]); 
    const url = 'http://101.132.72.36:5100/api/upload';
    const resp = await fetch(url, {
        method: 'POST',
        body: formData
    });
    const picurl = await resp.json();
    console.log(picurl) 
}

```