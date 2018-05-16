((() => {
  if (!Object.assign) {
    Object.assign = (...args) => {
      let target = args.shift();
      for (let i = 0; i < args.length; i++) {
        const item = args[i];
        for (let key in item) {
          if (item.hasOwnProperty(key)) {
            target[key] = item[key];
          }
        }
      }
    };
  }
  var vueExtend = function() {
    var parseJSON = function parseJSON(str) {
      try {
        return eval("(" + str + ")");
      } catch (e) {
        return str;
      }
    };
    var dateParse = (date, fmt) => {
      date = date instanceof Date ? date : new Date(+date);
      if (!fmt) fmt = "yyyy-MM-dd hh:mm:ss";
      var o = {
        "(Y|y)+": date.getFullYear(),
        "(M)+": date.getMonth() + 1,
        "(D|d)+": date.getDate(),
        "(h|H)+": date.getHours(),
        "(m)+": date.getMinutes(),
        "(s|S)+": date.getSeconds()
      };
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          var str = o[k] + "";
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : str.length > 2 ? str : ("00" + str).substr(str.length));
        }
      }
      return fmt;
    };

    function dataHandle(handle) {
      return {
        get(name) {
          if (!name) return null;
          return parseJSON(handle.getItem(name));
        },
        set(name, obj) {
          if (!name) return null;
          handle.setItem(name, JSON.stringify(obj));
          return obj;
        },
        remove(name) {
          handle.removeItem(name);
        },
        clear() {
          handle.clear();
        }
      };
    }

    var localStorage = dataHandle(window.localStorage);
    var sessionStorage = dataHandle(window.sessionStorage);
    var $user = function(userName) {
      var user = localStorage.get(userName);
      return {
        get: function() {
          return user;
        },
        set: function(userObj) {
          return user = localData.set(userName, userObj);
        },
        reset: function(name) {
          userName = name || userName;
          return user = localData.get(userName);
        }
      };
    }("user");

    function isObj(obj) {
      return obj && typeof obj === "object";
    }

    var copy = (...args) => {


      var temp = {};
      args.map(function(item) {
        if (isObj(item)) {
          if (Array.isArray(item)) {
            Object.assign(temp, copy.apply(undefined, [obj].concat(_toConsumableArray(item))));
          } else {
            for (var key in item) {
              temp[key] = obj[item[key]];
            }
          }
        } else {
          temp[item] = obj[item];
        }
      });
      return temp;
    };
    return {
      isObj,
      copy,
      $user,
      parseJSON,
      $regexp: {
        isMobile(value) {
          return (/^1[34578]\d{9}$/.test(value));
        },
        isCode(value) {
          return (/^\d{6}$/.test(value));
        },
        isHanzi(value) {
          return (/[\u4e00-\u9fa5]/gm.test(value));
        },
        isEmail(value) {
          return (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value));
        },
        isUrl(value) {
          return (/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(value));
        },
        isPeopleId(value) {
          return (/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(value));
        },
        isDate(value) {
          return (/^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/.test(value));
        }
      },
      localStorage,
      sessionStorage,
      dateParse
    };
  }();
  var vuePrototype = (Vue, options = {}) => {
    if (!vueExtend.isObj(options)) {
      throw new Error("vue-extend的options必须是一个对象");
    }
    if (options.userName) vueExtend.$user.reset(options.userName);
    if (options.isMixin) {
      Vue.mixin({
        created() {
          this.user = this.$user.get();
        }
      });
    }
    Object.assign(Vue.prototype, vueExtend, options);
  };
  Object.assign(vuePrototype, vueExtend);
  return vuePrototype;
})());