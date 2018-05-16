## vue扩展方法
### 加载
```
npm install vue-extend
```
### 使用方法
```
import vueExtend from 'vue-extend'
import Vue from 'vue';
// 扩展方法
Vue.use(vueExtend);
```

### 扩展的方法

```
 //1.localData   本地localStorage操作方法
 this.localData.get('user');//获取本地数据
 this.localData.set('user',{age:12,name:'baobao'})//设置
 this.localData.delete('user');//删除

 //2 sessionData 参考上面 localDate

 //3 parseJSON 解析str为json对象
this.parseJSON("{name:'baobao',age:'12'}")

//4.dateParse  时间解析
this.dateParse(date, fmt)  
//date 可以是时间对象 或者 时间戳
//fmt  时间格式   y 年  M 月 d 日 h 小时 m 分钟 s 秒
this.dateParse(new Date,'yyyy-MM-dd hh-mm-ss');

//$regexp 正则匹配 
this.$regexp.isMobile(value)//验证手机号
this.$regexp.isCode(value)//验证6位数字验证码
this.$regexp.isHanzi(value)//验证汉字
this.$regexp.isEmail(value)//邮箱验证
this.$regexp.isUrl(value)//URL验证
this.$regexp.isPeopleId(value)//身份证验证
this.$regexp.isDate(value)//匹配日期(yyyy-MM-dd)

```
