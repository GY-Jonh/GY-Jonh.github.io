
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
})();

function sports(obj, attr, target, times) {

    times = times ? times : 500;
    var T0 = new Date();//初始时间
    var S0 = parseFloat(getCss(obj, attr));//初始值
    target = parseFloat(target);//目标值
    var Ss = target - S0;//总变化值
    (function run() {
        var Tx = new Date() - T0;//经过Tx的时间
        var time_times = Tx / times;
        var Sx = Ss * time_times;
        if (time_times >= 1) {
            Sx = Ss;
        } else {
            requestAnimationFrame(run);
        }
        if (attr == 'opacity') {
            obj.style[attr] = S0 + Sx;
            obj.style.filter = 'alpha(opacity='+Sx*100+')';//opacity兼容
        } else {
            obj.style[attr] = S0 + Sx + 'px';
        }

    })()
}
function getCss(obj, attr) {
    return window.getComputedStyle ? window.getComputedStyle(obj)[attr] : obj.currentStyle(attr);
}