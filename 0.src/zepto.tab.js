/**
 * Created by lvlq on 15/6/30.
 */
(function ($) {
    var tab = function ($tab, options) {
        this.options = options || {};
        this.$tab = $tab;
        this.$tabItem = this.$tab.find(".tab-list").eq(0).find(".tab-item");
        this.$tabNav = this.$tab.find(".nav-outer").eq(0).find(".tab-nav");
        var num = this.$tabItem.length;
        this.scrollArray = [];
        for (var i = 0; i < num; i++) {
            this.scrollArray.push(0);
        }
        var hash = window.location.hash;
        this.initConfig();
        this.clickTab();
        if (this.options.hash) {
            if (hash) {
                this.showHash();
            } else {
                this.showFirst();
            }
        } else {
            this.showFirst();
        }
    };

    tab.prototype.initConfig = function () {
        this.options.hash = this.options.hash || false;
        this.options.scroll = this.options.scroll || false;
    };

    tab.prototype.clickTab = function () {
        this.$tabItem.off("click")
            .on("click", (function (_this) {
                return function (event) {
                    if ($(this).hasClass("selected")) {
                        $.Event('tabTapAgain', {bubbles: false});
                        $(this).trigger('tabTapAgain');
                        return;
                    }

                    var idName = $(this).data("selected");
                    if (_this.options.hash)
                        window.location.hash = idName;

                    var $nav = _this.$tab.find(idName);
                    var $activeNav;
                    for (var i = 0; i < _this.$tabNav.length; i++) {
                        if (_this.$tabNav.eq(i).hasClass("selected")) {
                            $activeNav = _this.$tabNav.eq(i);
                            break;
                        }
                    }

                    $activeNav.removeClass("selected");
                    $nav.addClass("selected");

                    $.Event('tabTap', {bubbles: false});
                    _this.$tabItem.removeClass("selected");
                    $(this).addClass("selected");
                    $(this).trigger('tabTap');

                    if (_this.options.scroll) {
                        var index = _this.$tab.find(".tab-item").index(_this.$tab.find(".tab-item.selected"));
                        $("body")[0].scrollTop = _this.scrollArray[index];
                    }

                    event.preventDefault();
                    return false;
                }
            })(this));

        window.onhashchange = (function (_this) {
            return function () {
                _this.showHash();
            }
        })(this);

        $("body").on("scroll", function () {
            console.log($(this).scrollTop);
        });

        window.onscroll = (function (_this) {
            return function () {
                var top = $("body")[0].scrollTop;
                var index = _this.$tab.find(".tab-item").index(_this.$tab.find(".tab-item.selected"));

                _this.scrollArray[index] = top;
            };
        })(this);

        return this;
    };

    tab.prototype.showFirst = function () {
        var idName = this.$tabItem.eq(0).data("selected");
        if (this.options.hash)
            window.location.hash = idName;
        var $nav = this.$tab.find(idName);
        this.$tabNav.removeClass("selected");
        $nav.addClass("selected");

        this.$tabItem.removeClass("selected");
        this.$tabItem.eq(0).addClass("selected");

        return this;
    };

    tab.prototype.showHash = function () {
        var idName = window.location.hash;

        var $nav = this.$tab.find(idName);
        this.$tabNav.removeClass("selected");
        $nav.addClass("selected");

        this.$tabItem.removeClass("selected");
        for (var i = 0; i < this.$tabItem.length; i++) {
            if (this.$tabItem.eq(i).data("selected") == idName) {
                this.$tabItem.eq(i).addClass("selected");
                $.Event('tabTap', {bubbles: false});
                this.$tabItem.eq(i).trigger('tabTap');
                return;
            }
        }
    };

    $.fn.tab = function (options) {
        var tt = new tab($(this), options);

        var tabItemArray = [];
        for (var i = 0; i < tt.$tabItem.length; i++) {
            tabItemArray.push(tt.$tabItem.eq(i));
        }
        return tabItemArray;
    };
})(Zepto);