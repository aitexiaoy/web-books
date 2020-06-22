值相等检查与语义类似`Object.is`，但将不可变Iterable作为值对待，如果第二个Iterable值包含等价值则相等。
```js
is(first: any, second: any): boolean
```
讨论
它在整个不可变时用于检查相等性，包括Map键相等和Set成员资格。
```js
var map1 = Immutable.Map({a:1, b:1, c:1});
var map2 = Immutable.Map({a:1, b:1, c:1});
assert(map1 !== map2);
assert(Object.is(map1, map2) === false);
assert(Immutable.is(map1, map2) === true);
```
注：不像Object.is，Immutable.is假设0和-0值是相同的，匹配 ES6地图键平等的行为。