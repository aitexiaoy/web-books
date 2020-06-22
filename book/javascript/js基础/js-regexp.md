### 正则

正则要么匹配字符，要么匹配位置

#### 正则表达式字符匹配攻略

##### 字符组

`[abc]` 表示匹配`a`或`b`或`c`

也可以采用返回匹配

`[a-z]` 表示匹配`a-z`的字符

如果需要匹配不在范围内的字符，采用`^`

`[^abc]` 除`a`或者`b`或`c`之外的任意字符

常见缩写

- `\d`就是`[0-9]`
- `\D`就是`[^0-9]`
- `\w`就是`[0-9a-zA-Z_]` 表示数字，大小写字母和下划线
- `\W`就是`[^0-9a-zA-Z_]` 非单词字符
- `\s`就是`[\t\v\n\r\f]` 表示空白字符串，包括空格、水平制表符、垂直制表符、换行符、回车符、换页符
- `\S`就是`[^\t\v\n\r\f]` 非空白符
- `.` 就是`[^\n\r\u2028\u2029]` 通配符，表示几乎任意字符。换行符、回车符、行分隔符和段分隔符除外

匹配任意字符 `[\d\D]`、`[\w\W]`、`[\s\S]`、`[^]`

#####  量词
`{m,n}` 匹配`m`到`n`个字符

常见量词

- `{m,}` 表示至少出现`m`次
- `{m}` 等价于 `{m,m}`，表示出现`m`次
- `?` 等价于 `{0,1}` , 表示出现或者不出现
- `+` 等价于 `{1, }`, 表示至少出现一次
- `*` 等价于 `{0, }`, 表示出现任意次

##### 贪婪匹配与惰性匹配

贪婪匹配会尽可能的匹配到多的字符，惰性匹配是匹配到有就结束

贪婪匹配

```js
var regex = /\d{2,5}/g
var string = '124 1234 12345 123456'
console.log(string.match(regex))
// [ '124', '1234', '12345', '12345' ]
```

惰性匹配

```js
var regex = /\d{2,5}?/g
var str = '124 1234 12345 123456'
console.log(str.match(regex))
// [ '12', '12', '34', '12', '34', '12', '34', '56' ]
```

通过在量词后面加上`?`就能实现惰性匹配了。因此惰性匹配出现的情形如下

```js
{m,n}?
{m,}?
??
+?
*?
```

##### 多选分支

通过`|`管道符进行分割，分支也是惰性的。匹配到前面的就不再尝试了

#### 位置匹配

在es5中一共有6个锚字符

- `^` (脱字符) 匹配开头，在多行匹配行开头
- `$` (美元符号) 匹配结尾，在多行匹配中匹配行结尾

- `\b` 是单词边界，具体就是`\w`和`\W`之间的位置，也包括`\w`和`^`之间的位置，也包括`\w`和`$`之间的位置
- `\B` 就是`\b`的反面的意思，非单词边界。例如在字符串中所有位置中，扣掉`\b`，剩下的都是`\B`的

- `(?=p)` 其中`p`是一个子模式，即`p`前面的位置

```js
var result = "hello".replace(/(?=l)/g, '#');
console.log(result);  // he#l#lo
```

- `(?!p)` 就是`(?=p)`的反面意思

```js
var result = "hello".replace(/(?!l)/g, '#');
console.log(result);  // #h#ell#o#
```

在es6中还有

- `(?<=p)` 其中`p`是一个子模式，即`p`后面的位置

```js
var result = "hello".replace(/(?<=l)/g, '#');
console.log(result); // hel#l#o
```

- `(?<!p)` 就是`(?<=p)`的反面意思

```js
var result = "hello".replace(/(?<!l)/g, '#');
console.log(result); // #h#e#llo#
```

#### 分组

采用括号对正则进行分组，使正则功能更加的强大

##### 提供分组

```js
var regex = /^I love (JavaScript|Regular Expression)$/;
console.log( regex.test("I love JavaScript") );
console.log( regex.test("I love Regular Expression") );
```

##### 引用分组

可以使用构造函数的全局属性`$1`至`$9`来获取
```js
var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";

regex.test(string); // 正则操作即可，例如
//regex.exec(string);
//string.match(regex);

console.log(RegExp.$1); // "2017"
console.log(RegExp.$2); // "06"
console.log(RegExp.$3); // "12"
```

或者
```js
var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
var result = string.replace(regex, "$2/$3/$1");
console.log(result); 
// => "06/12/2017"
```

##### 反向引用

通过`\n`,`n`为具体的第几个分组，如`\1`,能够匹配到分组匹配到的内容，如例子中的`\1`

```js
var regex = /\d{4}(-|\/|\.)\d{2}\1\d{2}/;
var string1 = "2017-06-12";
var string2 = "2017/06/12";
var string3 = "2017.06.12";
var string4 = "2016-06/12";
console.log( regex.test(string1) ); // true
console.log( regex.test(string2) ); // true
console.log( regex.test(string3) ); // true
console.log( regex.test(string4) ); // false
```
括号嵌套的话以左括号为准，如果反向引用不存在，例如`\2`不存在，那就匹配`"\2"`

##### 非捕获分组

如果不想被引用访问到，就可以采用非捕获分组。`(?:p)`

```js
var regex = /(?:ab)+/g;
var string = "ababa abbb ababab";
console.log( string.match(regex) ); 
// => ["abab", "ab", "ababab"]
```

#### 回溯




##### 参考文档

[JS正则迷你书](https://github.com/qdlaoyao/js-regex-mini-book)
