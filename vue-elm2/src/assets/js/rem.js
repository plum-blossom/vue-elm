/**
 * js+rem动态计算font-size的大小，适配各种设备
 * 在不同的移动终端设备中实现，UI设计稿的等比例适配。
 * 布局排版都用rem做单位，然后不同宽度的屏，js动态计算根节点的font-size。
 * @authors Your Name (you@example.org)
 * @date    2019-04-22 11:14:02
 * @version $Id$
 */
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
