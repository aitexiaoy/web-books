将纯 JS 对象和数组深层转换为不可变映射或列表。
```js
fromJS(json: any, reviver?: (k: any, v: Iterable<any, any>) => any): any
```
###### 讨论

如果可选地提供了`reviver` ，那么每个集合都会被调用为 Seq（从最嵌套的集合开始并继续到顶层集合本身），以及引用每个集合的键以及提供的父 JS 对象this。对于最高级别的对象，关键会是""。这个reviver预计这会返回一个新的不可变的可重用对象，允许从深层 JS 对象进行自定义转换。

此示例将 JSON 转换为 List 和 OrderedMap：
```js
Immutable.fromJS({a: {b: [10, 20, 30]}, c: 40}, function (key, value) {
  var isIndexed = Immutable.Iterable.isIndexed(value);
  return isIndexed ? value.toList() : value.toOrderedMap();
});

// true, "b", {b: [10, 20, 30]}
// false, "a", {a: {b: [10, 20, 30]}, c: 40}
// false, "", {"": {a: {b: [10, 20, 30]}, c: 40}}
```
如果没有提供reviver，默认行为会将数组转换为列表和对象到地图中。
`reviver`起到类似于相同的参数在`JSON.parse`。
`Immutable.fromJS`在转换中保守。它只会转换传递`Array.isArray`给 `List` 的数组，并且只将原始对象（没有自定义原型）转换为 `Map`。
请记住，使用 JS 对象构建 Immutable Maps 时，JavaScript Object 属性始终是字符串，即使以不含引号的简写形式书写，而 Immutable Maps 也会接受任何类型的键。

```js
var obj = { 1: "one" };
Object.keys(obj); // [ "1" ]
obj["1"]; // "one"
obj[1];   // "one"

var map = Map(obj);
map.get("1"); // "one"
map.get(1);   // undefined
```
`JavaScript` 对象的属性访问首先将该键转换为一个字符串，但由于 `Immutable Map` 键的类型可以是任何类型，所以该参数`get()`不会被修改。