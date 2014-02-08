/**
 * Accordion, jQuery Plugin
 *
 * This plugin provides an accordion with cookie support.
 *
 * Copyright (c) 2011 John Snyder (snyderplace.com)
 * @license http:
 * @version 1.1
 */
(function($) {
    $.fn.accordion = function(options) {
        if (!this || this.length < 1) {
            return this;
        }
        initialize(this, options);
    };
    function initialize(obj, options) {
        var opts = $.extend({}, $.fn.accordion.defaults, options);
        var opened = '';
        obj.each(function() {
            var $this = $(this);
            saveOpts($this, opts);
            if (opts.bind == 'mouseenter') {
                $this.bind('mouseenter', function(e) {
                    e.preventDefault();
                    toggle($this, opts);
                });
            }
            if (opts.bind == 'mouseover') {
                $this.bind('mouseover',function(e) {
                    e.preventDefault();
                    toggle($this, opts);
                });
            }
            if (opts.bind == 'click') {
                $this.bind('click', function(e) {
                    e.preventDefault();
                    toggle($this, opts);
                });
            }
            if (opts.bind == 'dblclick') {
                $this.bind('dblclick', function(e) {
                    e.preventDefault();
                    toggle($this, opts);
                });
            }
            id = $this.attr('id');
            if (!useCookies(opts)) {
                if (id != opts.defaultOpen) {
                    $this.addClass(opts.cssClose);
                    opts.loadClose($this, opts);
 } else {
                    $this.addClass(opts.cssOpen);
                    opts.loadOpen($this, opts);
                    opened = id;
                }
 } else {
                if (issetCookie(opts)) {
                    if (inCookie(id, opts) === false) {
                        $this.addClass(opts.cssClose);
                        opts.loadClose($this, opts);
                    } else {
                        $this.addClass(opts.cssOpen);
                        opts.loadOpen($this, opts);
                        opened = id;
                    }
                } else { //a cookie hasn't been set open defaults
                    if (id != opts.defaultOpen) {
                        $this.addClass(opts.cssClose);
                        opts.loadClose($this, opts);
 } else {
                        $this.addClass(opts.cssOpen);
                        opts.loadOpen($this, opts);
                        opened = id;
                    }
                }
            }
        });
        if (opened.length > 0 && useCookies(opts)) {
            setCookie(opened, opts);
 } else {
            setCookie('', opts);
        }
        return obj;
    };
    function loadOpts($this) {
        return $this.data('accordion-opts');
    }
    function saveOpts($this, opts) {
        return $this.data('accordion-opts', opts);
    }
    function close(opts) {
        opened = $(document).find('.' + opts.cssOpen);
        $.each(opened, function() {
            $(this).addClass(opts.cssClose).removeClass(opts.cssOpen);
            opts.animateClose($(this), opts);
        });
    }
    function open($this, opts) {
        close(opts);
        $this.removeClass(opts.cssClose).addClass(opts.cssOpen);
        opts.animateOpen($this, opts);
        if (useCookies(opts)) {
            // split the cookieOpen string by ","
            id = $this.attr('id');
            setCookie(id, opts);
        }
    }
    function toggle($this, opts) {
        if ($this.hasClass(opts.cssOpen))
        {
            close(opts);
            if (useCookies(opts)) {
                // split the cookieOpen string by ","
                setCookie('', opts);
            }
            return false;
        }
        close(opts);
        open($this, opts);
        return false;
    }
    function useCookies(opts) {
        if (!$.cookie || opts.cookieName == '') {
            return false;
        }
        return true;
    }
    function setCookie(value, opts)
    {
 if (!useCookies(opts)) {
            return false;
        }
        $.cookie(opts.cookieName, value, opts.cookieOptions);
    }
    function inCookie(value, opts)
    {
        if (!useCookies(opts)) {
            return false;
        }
        //if its not there we don't need to remove from it
        if (!issetCookie(opts)) { //quit here, don't have a cookie
            return false;
        }
        cookie = unescape($.cookie(opts.cookieName));
 if (cookie != value) {
            return false;
        }
        return true;
    }
    function issetCookie(opts)
    {
 if (!useCookies(opts)) {
            return false;
        }
 if ($.cookie(opts.cookieName) == null) {
            return false;
        }
        return true;
    }
    $.fn.accordion.defaults = {
        cssClose: 'accordion-close', //class you want to assign to a closed accordion header
        cssOpen: 'accordion-open', //class you want to assign an opened accordion header
        cookieName: 'accordion', //name of the cookie you want to set for this accordion
 cookieOptions: {
            path: '/',
            expires: 7,
            domain: '',
            secure: ''
        },
        defaultOpen: '', //id that you want opened by default
        speed: 'slow', //speed of the slide effect
        bind: 'click', //event to bind to, supports click, dblclick, mouseover and mouseenter
 animateOpen: function (elem, opts) {
            elem.next().stop(true, true).slideDown(opts.speed);
        },
 animateClose: function (elem, opts) {
            elem.next().stop(true, true).slideUp(opts.speed);
        },
 loadOpen: function (elem, opts) {
            elem.next().show();
        },
 loadClose: function (elem, opts) {
            elem.next().hide();
        }
    };
})(jQuery);
