(function () {
    var default_item_width = 120;
    var last_list_num = 0;
    function getInt16String() {
        return parseInt(Math.random()*200+56).toString(16);
    }
    let Random = {
        color: function () {
            return '#' + getInt16String() + getInt16String() + getInt16String() ;
        },
        size: function (min, max) {
            return parseInt(min + Math.random() * (max - min));
        },
        el: function (min = 100, max = 300) {
            var size = this.size(min, max);
            return `<div class="preview-item" style="background-color: ${this.color()};height: ${size}px;line-height: ${size}px;top: 0;left: 0;">${default_item_width} X ${size}</div>`
        }
    }
    var _preview = document.getElementsByClassName('preview')[0];
    var _main = document.getElementsByClassName('main')[0];
    function init () {
        for (var i = 0; i < 50; i++) {
            _preview.innerHTML += Random.el(100, 200);
        }
    }
    function relayout () {
        _preview.style.height = '';
        var list_num = Math.floor(_main.offsetWidth / default_item_width);
        if (list_num === last_list_num) {
            return;
        }
        _preview.style.width = `${list_num * default_item_width}px`;
        var lists = [];
        for (var i = 0; i < list_num; i++) {
            lists.push({top: 0,left: i*default_item_width});
        }
        items = document.getElementsByClassName('preview-item');
        for (var i = 0; i < items.length; i++) {
            var min_height_list, min_height = Number.MAX_VALUE;
            for (var j = 0; j < lists.length; j++) {
                if (lists[j].top < min_height) {
                    min_height_list = j;
                    min_height = lists[j].top;
                }
            }
            items[i].style.width = default_item_width - 20 + 'px';
            items[i].style.transitionDelay = (list_num > last_list_num ? i : (items.length - i)) * 0.2 + 's';
            items[i].style.left = lists[min_height_list].left + 'px';
            items[i].style.top = lists[min_height_list].top + 10 + 'px';
            lists[min_height_list].top += items[i].offsetHeight + 20;
        }
        var total_height = 0;
        for (var i = 0; i < list_num; i++) {
            if (total_height < lists[i].top) {
                total_height = lists[i].top;
            }
        }
        setTimeout(() => {
            _preview.style.height = `${total_height + 20}px`;
        }, items.length * 0.2);
        last_list_num = list_num;
    }
    window.onload = function () {
        init();

        relayout();
    }
    window.onresize = relayout;
})();
