// 自己封装的ajax
function ajax({
    method = 'GET',
    url = '/',
    callBack,
    data,
    flag = true
} = {}){
    let xhr;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest;
    }else if(window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if(method == 'GET'){
        xhr.open(method, url + '?' + data, flag);
        xhr.send();
    }else if(method == 'POST'){
        xhr.open(method, url, flag)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4 && xhr.status == 200) {
            callBack(JSON.parse(xhr.responseText));
        }else{
            console.log(xhr.status);
        }
    }
}