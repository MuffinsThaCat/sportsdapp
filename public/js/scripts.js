+ function (a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"),
            b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var c in b)
            if (void 0 !== a.style[c]) return {
                end: b[c]
            };
        return !1
    }
    a.fn.emulateTransitionEnd = function (b) {
        var c = !1,
            d = this;
        a(this).one("bsTransitionEnd", function () {
            c = !0
        });
        var e = function () {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function () {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function (b) {
                if (a(b.target).is(this)) return b.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery),
function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var c = a(this),
                e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
        })
    }
    var c = '[data-dismiss="alert"]',
        d = function (b) {
            a(b).on("click", c, this.close)
        };
    d.VERSION = "3.2.0", d.prototype.close = function (b) {
        function c() {
            f.detach().trigger("closed.bs.alert").remove()
        }
        var d = a(this),
            e = d.attr("data-target");
        e || (e = d.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, ""));
        var f = a(e);
        b && b.preventDefault(), f.length || (f = d.hasClass("alert") ? d : d.parent()), f.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", c).emulateTransitionEnd(150) : c())
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () {
        return a.fn.alert = e, this
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery),
function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.button"),
                f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
        })
    }
    var c = function (b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        loadingText: "loading..."
    }, c.prototype.setState = function (b) {
        var c = "disabled",
            d = this.$element,
            e = d.is("input") ? "val" : "html",
            f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), d[e](null == f[b] ? this.options[b] : f[b]), setTimeout(a.proxy(function () {
            "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
        }, this), 0)
    }, c.prototype.toggle = function () {
        var a = !0,
            b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), a && c.prop("checked", !this.$element.hasClass("active")).trigger("change")
        }
        a && this.$element.toggleClass("active")
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function () {
        return a.fn.button = d, this
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (c) {
        var d = a(c.target);
        d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), c.preventDefault()
    })
}(jQuery),
function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
                g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }
    var c = function (b, c) {
        this.$element = a(b).on("keydown.bs.carousel", a.proxy(this.keydown, this)), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0
    }, c.prototype.keydown = function (a) {
        switch (a.which) {
            case 37:
                this.prev();
                break;
            case 39:
                this.next();
                break;
            default:
                return
        }
        a.preventDefault()
    }, c.prototype.cycle = function (b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, c.prototype.getItemIndex = function (a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
    }, c.prototype.to = function (b) {
        var c = this,
            d = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(b > this.$items.length - 1 || b < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function () {
            c.to(b)
        }) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b]))
    }, c.prototype.pause = function (b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, c.prototype.next = function () {
        if (!this.sliding) return this.slide("next")
    }, c.prototype.prev = function () {
        if (!this.sliding) return this.slide("prev")
    }, c.prototype.slide = function (b, c) {
        var d = this.$element.find(".item.active"),
            e = c || d[b](),
            f = this.interval,
            g = "next" == b ? "left" : "right",
            h = "next" == b ? "first" : "last",
            i = this;
        if (!e.length) {
            if (!this.options.wrap) return;
            e = this.$element.find(".item")[h]()
        }
        if (e.hasClass("active")) return this.sliding = !1;
        var j = e[0],
            k = a.Event("slide.bs.carousel", {
                relatedTarget: j,
                direction: g
            });
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, f && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(e)]);
                l && l.addClass("active")
            }
            var m = a.Event("slid.bs.carousel", {
                relatedTarget: j,
                direction: g
            });
            return a.support.transition && this.$element.hasClass("slide") ? (e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), d.one("bsTransitionEnd", function () {
                e.removeClass([b, g].join(" ")).addClass("active"), d.removeClass(["active", g].join(" ")), i.sliding = !1, setTimeout(function () {
                    i.$element.trigger(m)
                }, 0)
            }).emulateTransitionEnd(1e3 * d.css("transition-duration").slice(0, -1))) : (d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger(m)), f && this.cycle(), this
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function () {
        return a.fn.carousel = d, this
    }, a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function (c) {
        var d, e = a(this),
            f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()),
                h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
        }
    }), a(window).on("load", function () {
        a('[data-ride="carousel"]').each(function () {
            var c = a(this);
            b.call(c, c.data())
        })
    })
}(jQuery),
function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.collapse"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b);
            !e && f.toggle && "show" == b && (b = !b), e || d.data("bs.collapse", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }
    var c = function (b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.transitioning = null, this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle()
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        toggle: !0
    }, c.prototype.dimension = function () {
        return this.$element.hasClass("width") ? "width" : "height"
    }, c.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var c = a.Event("show.bs.collapse");
            if (this.$element.trigger(c), !c.isDefaultPrevented()) {
                var d = this.$parent && this.$parent.find("> .panel > .in");
                if (d && d.length) {
                    var e = d.data("bs.collapse");
                    if (e && e.transitioning) return;
                    b.call(d, "hide"), e || d.data("bs.collapse", null)
                }
                var f = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[f](0), this.transitioning = 1;
                var g = function () {
                    this.$element.removeClass("collapsing").addClass("collapse in")[f](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                };
                if (!a.support.transition) return g.call(this);
                var h = a.camelCase(["scroll", f].join("-"));
                this.$element.one("bsTransitionEnd", a.proxy(g, this)).emulateTransitionEnd(350)[f](this.$element[0][h])
            }
        }
    }, c.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
                var d = function () {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                if (!a.support.transition) return d.call(this);
                this.$element[c](0).one("bsTransitionEnd", a.proxy(d, this)).emulateTransitionEnd(350)
            }
        }
    }, c.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var d = a.fn.collapse;
    a.fn.collapse = b, a.fn.collapse.Constructor = c, a.fn.collapse.noConflict = function () {
        return a.fn.collapse = d, this
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (c) {
        var d, e = a(this),
            f = e.attr("data-target") || c.preventDefault() || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""),
            g = a(f),
            h = g.data("bs.collapse"),
            i = h ? "toggle" : e.data(),
            j = e.attr("data-parent"),
            k = j && a(j);
        h && h.transitioning || (k && k.find('[data-toggle="collapse"][data-parent="' + j + '"]').not(e).addClass("collapsed"), e[g.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), b.call(g, i)
    })
}(jQuery),
function (a) {
    "use strict";

    function b(b) {
        b && 3 === b.which || (a(e).remove(), a(f).each(function () {
            var d = c(a(this)),
                e = {
                    relatedTarget: this
                };
            d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown", e)), b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown", e))
        }))
    }

    function c(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    function d(b) {
        return this.each(function () {
            var c = a(this),
                d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
        })
    }
    var e = ".dropdown-backdrop",
        f = '[data-toggle="dropdown"]',
        g = function (b) {
            a(b).on("click.bs.dropdown", this.toggle)
        };
    g.VERSION = "3.2.0", g.prototype.toggle = function (d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = c(e),
                g = f.hasClass("open");
            if (b(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus"), f.toggleClass("open").trigger("shown.bs.dropdown", h)
            }
            return !1
        }
    }, g.prototype.keydown = function (b) {
        if (/(38|40|27)/.test(b.keyCode)) {
            var d = a(this);
            if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = c(d),
                    g = e.hasClass("open");
                if (!g || g && 27 == b.keyCode) return 27 == b.which && e.find(f).trigger("focus"), d.trigger("click");
                var h = " li:not(.divider):visible a",
                    i = e.find('[role="menu"]' + h + ', [role="listbox"]' + h);
                if (i.length) {
                    var j = i.index(i.filter(":focus"));
                    38 == b.keyCode && j > 0 && j--, 40 == b.keyCode && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function () {
        return a.fn.dropdown = h, this
    }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f + ', [role="menu"], [role="listbox"]', g.prototype.keydown)
}(jQuery),
function (a) {
    "use strict";

    function b(b, d) {
        return this.each(function () {
            var e = a(this),
                f = e.data("bs.modal"),
                g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
        })
    }
    var c = function (b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$backdrop = this.isShown = null, this.scrollbarWidth = 0, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function (a) {
        return this.isShown ? this.hide() : this.show(a)
    }, c.prototype.show = function (b) {
        var c = this,
            d = a.Event("show.bs.modal", {
                relatedTarget: b
            });
        this.$element.trigger(d), this.isShown || d.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.$body.addClass("modal-open"), this.setScrollbar(), this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.backdrop(function () {
            var d = a.support.transition && c.$element.hasClass("fade");
            c.$element.parent().length || c.$element.appendTo(c.$body), c.$element.show().scrollTop(0), d && c.$element[0].offsetWidth, c.$element.addClass("in").attr("aria-hidden", !1), c.enforceFocus();
            var e = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            d ? c.$element.find(".modal-dialog").one("bsTransitionEnd", function () {
                c.$element.trigger("focus").trigger(e)
            }).emulateTransitionEnd(300) : c.$element.trigger("focus").trigger(e)
        }))
    }, c.prototype.hide = function (b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.$body.removeClass("modal-open"), this.resetScrollbar(), this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
    }, c.prototype.enforceFocus = function () {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }, this))
    }, c.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function (a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    }, c.prototype.hideModal = function () {
        var a = this;
        this.$element.hide(), this.backdrop(function () {
            a.$element.trigger("hidden.bs.modal")
        })
    }, c.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, c.prototype.backdrop = function (b) {
        var c = this,
            d = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var e = a.support.transition && d;
            if (this.$backdrop = a('<div class="modal-backdrop ' + d + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
                    a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
                }, this)), e && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            e ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(150) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var f = function () {
                c.removeBackdrop(), b && b()
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", f).emulateTransitionEnd(150) : f()
        } else b && b()
    }, c.prototype.checkScrollbar = function () {
        document.body.clientWidth >= window.innerWidth || (this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar())
    }, c.prototype.setScrollbar = function () {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.scrollbarWidth && this.$body.css("padding-right", a + this.scrollbarWidth)
    }, c.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", "")
    }, c.prototype.measureScrollbar = function () {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {
        return a.fn.modal = d, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (c) {
        var d = a(this),
            e = d.attr("href"),
            f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
            g = f.data("bs.modal") ? "toggle" : a.extend({
                remote: !/#/.test(e) && e
            }, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function (a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function () {
                d.is(":visible") && d.trigger("focus")
            })
        }), b.call(f, g, this)
    })
}(jQuery),
function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == typeof b && b;
            (e || "destroy" != b) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function (a, b) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", a, b)
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function (b, c, d) {
        this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(this.options.viewport.selector || this.options.viewport);
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, c.prototype.getDefaults = function () {
        return c.DEFAULTS
    }, c.prototype.getOptions = function (b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, c.prototype.getDelegateOptions = function () {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, function (a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, c.prototype.enter = function (b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        if (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "in", !c.options.delay || !c.options.delay.show) return c.show();
        c.timeout = setTimeout(function () {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)
    }, c.prototype.leave = function (b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        if (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "out", !c.options.delay || !c.options.delay.hide) return c.hide();
        c.timeout = setTimeout(function () {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)
    }, c.prototype.show = function () {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var c = a.contains(document.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !c) return;
            var d = this,
                e = this.tip(),
                f = this.getUID(this.type);
            this.setContent(), e.attr("id", f), this.$element.attr("aria-describedby", f), this.options.animation && e.addClass("fade");
            var g = "function" == typeof this.options.placement ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement,
                h = /\s?auto?\s?/i,
                i = h.test(g);
            i && (g = g.replace(h, "") || "top"), e.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(g).data("bs." + this.type, this), this.options.container ? e.appendTo(this.options.container) : e.insertAfter(this.$element);
            var j = this.getPosition(),
                k = e[0].offsetWidth,
                l = e[0].offsetHeight;
            if (i) {
                var m = g,
                    n = this.$element.parent(),
                    o = this.getPosition(n);
                g = "bottom" == g && j.top + j.height + l - o.scroll > o.height ? "top" : "top" == g && j.top - o.scroll - l < 0 ? "bottom" : "right" == g && j.right + k > o.width ? "left" : "left" == g && j.left - k < o.left ? "right" : g, e.removeClass(m).addClass(g)
            }
            var p = this.getCalculatedOffset(g, j, k, l);
            this.applyPlacement(p, g);
            var q = function () {
                d.$element.trigger("shown.bs." + d.type), d.hoverState = null
            };
            a.support.transition && this.$tip.hasClass("fade") ? e.one("bsTransitionEnd", q).emulateTransitionEnd(150) : q()
        }
    }, c.prototype.applyPlacement = function (b, c) {
        var d = this.tip(),
            e = d[0].offsetWidth,
            f = d[0].offsetHeight,
            g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top = b.top + g, b.left = b.left + h, a.offset.setOffset(d[0], a.extend({
            using: function (a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth,
            j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = k.left ? 2 * k.left - e + i : 2 * k.top - f + j,
            m = k.left ? "left" : "top",
            n = k.left ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(l, d[0][n], m)
    }, c.prototype.replaceArrow = function (a, b, c) {
        this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "")
    }, c.prototype.setContent = function () {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function () {
        function b() {
            "in" != c.hoverState && d.detach(), c.$element.trigger("hidden.bs." + c.type)
        }
        var c = this,
            d = this.tip(),
            e = a.Event("hide.bs." + this.type);
        if (this.$element.removeAttr("aria-describedby"), this.$element.trigger(e), !e.isDefaultPrevented()) return d.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? d.one("bsTransitionEnd", b).emulateTransitionEnd(150) : b(), this.hoverState = null, this
    }, c.prototype.fixTitle = function () {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function () {
        return this.getTitle()
    }, c.prototype.getPosition = function (b) {
        b = b || this.$element;
        var c = b[0],
            d = "BODY" == c.tagName;
        return a.extend({}, "function" == typeof c.getBoundingClientRect ? c.getBoundingClientRect() : null, {
            scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop(),
            width: d ? a(window).width() : b.outerWidth(),
            height: d ? a(window).height() : b.outerHeight()
        }, d ? {
            top: 0,
            left: 0
        } : b.offset())
    }, c.prototype.getCalculatedOffset = function (a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0,
            g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll,
                i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f,
                k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.width && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function () {
        var a = this.$element,
            b = this.options;
        return a.attr("data-original-title") || ("function" == typeof b.title ? b.title.call(a[0]) : b.title)
    }, c.prototype.getUID = function (a) {
        do {
            a += ~~(1e6 * Math.random())
        } while (document.getElementById(a));
        return a
    }, c.prototype.tip = function () {
        return this.$tip = this.$tip || a(this.options.template)
    }, c.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, c.prototype.validate = function () {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, c.prototype.enable = function () {
        this.enabled = !0
    }, c.prototype.disable = function () {
        this.enabled = !1
    }, c.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, c.prototype.toggle = function (b) {
        var c = this;
        b && ((c = a(b.currentTarget).data("bs." + this.type)) || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function () {
        clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () {
        return a.fn.tooltip = d, this
    }
}(jQuery),
function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == typeof b && b;
            (e || "destroy" != b) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function (a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.2.0", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {
        return c.DEFAULTS
    }, c.prototype.setContent = function () {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").empty()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, c.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, c.prototype.getContent = function () {
        var a = this.$element,
            b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, c.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, c.prototype.tip = function () {
        return this.$tip || (this.$tip = a(this.options.template)), this.$tip
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () {
        return a.fn.popover = d, this
    }
}(jQuery),
function (a) {
    "use strict";

    function b(c, d) {
        var e = a.proxy(this.process, this);
        this.$body = a("body"), this.$scrollElement = a(a(c).is("body") ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", e), this.refresh(), this.process()
    }

    function c(c) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.scrollspy"),
                f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }
    b.VERSION = "3.2.0", b.DEFAULTS = {
        offset: 10
    }, b.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, b.prototype.refresh = function () {
        var b = "offset",
            c = 0;
        a.isWindow(this.$scrollElement[0]) || (b = "position", c = this.$scrollElement.scrollTop()), this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight();
        var d = this;
        this.$body.find(this.selector).map(function () {
            var d = a(this),
                e = d.data("target") || d.attr("href"),
                f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [
                [f[b]().top + c, e]
            ] || null
        }).sort(function (a, b) {
            return a[0] - b[0]
        }).each(function () {
            d.offsets.push(this[0]), d.targets.push(this[1])
        })
    }, b.prototype.process = function () {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.getScrollHeight(),
            d = this.options.offset + c - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b <= e[0]) return g != (a = f[0]) && this.activate(a);
        for (a = e.length; a--;) g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function (b) {
        this.activeTarget = b, a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
        return a.fn.scrollspy = d, this
    }, a(window).on("load.bs.scrollspy.data-api", function () {
        a('[data-spy="scroll"]').each(function () {
            var b = a(this);
            c.call(b, b.data())
        })
    })
}(jQuery),
function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
        })
    }
    var c = function (b) {
        this.element = a(b)
    };
    c.VERSION = "3.2.0", c.prototype.show = function () {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a")[0],
                f = a.Event("show.bs.tab", {
                    relatedTarget: e
                });
            if (b.trigger(f), !f.isDefaultPrevented()) {
                var g = a(d);
                this.activate(b.closest("li"), c), this.activate(g, g.parent(), function () {
                    b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e
                    })
                })
            }
        }
    }, c.prototype.activate = function (b, c, d) {
        function e() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d()
        }
        var f = c.find("> .active"),
            g = d && a.support.transition && f.hasClass("fade");
        g ? f.one("bsTransitionEnd", e).emulateTransitionEnd(150) : e(), f.removeClass("in")
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {
        return a.fn.tab = d, this
    }, a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (c) {
        c.preventDefault(), b.call(a(this), "show")
    })
}(jQuery),
function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.affix"),
                f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }
    var c = function (b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition()
    };
    c.VERSION = "3.2.0", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(),
            b = this.$element.offset();
        return this.pinnedOffset = b.top - a
    }, c.prototype.checkPositionWithEventLoop = function () {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, c.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var b = a(document).height(),
                d = this.$target.scrollTop(),
                e = this.$element.offset(),
                f = this.options.offset,
                g = f.top,
                h = f.bottom;
            "object" != typeof f && (h = g = f), "function" == typeof g && (g = f.top(this.$element)), "function" == typeof h && (h = f.bottom(this.$element));
            var i = !(null != this.unpin && d + this.unpin <= e.top) && (null != h && e.top + this.$element.height() >= b - h ? "bottom" : null != g && d <= g && "top");
            if (this.affixed !== i) {
                null != this.unpin && this.$element.css("top", "");
                var j = "affix" + (i ? "-" + i : ""),
                    k = a.Event(j + ".bs.affix");
                this.$element.trigger(k), k.isDefaultPrevented() || (this.affixed = i, this.unpin = "bottom" == i ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(j).trigger(a.Event(j.replace("affix", "affixed"))), "bottom" == i && this.$element.offset({
                    top: b - this.$element.height() - h
                }))
            }
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function () {
        return a.fn.affix = d, this
    }, a(window).on("load", function () {
        a('[data-spy="affix"]').each(function () {
            var c = a(this),
                d = c.data();
            d.offset = d.offset || {}, d.offsetBottom && (d.offset.bottom = d.offsetBottom), d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
        })
    })
}(jQuery),
function () {
    function a() {}

    function b(a) {
        return f.retinaImageSuffix + a
    }

    function c(a, c) {
        if (this.path = a || "", void 0 !== c && null !== c) this.at_2x_path = c, this.perform_check = !1;
        else {
            if (void 0 !== document.createElement) {
                var d = document.createElement("a");
                d.href = this.path, d.pathname = d.pathname.replace(g, b), this.at_2x_path = d.href
            } else {
                var e = this.path.split("?");
                e[0] = e[0].replace(g, b), this.at_2x_path = e.join("?")
            }
            this.perform_check = !0
        }
    }

    function d(a) {
        this.el = a, this.path = new c(this.el.getAttribute("src"), this.el.getAttribute("data-at2x"));
        var b = this;
        this.path.check_2x_variant(function (a) {
            a && b.swap()
        })
    }
    var e = "undefined" == typeof exports ? window : exports,
        f = {
            retinaImageSuffix: "@2x",
            check_mime_type: !0,
            force_original_dimensions: !0
        };
    e.Retina = a, a.configure = function (a) {
        null === a && (a = {});
        for (var b in a) a.hasOwnProperty(b) && (f[b] = a[b])
    }, a.init = function (a) {
        null === a && (a = e);
        var b = a.onload || function () {};
        a.onload = function () {
            var a, c, e = document.getElementsByTagName("img"),
                f = [];
            for (a = 0; a < e.length; a += 1) c = e[a], c.getAttributeNode("data-no-retina") || f.push(new d(c));
            b()
        }
    }, a.isRetina = function () {
        return e.devicePixelRatio > 1 || !(!e.matchMedia || !e.matchMedia("(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)").matches)
    };
    var g = /\.\w+$/;
    e.RetinaImagePath = c, c.confirmed_paths = [], c.prototype.is_external = function () {
        return !(!this.path.match(/^https?\:/i) || this.path.match("//" + document.domain))
    }, c.prototype.check_2x_variant = function (a) {
        var b, d = this;
        return this.is_external() ? a(!1) : this.perform_check || void 0 === this.at_2x_path || null === this.at_2x_path ? this.at_2x_path in c.confirmed_paths ? a(!0) : (b = new XMLHttpRequest, b.open("HEAD", this.at_2x_path), b.onreadystatechange = function () {
            if (4 !== b.readyState) return a(!1);
            if (b.status >= 200 && b.status <= 399) {
                if (f.check_mime_type) {
                    var e = b.getResponseHeader("Content-Type");
                    if (null === e || !e.match(/^image/i)) return a(!1)
                }
                return c.confirmed_paths.push(d.at_2x_path), a(!0)
            }
            return a(!1)
        }, b.send(), void 0) : a(!0)
    }, e.RetinaImage = d, d.prototype.swap = function (a) {
        function b() {
            c.el.complete ? (f.force_original_dimensions && (c.el.setAttribute("width", c.el.offsetWidth), c.el.setAttribute("height", c.el.offsetHeight)), c.el.setAttribute("src", a)) : setTimeout(b, 5)
        }
        void 0 === a && (a = this.path.at_2x_path);
        var c = this;
        b()
    }, a.isRetina() && a.init(e)
}(),
function (a) {
    if ("function" == typeof define && define.amd) define(a);
    else if ("object" == typeof exports) module.exports = a();
    else {
        var b = window.Cookies,
            c = window.Cookies = a();
        c.noConflict = function () {
            return window.Cookies = b, c
        }
    }
}(function () {
    function a() {
        for (var a = 0, b = {}; a < arguments.length; a++) {
            var c = arguments[a];
            for (var d in c) b[d] = c[d]
        }
        return b
    }

    function b(c) {
        function d(b, e, f) {
            var g;
            if (arguments.length > 1) {
                if (f = a({
                        path: "/"
                    }, d.defaults, f), "number" == typeof f.expires) {
                    var h = new Date;
                    h.setMilliseconds(h.getMilliseconds() + 864e5 * f.expires), f.expires = h
                }
                try {
                    g = JSON.stringify(e), /^[\{\[]/.test(g) && (e = g)
                } catch (a) {}
                return e = c.write ? c.write(e, b) : encodeURIComponent(String(e)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), b = encodeURIComponent(String(b)), b = b.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent), b = b.replace(/[\(\)]/g, escape), document.cookie = [b, "=", e, f.expires && "; expires=" + f.expires.toUTCString(), f.path && "; path=" + f.path, f.domain && "; domain=" + f.domain, f.secure ? "; secure" : ""].join("")
            }
            b || (g = {});
            for (var i = document.cookie ? document.cookie.split("; ") : [], j = /(%[0-9A-Z]{2})+/g, k = 0; k < i.length; k++) {
                var l = i[k].split("="),
                    m = l[0].replace(j, decodeURIComponent),
                    n = l.slice(1).join("=");
                '"' === n.charAt(0) && (n = n.slice(1, -1));
                try {
                    if (n = c.read ? c.read(n, m) : c(n, m) || n.replace(j, decodeURIComponent), this.json) try {
                        n = JSON.parse(n)
                    } catch (a) {}
                    if (b === m) {
                        g = n;
                        break
                    }
                    b || (g[m] = n)
                } catch (a) {}
            }
            return g
        }
        return d.get = d.set = d, d.getJSON = function () {
            return d.apply({
                json: !0
            }, [].slice.call(arguments))
        }, d.defaults = {}, d.remove = function (b, c) {
            d(b, "", a(c, {
                expires: -1
            }))
        }, d.withConverter = b, d
    }
    return b(function () {})
}),
function (a) {
    var b = {
            common: {
                init: function () {
                    function b(b, c) {
                        a("." + b + " .call_to_action").click(function (a) {
                            var b = document.title.split(" | ")[0];
                            ga("send", "event", b + "-CTA", "click", c)
                        })
                    }

                    function c(b, c) {
                        a(b + ' input[type="submit"]').click(function () {
                            a(document).on("mailsent.wpcf7", function () {
                                j || (ga("send", "event", "Newsletter Signup", "submit", c), j = !0)
                            })
                        })
                    }

                    function d(b) {
                        var c = a(document).scrollTop();
                        jQuery("#dactyl_toc_sidebar li a").each(function () {
                            var b = a(this),
                                d = a(b.attr("href"));
                            d.position().top <= c && d.position().top + d.height() > c && (b.attr("href") !== a("#dactyl_toc_sidebar .active").attr("href") && a("#dactyl_toc_sidebar .active").removeClass("active"), b.addClass("active"))
                        })
                    }
                    a(".cookie-bar .dismiss").click(function () {
                        a(".cookie-bar").slideUp(100), Cookies.set("touBanner", "true", {
                            expires: 365
                        }), ga("send", "event", "TOU Banner", "click", "x-out")
                    });
                    var e = Cookies.get("touBanner");
                    a(window).load(function () {
                        "true" !== e ? a(".cookie-bar").show() : "true" === e && a(".cookie-bar").hide()
                    }), a(".accordion-group").click(function (b) {
                        a(".collapse.in").collapse("hide")
                    }), document.addEventListener("wpcf7mailsent", function (b) {
                        "14249" === b.detail.contactFormId && (a(".signup-label").hide(), a(".thank-you").show(), a(".form").hide(), a(".signup").hide()), "17503" === b.detail.contactFormId && (a(".newsletter-signup-row").css("opacity", 0), a(".newsletter-row-wrapper .thank-you").css("opacity", 1))
                    }, !1), a(".wpcf7-form").on("focusout", ".wpcf7-form-control", function () {
                        a(".wpcf7-not-valid-tip", a(this).parent()).length && "" !== a(this).val() && (a(".wpcf7-not-valid-tip", a(this).parent()).remove(), a(".wpcf7-not-valid-tip", a(this).removeClass("wpcf7-not-valid")))
                    }), a(".navbar-collapse").css({
                        maxHeight: a(window).height() - a(".navbar-header").height() + "px"
                    }), a(".search-form").submit(function (b) {
                        a(this).find("#search").val(a.trim(a(this).find("#search").val())).val() || (b.preventDefault(), a("#search").prop("placeholder", "Please enter a search term"), a("#search").focus())
                    }), a(".menu-contact a").click(function () {
                        ga("send", "event", "Header-Contact-Button", "click")
                    }), a(".content-info li.menu-contact-us").click(function () {
                        ga("send", "event", "Contact Us", "click", "footer-link")
                    }), a(".content-info li.menu-insights").click(function () {
                        ga("send", "event", "Insights", "click", "footer-link")
                    }), a(".suggested_post").click(function () {
                        var b = a(this).index();
                        ga("send", "event", "Insights", "click", "Suggested Article-" + b)
                    }), a(".nav li a").click(function (b) {
                        var c = a(b.target).text(),
                            d = document.title.split(" | ")[0];
                        ga("send", "event", "Page:" + d, "click", "Nav link:" + c)
                    }), a(".cta_readmore").click(function (b) {
                        var c = a(b.target).text(),
                            d = document.title.split(" | ")[0];
                        ga("send", "event", d + "-CTA", "click", c)
                    }), b("main-content", "Bottom CTA"), b("header_text_wrapper", "Hero CTA"), a("#newsletterModal").on("hidden.bs.modal", function () {
                        Cookies.set("shouldDisplayModal", "false", {
                            expires: 7
                        })
                    });
                    var f = Cookies.get("shouldDisplayModal"),
                        g = Cookies.get("shouldDisplayModalSubscribed");
                    a(window).load(function () {
                        a(document).width() > 767 && "false" !== f && "false" !== g && setTimeout(function () {
                            a("#newsletterModal").modal("show")
                        }, 3e3)
                    }), a(".close-x").click(function () {
                        a(".newsletter-banner").remove()
                    }), a(".close-x-fly").click(function () {
                        a(".flyout-banner").remove()
                    }), a(".x-out").click(function () {
                        a(".build_callout_nav").slideUp(100), Cookies.set("bankBanner", "false", {
                            expires: 365
                        }), ga("send", "event", "Dev Center Banner", "click", "x-out")
                    }), a(".copy").click(function () {
                        ga("send", "event", "Dev Center Banner", "click", "copy")
                    }), a(".contact-modal").click(function () {
                        ga("send", "event", "Dev Center Modal", "click", "Contact CTA")
                    });
                    var h = Cookies.get("bankBanner");
                    a(window).load(function () {
                        "false" !== h && window.location.href.indexOf("build") > -1 && (a(".build_callout_nav").show(), a(".page-template-template-dev-portal-php .wrap.container").css("margin-top", "170px"), a(".page-template-template-dev-portal-php ul.dev_nav_sidebar").css("top", "180px"), a(".page-template-template-contained-width-php main.main").css("padding-top", "130px"), a(".page-template-template-api-pages main.main").css("padding-top", "55px"), a(".page-ripple-txt-validator .main").css("padding-top", "160px"))
                    });
                    var i = Cookies.get("bankModal");
                    a(window).load(function () {
                        a(document).width() > 767 && "false" !== i && (a("#buildModal").modal("show"), Cookies.set("bankModal", "false", {
                            expires: 365
                        }))
                    });
                    var j = !1;
                    c(".sidebar", "Sidebar"), c("#newsletterModal", "Modal"), c(".mobile-top-newsletter", "Mobile-Landing-Top"), c(".mobile-newsletter-bottom", "Mobile-Article-Bottom"), a(window).scroll(function () {
                        var b = parseInt(a("footer").offset().top),
                            c = a(window).scrollTop() + a(window).height();
                        c - b > 0 ? a("aside.sidebar .dev_nav_sidebar").css("bottom", c - b + "px") : a("aside.sidebar .dev_nav_sidebar").css("bottom", 0)
                    }), a(document).on("scroll", d), a(".sidebar .titleClick").click(function () {
                        a(this).parent().find(".caret").toggleClass("rotate"), a(this).parent().find(".sub_posts").slideToggle(100)
                    }), a(".sidebar .sub_posts").each(function () {
                        a(this).find(".active").length > 0 ? a(this).show() : a(this).hide()
                    }), a(".navbar-header").on("click", ".navbar-toggle", function () {
                        a(".nav_x").toggle(), a(".nav_lines").toggle()
                    }), a(".password_login #wp-submit").prop("disabled", !0), a(".password_login #accept").click(function () {
                        a(".password_login #wp-submit").prop("disabled") ? a(".password_login #wp-submit").prop("disabled", !1) : a(".password_login #wp-submit").prop("disabled", !0)
                    }), a(".dropdown-toggle").click(function () {
                        var b = a(this).attr("href");
                        return window.location.href = b, !1
                    }), a("li.dropdown").hover(function () {
                        a(this).find(".dropdown-menu").stop(!0, !0).fadeIn(10)
                    }, function () {
                        a(this).find(".dropdown-menu").stop(!0, !0).fadeOut(10)
                    })
                }
            },
            home: {
                init: function () {
                    function b() {
                        a(".number").each(function (b, c) {
                            c = a(c), c.visible(!0) && setTimeout(function () {
                                e.start(), a(".mm").show()
                            }, 250)
                        })
                    }

                    function c(b) {
                        a(window).scrollTop() >= b ? (a(".navbar-default").addClass("scrolled"), a(".navbar-default").removeClass("initial_header"), a(".initial_logo").hide(), a(".logo_scrolled").show()) : (a(".navbar-default").removeClass("scrolled"), a(".navbar-default").addClass("initial_header"), a(".initial_logo").show(), a(".logo_scrolled").hide())
                    }
                    a("#videoModal").on("hidden.bs.modal", function (a) {
                        ga("send", "event", "Watch Video", "close", player.getCurrentTime().toFixed(1))
                    }), a("a#trigger").click(function () {
                        ga("send", "event", "Watch Video", "click", "CTA")
                    }), a(".video-container .call_to_action").click(function () {
                        ga("send", "event", "Watch Video", "click", "Contact Button"), a(".myblock").toggle()
                    }), a(".insights_btn").click(function () {
                        ga("send", "event", "Insights", "click", "home-cta-button")
                    }), a(".subscribe").click(function () {
                        ga("send", "event", "Insights-Signup", "click", "home-insights-button")
                    }), jQuery.fn.visible = function (b) {
                        var c = a(this),
                            d = a(window),
                            e = d.scrollTop(),
                            f = e + d.height(),
                            g = c.offset().top,
                            h = g + c.height(),
                            i = !0 === b ? h : g;
                        return (!0 === b ? g : h) <= f && i >= e
                    };
                    var d = {
                            useEasing: !1,
                            useGrouping: !1
                        },
                        e = new CountUp("number1", 0, 200, 0, .5, d);
                    a(window).scroll(function () {
                        b()
                    }), c(10), a(window).scroll(function () {
                        c(10)
                    })
                }
            },
            page_banks: {
                init: function () {
                    function b(b) {
                        var c = a(window).scrollTop(),
                            d = c + a(window).height(),
                            e = a(b).offset().top,
                            f = e + a(b).height();
                        return e <= d && f >= c
                    }

                    function c(a, b, c, d, e, f, g, h, i) {
                        const j = .28,
                            p = 12.5,
                            q = 40,
                            r = 6777.29 / 4380,
                            s = 365,
                            t = .002,
                            u = 5e4,
                            v = .0582,
                            w = .0774,
                            x = 78e3,
                            y = 123832e3,
                            z = 105e3;
                        var A, B, C, D, E, F, G = .9,
                            H = .06;
                        transactionVolume.value >= 5e5 ? (G = .9, H = .06) : transactionVolume.value >= 1e5 ? (G = .5, H = .07) : (G = .15, H = .08), A = transactionVolume.value * (j + a * p + b * q), B = transactionVolume.value * r, C = c, D = transactionVolume.value * d * G, paymentProcessingCost = A + B + C + D, k = (paymentVolume.value / s * f * .5 + paymentVolume.value * e / s) * H, l = (paymentVolume.value / s * f * .5 + paymentVolume.value * e / s) * t, m = u, n = .5 * paymentVolume.value * 5e-4, o = paymentVolume.value * g / s * (w - v), treasuryCost = k + l + m + n + o, E = paymentVolume.value / y * x * i, F = transactionVolume.value * h / (z / 2) * x, reconciliationCost = E + F, counterpartyFees = 2 * transactionVolume.value, totalCost = paymentProcessingCost + treasuryCost + reconciliationCost + counterpartyFees
                    }

                    function d(b) {
                        var c = {
                                labels: w,
                                datasets: [{
                                    label: "Counterparty Fees",
                                    data: v,
                                    backgroundColor: "#344f5b",
                                    hoverBackgroundColor: "#344f5b"
                                }, {
                                    label: "Reconciliation Cost",
                                    data: u,
                                    backgroundColor: "#156d9b",
                                    hoverBackgroundColor: "#156d9b"
                                }, {
                                    label: "Treasury Cost",
                                    data: t,
                                    backgroundColor: "#25a2db",
                                    hoverBackgroundColor: "#25a2db"
                                }, {
                                    label: "Payment Processing Cost",
                                    data: s,
                                    backgroundColor: "#53c4f1",
                                    hoverBackgroundColor: "#53c4f1"
                                }]
                            },
                            d = function (b) {
                                var c = a("#chartjs-tooltip");
                                if (b.opacity || c.css({
                                        opacity: 0
                                    }), c.removeClass("above below"), c.addClass(b.yAlign), void 0 !== b.body) {
                                    var d = b.body[0].lines[0].split(":"),
                                        e = "<span>" + d[0].trim() + '</span>:<br/><span class="number-detail">$' + d[1].trim() + "</span> per payment";
                                    c.html(e), c.css({
                                        opacity: 1,
                                        left: b.caretX - 55 + "px",
                                        top: b.y + 150 + "px",
                                        fontFamily: b.fontFamily,
                                        fontSize: b.fontSize,
                                        fontStyle: b.fontStyle
                                    })
                                }
                            },
                            e = {
                                animation: {
                                    duration: b,
                                    easing: "easeOutCubic",
                                    onProgress: function (a) {
                                        var b = this.chart.ctx;
                                        b.textAlign = "center", b.textBaseline = "middle", b.font = "600 8pt 'open_sansregular'";
                                        var c = this,
                                            d = (this.config.data.datasets, c.getDatasetMeta(3).data[0]),
                                            e = c.getDatasetMeta(3).data[1];
                                        b.fillText("$" + p, e._model.x, e._model.y - 10), b.fillText("$" + q, d._model.x, d._model.y - 10)
                                    }
                                },
                                responsive: !0,
                                tooltips: {
                                    enabled: !1,
                                    custom: d
                                },
                                layout: {
                                    padding: {
                                        top: 15
                                    }
                                },
                                scales: {
                                    xAxes: [{
                                        stacked: !0,
                                        barThickness: 40,
                                        gridLines: {
                                            display: !1
                                        }
                                    }],
                                    yAxes: [{
                                        display: !1,
                                        stacked: !0,
                                        gridLines: {
                                            display: !1
                                        }
                                    }]
                                },
                                legend: {
                                    display: !1
                                }
                            },
                            f = a("#saving-bar-chart");
                        r = new Chart(f, {
                            type: "bar",
                            data: c,
                            options: e
                        })
                    }

                    function e(b, c) {
                        function d() {
                            Math.ceil(f / 2) <= 5 ? (n.style.opacity = "0", m.style.opacity = "1") : Math.ceil(f / 2) >= 43 ? (m.style.opacity = "0", n.style.opacity = "1") : (n.style.opacity = "1", m.style.opacity = "1"), 0 === b ? (Math.ceil(f / 2) >= 9 && Math.ceil(f / 2) <= 16 ? o.style.opacity = "0" : o.style.opacity = "1", Math.ceil(f / 2) >= 22 && Math.ceil(f / 2) < 30 ? p.style.opacity = "0" : p.style.opacity = "1", Math.ceil(f / 2) >= 35 && Math.ceil(f / 2) < 42 ? q.style.opacity = "0" : q.style.opacity = "1") : 1 === b && (Math.ceil(f / 2) >= 8 && Math.ceil(f / 2) <= 18 ? o.style.opacity = "0" : o.style.opacity = "1", Math.ceil(f / 2) >= 21 && Math.ceil(f / 2) <= 31 ? p.style.opacity = "0" : p.style.opacity = "1", Math.ceil(f / 2) >= 33 && Math.ceil(f / 2) <= 43 ? q.style.opacity = "0" : q.style.opacity = "1")
                        }
                        const e = document.getElementsByClassName("min-slider-handle")[b].style.left,
                            f = e.substring(0, e.length - 1),
                            g = Math.ceil(f / c);
                        if (document.getElementsByClassName("highlight-bar").length && document.getElementsByClassName("highlight-bar")[b]) {
                            const h = document.getElementsByClassName("highlight-bar")[b];
                            h.classList.toggle("highlight-bar");
                            const i = h.id.replace(/[^\d]/g, "");
                            for (var j = 0; j < i - 1; j++) {
                                document.querySelectorAll("svg #slider_" + (b + 1))[0].children[j].classList.remove("semi-highlight-bar")
                            }
                        }
                        if (Math.ceil(f / c) > 0) {
                            const k = document.querySelectorAll("svg #slider_" + (b + 1));
                            k[0].children[Math.ceil(f / c) - 1].classList.toggle("highlight-bar")
                        } else 0 === Math.ceil(f / c) && (k = document.querySelectorAll('rect[id="bar1"]')[b], k.classList.toggle("highlight-bar"));
                        for (var l = 0; l < g - 1; l++) {
                            document.querySelectorAll("svg #slider_" + (b + 1))[0].children[l].classList.add("semi-highlight-bar")
                        }
                        const m = (document.querySelectorAll(".slider .in .tooltip-inner")[b], document.querySelectorAll(".slider-labels .pull-right")[b]),
                            n = document.querySelectorAll(".slider-labels .pull-left")[b],
                            o = document.querySelectorAll(".slider-labels .tick-2")[b],
                            p = document.querySelectorAll(".slider-labels .tick-3")[b],
                            q = document.querySelectorAll(".slider-labels .tick-4")[b];
                        a(document).width() > 992 && a(document).width() < 1200 ? d() : (0 === b ? (Math.ceil(f / 2) >= 10 && Math.ceil(f / 2) <= 16 ? o.style.opacity = "0" : o.style.opacity = "1", Math.ceil(f / 2) >= 23 && Math.ceil(f / 2) < 28 ? p.style.opacity = "0" : p.style.opacity = "1", Math.ceil(f / 2) >= 36 && Math.ceil(f / 2) < 41 ? q.style.opacity = "0" : q.style.opacity = "1") : 1 === b && (Math.ceil(f / 2) >= 10 && Math.ceil(f / 2) <= 17 ? o.style.opacity = "0" : o.style.opacity = "1", Math.ceil(f / 2) >= 23 && Math.ceil(f / 2) <= 28 ? p.style.opacity = "0" : p.style.opacity = "1", Math.ceil(f / 2) >= 34 && Math.ceil(f / 2) <= 41 ? q.style.opacity = "0" : q.style.opacity = "1"), Math.ceil(f / 2) <= 4 ? (n.style.opacity = "0", m.style.opacity = "1") : Math.ceil(f / 2) >= 45 ? (m.style.opacity = "0", n.style.opacity = "1") : (n.style.opacity = "1", m.style.opacity = "1"))
                    }

                    function f(a, b) {
                        for (var c, d = ["k", "M", "B", "T", "P", "E", "Z", "Y"], e = d.length - 1; e >= 0; e--)
                            if (c = Math.pow(1e3, e + 1), a <= -c || a >= c) return +(a / c).toFixed(b) + d[e];
                        return a
                    }

                    function g(a) {
                        var b = document.querySelectorAll(".slider .in .tooltip-inner")[a],
                            c = b.innerHTML,
                            d = f(c);
                        b.innerHTML = d
                    }

                    function h(a) {
                        var b = document.querySelectorAll(".slider .in .tooltip-inner")[a],
                            c = b.innerHTML,
                            d = f(c);
                        /^\$/.test(d) || (b.innerHTML = "$" + d)
                    }

                    function i(b, g, h, i, j, k, l, m, n, o, w, x) {
                        function y() {
                            const a = document.querySelectorAll(".slider .in .tooltip-inner")[b];
                            4 === a.firstChild.nodeValue.length ? a.style.marginLeft = "-5px" : 5 === a.firstChild.nodeValue.length ? a.style.marginLeft = "-10px" : 6 === a.firstChild.nodeValue.length ? a.style.marginLeft = "-12px" : 7 === a.firstChild.nodeValue.length ? a.style.marginLeft = "-15px" : a.style.marginLeft = "0"
                        }
                        g = a(h).slider({
                            min: l,
                            max: m,
                            handle: "custom",
                            tooltip: "always",
                            tooltip_position: "bottom",
                            scale: n,
                            step: o
                        }), e(b, w), x(b), y();
                        var z = !1;
                        a(h).on("slideStop", function (g) {
                            z || ga("send", "event", "Cost Model", "Slider", "Interact With Cost Model Homepage Slider-" + h), z = !0, x(b), c(.127, .04, 21700, .24, 2, 2, 2, .05, 1), a(j).val(g.value).digits(), q = (totalCost / transactionVolume.value).toFixed(2), a("#non-ripple-savings").text("$" + q), s = [Number((paymentProcessingCost / transactionVolume.value).toFixed(2))], t = [Number((treasuryCost / transactionVolume.value).toFixed(2))], u = [Number((reconciliationCost / transactionVolume.value).toFixed(2))], v = [Number((counterpartyFees / transactionVolume.value).toFixed(2))], c(0, 0, 0, 0, 2, 1, 0, 0, .2), p = (totalCost / transactionVolume.value).toFixed(2), a("#ripple-savings").text("$" + p);
                            var i = (q - p).toFixed(2);
                            a("#total-savings").text("$" + i);
                            var k = (i * transactionVolume.value).toFixed(0);
                            a(".annual-savings-number").text("$" + f(k, 2)), e(b, w), s.push(Number((paymentProcessingCost / transactionVolume.value).toFixed(2))), t.push(Number((treasuryCost / transactionVolume.value).toFixed(2))), u.push(Number((reconciliationCost / transactionVolume.value).toFixed(2))), v.push(Number((counterpartyFees / transactionVolume.value).toFixed(2))), y(), r.destroy(), d(1e3)
                        }), a(h).on("slide", function (c) {
                            x(b), a(j).val(c.value).digits(), e(b, w), y()
                        }), a(h).on("change", function (a) {
                            x(b), e(b, w), y()
                        });
                        var A = !1;
                        a(j).change(function () {
                            A || ga("send", "event", "Cost Model", "Slider", "Interact With Cost Model Homepage Slider Manual Input-" + j), A = !0;
                            var h = this.value.replace(/,/g, "");
                            g.slider("setValue", parseInt(h)), c(.127, .04, 21700, .24, 2, 2, 2, .05, 1), q = (totalCost / transactionVolume.value).toFixed(2), s = [Number((paymentProcessingCost / transactionVolume.value).toFixed(2))], t = [Number((treasuryCost / transactionVolume.value).toFixed(2))], u = [Number((reconciliationCost / transactionVolume.value).toFixed(2))], v = [Number((counterpartyFees / transactionVolume.value).toFixed(2))], a("#non-ripple-savings").text("$" + q), c(0, 0, 0, 0, 2, 1, 0, 0, .2), p = (totalCost / transactionVolume.value).toFixed(2), s.push(Number((paymentProcessingCost / transactionVolume.value).toFixed(2))), t.push(Number((treasuryCost / transactionVolume.value).toFixed(2))), u.push(Number((reconciliationCost / transactionVolume.value).toFixed(2))), v.push(Number((counterpartyFees / transactionVolume.value).toFixed(2))), a("#ripple-savings").text("$" + p);
                            var i = (q - p).toFixed(2);
                            a("#total-savings").text("$" + i);
                            var k = (i * transactionVolume.value).toFixed(0);
                            a(".annual-savings-number").text("$" + f(k, 2)), r.destroy(), d(1e3), e(b, w), x(b), y(), a(this).hasClass("percentage") ? a(this).val(Number(h.replace(/[^.\d]+/g, "")).toFixed(2)) : a(this).val(h.replace(/,/g, "").replace(/[^\d]/g, "")).digits();
                            var n = a(this).val().replace(/,/g, "");
                            n < l && a(this).val(l).digits(), n > m && a(this).val(m).digits()
                        })
                    }
                    var j = [];
                    j[0] = !1, j[1] = !1, a(".manual-label").each(function (b, c) {
                        a(this).hover(function () {
                            var c = a(this).data("original-title");
                            j[b] || ga("send", "event", "Cost Model", "Hover", "Interact With Homepage Cost Model Tooltip", c), j[b] = !0
                        })
                    }), a.fn.digits = function () {
                        return this.each(function () {
                            a(this).text(a(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")), a(this).val(a(this).val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
                        })
                    };
                    var k, l, m, n, o;
                    a(".cost-model-advanced").click(function () {
                        ga("send", "event", "Cost Model", "Click", "View Advanced Settings"), "undefined" != typeof Storage && (localStorage.setItem("slider1", transactionVolume.value), localStorage.setItem("slider2", paymentVolume.value))
                    });
                    var p, q, r, s = [],
                        t = [],
                        u = [],
                        v = [],
                        w = ["Current", "Ripple"];
                    Chart.defaults.global.defaultFontFamily = "'open_sansregular', sans-serif", Chart.defaults.globaldefaultFontColor = "#808080";
                    var x = !1;
                    Chart.defaults.global.hover.onHover = function (b) {
                        if (b[0]) {
                            var c = b[0]._index;
                            x || ga("send", "event", "Cost Model", "Hover", "Interact With Homepage Cost Model Bar Graph"), x = !0, 1 === c ? a("#chartjs-tooltip").addClass("right-bar") : a("#chartjs-tooltip").removeClass("right-bar")
                        }
                    };
                    var y, z, A, B;
                    a('[data-toggle="tooltip"]').tooltip({
                        placement: "bottom"
                    }), i(0, y, "#transactionVolume", transactionVolume, "#transactionVolumeSliderVal", A, 1e4, 1e8, "logarithmic", 1e3, 2, g), i(1, z, "#paymentVolume", paymentVolume, "#paymentVolumeSliderVal", B, 5e6, 5e12, "logarithmic", 1e5, 2, h), a(window).resize(function () {
                        g(0), h(1), r.destroy(), d(1)
                    }), c(.127, .04, 21700, .24, 2, 2, 2, .05, 1), q = (totalCost / transactionVolume.value).toFixed(2), s = [Number((paymentProcessingCost / transactionVolume.value).toFixed(2))], t = [Number((treasuryCost / transactionVolume.value).toFixed(2))], u = [Number((reconciliationCost / transactionVolume.value).toFixed(2))], v = [Number((counterpartyFees / transactionVolume.value).toFixed(2))], c(0, 0, 0, 0, 2, 1, 0, 0, .2), p = (totalCost / transactionVolume.value).toFixed(2), s.push(Number((paymentProcessingCost / transactionVolume.value).toFixed(2))), t.push(Number((treasuryCost / transactionVolume.value).toFixed(2))), u.push(Number((reconciliationCost / transactionVolume.value).toFixed(2))), v.push(Number((counterpartyFees / transactionVolume.value).toFixed(2)));
                    var C = (q - p).toFixed(2);
                    a("#total-savings").text("$" + C);
                    var D = (C * transactionVolume.value).toFixed(0);
                    a(".annual-savings-number").text("$" + f(D, 2)), b("#saving-bar-chart") && (a("#saving-bar-chart").data("generated", !1), setTimeout(function () {
                        d(1e3)
                    }, 100), a("#saving-bar-chart").data("generated", !0)), a(window).scroll(function () {
                        if (b("#saving-bar-chart")) {
                            if (a("#saving-bar-chart").data("generated")) return;
                            a("#saving-bar-chart").data("generated", !1), setTimeout(function () {
                                d(1e3)
                            }, 100), a("#saving-bar-chart").data("generated", !0)
                        }
                    }), a(".carousel").carousel({
                        interval: !1
                    }), a(".partner_logo.standard").addClass("active"), a(".partner_logo").click(function () {
                        var b = a(this).attr("class").split(" ").pop();
                        a(".partner_logo").removeClass("active"), a(this).addClass("active"), ga("send", "event", "carousel-logo-" + b, "click", "partners")
                    }), a(".carousel-indicators li").click(function () {
                        var b = a(this).index();
                        0 === b ? (a(".partner_logo").removeClass("active"), a(".standard").addClass("active"), ga("send", "event", "carousel-bullet-standard-chartered", "click", "partners")) : 1 === b ? (a(".partner_logo").removeClass("active"), a(".unicredit").addClass("active"), ga("send", "event", "carousel-bullet-unicredit", "click", "partners")) : 2 === b ? (a(".partner_logo").removeClass("active"), a(".huarui").addClass("active"), ga("send", "event", "carousel-bullet-huarui", "click", "partners")) : 3 === b && (a(".partner_logo").removeClass("active"), a(".atb").addClass("active"), ga("send", "event", "carousel-bullet-atb", "click", "partners"))
                    });
                    var E = a("#dot1"),
                        F = a("#dot2"),
                        G = a("#dot3"),
                        H = a("#dot4");
                    a(".carousel-control.right").click(function () {
                        E.hasClass("active") ? (a(".partner_logo").removeClass("active"), a(".unicredit").addClass("active"), ga("send", "event", "carousel-arrow-unicredit", "click", "partners")) : F.hasClass("active") ? (a(".partner_logo").removeClass("active"), a(".huarui").addClass("active"), ga("send", "event", "carousel-arrow-huarui", "click", "partners")) : G.hasClass("active") ? (a(".partner_logo").removeClass("active"), a(".atb").addClass("active"), ga("send", "event", "carousel-arrow-atb", "click", "partners")) : H.hasClass("active") && (a(".partner_logo").removeClass("active"), a(".standard").addClass("active"), ga("send", "event", "carousel-arrow-standard", "click", "partners"))
                    }), a(".carousel-control.left").click(function () {
                        E.hasClass("active") ? (a(".partner_logo").removeClass("active"), a(".atb").addClass("active"), ga("send", "event", "carousel-arrow-atb", "click", "partners")) : F.hasClass("active") ? (a(".partner_logo").removeClass("active"), a(".standard").addClass("active"), ga("send", "event", "carousel-arrow-standard", "click", "partners")) : G.hasClass("active") ? (a(".partner_logo").removeClass("active"), a(".unicredit").addClass("active"), ga("send", "event", "carousel-arrow-unicredit", "click", "partners")) : H.hasClass("active") && (a(".partner_logo").removeClass("active"), a(".huarui").addClass("active"), ga("send", "event", "carousel-arrow-huarui", "click", "partners"))
                    }), jQuery.fn.visible = function (b) {
                        var c = a(this),
                            d = a(window),
                            e = d.scrollTop(),
                            f = e + d.height(),
                            g = c.offset().top,
                            h = g + c.height(),
                            i = !0 === b ? h : g;
                        return (!0 === b ? g : h) <= f && i >= e
                    }
                }
            },
            page_process_payments: {
                init: function () {
                    a(".carousel").carousel({
                        interval: !1
                    }), -1 !== window.location.href.indexOf("#howrippleworks") && a("#techVideoModal").modal("show"), a(".partner_logo.standard").addClass("active"), a(".partner_logo").click(function () {
                        var b = a(this).attr("class").split(" ").pop();
                        a(".partner_logo").removeClass("active"), a(this).addClass("active"), ga("send", "event", "carousel-logo-" + b, "click", "partners")
                    }), a(".carousel-indicators li").click(function () {
                        var b = a(this).index();
                        0 === b ? (a(".partner_logo").removeClass("active"), a(".standard").addClass("active"), ga("send", "event", "carousel-bullet-standard-chartered", "click", "partners")) : 1 === b ? (a(".partner_logo").removeClass("active"), a(".unicredit").addClass("active"), ga("send", "event", "carousel-bullet-unicredit", "click", "partners")) : 2 === b ? (a(".partner_logo").removeClass("active"), a(".huarui").addClass("active"), ga("send", "event", "carousel-bullet-huarui", "click", "partners")) : 3 === b && (a(".partner_logo").removeClass("active"), a(".atb").addClass("active"), ga("send", "event", "carousel-bullet-atb", "click", "partners"))
                    });
                    var b = a("#dot1"),
                        c = a("#dot2"),
                        d = a("#dot3"),
                        e = a("#dot4");
                    a(".carousel-control.right").click(function () {
                        b.hasClass("active") ? (a(".partner_logo").removeClass("active"), a(".unicredit").addClass("active"), ga("send", "event", "carousel-arrow-unicredit", "click", "partners")) : c.hasClass("active") ? (a(".partner_logo").removeClass("active"), a(".huarui").addClass("active"), ga("send", "event", "carousel-arrow-huarui", "click", "partners")) : d.hasClass("active") ? (a(".partner_logo").removeClass("active"), a(".atb").addClass("active"), ga("send", "event", "carousel-arrow-atb", "click", "partners")) : e.hasClass("active") && (a(".partner_logo").removeClass("active"), a(".standard").addClass("active"), ga("send", "event", "carousel-arrow-standard", "click", "partners"))
                    }), a(".carousel-control.left").click(function () {
                        b.hasClass("active") ? (a(".partner_logo").removeClass("active"), a(".atb").addClass("active"), ga("send", "event", "carousel-arrow-atb", "click", "partners")) : c.hasClass("active") ? (a(".partner_logo").removeClass("active"), a(".standard").addClass("active"), ga("send", "event", "carousel-arrow-standard", "click", "partners")) : d.hasClass("active") ? (a(".partner_logo").removeClass("active"), a(".unicredit").addClass("active"), ga("send", "event", "carousel-arrow-unicredit", "click", "partners")) : e.hasClass("active") && (a(".partner_logo").removeClass("active"), a(".huarui").addClass("active"), ga("send", "event", "carousel-arrow-huarui", "click", "partners"))
                    })
                }
            },
            page_corporates: {
                init: function () {}
            },
            page_ripple_txt_validator: {
                init: function () {
                    function b(a, b) {
                        this.name = "VerificationError", this.message = a || "", this.tips = b || ""
                    }

                    function c(b) {
                        var c = a("<li></li>").text(b).appendTo("#log");
                        return c.resolve = function (b) {
                            return a("<span></span>").html(b).appendTo(c)
                        }, c
                    }
                    b.prototype = Error.prototype, a("#domain-entry").submit(function (d) {
                        d.preventDefault();
                        var e, f = a("#domain").val();
                        a(".result-title").show(), a("#result").show(), a("#log").empty(), async.waterfall([function (d) {
                            function g(f, i) {
                                if (this instanceof a) {
                                    var j;
                                    switch (i) {
                                        case "timeout":
                                            j = "TIMEOUT";
                                            break;
                                        case "abort":
                                            j = "ABORTED";
                                            break;
                                        case "error":
                                            j = "ERROR";
                                            break;
                                        default:
                                            j = "UNKNOWN"
                                    }
                                    a("<span></span>").text(j).addClass("red").appendTo(this)
                                }
                                if (!h.length) {
                                    return void d(new b("No ripple.txt found!", 'Check if the file is actually hosted at one of the URLs above and make sure your server provides the required <a href="https://ripple.com/wiki/Ripple.txt#Publishing_ripple.txt">CORS header.</a>'))
                                }
                                var k = h.pop(),
                                    l = c("Checking " + k + "...");
                                a.ajax({
                                    url: k,
                                    dataType: "text",
                                    success: function (b) {
                                        a("<span></span>").text("FOUND").addClass("green").appendTo(l), e = b, d()
                                    },
                                    error: a.proxy(g, l)
                                })
                            }
                            var h = ["https://www." + f + "/ripple.txt", "https://" + f + "/ripple.txt", "https://ripple." + f + "/ripple.txt"].reverse();
                            g()
                        }, function () {
                            e = e.replace("\r\n", "\n"), e = e.replace("\r", "\n"), e = e.split("\n");
                            for (var a = "", b = {}, d = 0, g = e.length; d < g; d++) {
                                var h = e[d].replace(/^\s+|\s+$/g, "");
                                h.length && "#" !== h[0] && ("[" === h[0] && "]" === h[h.length - 1] ? (a = h.slice(1, h.length - 1), b[a] = []) : (h = h.replace(/^\s+|\s+$/g, ""), b[a] && b[a].push(h)))
                            }
                            var i;
                            i = c("Domain should match [domain]..."), b.domain && b.domain.length && b.domain[0] === f ? i.resolve("VALID").addClass("green") : b.domain && b.domain.length ? i.resolve("MISMATCH").addClass("red") : i.resolve("MISSING").addClass("red")
                        }], function (d, e) {
                            if (d instanceof b) {
                                var f = c("");
                                f.resolve(d.message).addClass("red"), a("<br>").appendTo(f), a("<p></p>").html(d.tips).appendTo(f)
                            } else d && c(d).addClass("red")
                        })
                    })
                }
            },
            page_executive_summary_for_financial_institutions: {
                init: function () {
                    a(window).scroll(function () {
                        var b = a(".content-info").position().top;
                        a(window).scrollTop() + a(window).height() > b ? a(".whitepaper_nav_wrapper").css("z-index", "-1") : a(".whitepaper_nav_wrapper").css("z-index", "1")
                    })
                }
            },
            page_thank_you: {
                init: function () {
                    -1 !== document.referrer.indexOf("cost-model") && (a("h1 span").text("Thank you for running your customized cost analysis"), a(".thank-you-message").html('You will receive a customized report in a few minutes outlining the cost breakdown, sources of value and your bank\'s performance against industry benchmarks. In the meantime, you can browse <a href="/solutions">use cases</a> your bank can implement using Ripple. <br/><br/>For more details, <a href="/contact">contact us</a>.'))
                }
            },
            page_solutions: {
                init: function () {
                    a(".col-md-6 .cta_readmore").click(function (b) {
                        var c = a(b.target).text(),
                            d = a(this).closest(".col-md-6").find("h5 > span").text();
                        ga("send", "event", d + "-CTA", "click", c)
                    })
                }
            },
            page_network: {
                init: function () {
                    a(".testimonials .call_to_action").click(function (b) {
                        var c = a(b.target).text();
                        ga("send", "event", "CTA Testimonial", "click", c)
                    }), a(".col-md-6 .cta_readmore").click(function (b) {
                        var c = a(b.target).text(),
                            d = a(this).closest(".col-md-6").find("h5 > span").text();
                        ga("send", "event", d + "-CTA", "click", c)
                    })
                }
            },
            customer_case_study_reisebank: {
                init: function () {
                    a("#atbVideoModal").on("hidden.bs.modal", function (a) {
                        ga("send", "event", "Watch ReiseBank Case Study Video", "close", player.getCurrentTime().toFixed(1))
                    }), a("a#trigger").click(function () {
                        ga("send", "event", "Watch ReiseBank Case Study Video", "click", "Image CTA")
                    }), a(".cta_readmore").click(function () {
                        ga("send", "event", "ReiseBank Case Study", "click", "Download PDF")
                    }), a(".company-info .call_to_action").click(function () {
                        ga("send", "event", "ReiseBank Case Study", "click", "Learn More CTA")
                    }), a(".links li a").click(function () {
                        ga("send", "event", "ReiseBank Case Study", "links-click", a(this).text())
                    })
                }
            },
            page_all_jobs: {
                init: function () {
                    function b(a) {
                        return a.toString().toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-")
                    }
                    window.location.hash.substr(1).length && a.ajax({
                        type: "GET",
                        url: "https://api.greenhouse.io/v1/boards/ripple/embed/jobs",
                        async: !1,
                        success: function (c) {
                            a.each(c.jobs, function (a, c) {
                                var d = c.id,
                                    e = b(c.title);
                                if (-1 !== window.location.hash.indexOf(d)) return window.location.hash = e, !1
                            })
                        }
                    }), a(document).ready(function () {
                        function b(b) {
                            a("." + b + " .job_share").click(function () {
                                var c = a(this).attr("class").split(" ").pop(),
                                    d = a(this).attr("class").split(" ")[0],
                                    e = decodeURIComponent(d);
                                ga("send", "event", "job-share", c + "-" + b, e)
                            })
                        }
                        b("top"), b("bottom")
                    })
                }
            },
            page_contact: {
                init: function () {
                    function b(b) {
                        var c = a(window).scrollTop();
                        c + a(window).height() !== a(document).height() && (c >= b ? a(".purpose-header").addClass("scrolled") : a(".purpose-header").removeClass("scrolled"))
                    }

                    function c(b) {
                        const c = a(b).siblings(".floating-label");
                        a(b).val().length > 0 ? (c.addClass("input-has-value"), c.prev().removeClass("invalid-input"), c.next().removeClass("invalid-input")) : (c.removeClass("input-has-value"), c.prev().addClass("invalid-input"), c.next().addClass("invalid-input"))
                    }

                    function d() {
                        n.show(), l.show(), m.hide(), o.hide(), p.hide(), j.val("Contact Media Team"), k.text("On deadline?"), r.text("Contact us with your press inquiries.")
                    }

                    function e() {
                        n.hide(), l.hide(), o.show(), p.hide(), q.hide(), k.text("Getting started with XRP?"), r.text("For the fastest answers, check out our FAQs.")
                    }

                    function f() {
                        j.val("Contact Sales"), k.text("Interested in joining RippleNet?"), r.text("Speak with a member of our sales team about joining RippleNet."), m.show(), n.show(), l.hide(), p.hide(), o.hide()
                    }

                    function g() {
                        n.hide(), l.hide(), o.hide(), p.show(), k.text("Can’t find what you are looking for?"), r.text("Our dedicated team is standing by.")
                    }

                    function h() {
                        a("input[type='radio']").click(function () {
                            var b = a("input[type='radio']:checked").val();
                            "Media & Press" === b ? d() : "XRP" === b ? e() : "Sales" === b ? f() : "Support" === b ? g() : (l.hide(), m.show())
                        })
                    }

                    function i(a, b) {
                        var c = a.find(":selected").text();
                        "Country" === c || "Organization Type" === c ? (a.removeClass("selected"), b && a.addClass("invalid-select")) : (a.addClass("selected"), a.removeClass("invalid-select"))
                    }
                    b(276), a(window).scroll(function () {
                        b(276)
                    }), a(".download + p").remove(), a("input[type=tel]").on("focusout", function (b) {
                        var c = a(this);
                        !new RegExp("^[0-9().+-]+$").test(c.val()) && c.val().length > 0 ? c.addClass("invalid-phone-format") : c.removeClass("invalid-phone-format")
                    }), a("input, input[type=tel]").each(function () {
                        c(this)
                    }), a("input").on("change keyup", function () {
                        c(this)
                    }), a("textarea").each(function () {
                        c(this)
                    }), a("textarea").on("change keyup", function () {
                        c(this)
                    });
                    var j = a(".submit"),
                        k = a(".header_text"),
                        l = a(".media-kit-wrapper"),
                        m = a(".no-media"),
                        n = a(".contact-form"),
                        o = a(".faq-accordion"),
                        p = a(".support-bottom"),
                        q = a(".faq-bottom"),
                        r = a(".teaser_text");
                    h(), window.location.hash || (window.location.hash = "#support"), a('input:radio[name="mail-to"]').change(function () {
                        a(this).is(":checked") && "Media & Press" === a(this).val() ? window.location.hash = "#media" : a(this).is(":checked") && "Sales" === a(this).val() ? window.location.hash = "#sales" : a(this).is(":checked") && "XRP" === a(this).val() ? window.location.hash = "#xrp" : a(this).is(":checked") && "Support" === a(this).val() ? window.location.hash = "#support" : window.location.hash = "#sales"
                    }), window.location.href.indexOf("media") > -1 && (a('input[value="Media & Press"]').prop("checked", !0), d()), window.location.href.indexOf("xrp") > -1 && (a('input[value="XRP"]').prop("checked", !0), e()), window.location.href.indexOf("support") > -1 && (a('input[value="Support"]').prop("checked", !0), g()), window.location.href.indexOf("sales") > -1 && (a('input[value="Sales"]').prop("checked", !0), f());
                    a("#support-holder"), a(".payment-volume");
                    a("#countrySelect, #organizationSelect").on("change", a(this), function () {
                        i(a(this), !1)
                    }), a("form.wpcf7-form").on("submit", function () {
                        i(a("#countrySelect"), !0), i(a("#organizationSelect"), !0)
                    }), document.addEventListener("wpcf7mailsent", function (a) {
                        "5478" === a.detail.contactFormId && (location.replace("/thank-you"), ga("send", "event", "Contact Form", "sent"))
                    }, !1), document.addEventListener("wpcf7spam", function (a) {
                        "5478" === a.detail.contactFormId && alert("Spam detected, please try again.")
                    }, !1), document.addEventListener("wpcf7mailfailed", function (b) {
                        "5478" === b.detail.contactFormId && a(".sending-error").show()
                    }, !1)
                }
            },
            page_xrp_test_net: {
                init: function () {
                    function b() {
                        var b = a("#your-credentials"),
                            c = a("#address"),
                            d = a("#secret"),
                            e = a("#balance"),
                            f = a("#loader");
                        b.hide(), c.html(""), d.html(""), e.html(""), f.css("display", "inline"), a.ajax({
                            url: "https://faucet.altnet.rippletest.net/accounts",
                            type: "POST",
                            dataType: "json",
                            success: function (a) {
                                f.hide(), b.hide().html("<h2>Your Credentials</h2>").fadeIn("fast"), c.hide().html("<h3>Address</h3> " + a.account.address).fadeIn("fast"), d.hide().html("<h3>Secret</h3> " + a.account.secret).fadeIn("fast"), e.hide().html("<h3>Balance</h3> " + Number(a.balance).toLocaleString("en") + " XRP").fadeIn("fast")
                            },
                            error: function () {
                                f.hide(), alert("There was an error with the Ripple Test Net, please try again.")
                            }
                        })
                    }
                    a(".cta_readmore").click(b)
                }
            },
            page_bankers_guide_to_blockchain: {
                init: function () {
                    document.addEventListener("wpcf7mailsent", function (a) {
                        "13265" === a.detail.contactFormId && location.replace("/files/bankers_guide_to_blockchain.pdf")
                    }, !1)
                }
            },
            page_blockchain_in_payments_report: {
                init: function () {
                    document.addEventListener("wpcf7mailsent", function (a) {
                        location.replace("/files/ripple_blockchain_payments_report_2018.pdf")
                    }, !1)
                }
            },
            page_market_performance: {
                init: function () {
                    function b(b) {
                        var c = a(window).scrollTop(),
                            d = c + a(window).height(),
                            e = a(b).offset().top,
                            f = e + a(b).height();
                        return e <= d && f >= c
                    }

                    function c() {
                        a.ajax({
                            type: "GET",
                            url: "https://data.ripple.com/v2/network/xrp_distribution?descending=true&limit=1",
                            dataType: "json",
                            success: function (c) {
                                var d = c.rows[0],
                                    e = moment(d.date).utc().format("MMMM Do, YYYY"),
                                    f = parseInt(d.distributed),
                                    g = parseInt(d.escrowed),
                                    h = parseInt(d.undistributed);
                                Chart.pluginService.register({
                                    beforeRender: function (a) {
                                        a.config.options.showAllTooltips && (a.pluginTooltips = [], a.config.data.datasets.forEach(function (b, c) {
                                            a.getDatasetMeta(c).data.forEach(function (b, c) {
                                                a.pluginTooltips.push(new Chart.Tooltip({
                                                    _chart: a.chart,
                                                    _chartInstance: a,
                                                    _data: a.data,
                                                    _options: a.options.tooltips,
                                                    _active: [b]
                                                }, a))
                                            })
                                        }), a.options.tooltips.enabled = !1)
                                    },
                                    afterDraw: function (a, b) {
                                        if (a.config.options.showAllTooltips) {
                                            if (!a.allTooltipsOnce) {
                                                if (1 !== b) return;
                                                a.allTooltipsOnce = !0
                                            }
                                            a.options.tooltips.enabled = !0, Chart.helpers.each(a.pluginTooltips, function (a) {
                                                a.initialize(), a.update(), a.pivot(), a.transition(b).draw()
                                            }), a.options.tooltips.enabled = !1
                                        }
                                    }
                                });
                                var i, j = {
                                        labels: ["Ripple    ", "Distributed", "    Escrow"],
                                        datasets: [{
                                            data: [h, f, g],
                                            backgroundColor: ["#005f96", "#27a2db", "#344e5a"],
                                            hoverBackgroundColor: ["#005f96", "#27a2db", "#344e5a"],
                                            borderWidth: 0
                                        }]
                                    },
                                    k = {
                                        legend: {
                                            display: !1
                                        },
                                        cutoutPercentage: 50,
                                        showAllTooltips: !0,
                                        tooltips: {
                                            xPadding: -50,
                                            backgroundColor: "rgba(0,0,0,0)",
                                            callbacks: {
                                                label: function (a, b) {
                                                    return b.labels[a.index]
                                                }
                                            }
                                        }
                                    },
                                    l = a("#myChart").get(0).getContext("2d");
                                a(".ripple-xrp").text(h.toLocaleString()), a(".others-xrp").text(f.toLocaleString() + "*"), a(".escrow-xrp").text(g.toLocaleString()), a(".timestamp").text(e), b("#myChart") && (i = new Chart(l, {
                                    type: "doughnut",
                                    data: j,
                                    options: k
                                }), a("#myChart").data("generated", !0)), a(window).scroll(function () {
                                    if (b("#myChart")) {
                                        if (a("#myChart").data("generated")) return;
                                        a("#myChart").data("generated", !0), setTimeout(function () {
                                            i = new Chart(l, {
                                                type: "doughnut",
                                                data: j,
                                                options: k
                                            })
                                        }, 350)
                                    }
                                })
                            },
                            error: function (b) {
                                a(".ripple-xrp").text("Currently not available from the Data API"), a(".others-xrp").text("Currently not available from the Data API"), a(".escrow-xrp").text("Currently not available from the Data API"), a(".timestamp").text(moment().format("MMM Do, YY"))
                            }
                        })
                    }

                    function d(a, b) {
                        for (var c, d = ["Thousand USD", "Million USD", "Billion USD", "Trillion USD", "P", "E", "Z", "Y"], e = d.length - 1; e >= 0; e--)
                            if (c = Math.pow(1e3, e + 1), a <= -c || a >= c) return +parseFloat((a / c).toFixed(b)) + '<div class="unit">' + d[e] + "</div>";
                        return a
                    }

                    function e() {
                        a(".xrpValue").removeClass("flash-red"), a(".xrpValue").removeClass("flash-green"), a.ajax("https://data.ripple.com/v2/network/xrp_distribution?descending=true&limit=1", {
                            success: function (b) {
                                l = b.rows[0], A = Number(l.total), m = x * A, m > u ? a(".xrpValue").addClass("flash-green") : m < u && a(".xrpValue").addClass("flash-red"), localStorage.setItem("marketCap", m), u = localStorage.getItem("marketCap"), isNaN(m) ? a(".xrpValue").html('<img class="throbber" src="/wp-content/themes/ripple-beta/assets/img/xrp/rippleThrobber.png" />') : a(".xrpValue").html("<span class='styleDollar'>$</span>" + d(m, 2))
                            },
                            error: function () {
                                a(".xrpValue").html('<img class="throbber" src="/wp-content/themes/ripple-beta/assets/img/xrp/rippleThrobber.png" />')
                            }
                        })
                    }

                    function f() {
                        a(".transactionFee").removeClass("flash-red"), a(".transactionFee").removeClass("flash-green"), a.ajax("https://data.ripple.com/v2/network/fees?limit=1&descending=true", {
                            success: function (b) {
                                n = b.rows[0].avg;
                                var c = n * x;
                                c = c.toLocaleString("en", {
                                    minimumFractionDigits: 7
                                }), c > r ? a(".transactionFee").addClass("flash-red") : c < r && a(".transactionFee").addClass("flash-green"), localStorage.setItem("networkTransactionFee", c), r = localStorage.getItem("networkTransactionFee");
                                var d = c.match(/^[^1-9]+/)[0],
                                    e = c.match(/[1-9]+[0-9]*/)[0];
                                isNaN(c) ? a(".transactionFee").html('<img class="throbber" src="/wp-content/themes/ripple-beta/assets/img/xrp/rippleThrobber.png" />') : a(".transactionFee").html("<span class='styleDollar'>$</span><span class='style0'>" + d + "</span>" + e + '<div class="unit">USD</div>')
                            },
                            error: function () {
                                a(".transactionFee").html('<img class="throbber" src="/wp-content/themes/ripple-beta/assets/img/xrp/rippleThrobber.png" />')
                            }
                        })
                    }

                    function g() {
                        a(".ledgerCloseTime").removeClass("flash-red"), a(".ledgerCloseTime").removeClass("flash-green"), a(".tps").removeClass("flash-red"), a(".tps").removeClass("flash-green"), a.ajax("https://data.ripple.com/v2/stats/metric?interval=hour&limit=1&descending=true", {
                            success: function (b) {
                                o = b.stats[0].ledger_interval.toFixed(2), p = (b.stats[0].tx_per_ledger / o).toFixed(2), o > s ? a(".ledgerCloseTime").addClass("flash-red") : o < s && a(".ledgerCloseTime").addClass("flash-green"), p > t ? a(".tps").addClass("flash-green") : p < t && a(".tps").addClass("flash-red"), localStorage.setItem("ledgerCloseTime", o), s = localStorage.getItem("ledgerCloseTime"), localStorage.setItem("tps", o), t = localStorage.getItem("tps"), isNaN(o) ? a(".ledgerCloseTime").html('<img class="throbber" src="/wp-content/themes/ripple-beta/assets/img/xrp/rippleThrobber.png" />') : a(".ledgerCloseTime").html(o + '<div class="unit">Seconds</div>'), isNaN(p) || !isFinite(p) ? a(".tps").html('<img class="throbber" src="/wp-content/themes/ripple-beta/assets/img/xrp/rippleThrobber.png" />') : a(".tps").html(p)
                            },
                            error: function () {
                                a(".ledgerCloseTime").html('<img class="throbber" src="/wp-content/themes/ripple-beta/assets/img/xrp/rippleThrobber.png" />'), a(".tps").html('<img class="throbber" src="/wp-content/themes/ripple-beta/assets/img/xrp/rippleThrobber.png" />')
                            }
                        })
                    }

                    function h(b) {
                        a(".xrpVolume").removeClass("flash-red"), a(".xrpVolume").removeClass("flash-green"), a.ajax("https://data.ripple.com/v2/exchange_rates/XRP/USD+rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B?period=" + b, {
                            success: function (a) {
                                q = Number(a.rate)
                            },
                            error: function () {
                                a(".xrpVolume").html('<img class="throbber" src="/wp-content/themes/ripple-beta/assets/img/xrp/rippleThrobber.png" />')
                            },
                            complete: function () {
                                a.ajax("https://data.ripple.com/v2/network/external_markets?&period=" + b, {
                                    success: function (a) {
                                        y = Number(a.data.total)
                                    },
                                    error: function () {
                                        a(".xrpVolume").html('<img class="throbber" src="/wp-content/themes/ripple-beta/assets/img/xrp/rippleThrobber.png" />')
                                    },
                                    complete: function () {
                                        z = 0, a.ajax("https://data.ripple.com/v2/network/exchange_volume?&live=" + b, {
                                            success: function (b) {
                                                a.each(b.rows[0].components, function (a, b) {
                                                    "XRP" !== b.base.currency && "XRP" !== b.counter.currency || (z += Number(b.converted_amount))
                                                }), A = Number(z + y);
                                                var c = A * q;
                                                w > c && !C ? a(".xrpVolume").addClass("flash-red") : w < c && !C && a(".xrpVolume").addClass("flash-green"), C = !1, localStorage.setItem("xrpVolumePrice", c), w = localStorage.getItem("xrpVolumePrice"), isNaN(c) || 0 === q ? a(".xrpVolume").html('<img class="throbber" src="/wp-content/themes/ripple-beta/assets/img/xrp/rippleThrobber.png" />') : a(".xrpVolume").html("<span class='styleDollar'>$</span>" + d(c, 2))
                                            },
                                            error: function () {
                                                a(".xrpVolume").html('<img class="throbber" src="/wp-content/themes/ripple-beta/assets/img/xrp/rippleThrobber.png" />')
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }

                    function i() {
                        var b;
                        a(".xrpNumber").removeClass("flash-red"), a(".xrpNumber").removeClass("flash-green"), a.ajax("https://data.ripple.com/v2/exchange_rates/XRP/USD+rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B?live=true", {
                            success: function (c) {
                                x = Number(c.rate).toPrecision(4), v > x ? a(".xrpNumber").addClass("flash-red") : v < x && a(".xrpNumber").addClass("flash-green"), localStorage.setItem("xrpLivePrice", x), v = localStorage.getItem("xrpLivePrice"), b = x >= 1 ? "<span class='style2'>" + x + "</span>" : x.match(/^[^1-9]+/)[0];
                                var d = x.match(/[1-9]+[0-9]*/)[0];
                                isNaN(x) ? a(".xrpNumber").html('<img class="throbber" src="/wp-content/themes/ripple-beta/assets/img/xrp/rippleThrobber.png" />') : a(".xrpNumber").html("<span class='styleDollar'>$</span><span class='style0'>" + b + "</span>" + d + '<div class="unit">USD</div>'), e(), f(), h(B)
                            },
                            error: function () {
                                a(".xrpNumber").html('<img class="throbber" src="/wp-content/themes/ripple-beta/assets/img/xrp/rippleThrobber.png" />')
                            }
                        }), a.ajax("https://data.ripple.com/v2/exchange_rates/XRP/USD+rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B?live=true", {
                            success: function (a) {
                                k = Number(a.rate).toPrecision(4), g()
                            },
                            error: function () {
                                a(".xrpNumber").html('<img class="throbber" src="/wp-content/themes/ripple-beta/assets/img/xrp/rippleThrobber.png" />')
                            }
                        })
                    }

                    function j(b) {
                        a(window).scrollTop() >= b ? (a(".navbar-default").addClass("scrolled"), a(".navbar-default").removeClass("initial_header"), a(".initial_logo").hide(), a(".logo_scrolled").show()) : (a(".navbar-default").removeClass("scrolled"), a(".navbar-default").addClass("initial_header"), a(".initial_logo").show(), a(".logo_scrolled").hide())
                    }
                    a('[data-toggle="tooltip"]').tooltip({
                        placement: "top"
                    }), Chart.defaults.global.defaultFontFamily = "'open_sansregular', sans-serif", Chart.defaults.global.defaultFontSize = 17, c();
                    var k, l, m, n, o, p, q, r, s, t, u, v, w, x = 0,
                        y = 0,
                        z = 0,
                        A = 0,
                        B = "30day",
                        C = !0;
                    j(10), a(window).scroll(function () {
                        j(10)
                    }), a("#timeLinks a").click(function (b) {
                        C = !0, b.preventDefault();
                        var c = a(this).attr("href");
                        a("#timeLinks a").removeClass("active"), a(this).addClass("active"), B = c, h(B), ga("send", "event", "XRP", "click", "Volume Time Toggle:" + B)
                    }), a("a").click(function (b) {
                        var c = a(this).text();
                        ga("send", "event", "XRP", "click", c)
                    });
                    var D = [];
                    D[0] = !1, D[1] = !1, D[2] = !1, D[3] = !1, D[4] = !1, D[5] = !1, a(".manual-label").each(function (b, c) {
                        a(this).hover(function () {
                            var c = a(this).data("original-title");
                            D[b] || ga("send", "event", "XRP", "Hover", "Toolip:" + c), D[b] = !0
                        })
                    }), i(), window.setInterval(function () {
                        x = 0, i()
                    }, 4e3)
                }
            },
            page_buy_xrp: {
                init: function () {
                    function b(b) {
                        a(window).scrollTop() >= b ? (a(".navbar-default").addClass("scrolled"), a(".navbar-default").removeClass("initial_header"), a(".initial_logo").hide(), a(".logo_scrolled").show()) : (a(".navbar-default").removeClass("scrolled"), a(".navbar-default").addClass("initial_header"), a(".initial_logo").show(), a(".logo_scrolled").hide())
                    }
                    a("a").click(function (b) {
                        var c = a(this).text();
                        ga("send", "event", "XRP", "click", c)
                    }), b(10), a(window).scroll(function () {
                        b(10)
                    })
                }
            },
            page_how_to_buy_xrp_on_bitstamp: {
                init: function () {
                    a("a").click(function (b) {
                        var c = a(this).text();
                        ga("send", "event", "XRP-Individual-Buy", "click", c)
                    })
                }
            },
            page_how_to_buy_xrp_on_gatehub: {
                init: function () {
                    a("a").click(function (b) {
                        var c = a(this).text();
                        ga("send", "event", "XRP-Individual-Buy", "click", c)
                    })
                }
            },
            page_how_to_buy_xrp_on_kraken: {
                init: function () {
                    a("a").click(function (b) {
                        var c = a(this).text();
                        ga("send", "event", "XRP-Individual-Buy", "click", c)
                    })
                }
            },
            page_xrp: {
                init: function () {
                    function b(b) {
                        a(window).scrollTop() >= b ? (a(".navbar-default").addClass("scrolled"), a(".navbar-default").removeClass("initial_header"), a(".initial_logo").hide(), a(".logo_scrolled").show()) : (a(".navbar-default").removeClass("scrolled"), a(".navbar-default").addClass("initial_header"), a(".initial_logo").show(), a(".logo_scrolled").hide())
                    }

                    function c(b) {
                        var c = a(window).scrollTop(),
                            d = c + a(window).height(),
                            e = a(b).offset().top,
                            f = e + a(b).height();
                        return e <= d && f >= c
                    }

                    function d(a, b) {
                        for (var c, d = ["Thousand USD", "Million USD", "Billion USD", "Trillion USD", "P", "E", "Z", "Y"], e = d.length - 1; e >= 0; e--)
                            if (c = Math.pow(1e3, e + 1), a <= -c || a >= c) return +(a / c).toFixed(b) + '<div class="unit">' + d[e] + "</div>";
                        return a
                    }

                    function e() {
                        a.ajax("https://data.ripple.com/v2/network/external_markets?&period=30day", {
                            success: function (a) {
                                k = Number(a.data.total)
                            },
                            error: function () {
                                a("#xrpVolume").html('<img class="throbber" src="/wp-content/themes/ripple-beta/assets/img/xrp/rippleThrobber.png" />')
                            }
                        })
                    }

                    function f() {
                        a.ajax("https://data.ripple.com/v2/network/exchange_volume?&live=30day", {
                            success: function (b) {
                                a.each(b.rows[0].components, function (a, b) {
                                    "XRP" !== b.base.currency && "XRP" !== b.counter.currency || (l += Number(b.converted_amount))
                                }), m = Number(l + k);
                                var c = m * i;
                                isNaN(c) ? a("#xrpVolume").html('<img class="throbber" src="/wp-content/themes/ripple-beta/assets/img/xrp/rippleThrobber.png" />') : a("#xrpVolume").html("$" + d(c, 2))
                            },
                            error: function () {
                                a("#xrpVolume").html('<img class="throbber" src="/wp-content/themes/ripple-beta/assets/img/xrp/rippleThrobber.png" />')
                            }
                        })
                    }
                    a("a").click(function (b) {
                        var c = a(this).text();
                        ga("send", "event", "XRP", "click", c)
                    });
                    var g = [];
                    g[0] = !1, g[1] = !1, a(".manual-label").each(function (b, c) {
                        a(this).hover(function () {
                            var c = a(this).data("original-title");
                            g[b] || ga("send", "event", "XRP", "Hover", "Toolip:" + c), g[b] = !0
                        })
                    }), b(10), a(window).scroll(function () {
                        b(10)
                    }), a('[data-toggle="tooltip"]').tooltip({
                        placement: "top"
                    }), a(window).scrollTop() < 50 && setTimeout(function () {
                        a(".scroll-icon").fadeIn("slow")
                    }, 500), setTimeout(function () {
                        a(".parallax-container").css("opacity", "1")
                    }, 200), a(document).scroll(function () {
                        var b = a(document).scrollTop();
                        b >= 280 && b <= 600 ? a(".floor").addClass("changed") : a(".floor").removeClass("changed")
                    }), a(window).scroll(function () {
                        a(".scroll-icon").fadeOut("slow")
                    }), a(".scroll-icon").click(function (b) {
                        ga("send", "event", "XRP", "click", "Scroller-Icon"), a(".leader-wrapper").css("visibility", "visible")
                    }), a(window).scroll(function () {
                        c(".animate-graph") && (a("#skills").show(), a(".time-label").fadeIn(), a(".bar").addClass("bar-animate"))
                    });
                    var h = !1;
                    a(window).scroll(function () {
                        c(".scalable-wrapper") && !h && (h = !0)
                    }), a(".scroll-icon").click(function () {
                        a("html, body").animate({
                            scrollTop: a(window).scrollTop() + 600
                        }, 2e3)
                    });
                    var i, j = 0,
                        k = 0,
                        l = 0,
                        m = 0,
                        n = 0;
                    a.ajax("https://data.ripple.com/v2/ledgers", {
                        success: function (b) {
                            function c() {
                                d += 1, a("#ledgerNumber").text(d.toLocaleString("en"))
                            }
                            n = b.ledger.ledger_index, a("#ledgerNumber").text(n.toLocaleString("en"));
                            var d = Number(n);
                            setInterval(c, 4e3)
                        },
                        error: function () {
                            a("#ledgerNumber").text("29+ Million")
                        }
                    }), e(), a.ajax("https://data.ripple.com/v2/exchange_rates/XRP/USD+rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B?period=30day", {
                        success: function (a) {
                            i = Number(a.rate), f()
                        },
                        error: function () {
                            a("#xrpVolume").html('<img class="throbber" src="/wp-content/themes/ripple-beta/assets/img/xrp/rippleThrobber.png" />')
                        }
                    }), a.ajax("https://data.ripple.com/v2/exchange_rates/XRP/USD+rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B?live=true", {
                        success: function (b) {
                            var c;
                            j = Number(b.rate).toPrecision(4), c = j >= 1 ? "<span class='style2'>" + j + "</span>" : j.match(/^[^1-9]+/)[0];
                            var d = j.match(/[1-9]+[0-9]*/)[0];
                            isNaN(j) ? a("#xrpPrice").html('<img class="throbber" src="/wp-content/themes/ripple-beta/assets/img/xrp/rippleThrobber.png" />') : a("#xrpPrice").html("$<span class='style0'>" + c + "</span>" + d)
                        },
                        error: function () {
                            a("#xrpPrice").html('<img class="throbber" src="/wp-content/themes/ripple-beta/assets/img/xrp/rippleThrobber.png" />')
                        }
                    })
                }
            },
            page_cost_model: {
                init: function () {
                    function b(a, b, c, d, e, f, g, h, i) {
                        const j = .28,
                            k = 12.5,
                            l = 40,
                            m = 6777.29 / 4380,
                            n = 365,
                            o = .002,
                            u = 5e4,
                            v = .0582,
                            w = .0774,
                            x = 78e3,
                            y = 123832e3,
                            z = 105e3;
                        var A, B, C, D, E, F, G = .9,
                            H = .06;
                        transactionVolume.value >= 5e5 ? (G = .9, H = .06) : transactionVolume.value >= 1e5 ? (G = .5, H = .07) : (G = .15, H = .08), A = transactionVolume.value * (j + a * k + b * l), B = transactionVolume.value * m, C = c, D = transactionVolume.value * d * G, paymentProcessingCost = A + B + C + D, p = (paymentVolume.value / n * f * .5 + paymentVolume.value * e / n) * H, q = (paymentVolume.value / n * f * .5 + paymentVolume.value * e / n) * o, r = u, s = paymentVolume.value * (1 - bidirectionality.value / 100) * (wholesaleFxCost.value / 100), t = paymentVolume.value * g / n * (w - v), treasuryCost = p + q + r + s + t, E = paymentVolume.value / y * x * i, F = transactionVolume.value * h / (z / averageTimeToReconcilePayment.value) * x, reconciliationCost = E + F, counterpartyFees = transactionVolume.value * counterpartyFeePerPayment.value, totalCost = paymentProcessingCost + treasuryCost + reconciliationCost + counterpartyFees
                    }

                    function c(b) {
                        var c = {
                                labels: B,
                                datasets: [{
                                    label: "Counterparty Fees",
                                    data: A,
                                    backgroundColor: "#344f5b",
                                    hoverBackgroundColor: "#344f5b"
                                }, {
                                    label: "Reconciliation Cost",
                                    data: z,
                                    backgroundColor: "#156d9b",
                                    hoverBackgroundColor: "#156d9b"
                                }, {
                                    label: "Treasury Cost",
                                    data: y,
                                    backgroundColor: "#25a2db",
                                    hoverBackgroundColor: "#25a2db"
                                }, {
                                    label: "Payment Processing Cost",
                                    data: x,
                                    backgroundColor: "#53c4f1",
                                    hoverBackgroundColor: "#53c4f1"
                                }]
                            },
                            d = function (b) {
                                var c = a("#chartjs-tooltip");
                                if (b.opacity || c.css({
                                        opacity: 0
                                    }), c.removeClass("above below"), c.addClass(b.yAlign), void 0 !== b.body) {
                                    var d = b.body[0].lines[0].split(":"),
                                        e = "<span>" + d[0].trim() + '</span>:<br/><span class="number-detail">$' + d[1].trim() + "</span> per payment";
                                    c.html(e), c.css({
                                        opacity: 1,
                                        left: b.caretX - 55 + "px",
                                        top: b.y + 150 + "px",
                                        fontFamily: b.fontFamily,
                                        fontSize: b.fontSize,
                                        fontStyle: b.fontStyle
                                    })
                                }
                            },
                            e = {
                                animation: {
                                    duration: b,
                                    easing: "easeOutCubic",
                                    onProgress: function (a) {
                                        var b = this.chart.ctx;
                                        b.textAlign = "center", b.textBaseline = "middle", b.font = "600 8pt 'open_sansregular'";
                                        var c = this,
                                            d = (this.config.data.datasets, c.getDatasetMeta(3).data[0]),
                                            e = c.getDatasetMeta(3).data[1];
                                        b.fillText("$" + u, e._model.x, e._model.y - 10), b.fillText("$" + v, d._model.x, d._model.y - 10)
                                    }
                                },
                                reponsive: !0,
                                tooltips: {
                                    enabled: !1,
                                    custom: d
                                },
                                layout: {
                                    padding: {
                                        top: 15
                                    }
                                },
                                scales: {
                                    xAxes: [{
                                        stacked: !0,
                                        barThickness: 40,
                                        gridLines: {
                                            display: !1
                                        }
                                    }],
                                    yAxes: [{
                                        display: !1,
                                        stacked: !0,
                                        gridLines: {
                                            display: !1
                                        }
                                    }]
                                },
                                legend: {
                                    display: !1
                                }
                            },
                            f = a("#saving-bar-chart");
                        w = new Chart(f, {
                            type: "bar",
                            data: c,
                            options: e
                        })
                    }

                    function d(b, c) {
                        function d() {
                            Math.ceil(f / 2) <= 5 ? (n.style.opacity = "0", m.style.opacity = "1") : Math.ceil(f / 2) >= 43 ? (m.style.opacity = "0", n.style.opacity = "1") : (n.style.opacity = "1", m.style.opacity = "1"), 0 === b ? (Math.ceil(f / 2) >= 9 && Math.ceil(f / 2) <= 16 ? o.style.opacity = "0" : o.style.opacity = "1", Math.ceil(f / 2) >= 22 && Math.ceil(f / 2) < 30 ? p.style.opacity = "0" : p.style.opacity = "1", Math.ceil(f / 2) >= 35 && Math.ceil(f / 2) < 42 ? q.style.opacity = "0" : q.style.opacity = "1") : 1 === b && (Math.ceil(f / 2) >= 8 && Math.ceil(f / 2) <= 18 ? o.style.opacity = "0" : o.style.opacity = "1", Math.ceil(f / 2) >= 21 && Math.ceil(f / 2) <= 31 ? p.style.opacity = "0" : p.style.opacity = "1", Math.ceil(f / 2) >= 33 && Math.ceil(f / 2) <= 43 ? q.style.opacity = "0" : q.style.opacity = "1")
                        }
                        const e = document.getElementsByClassName("min-slider-handle")[b].style.left,
                            f = e.substring(0, e.length - 1),
                            g = Math.ceil(f / c);
                        if (document.getElementsByClassName("highlight-bar").length && document.getElementsByClassName("highlight-bar")[b]) {
                            const h = document.getElementsByClassName("highlight-bar")[b];
                            h.classList.toggle("highlight-bar");
                            const i = h.id.replace(/[^\d]/g, "");
                            for (var j = 0; j < i - 1; j++) {
                                document.querySelectorAll("svg #slider_" + (b + 1))[0].children[j].classList.remove("semi-highlight-bar")
                            }
                        }
                        if (Math.ceil(f / c) > 0) {
                            const k = document.querySelectorAll("svg #slider_" + (b + 1));
                            k[0].children[Math.ceil(f / c) - 1].classList.toggle("highlight-bar")
                        } else 0 === Math.ceil(f / c) && (k = document.querySelectorAll('rect[id="bar1"]')[b], k.classList.toggle("highlight-bar"));
                        for (var l = 0; l < g - 1; l++) {
                            document.querySelectorAll("svg #slider_" + (b + 1))[0].children[l].classList.add("semi-highlight-bar")
                        }
                        const m = (document.querySelectorAll(".slider .in .tooltip-inner")[b], document.querySelectorAll(".slider-labels .pull-right")[b]),
                            n = document.querySelectorAll(".slider-labels .pull-left")[b],
                            o = document.querySelectorAll(".slider-labels .tick-2")[b],
                            p = document.querySelectorAll(".slider-labels .tick-3")[b],
                            q = document.querySelectorAll(".slider-labels .tick-4")[b];
                        a(document).width() > 992 && a(document).width() < 1200 ? d() : ((4 === b || 8 === b || 7 === b) && Math.ceil(f / 2) <= 5 ? (n.style.opacity = "0", m.style.opacity = "1") : 5 === b && Math.ceil(f / c) >= 44 ? (n.style.opacity = "1", m.style.opacity = "0") : (3 === b || 6 === b) && Math.ceil(f / 2) <= 4 ? (n.style.opacity = "0", m.style.opacity = "1") : Math.ceil(f / 2) <= 4 ? (n.style.opacity = "0", m.style.opacity = "1") : Math.ceil(f / 2) >= 45 ? (m.style.opacity = "0", n.style.opacity = "1") : (n.style.opacity = "1", m.style.opacity = "1"), 0 === b ? (Math.ceil(f / 2) >= 10 && Math.ceil(f / 2) <= 16 ? o.style.opacity = "0" : o.style.opacity = "1", Math.ceil(f / 2) >= 23 && Math.ceil(f / 2) < 28 ? p.style.opacity = "0" : p.style.opacity = "1", Math.ceil(f / 2) >= 36 && Math.ceil(f / 2) < 41 ? q.style.opacity = "0" : q.style.opacity = "1") : 1 === b && (Math.ceil(f / 2) >= 10 && Math.ceil(f / 2) <= 17 ? o.style.opacity = "0" : o.style.opacity = "1", Math.ceil(f / 2) >= 23 && Math.ceil(f / 2) <= 28 ? p.style.opacity = "0" : p.style.opacity = "1", Math.ceil(f / 2) >= 34 && Math.ceil(f / 2) <= 41 ? q.style.opacity = "0" : q.style.opacity = "1"))
                    }

                    function e(a, b) {
                        for (var c, d = ["k", "M", "B", "T", "P", "E", "Z", "Y"], e = d.length - 1; e >= 0; e--)
                            if (c = Math.pow(1e3, e + 1), a <= -c || a >= c) return +(a / c).toFixed(b) + d[e];
                        return a
                    }

                    function f(a) {
                        var b = document.querySelectorAll(".slider .in .tooltip-inner")[a],
                            c = b.innerHTML,
                            d = e(c);
                        b.innerHTML = d
                    }

                    function g(a) {
                        var b = document.querySelectorAll(".slider .in .tooltip-inner")[a],
                            c = b.innerHTML,
                            d = e(c);
                        /^\$/.test(d) || (b.innerHTML = "$" + d)
                    }

                    function h(a) {
                        var b = document.querySelectorAll(".slider .in .tooltip-inner")[a],
                            c = b.innerHTML,
                            d = e(c);
                        /^\$/.test(d) || (b.innerHTML = "$" + Number(d).toFixed(2))
                    }

                    function i(a) {
                        var b = document.querySelectorAll(".slider .in .tooltip-inner")[a],
                            c = b.innerHTML,
                            d = c;
                        /%$/.test(d) || (b.innerHTML = Number(d).toFixed(2) + "%")
                    }

                    function j(a) {
                        var b = document.querySelectorAll(".slider .in .tooltip-inner")[a],
                            c = b.innerHTML,
                            d = c;
                        b.innerHTML = d
                    }

                    function k(f, g, h, i, j, k, l, m, n, o, p, q) {
                        function r() {
                            const a = document.querySelectorAll(".slider .in .tooltip-inner")[f];
                            4 === a.firstChild.nodeValue.length ? a.style.marginLeft = "-5px" : 5 === a.firstChild.nodeValue.length ? a.style.marginLeft = "-10px" : 6 === a.firstChild.nodeValue.length ? a.style.marginLeft = "-12px" : 7 === a.firstChild.nodeValue.length ? a.style.marginLeft = "-15px" : a.style.marginLeft = "0"
                        }

                        function s() {
                            const a = document.querySelectorAll(".tooltip.tooltip-main.bottom.in")[9],
                                b = document.querySelectorAll(".slider-handle.min-slider-handle.custom")[9],
                                c = document.querySelectorAll(".tooltip.tooltip-main.bottom.in")[5],
                                d = document.querySelectorAll(".slider-handle.min-slider-handle.custom")[5];
                            r(), "0%" === b.style.left ? (a.style.left = "6.25%", b.style.left = "5%") : "11.1111%" === b.style.left ? (a.style.left = "16%", b.style.left = "15%") : "22.2222%" === b.style.left ? (a.style.left = "26.2%", b.style.left = "25%") : "33.3333%" === b.style.left ? (a.style.left = "36.2%", b.style.left = "35%") : "44.4444%" === b.style.left ? (a.style.left = "46%", b.style.left = "45%") : "55.5556%" === b.style.left ? (a.style.left = "56.2%", b.style.left = "55%") : "66.6667%" === b.style.left ? (a.style.left = "66.4%", b.style.left = "65%") : "77.7778%" === b.style.left ? (a.style.left = "76.4%", b.style.left = "75%") : "88.8889%" === b.style.left ? (a.style.left = "86.4%", b.style.left = "85%") : "100%" === b.style.left && (a.style.left = "95.5%", b.style.left = "95%"), "0%" === d.style.left ? (c.style.left = "2%", d.style.left = "1%") : "2.04082%" === d.style.left ? (c.style.left = "4%", d.style.left = "3%") : "4.08163%" === d.style.left ? (c.style.left = "6%", d.style.left = "5%") : "6.12245%" === d.style.left ? (c.style.left = "8%", d.style.left = "7%") : "8.16327%" === d.style.left ? (c.style.left = "10%", d.style.left = "9%") : "10.2041%" === d.style.left ? (c.style.left = "12%", d.style.left = "11%") : "12.2449%" === d.style.left ? (c.style.left = "14%", d.style.left = "13%") : "14.2857%" === d.style.left ? (c.style.left = "16%", d.style.left = "15%") : "16.3265%" === d.style.left && (c.style.left = "18%", d.style.left = "17%")
                        }
                        g = a(h).slider({
                            min: l,
                            max: m,
                            handle: "custom",
                            tooltip: "always",
                            tooltip_position: "bottom",
                            scale: n,
                            step: o
                        }), d(f, p), q(f), r();
                        var t = !1;
                        a(h).on("slideStop", function (g) {
                            t || ga("send", "event", "Cost Model", "Slider", "Interact With Cost Model Full Cost Model Slider-" + h), t = !0, q(f), b(errorRate.value / 100, failureRate.value / 100, 21700, .24, 2, daysOfEndpointCoverage.value, 2, paymentsReconciled.value / 100, 1), a(j).val(g.value).digits();
                            var i = a("#errorRateSliderVal").val(),
                                k = a("#failureRateSliderVal").val(),
                                l = a("#paymentsReconciledSliderVal").val(),
                                m = a("#bidirectionalitySliderVal").val(),
                                n = a("#wholesaleFxCostSliderVal").val();
                            (i.length <= 2 || i.length >= 3) && a("#errorRateSliderVal").val(parseFloat(i).toFixed(2)), (k.length <= 2 || k.length >= 3) && a("#failureRateSliderVal").val(parseFloat(k).toFixed(2)), (l.length <= 2 || l.length >= 3) && a("#paymentsReconciledSliderVal").val(parseFloat(l).toFixed(2)), m.length <= 2 && a("#bidirectionalitySliderVal").val(parseFloat(m).toFixed(2)), (n.length <= 2 || n.length >= 3) && a("#wholesaleFxCostSliderVal").val(parseFloat(n).toFixed(2)), v = (totalCost / transactionVolume.value).toFixed(2), a("#non-ripple-savings").text("$" + v), x = [Number((paymentProcessingCost / transactionVolume.value).toFixed(2))], y = [Number((treasuryCost / transactionVolume.value).toFixed(2))], z = [Number((reconciliationCost / transactionVolume.value).toFixed(2))], A = [Number((counterpartyFees / transactionVolume.value).toFixed(2))], b(0, 0, 0, 0, 2, 1, 0, 0, .2), u = (totalCost / transactionVolume.value).toFixed(2), a("#ripple-savings").text("$" + u);
                            var o = (v - u).toFixed(2);
                            a("#total-savings").text("$" + o);
                            var r = (o * transactionVolume.value).toFixed(0);
                            a(".annual-savings-number").text("$" + e(r, 2)), d(f, p), x.push(Number((paymentProcessingCost / transactionVolume.value).toFixed(2))), y.push(Number((treasuryCost / transactionVolume.value).toFixed(2))), z.push(Number((reconciliationCost / transactionVolume.value).toFixed(2))), A.push(Number((counterpartyFees / transactionVolume.value).toFixed(2))), s(), w.destroy(), c(1e3)
                        }), a(h).on("slide", function (b) {
                            q(f), a(j).val(b.value).digits(), d(f, p), s();
                            var c = a("#errorRateSliderVal").val(),
                                e = a("#failureRateSliderVal").val(),
                                g = a("#paymentsReconciledSliderVal").val(),
                                h = a("#bidirectionalitySliderVal").val(),
                                i = a("#wholesaleFxCostSliderVal").val();
                            (c.length <= 2 || c.length >= 3) && a("#errorRateSliderVal").val(parseFloat(c).toFixed(2)), (e.length <= 2 || e.length >= 3) && a("#failureRateSliderVal").val(parseFloat(e).toFixed(2)), (g.length <= 2 || g.length >= 3) && a("#paymentsReconciledSliderVal").val(parseFloat(g).toFixed(2)), h.length <= 2 && a("#bidirectionalitySliderVal").val(parseFloat(h).toFixed(2)), (i.length <= 2 || i.length >= 3) && a("#wholesaleFxCostSliderVal").val(parseFloat(i).toFixed(2))
                        }), a(h).on("change", function (a) {
                            q(f), d(f, p), s()
                        });
                        var B = !1;
                        a(j).change(function () {
                            B || ga("send", "event", "Cost Model", "Slider", "Interact With Full Cost Model Slider Manual Input-" + j), B = !0;
                            var h = this.value.replace(/,/g, "");
                            g.slider("setValue", parseInt(h)), b(errorRate.value / 100, failureRate.value / 100, 21700, .24, 2, daysOfEndpointCoverage.value, 2, paymentsReconciled.value / 100, 1), v = (totalCost / transactionVolume.value).toFixed(2), x = [Number((paymentProcessingCost / transactionVolume.value).toFixed(2))], y = [Number((treasuryCost / transactionVolume.value).toFixed(2))], z = [Number((reconciliationCost / transactionVolume.value).toFixed(2))], A = [Number((counterpartyFees / transactionVolume.value).toFixed(2))], a("#non-ripple-savings").text("$" + v), b(0, 0, 0, 0, 2, 1, 0, 0, .2), u = (totalCost / transactionVolume.value).toFixed(2), x.push(Number((paymentProcessingCost / transactionVolume.value).toFixed(2))), y.push(Number((treasuryCost / transactionVolume.value).toFixed(2))), z.push(Number((reconciliationCost / transactionVolume.value).toFixed(2))), A.push(Number((counterpartyFees / transactionVolume.value).toFixed(2))), a("#ripple-savings").text("$" + u);
                            var i = (v - u).toFixed(2);
                            a("#total-savings").text("$" + i);
                            var k = (i * transactionVolume.value).toFixed(0);
                            a(".annual-savings-number").text("$" + e(k, 2)), w.destroy(), c(1e3), d(f, p), q(f), s(), a(this).hasClass("percentage") ? a(this).val(Number(h.replace(/[^.\d]+/g, "")).toFixed(2)) : a(this).val(h.replace(/,/g, "").replace(/[^\d]/g, "")).digits();
                            var n = a(this).val().replace(/,/g, "");
                            n < l && a(this).val(l).digits(), n > m && a(this).val(m).digits()
                        })
                    }

                    function l(a) {
                        const b = document.querySelectorAll(".slider .in .tooltip-inner")[a];
                        4 === b.firstChild.nodeValue.length ? b.style.marginLeft = "-5px" : 5 === b.firstChild.nodeValue.length ? b.style.marginLeft = "-10px" : 6 === b.firstChild.nodeValue.length ? b.style.marginLeft = "-12px" : 7 === b.firstChild.nodeValue.length ? b.style.marginLeft = "-15px" : b.style.marginLeft = "0"
                    }

                    function m() {
                        var b = ["email=" + email, "company=" + xa, "nonRippleSavings=" + v, "ripple-savings=" + u, "annualTransactionVolume=" + _, "annualTransactionCost=" + aa, "errorRate=" + ba, "failureRate=" + ca, "percentPaymentsReconciled=" + da, "timeToReconcile=" + ea, "liquidityCoverage=" + fa, "percentBidirectionality=" + ha, "wholesaleFxCost=" + ia, "costSavings=" + ka, "counterpartyFees=" + ja, "ripplePaymentProcessingCost=" + la, "rippleTreasuryCost=" + ma, "rippleReconciliationCost=" + na, "rippleCounterpartyFees=" + oa, "nonRipplePaymentProcessingCost=" + pa, "nonRippleTreasuryCost=" + qa, "nonRippleReconciliationCost=" + ra, "nonRippleCounterpartyFees=" + sa, "svgRippleCostValue=" + ta, "svgPaymentValue=" + ua, "svgTreasuryValue=" + va, "svgReconciliationValue=" + wa],
                            c = b.join("&");
                        a.each(b, function (a, b) {
                            if (0 !== a && 1 !== a) {
                                var c = b.split("=");
                                ga("send", "event", "Cost Model", "Slider", c[0], c[1])
                            }
                        }), a.ajax({
                            type: "POST",
                            url: "/wp-content/themes/ripple-beta/jenkins/send.php",
                            data: c,
                            success: function (a, b, c) {},
                            error: function (a, b, c) {
                                ga("send", "event", "Cost Model", "Send", "PDF Error", "Full Cost Model page")
                            }
                        })
                    }
                    document.addEventListener("wpcf7mailsent", function (a) {
                        "13897" === a.detail.contactFormId && location.replace("/thank-you")
                    }, !1), a.fn.digits = function () {
                        return this.each(function () {
                            a(this).text(a(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")), a(this).val(a(this).val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
                        })
                    };
                    var n = a(".page-header").offset().top,
                        o = a(window);
                    o.scroll(function () {
                        o.scrollTop() >= n ? a(".savings-sidebar").addClass("sidebar-fixed") : o.scrollTop() <= n && a(".savings-sidebar").removeClass("sidebar-fixed")
                    }), o.scroll(function () {
                        o.scrollTop() > 1880 ? (a(".savings-sidebar").removeClass("sidebar-fixed"), a(".savings-sidebar").addClass("sidebar-fixed-2")) : a(".savings-sidebar").removeClass("sidebar-fixed-2")
                    });
                    var p, q, r, s, t, u, v, w, x = [],
                        y = [],
                        z = [],
                        A = [],
                        B = ["Current", "Ripple"];
                    Chart.defaults.global.defaultFontFamily = "'open_sansregular', sans-serif", Chart.defaults.globaldefaultFontColor = "#808080";
                    var C = !1;
                    Chart.defaults.global.hover.onHover = function (b) {
                        if (b[0]) {
                            var c = b[0]._index;
                            C || ga("send", "event", "Cost Model", "Hover", "Interact With Full Cost Model Bar Graph"), C = !0, 1 === c ? a("#chartjs-tooltip").addClass("right-bar") : a("#chartjs-tooltip").removeClass("right-bar")
                        }
                    };
                    var D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W;
                    a('[data-toggle="tooltip"]').tooltip({
                        placement: "bottom"
                    }), k(0, D, "#transactionVolume", transactionVolume, "#transactionVolumeSliderVal", F, 1e4, 1e8, "logarithmic", 1e3, 2, f), k(1, E, "#paymentVolume", paymentVolume, "#paymentVolumeSliderVal", G, 5e6, 5e12, "logarithmic", 1e5, 2, g), k(2, H, "#errorRate", errorRate, "#errorRateSliderVal", I, 0, 50, "linear", .01, 2, i), k(3, J, "#failureRate", failureRate, "#failureRateSliderVal", K, 0, 50, "linear", .01, 2, i), k(4, L, "#paymentsReconciled", paymentsReconciled, "#paymentsReconciledSliderVal", M, .5, 50, "linear", .01, 2, i), k(5, V, "#averageTimeToReconcilePayment", averageTimeToReconcilePayment, "#averageTimeToReconcilePaymentSliderVal", W, 1, 50, "linear", 1, 2, j), k(6, N, "#bidirectionality", bidirectionality, "#bidirectionalitySliderVal", O, 0, 100, "linear", .01, 2, i), k(7, P, "#wholesaleFxCost", wholesaleFxCost, "#wholesaleFxCostSliderVal", Q, .01, 5, "linear", .01, 2, i), k(8, R, "#counterpartyFeePerPayment", counterpartyFeePerPayment, "#counterpartyFeePerPaymentSliderVal", S, .1, 10, "linear", .01, 2, h), k(9, T, "#daysOfEndpointCoverage", daysOfEndpointCoverage, "#daysOfEndpointCoverageSliderVal", U, 1, 10, "linear", 1, 10, j), document.querySelectorAll(".tooltip.tooltip-main.bottom.in")[9].style.left = "16%", document.querySelectorAll(".slider-handle.min-slider-handle.custom")[9].style.left = "15%", document.querySelectorAll(".tooltip.tooltip-main.bottom.in")[5].style.left = "4%", document.querySelectorAll(".slider-handle.min-slider-handle.custom")[5].style.left = "3%", a(window).resize(function () {
                        f(0), g(1), i(2), i(3), i(4), j(5), i(6), i(7), h(8), j(9), w.destroy(), c(1)
                    });
                    var X = localStorage.getItem("slider1"),
                        Y = localStorage.getItem("slider2");
                    null !== X && (a("#transactionVolume").slider("setValue", parseInt(X)), a("#transactionVolumeSliderVal").val(X).digits(), d(0, 2), f(0), l(0)), null !== Y && (a("#paymentVolume").slider("setValue", parseInt(Y)), a("#paymentVolumeSliderVal").val(Y).digits(), d(1, 2), g(1), l(1)), b(errorRate.value / 100, failureRate.value / 100, 21700, .24, 2, daysOfEndpointCoverage.value, 2, paymentsReconciled.value / 100, 1), v = (totalCost / transactionVolume.value).toFixed(2), x = [Number((paymentProcessingCost / transactionVolume.value).toFixed(2))], y = [Number((treasuryCost / transactionVolume.value).toFixed(2))], z = [Number((reconciliationCost / transactionVolume.value).toFixed(2))], A = [Number((counterpartyFees / transactionVolume.value).toFixed(2))], b(0, 0, 0, 0, 2, 1, 0, 0, .2), u = (totalCost / transactionVolume.value).toFixed(2), x.push(Number((paymentProcessingCost / transactionVolume.value).toFixed(2))), y.push(Number((treasuryCost / transactionVolume.value).toFixed(2))), z.push(Number((reconciliationCost / transactionVolume.value).toFixed(2))), A.push(Number((counterpartyFees / transactionVolume.value).toFixed(2)));
                    var Z = (v - u).toFixed(2);
                    a("#total-savings").text("$" + Z);
                    var $ = (Z * transactionVolume.value).toFixed(0);
                    a(".annual-savings-number").text("$" + e($, 2)), a("#saving-bar-chart").data("generated", !1), setTimeout(function () {
                        c(1e3)
                    }, 100), a("#saving-bar-chart").data("generated", !0);
                    var _, aa, ba, ca, da, ea, fa, ha, ia, ja, ka, la, ma, na, oa, pa, qa, ra, sa, ta, ua, va, wa;
                    a("#download-button").click(function () {
                        _ = a("input#transactionVolumeSliderVal").val(), aa = a("input#paymentVolumeSliderVal").val(), ba = a("input#errorRateSliderVal").val(), ca = a("input#failureRateSliderVal").val(), da = a("input#paymentsReconciledSliderVal").val(), ea = a("input#averageTimeToReconcilePaymentSliderVal").val(), fa = a("input#daysOfEndpointCoverageSliderVal").val(), ha = a("input#bidirectionalitySliderVal").val(), ia = a("input#wholesaleFxCostSliderVal").val(), ja = a("input#counterpartyFeePerPaymentSliderVal").val(), ka = a("#total-savings").text(), la = x[1], ma = y[1], na = z[1], oa = A[1], pa = x[0], qa = y[0], ra = z[0], sa = A[0], ta = u / v * 650, ua = la / pa * 170, va = ma / qa * 170, wa = na / ra * 170;
                        for (var b = [], c = a(".input-wrap .manual"), d = 0; d < c.length; d++) {
                            var e = c[d].parentNode.innerText.replace(/(?:\r\n|\r|\n)/g, ""),
                                f = e + "=" + c[d].value + "\n";
                            b.push(f)
                        }
                        b.push("Cost savings per payment=" + ka + "\n"), b.push("Ripple cost per payment=" + u + "\n"), b.push("Current cost per payment=" + v + "\n"), b.push("Annual Savings=" + $), a(".textarea-75 textarea").html(b), ga("send", "event", "Cost Model", "Click", "Get Your Complete Analysis")
                    });
                    var xa;
                    a("#roi-form").on("wpcf7:mailsent", function (b) {
                        email = a(".your-email input").val(), xa = a(".org-650 input").val(), ga("send", "event", "Cost Model", "Send", "PDF Sent"), ga("send", "event", "Cost Model", "Slider", "Cost savings per payment", ka), ga("send", "event", "Cost Model", "Slider", "Ripple cost per payment", u), ga("send", "event", "Cost Model", "Slider", "Current cost per payment", v), ga("send", "event", "Cost Model", "Slider", "Annual Savings", $), m()
                    });
                    var ya = [];
                    ya[0] = !1, ya[1] = !1, ya[2] = !1, ya[3] = !1, ya[4] = !1, ya[5] = !1, ya[6] = !1, ya[7] = !1, ya[8] = !1, ya[9] = !1, a(".manual-label").each(function (b, c) {
                        a(this).hover(function () {
                            var c = a(this).data("original-title");
                            ya[b] || ga("send", "event", "Cost Model", "Hover", "Interact With Full Cost Model Tooltip-" + c), ya[b] = !0
                        })
                    })
                }
            },
            page_careers: {
                init: function () {
                    a(".carousel").carousel({
                        interval: !1
                    }), a(".carousel").swiperight(function () {
                        a(this).carousel("prev")
                    }), a(".carousel").swipeleft(function () {
                        a(this).carousel("next")
                    }), a(".careers_cta").click(function () {
                        ga("send", "event", "CTA-careers", "click")
                    }), a("#career-carousel ol.carousel-indicators li").click(function () {
                        var b = a(this).index() + 1;
                        ga("send", "event", "Meet Our Team Carousel", "click", "Carousel Dot-" + b)
                    }), a("#career-carousel .carousel-control").click(function () {
                        var b = a(this).attr("class").split(" ")[0];
                        ga("send", "event", "Meet Our Team Carousel", "click", "Carousel Arrow-" + b)
                    }), a("#day-in-the-life ol.carousel-indicators li").click(function () {
                        var b = a(this).index() + 1;
                        ga("send", "event", "Day In The Life Carousel", "click", "Carousel Dot-" + b)
                    }), a("#day-in-the-life .carousel-control").click(function () {
                        var b = a(this).attr("class").split(" ")[0];
                        ga("send", "event", "Day In The Life Carousel", "click", "Carousel Arrow-" + b)
                    })
                }
            },
            page_press_center: {
                init: function () {
                    function b(b) {
                        a("." + b + "_wrapper").on("click", "#" + b + "-links a", function (c) {
                            c.preventDefault();
                            var d = a(this).attr("href");
                            a("." + b + "_wrapper").load(d + " ." + b + "_wrapper")
                        })
                    }
                    a(".news_nav ul li").removeClass("active"), a(".news_nav ul li.menu-in-the-news").addClass("active"), a(window).scroll(function () {
                        var b = a(window).scrollTop();
                        b <= 750 ? (a(".news_nav ul li").removeClass("active"), a(".news_nav ul li.menu-in-the-news").addClass("active")) : b > 751 && b < 1299 ? (a(".news_nav ul li").removeClass("active"), a(".news_nav ul li.menu-press-releases").addClass("active")) : b > 1300 && (a(".news_nav ul li").removeClass("active"), a(".news_nav ul li.menu-industry-perspectives").addClass("active"))
                    }), b("news"), b("press"), b("industry")
                }
            },
            blog: {
                init: function () {
                    function b() {
                        var b = a("#menu-blog-menu"),
                            c = a("#menu-blog-menu li");
                        if (a(document).width() < 992) {
                            b.addClass("blog-menu-mobile"), 0 === a(".blog-menu-dropdown").length && (c.wrapAll("<li><ul class='blog-menu-dropdown collapse' /></li>"), b.prepend("<li class='menu-active-filter'><a>" + a("#menu-blog-menu li.active a").text() + "<span class='caret'></span></a></li>"));
                            var d = a(".blog-menu-dropdown");
                            d.collapse({
                                toggle: !1
                            });
                            var e = !0;
                            a(".menu-active-filter, .blog-menu-dropdown li").on("click", function (a) {
                                a.preventDefault(), e ? (d.collapse("toggle"), e = !1) : (d.collapse("toggle"), e = !0)
                            })
                        } else b.removeClass("blog-menu-mobile"), a(".blog-menu-dropdown").length > 0 && (a(".menu-active-filter").remove(), a(".blog-menu-dropdown").collapse("hide"), a(".blog-menu-dropdown li").unwrap().unwrap())
                    }

                    function c() {
                        var b = a("#load_more_btn").parent("a");
                        a("#load_more_btn, #menu-blog-menu li a").on("click", function (c) {
                            if (!a(c.currentTarget).is(a("li.menu-active-filter a"))) {
                                c.preventDefault();
                                var d = !1,
                                    e = b.attr("href");
                                a(c.target).is(a("#load_more_btn")) ? d = !0 : e = a(c.target).attr("href"), a.get(e, function (e) {
                                    var f = a(".articles-container", e);
                                    b = a("#load_more_btn", e).parent("a"), d ? a(".articles-container").append(f.html()) : (a(".articles-container").html(f.html()), a("#menu-blog-menu li").removeClass("active"), a(c.target).parent("li").addClass("active"), a("li.menu-active-filter a").html(a(c.currentTarget).text() + "<span class='caret'></span>"))
                                }, "html")
                            }
                        })
                    }

                    function d() {
                        var b = document.body.clientWidth || document.documentElement.clientWidth;
                        a(".newsletter-row-wrapper .stripe").css("width", b)
                    }
                    b(), c(), d(), a(window).resize(function () {
                        b(), d()
                    })
                }
            },
            single_post: {
                init: function () {
                    function b() {
                        var b = document.body.scrollTop || document.documentElement.scrollTop,
                            c = a(".navbar").outerHeight(!0),
                            d = a(".entry-content").outerHeight(!0),
                            e = parseInt(a(".entry-content").css("margin")),
                            f = a(".entry-content").offset().top,
                            g = f - c,
                            h = d - document.documentElement.clientHeight;
                        if (b > g) {
                            var i = (b - g) / (h + e) * 100;
                            document.getElementById("readProgressBar").style.width = i + "%"
                        } else document.getElementById("readProgressBar").style.width = "0%"
                    }

                    function c() {
                        var b = document.body.scrollTop || document.documentElement.scrollTop,
                            c = a(".social_icons"),
                            d = c.height(),
                            e = 40,
                            f = a("article .entry-content p:first-of-type").position().top;
                        c.css("top", f);
                        var g = a(".navbar").outerHeight(!0),
                            h = a(".newsletter-row-wrapper").position().top,
                            i = a(".newsletter-row-wrapper").outerHeight(!0),
                            j = b + d;
                        b > f ? j > h ? c.css({
                            position: "absolute",
                            top: -(d + i)
                        }) : c.css({
                            position: "fixed",
                            top: g + e
                        }) : c.css({
                            position: "absolute"
                        })
                    }

                    function d() {
                        var b = document.body.clientWidth || document.documentElement.clientWidth;
                        a(".newsletter-row-wrapper .stripe").css("width", b)
                    }
                    c(), d(), a(window).scroll(function () {
                        b(), c()
                    }), a(window).resize(function () {
                        c(), d()
                    })
                }
            }
        },
        c = {
            fire: function (a, c, d) {
                var e = b;
                c = void 0 === c ? "init" : c, "" !== a && e[a] && "function" == typeof e[a][c] && e[a][c](d)
            },
            loadEvents: function () {
                c.fire("common"), a.each(document.body.className.replace(/-/g, "_").split(/\s+/), function (a, b) {
                    c.fire(b)
                })
            }
        };
    a(document).ready(c.loadEvents)
}(jQuery);