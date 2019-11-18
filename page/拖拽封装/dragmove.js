/*
var lis = document.querySelectorAll('li');
var li = document.querySelector('li');
    myDrag.init(lis);
    myDrag.init(li);
    都可以
 */
var myDrag = {
    zIndex: 0,
    init: function (items) {
        if (items instanceof NodeList) {
            items.forEach(function (item) {
                this.dragItem(item);
            }.bind(this));
        } else {
            this.dragItem(items);
        }
    },
    dragItem: function (item) {
        var _this = this;
        item.onmousedown = function (event) {
            _this.zIndex++;
            this.style.zIndex = _this.zIndex;
            var oldX = event.clientX;//鼠标按下的坐标X
            var oldY = event.clientY;//鼠标按下的坐标Y
            var oldLiX = this.offsetLeft;//当前li的左位置
            var oldLiY = this.offsetTop;//当前li的Top位置
            document.onmousemove = function (ev) {
                var newX = ev.clientX;
                var newY = ev.clientY;
                var offX = newX - oldX;
                var offY = newY - oldY;
                var offLiX = oldLiX + offX;
                var offLiY = oldLiY + offY;
                if (offLiX < 0) offLiX = 0;
                if (offLiY < 0) offLiY = 0;
                this.style.left = offLiX + 'px';
                this.style.top = offLiY + 'px';
                oldX = newX;
                oldY = newY;
                oldLiX = offLiX;
                oldLiY = offLiY;
            }.bind(this);
            document.onmouseup = function (evt) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
            return false;
        };
    }
};