
<h1 align="center">vue-extend 一款给Vue扩展方法的插件</h1>

#### 功能介绍
一款给Vue扩展方法的插件,将我们日常常用的方法注册到vue对象中,可以通过this[proto]快速取得方法或者对象,做到真正的一劳永逸!!!
#### 浏览器支持情况
<p align="center">
  <a href="https://saucelabs.com/u/vuejs"><img src="https://saucelabs.com/browser-matrix/vuejs.svg" alt="Sauce Test Status"></a>
</p>

#### 使用方法
- 安装
```
npm install -D vue-extend
```
- 引用
```
import vueExtend from 'vue-extend'
import Vue from 'vue';
// 扩展方法
Vue.use(vueExtend);
// 传入配置参数
//Vue.use(vueExtend,[options]);
```

#### vue-extend 自带方法说明

| 变量名称 | 类型 | 描述 |
|---------|--------|-------------|
| isObj        | Function | 是否为对象 |
| $user              | Object | 获取储存在localStorage中的user数据.有get(key)/获取,set(value)/设置,clear/清空,reset(userName)重定义username |
| parseJSON             |Function | json数据转化成对象,对于不能转换的返回原数据(不会报错) |
| localStorage         | Function | 操作储存在localStorage中的数据,有get(key)/获取,set(key,value)/设置,clear/清空,delete(key)/删除方法,于window.localStorage不同的是,所有操作均会自动转换为对象 |
| sessionStorage | Function | 操作window.sessinStorage,其他同上 |
| dateParse | Function |  日期格式化,需要两个参数(date,fmt) 第一个参数为日期或者数字默认当前时间, 第二个为日期格式,默认为"yyyy-MM-dd hh:mm:ss",即'2018-05-17 12:44:55',y代表年,M代表月,d代表日,h代表小时,m代表分钟,s代表秒 |
| copy              | Function | 调用形式copy(target,[...proto])  复制target里面的属性,proto可以是字符串,对象,数组 字符串:直接应用此名字并且复制 object 会使用key作为复制对象的key,value值取自对应的target上面 array会自动展开然后再次复制  eg:`copy({key1:'value1',key2:'value2',key3:'value3'},{newKey:'key1'},'key2',['key3']) => {newKey: "value1", key2: "value2", key3: "value3"}` |
| $regexp        | Object | 常用正则验证,见下表 |

|变量名称|描述|
|---|-----------|
|isMobile|是否是手机号|
|isCode|是否是6位数字验证码|
|isHanzi|是否含有汉字|
|isEmail|是否是邮箱|
|isUrl|是否是链接|
|isPeopleId|是否是身份证号码|
|isDate|是否是2012-10-20这种格式的日期|

#### options配置
通过`Object.assign(Vue.prototype, vueExtend, options);`自动把options对象注入`Vue.prototype`中,所以options中的数据和方法都可以在vue环境中通过this[protoName]获取到.

| 变量名称 | 类型 | 描述 |
|---------|--------|-------------|
|userName|string|上面$user获取localStorage使用的字段,默认是user|
|isMixin|boolean|是否注入mixin,默认false.开启后,会在vue的created阶段注入user对象,可通过this.user获取$user.get()后数据|

