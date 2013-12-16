(function ($) {

    $.fn.xontent = function (op, arg) {
        if (!op) {
            return this.map(function (index, el) {
                return xontent(el).toArray();
            });
        }

        if (op === "set") {
            if (arg instanceof $) {
                $(this).data('xontent', arg);
            } else if (arg instanceof DocumentFragment) {
                $(this).data('xontent', $(arg));
            }
        }

        return $(this);
    };

    function xontent(el) {
        var $el = $(el), data, content, match;

        data = $el.data('xontent');
        if (data instanceof $) {
            // already set
            return data;
        }

        content = el.content;
        if (content instanceof DocumentFragment) {
            // template tag or something that behaves similarly
            $el.data('xontent', $(content));
            return xontent(el);
        }

        if (typeof data === "string") {
            // see selector, adopting xontent of external element
            match = data.match(/^see (.*)$/);
            if (match) {
                return $(match[1]).xontent();
            }

            // until selector, taking next siblings until sentinel
            // if sentinel is not present, go until end of parent
            match = data.match(/^until (.*)$/);
            if (match) {
                return xontentInterval(el, el.nextSibling, $el.nextAll(match[1]).get(0));
            }
        }

        // my contents
        return xontentInterval(el, el.firstChild, null);
    }

    function xontentInterval(el, child, stop) {
        var fragment = document.createDocumentFragment();
        while (child != stop) {
            var next = child.nextSibling;
            fragment.appendChild(child);
            child = next;
        }

        $(el).data('xontent', $(fragment));
        return xontent(el);
    }

}(jQuery));
