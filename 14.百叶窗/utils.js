var utils = (function () {
    var flag = "getComputedStyle" in window;

    /**
     * listToArray:Transforms a class array into an array
     * @param likeAry[object]->Class array that needs to be operated
     * @returns {ary}[object]->Transformed array
     */
    function listToArray(likeAry) {
        if (flag) {
            return Array.prototype.slice.call(likeAry, 0);
        }
        var ary = [];
        for (var i = 0; i < likeAry.length; i++) {
            ary[ary.length] = likeAry[i];
        }
        return ary;
    }

    /**
     * formatJSON:Convert JSON format string to JSON format object
     * @param jsonStr[str]->JSON format string
     * @returns {Object}->JSON object
     */

    function formatJSON(jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
    }

    /**
     * Offset: gets the offset of the distance BODY of any element in the page.
     * @param curEle[object] ->Elements to be operated at
     * @returns{object} {{left: (number|Number), top: (number|Number)}}
     */

    function offset(curEle) {
        var disLeft = curEle.offsetLeft, disTop = curEle.offsetTop, par = curEle.offsetParent;
        while (par) {
            if (navigator.userAgent.indexOf("MSIE 8") === -1) {
                disLeft += par.clientLeft;
                disTop += par.clientTop;
            }
            disLeft += par.offsetLeft;
            disTop += par.offsetTop;
            par = par.offsetParent;
        }
        return {left: disLeft, top: disTop};
    }
//这个未完成
    /**
     * win: browser box model information
     * @param attr[object]->Properties of the browser model
     * @param value[]->Only for scrollLeft and scrollTop settings
     */
    function win(attr, value) {
        if (typeof value === "undefined") {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }

    /**
     *Children: gets all the child nodes of the element
     * @param curEle[object]->Elements to be operated at
     * @param tagName[str]->Designated label
     * @returns {Array}->Returns a tag in an array
     */
    function children(curEle, tagName) {
        var ary = [];
        if (!flag) {
            var nodeList = curEle.childNodes;
            for (var i = 0, len = nodeList.length; i < len; i++) {
                var curNode = nodeList[i];
                curNode.nodeType === 1 ? ary[ary.length] = curNode : null;
            }
            nodeList = null;
        } else {
            ary = this.listToArray(curEle.children);
        }
        if (typeof tagName === "string") {
            for (var k = 0; k < ary.length; k++) {
                var curEleNode = ary[k];
                if (curEleNode.nodeName.toLowerCase() !== tagName.toLowerCase()) {
                    ary.splice(k, 1);
                    k--;
                }
            }
        }
        return ary;
    }

    /**
     * Prev: get on a brother element node
     * @param curEle[object]->Elements to be operated at
     * @returns {*}[object]->Get the older brother node
     */
    function prev(curEle) {
        if (flag) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    }

    /**
     * Next: gets the next brother element node
     * @param curEle[object]->Elements to be operated at
     * @returns {*}[object]->Get the younger brother node
     */
    function next(curEle) {
        if (flag) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        while (nex && nex.nodeType !== 1) {
            nex = nex.nextSibling;
        }
        return nex;
    }

    /**
     * PrevAll: gets all the older brother element nodes.
     * @param curEle[object]->Elements to be operated at
     * @returns {Array}[object]->All nodes into an array older brother returned
     */
    function prevAll(curEle) {
        var ary = [];
        var pre = this.prev(curEle);
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    }

    /**
     * NextAll: gets all the brother element nodes.
     * @param curEle[object]->Elements to be operated at
     * @returns {Array}[object]->All nodes into an array younger brother returned
     */
    function nextAll(curEle) {
        var ary = [];
        var nex = this.next(curEle);
        while (nex) {
            ary.push(nex);
            nex = this.next(nex);
        }
        return ary;
    }

    /**
     * Sibling: gets two neighboring nodes
     * @param curEle[object]->Elements to be operated at
     * @returns {Array}Neighbor's brother and brother nodes in the node list Returns
     */
    function sibling(curEle) {
        var pre = this.prev(curEle);
        var nex = this.next(curEle);
        var ary = [];
        pre ? ary.push(pre) : null;
        nex ? ary.push(nex) : null;
        return ary;
    }

    /**
     * Siblings: gets all the sibling nodes.
     * @param curEle[object]->Elements to be operated at
     * @returns {Array.<T>|string|*}All adjacent nodes in the array is returned
     */
    function siblings(curEle) {
        return this.prevAll(curEle).concat(this.nextAll(curEle));
    }
//没有完成
    /**
     * Index: gets the index of the current element
     * @param curEle[object]->Elements to be operated at
     * @returns {*}Index value
     */
    function index(curEle) {
        return this.prevAll(curEle).length;
    }

    /**
     * FirstChild: gets the first element child node
     * @param curEle[object]->Elements to be operated at
     * @returns {*}[object]->Get the first child node
     */
    function firstChild(curEle) {
        var chs = this.children(curEle);
        return chs.length > 0 ? chs[0] : null;
    }

    /**
     * LastChild: gets the last element child node
     * @param curEle[object]->Elements to be operated at
     * @returns {*}[object]->Get the last node
     */
    function lastChild(curEle) {
        var chs = this.children(curEle);
        return chs.length > 0 ? chs[chs.length - 1] : null;
    }

    /**
     * Append: an additional element to the end of the specified container
     * @param newEle
     * @param container
     */
    function append(newEle, container) {
        container.appendChild(newEle);
    }

    /**
     * Prepend: add elements to the beginning of the specified container.
     * @param newEle
     * @param container
     */
    function prepend(newEle, container) {
        var fir = this.firstChild(container);
        if (fir) {
            container.insertBefore(newEle, fir);
            return;
        }
        container.appendChild(newEle);
    }

    /**
     * The insertBefore: element (newEle) is added to the specified element (oldEle) in front of
     * @param newEle
     * @param oldEle
     */
    function insertBefore(newEle, oldEle) {
        oldEle.parentNode.insertBefore(newEle, oldEle);
    }

    /**
     * The insertAfter: element (newEle) is added to the specified element (oldEle).
     * @param newEle
     * @param oldEle
     */
    function insertAfter(newEle, oldEle) {
        var nex = this.next(oldEle);
        if (nex) {
            oldEle.parentNode.insertBefore(newEle, nex);
            return;
        }
        oldEle.parentNode.appendChild(newEle);
    }

    /**
     * HasClass: verifies whether the current element contains the class name className style
     * @param curEle
     * @param className
     * @returns {boolean}
     */
    function hasClass(curEle, className) {
        var reg = new RegExp("(^| +)" + className + "( +|$)");
        return reg.test(curEle.className);
    }

    /**
     * The addClass: class to add style elements
     * @param curEle
     * @param className
     */
    function addClass(curEle, className) {
        var ary = className.replace(/(^ +| +$)/g, "").split(/ +/g);
        for (var i = 0, len = ary.length; i < len; i++) {
            var curName = ary[i];
            if (!this.hasClass(curEle, curName)) {
                curEle.className += " " + curName;
            }
        }
    }

    /**
     * RemoveClass: to remove the elements of style class
     * @param curEle
     * @param className
     */
    function removeClass(curEle, className) {
        var ary = className.replace(/(^ +| +$)/g, "").split(/ +/g);
        for (var i = 0, len = ary.length; i < len; i++) {
            var curName = ary[i];
            if (this.hasClass(curEle, curName)) {
                var reg = new RegExp("(^| +)" + curName + "( +|$)", "g");
                curEle.className = curEle.className.replace(reg, " ");
            }
        }
    }

    /**
     * The getElementsByClass: class style elements get a set of elements
     * @param strClass
     * @param context
     * @returns {*}
     */
    function getElementsByClass(strClass, context) {
        context = context || document;
        if (flag) {
            return this.listToArray(context.getElementsByClassName(strClass));
        }
        //->IE6~8
        var ary = [], strClassAry = strClass.replace(/(^ +| +$)/g, "").split(/ +/g);
        var nodeList = context.getElementsByTagName("*");
        for (var i = 0, len = nodeList.length; i < len; i++) {
            var curNode = nodeList[i];
            var isOk = true;
            for (var k = 0; k < strClassAry.length; k++) {
                var reg = new RegExp("(^| +)" + strClassAry[k] + "( +|$)");
                if (!reg.test(curNode.className)) {
                    isOk = false;
                    break;
                }
            }
            if (isOk) {
                ary[ary.length] = curNode;
            }
        }
        return ary;
    }

    /**
     * GetCss: gets the style value of an element
     * @param attr
     * @returns {*}
     */
    function getCss(attr) {
        var val = null, reg = null;
        if (flag) {
            val = window.getComputedStyle(this, null)[attr];
        } else {
            if (attr === "opacity") {
                val = this.currentStyle["filter"];
                reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = this.currentStyle[attr];
            }
        }
        reg = /^(-?\d+(\.\d+)?)(px|pt|em|rem)?$/;
        return reg.test(val) ? parseFloat(val) : val;
    }

    /**
     * SetCss: sets the value for a certain style attribute of the current element (added to the inside of the line).
     * @param attr
     * @param value
     */
    function setCss(attr, value) {
        if (attr === "float") {
            this["style"]["cssFloat"] = value;
            this["style"]["styleFloat"] = value;
            return;
        }
        if (attr === "opacity") {
            this["style"]["opacity"] = value;
            this["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
            return;
        }
        var reg = /^(width|height|top|bottom|left|right|((margin|padding)(Top|Bottom|Left|Right)?))$/;
        if (reg.test(attr)) {
            if (!isNaN(value)) {
                value += "px";
            }
        }
        this["style"][attr] = value;
    }

    /**
     * SetGroupCss: sets the style attribute value for the current element batch
     * @param options
     */
    function setGroupCss(options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                setCss.call(this, key, options[key]);
            }
        }
    }

    /**
     * Css: this method to achieve the acquisition, separate settings, the bulk of the set of elements of the style value
     * @param curEle
     * @returns {*}
     */
    function css(curEle) {
        var argTwo = arguments[1], ary = Array.prototype.slice.call(arguments, 1);
        if (typeof argTwo === "string") {
            if (typeof arguments[2] === "undefined") {
                return getCss.apply(curEle, ary);
            }
            setCss.apply(curEle, ary);
        }
        argTwo = argTwo || 0;
        if (argTwo.toString() === "[object Object]") {
            setGroupCss.apply(curEle, ary);
        }
    }

    /**
     * Exposure to the outside world needs to be exposed to utils
     */
    return {
        win: win,
        offset: offset,
        listToArray: listToArray,
        formatJSON: formatJSON,
        children: children,
        prev: prev,
        next: next,
        prevAll: prevAll,
        nextAll: nextAll,
        sibling: sibling,
        siblings: siblings,
        index: index,
        firstChild: firstChild,
        lastChild: lastChild,
        append: append,
        prepend: prepend,
        insertBefore: insertBefore,
        insertAfter: insertAfter,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        getElementsByClass: getElementsByClass,
        css: css
    }
})();