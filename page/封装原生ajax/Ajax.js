/**
 * Created by easier on 2017/9/30.
 */

var opt = null;
function Ajax(obt) {
    opt = obt || {};
    opt.method = obt.method || 'post';
    opt.url = obt.url || '';
    opt.async = obt.async || true;
    opt.data = obt.data || null;
    opt.dataType = obt.dataType || 'JSON';
    opt.success = obt.success || function () {

    };
    opt.error = obt.error || function () {

    };

    var xmlHttp = null;
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();//非IE浏览器对象
    } else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP'); //ie下的ajax对象
    }
    var params = [];
    for (var key in opt.data) params.push(key + '=' + opt.data[key]);
    var postData = params.join('&');
    if (opt.dataType.toUpperCase() === 'JSONP') {
        createScript(opt.url, postData);
    } else if(opt.dataType.toUpperCase() === 'JSON') {
        if (opt.method.toUpperCase() === 'POST') {
            xmlHttp.open(opt.method, opt.url, opt.async);
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            xmlHttp.send(postData);
        } else if (opt.method.toUpperCase() === 'GET') {
            xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
            xmlHttp.send(null);
        } else {
            console.error('method没有' + opt.dataType + '类型！');
        }
    }else{
        console.error('dataType没有' + opt.dataType + '类型！');
    }

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                opt.success(xmlHttp.response);
            }
        }
    }

}
function createScript(url, data) {
    var oScript = document.createElement('script');
    oScript.src = url + '?' + data + '&cb=getList';
    document.body.appendChild(oScript);

}

function getList(data){
    opt.success(data);
}
