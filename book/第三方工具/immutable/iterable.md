这Iterable是一组可以迭代的（键，值）条目，并且是所有集合的基类immutable，允许它们使用所有Iterable方法（如map和filter）。
```js
class Iterable<K, V>
```
讨论
注：可迭代总是在重复相同的顺序，但是这个顺序可以不总是明确定义，因为对于情况Map和Set。

结构
```js
Iterable()
```
创建一个 Iterable。
```js
Iterable<K, V>(iterable: Iterable<K, V>): Iterable<K, V>
Iterable<T>(array: Array<T>): Iterable.Indexed<T>
Iterable<V>(obj: {[key: string]: V}): Iterable.Keyed<string, V>
Iterable<T>(iterator: Iterator<T>): Iterable.Indexed<T>
Iterable<T>(iterable: Object): Iterable.Indexed<T>
Iterable<V>(value: V): Iterable.Indexed<V>
```
讨论
所创建的Iterable类型基于输入。

如果一个Iterable，那一样Iterable。
如果一个数组，一个Iterable.Indexed。
如果一个对象有一个迭代器，一个Iterable.Indexed。
如果一个迭代器，一个Iterable.Indexed。
如果一个对象，一个Iterable.Keyed。
此方法强制将对象和字符串转换为可执行文件。如果您想确保返回一个项目的 Iterable，请使用Seq.of。

静态方法
#### Iterable.isIterable()
如果maybeIterable是 Iterable 或其任何子类，则为 true 。
```js
Iterable.isIterable(maybeIterable: any): boolean
```
#### Iterable.isKeyed()
如果maybeKeyed是 Iterable.Keyed 或其任何子类，则为 true 。
```js
Iterable.isKeyed(maybeKeyed: any): boolean
```
#### Iterable.isIndexed()
如果maybeIndexed是 Iterable.Indexed 或其任何子类，则为真。
```js
Iterable.isIndexed(maybeIndexed: any): boolean
```
#### Iterable.isAssociative()
如果maybeAssociative是键控或索引 Iterable，则为真。
```js
Iterable.isAssociative(maybeAssociative: any): boolean
```
#### Iterable.isOrdered()
如果maybeOrdered是迭代顺序定义良好的 Iterable，则为真。True 对于 `Iterable.Indexed` 以及 `OrderedMap` 和 `OrderedSet`。
```js
Iterable.isOrdered(maybeOrdered: any): boolean
```
类型
Iterable.Keyed

价值平等
#### Iterable#equals()
如果这和另一个 Iterable 具有值相等性，则为真，如下定义Immutable.is()。
```js
equals(other: Iterable<K, V>): boolean
```
讨论
注意：这相当于Immutable.is(this, other)，但提供允许链式表达式。

#### Iterable#hashCode()
计算并返回此 Iterable 的散列标识。
```js
hashCode(): number
```
讨论
在hashCode一个可迭代的用于确定潜在平等，和添加这一个当使用Set或作为一个键Map，经由不同的实例实现查找。
```js
var a = List.of(1, 2, 3);
var b = List.of(1, 2, 3);
assert(a !== b); // different instances
var set = Set.of(a);
assert(set.has(b) === true);
```
如果两个值相同hashCode，则不能保证相等（http://en.wikipedia.org/wiki/Collision_（computer_science％29）。如果两个值有不同的hashCodes，则它们不能相等。

读取值
#### Iterable#get()
返回与提供的键相关联的值，如果 Iterable 不包含此键，则返回 notSetValue。
```js
get(key: K, notSetValue?: V): V
```
讨论
注意：一个键可能与一个undefined值相关联，所以如果notSetValue没有提供并且该方法返回undefined，那么不能保证没有找到该键。

#### Iterable#has()
如果此关键字存在Iterable，则为真，Immutable.is用于确定相等性
```js
has(key: K): boolean
```
#### Iterable#includes()
如果此值中存在值Iterable，则为 true ，Immutable.is用于确定相等性
```js
includes(value: V): boolean
```
别号
contains()

#### Iterable#first()
Iterable 中的第一个值。
```js
first(): V
```
#### Iterable#last()
Iterable 中的最后一个值。
```js
last(): V
```
读 deep values
#### Iterable#getIn()
通过嵌套的 Iterables 返回键或索引路径的值。
```js
getIn(searchKeyPath: Array<any>, notSetValue?: any): any
getIn(searchKeyPath: Iterable<any, any>, notSetValue?: any): any
```
#### Iterable#hasIn()
如果通过嵌套的 Iterables 跟随键或索引路径的结果导致设置值，则返回 true。
```js
hasIn(searchKeyPath: Array<any>): boolean
hasIn(searchKeyPath: Iterable<any, any>): boolean
```
转换为 JavaScript 类型
#### Iterable#toJS()
将此 Iterable 深度转换为等效的 JS。
```js
toJS(): any
```
别号
toJSON()

讨论
Iterable.Indexeds，并且Iterable.Sets成为阵列，同时Iterable.Keyeds成为物体。

#### Iterable#toArray()
浅显地将这个迭代器转换为一个 Array，丢弃键。
```js
toArray(): Array<V>
```
#### Iterable#toObject()
将此 Iterable 浅转换为 Object。
```js
toObject(): {[key: string]: V}
```
讨论
如果键不是字符串，则抛出。

转换为集合
#### Iterable#toMap()
将此 Iterable 转换为 Map，如果键不可哈希则抛出。
```js
toMap(): Map<K, V>
```
讨论
注意：这相当于Map(this.toKeyedSeq())，但为方便起见并允许链接表达式。

#### Iterable#toOrderedMap()
将此 Iterable 转换为 Map，并保持迭代顺序。
```js
toOrderedMap(): OrderedMap<K, V>
```
讨论
注意：这相当于OrderedMap(this.toKeyedSeq())，但为方便起见并允许链接表达式。

#### Iterable#toSet()
将此 Iterable 转换为 Set，放弃键。如果值不可哈希则抛出。
```js
toSet(): Set<V>
```
讨论
注意：这相当于Set(this)，但提供允许链式表达式。

#### Iterable#toOrderedSet()
将此 Iterable 转换为 Set，保持迭代顺序并丢弃键。
```js
toOrderedSet(): OrderedSet<V>
```
讨论
注意：这相当于OrderedSet(this.valueSeq())，但为方便起见并允许链接表达式。

#### Iterable#toList()
将此 Iterable 转换为 List，放弃键。
```js
toList(): List<V>
```
讨论
注意：这相当于List(this)，但提供允许链式表达式。

#### Iterable#toStack()
将此 Iterable 转换为堆栈，丢弃键。如果值不可哈希则抛出。
```js
toStack(): Stack<V>
```
讨论
注意：这相当于Stack(this)，但提供允许链式表达式。

转换为 Seq
#### Iterable#toSeq()
将此 Iterable 转换为相同类型的 Seq（索引，键控或设置）。
```js
toSeq(): Seq<K, V>
```
#### Iterable#toKeyedSeq()
从此 Iterable 返回一个 Seq.Keyed，其索引被视为键。
```js
toKeyedSeq(): Seq.Keyed<K, V>
```
讨论
如果您想要对 Iterable.Indexed 进行操作并保留索引，值对，这非常有用。

返回的 Seq 将具有与此 Iterable 相同的迭代顺序。

示例：
```js
var indexedSeq = Immutable.Seq.of('A', 'B', 'C');
indexedSeq.filter(v => v === 'B').toString() // Seq [ 'B' ]
var keyedSeq = indexedSeq.toKeyedSeq();
keyedSeq.filter(v => v === 'B').toString() // Seq { 1: 'B' }
```
#### Iterable#toIndexedSeq()
返回一个 Seq.Indexed 这个 Iterable 的值，丢弃键。
```js
toIndexedSeq(): Seq.Indexed<V>
```
#### Iterable#toSetSeq()
返回一个 Seq.Set 这个 Iterable 的值，丢弃键。
```js
toSetSeq(): Seq.Set<V>
```
迭代器
#### Iterable#keys()
这个Iterable键的迭代器。
```js
keys(): Iterator<K>
```
讨论
注意：这将返回一个不支持 Immutable JS 序列算法的 ES6 迭代器。使用keySeq替代，如果这是你想要的。

#### Iterable#values()
这个Iterable值的迭代器。
```js
values(): Iterator<V>
```
讨论
注意：这将返回一个不支持 Immutable JS 序列算法的 ES6 迭代器。使用valueSeq替代，如果这是你想要的。

#### Iterable#entries()
这个Iterable条目的迭代器作为[key, value]元组。
```js
entries(): Iterator<Array<any>>
```
讨论
注意：这将返回一个不支持 Immutable JS 序列算法的 ES6 迭代器。使用entrySeq替代，如果这是你想要的。

失败（Seq）
#### Iterable#keySeq()
返回此 Iterable 的新键的 Seq.Indexed，放弃值。
```js
keySeq(): Seq.Indexed<K>
```
#### Iterable#valueSeq()
返回一个 Seq.Indexed 这个 Iterable 的值，丢弃键。
```js
valueSeq(): Seq.Indexed<V>
```
#### Iterable#entrySeq()
返回一个新的 Seq.Indexed 键值值元组。
```js
entrySeq(): Seq.Indexed<Array<any>>
```
序列算法
#### Iterable#map()
使用通过mapper函数传递的值返回相同类型的新 Iterable 。
```js
map<M>(mapper: (value?: V, key?: K, iter?: Iterable<K, V>) => M,context?: any): Iterable<K, M>
```
示例
```js
Seq({ a: 1, b: 2 }).map(x => 10 * x)
// Seq { a: 10, b: 20 }
```
#### Iterable#filter()
仅predicate返回函数返回 true 的条目返回相同类型的新 Iterable 。
```js
filter(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any): Iterable<K, V>
```
示例
```js
Seq({a:1,b:2,c:3,d:4}).filter(x => x % 2 === 0)
// Seq { b: 2, d: 4 }
```
#### Iterable#filterNot()
仅predicate返回函数返回 false 的条目返回相同类型的新 Iterable 。
```js
filterNot(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any): Iterable<K, V>
```
示例
```js
Seq({a:1,b:2,c:3,d:4}).filterNot(x => x % 2 === 0)
// Seq { a: 1, c: 3 }
```
#### Iterable#reverse()
按相反顺序返回相同类型的新 Iterable。
```js
reverse(): Iterable<K, V>
```
#### Iterable#sort()
返回包含相同条目的相同类型的新 Iterable，通过使用comparator进行稳定排序。
```js
sort(comparator?: (valueA: V, valueB: V) => number): Iterable<K, V>
```
讨论
如果comparator没有提供，默认比较器使用<和>。

`comparator(valueA, valueB):`
返回0元素不应该交换的情况。
返回-1（或任何负数）如果valueA之前valueB
返回1（或任何正数）如果valueA后来valueB
是纯粹的，即它必须始终为同一对值返回相同的值。
排序没有定义顺序的集合时，它们的顺序等价物将被返回。例如map.sort()返回 OrderedMap。

#### Iterable#sortBy()
如sort，但也接受一个comparatorValueMapper允许更复杂的手段进行排序的一个：
```js
sortBy<C>(comparatorValueMapper: (value?: V, key?: K, iter?: Iterable<K, V>) => C,comparator?: (valueA: C, valueB: C) => number): Iterable<K, V>
```
示例
```js
hitters.sortBy(hitter => hitter.avgHits);
```
#### Iterable#groupBy()
返回Iterable.Keyed的Iterable.Keyeds，由返回值分组grouper功能。
```js
groupBy<G>(grouper: (value?: V, key?: K, iter?: Iterable<K, V>) => G,context?: any): Seq.Keyed<G, Iterable<K, V>>
```
讨论
注意：这总是一个急切的操作。

副作用
#### Iterable#forEach()
sideEffect是在可迭代的每个条目执行。
```js
forEach(sideEffect: (value?: V, key?: K, iter?: Iterable<K, V>) => any,context?: any): number
```
讨论
不同Array#forEach的是，如果有任何sideEffect回报的话false，迭代将停止。返回迭代的条目数（包括返回false的最后一次迭代）。

创建子集
#### Iterable#slice()
返回一个新的 Iterable，其类型代表这个 Iterable 从开始到结束的一部分。
```js
slice(begin?: number, end?: number): Iterable<K, V>
```
讨论
如果 begin（开始） 是负数，它将从 Iterable 的末尾偏移。例如slice(-2)返回最后两个条目的 Iterable。如果没有提供，则新的 Iterable 将在此 Iterable 开始时开始。

如果 end（最后）是负数，它将从 Iterable 的末尾偏移。例如slice(0, -1)返回除最后一项之外的所有内容的 Iterable。如果没有提供，那么新的 Iterable 将会持续到这个 Iterable 的结尾。

如果所请求的分片等同于当前的 Iterable，那么它将自行返回。

#### Iterable#rest()
返回包含除第一个以外的所有条目的同一类型的新 Iterable。
```js
rest(): Iterable<K, V>
```
#### Iterable#butLast()
返回包含除最后一个以外的所有条目的同一类型的新 Iterable。
```js
butLast(): Iterable<K, V>
```
#### Iterable#skip()
返回amount从此 Iterable 中排除第一个条目的同一类型的新 Iterable。
```js
skip(amount: number): Iterable<K, V>
```
#### Iterable#skipLast()
返回amount从此Iterable中排除最后一个条目的同一类型的新 Iterable。
```js
skipLast(amount: number): Iterable<K, V>
```
#### Iterable#skipWhile()
返回包含从predicate第一个返回 false 时开始的相同类型的新 Iterable 。
```js
skipWhile(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any): Iterable<K, V>
```
示例
```js
Seq.of('dog','frog','cat','hat','god')
  .skipWhile(x => x.match(/g/))
// Seq [ 'cat', 'hat', 'god' ]
```
#### Iterable#skipUntil()
返回包含从predicate第一个返回 true 时开始的相同类型的新 Iterable 。
```js
skipUntil(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any): Iterable<K, V>
```
示例
```js
Seq.of('dog','frog','cat','hat','god')
  .skipUntil(x => x.match(/hat/))
// Seq [ 'hat', 'god' ]
```
#### Iterable#take()
返回包含amount此 Iterable 中第一个条目的相同类型的新 Iterable。
```js
take(amount: number): Iterable<K, V>
```
#### Iterable#takeLast()
返回包含amount此 Iterable 中最后一个条目的相同类型的新 Iterable。
```js
takeLast(amount: number): Iterable<K, V>
```
#### Iterable#takeWhile()
返回包含来自此 Iterable 的条目的相同类型的新 Iterable，只要predicate返回值为 true 即可。
```js
takeWhile(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any): Iterable<K, V>
```
示例
```js
Seq.of('dog','frog','cat','hat','god')
  .takeWhile(x => x.match(/o/))
// Seq [ 'dog', 'frog' ]
```
#### Iterable#takeUntil()
返回包含来自此 Iterable 的条目的相同类型的新 Iterable，只要predicate返回 false 即可。
```js
takeUntil(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any): Iterable<K, V>
```
示例
```js
Seq.of('dog','frog','cat','hat','god').takeUntil(x => x.match(/at/))
// ['dog', 'frog']
```
组合
#### Iterable#concat()
用其他值返回一个具有相同类型的新 Iterable，并将其连接到此类。
```js
concat(...valuesOrIterables: any[]): Iterable<K, V>
```
讨论
对于 Seqs，即使它们具有相同的密钥，所有条目也会出现在所得到的迭代中。

#### Iterable#flatten()
压扁嵌套的 Iterables。
```js
flatten(depth?: number): Iterable<any, any>
flatten(shallow?: boolean): Iterable<any, any>
```
讨论
默认情况下会严格地将 Iterable 扁平化，返回一个相同类型的 Iterable，但depth可以以数字或布尔值的形式提供（其中 true 表示浅层扁平化）。深度为0（或者浅：假）将会变得很平坦。

仅将其他的 Iterable 变为 Flattens，而不是阵列或对象。

注意：flatten(true)在 Iterable> 上运行并返回 Iterable

#### Iterable#flatMap()
平面映射 Iterable，返回相同类型的 Iterable。
```js
flatMap<MK, MV>(mapper: (value?: V, key?: K, iter?: Iterable<K, V>) => Iterable<MK, MV>,context?: any): Iterable<MK, MV>
flatMap<MK, MV>(mapper: (value?: V, key?: K, iter?: Iterable<K, V>) => any,context?: any): Iterable<MK, MV>
```
讨论
类似于iter.map(...).flatten(true)。

减少值
#### Iterable#reduce()
通过调用 Iterable 中的reducer每个条目并传递缩小的值，将 Iterable 减少为一个值。
```js
reduce<R>(reducer: (reduction?: R, value?: V, key?: K, iter?: Iterable<K, V>) => R,initialReduction?: R,context?: any): R
```
参阅
Array#reduce.

讨论
如果initialReduction未提供，或者为空，则将使用 Iterable 中的第一项。

#### Iterable#reduceRight()
反向（从右侧）减少 Iterable。
```js
reduceRight<R>(reducer: (reduction?: R, value?: V, key?: K, iter?: Iterable<K, V>) => R,initialReduction?: R,context?: any): R
```
讨论
注意：类似于 this.reverse（）。reduce（），并提供与奇偶校验Array#reduceRight。

#### Iterable#every()
如果predicate对 Iterable 中的所有条目返回 true，则返回 true。
```js
every(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any): boolean
```
#### Iterable#some()
如果predicate对Iterable中的任何条目返回 true，则返回 true。
```js
some(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any): boolean
```
#### Iterable#join()
将值作为字符串连接在一起，在每个值之间插入一个分隔符。默认分隔符是","。
```js
join(separator?: string): string
```
#### Iterable#isEmpty()
如果此 Iterable 不包含任何值，则返回true。
```js
isEmpty(): boolean
```
讨论
对于一些惰性Seq，isEmpty可能需要迭代以确定空虚。至多会发生一次迭代。

#### Iterable#count()
返回此 Iterable 的大小。
```js
count(): number
count(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any): number
```
讨论
不管这个Iterable是否可以懒惰地描述它的大小（有些Seqs不能），这个方法总是会返回正确的大小。例如，Seq如果需要，它会评估一个懒惰。
如果predicate提供，则返回Iterable中predicate返回值为true 的条目的计数。

#### Iterable#countBy()
返回一个Seq.Keyed计数，按grouper函数的返回值分组。
```js
countBy<G>(grouper: (value?: V, key?: K, iter?: Iterable<K, V>) => G,context?: any): Map<G, number>
```
讨论
注意：这不是一个惰性操作。

搜索值
#### Iterable#find()
返回predicate返回true 的第一个值。
```js
find(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any,notSetValue?: V): V
```
#### Iterable#findLast()
返回返回值为predicatetrue 的最后一个值。
```js
findLast(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any,notSetValue?: V): V
```
讨论
注意：predicate每个条目都会被调用。

#### Iterable#findEntry()
返回返回值为true的第一个键值对predicate。
```js
findEntry(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any,notSetValue?: V): Array<any>
```
#### Iterable#findLastEntry()
返回返回值为true的最后一个键值对predicate。
```js
findLastEntry(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any,notSetValue?: V): Array<any>
```
讨论
注意：predicate每个条目都会被调用。

#### Iterable#findKey()
返回predicate返回true 的键。
```js
findKey(predicate: (value?: V, key?: K, iter?: Iterable.Keyed<K, V>) => boolean,context?: any): K
```
#### Iterable#findLastKey()
返回predicate返回true 的最后一个键。
```js
findLastKey(predicate: (value?: V, key?: K, iter?: Iterable.Keyed<K, V>) => boolean,context?: any): K
```
讨论
注意：predicate每个条目都会被调用。

#### Iterable#keyOf()
返回与搜索值关联的键，或者未定义。
```js
keyOf(searchValue: V): K
```
#### Iterable#lastKeyOf()
返回与搜索值关联的最后一个键，或者未定义。
```js
lastKeyOf(searchValue: V): K
```
#### Iterable#max()
返回此集合中的最大值。如果任何值相当相等，则找到的第一个将被返回。
```js
max(comparator?: (valueA: V, valueB: V) => number): V
```
讨论
在comparator以同样的方式使用#### `Iterable#sort`。如果未提供，则默认比较器为>。
当两个值被认为是等价的，遇到的第一个将被返回。否则，max只要比较器是可交换的，将独立于输入的顺序进行操作。默认比较器只有在类型不相同时才>可以交换。
如果comparator返回0，且其中任一值为NaN，undefined或null，则将返回该值。

#### Iterable#maxBy()
喜欢max，但也接受一个comparatorValueMapper允许通过更复杂的手段比较：
```js
maxBy<C>(comparatorValueMapper: (value?: V, key?: K, iter?: Iterable<K, V>) => C,comparator?: (valueA: C, valueB: C) => number): V
```
🌰
```js
hitters.maxBy(hitter => hitter.avgHits);
```
#### Iterable#min()
返回此集合中的最小值。如果任何值相当相等，则找到的第一个将被返回。
```js
min(comparator?: (valueA: V, valueB: V) => number): V
```
讨论
在comparator以同样的方式使用#### Iterable#sort。如果未提供，则默认比较器为<。
当两个值被认为是等价的，遇到的第一个将被返回。否则，min只要比较器是可交换的，将独立于输入的顺序进行操作。默认比较器只有在类型不相同时才<可以交换。
如果comparator返回0，且其中任一值为NaN，undefined或null，则将返回该值。

#### Iterable#minBy()
喜欢min，但也接受一个comparatorValueMapper允许通过更复杂的手段比较：
```js
minBy<C>(comparatorValueMapper: (value?: V, key?: K, iter?: Iterable<K, V>) => C,comparator?: (valueA: C, valueB: C) => number): V
```
🌰
```js
hitters.minBy(hitter => hitter.avgHits);
```
对照
#### Iterable#isSubset()
如果iter包含此Iterable中的每个值，则为真。
```js
isSubset(iter: Iterable<any, V>): boolean
isSubset(iter: Array<V>): boolean
```
#### Iterable#isSuperset()
如果此Iterable包含每个值，则为真iter。
```js
isSuperset(iter: Iterable<any, V>): boolean
isSuperset(iter: Array<V>): boolean
```
键控的可计算元件具有与每个值相关的离散键。
```js
class Iterable.Keyed<K, V> extends Iterable<K, V>
```
讨论
迭代时Iterable.Keyed，每次迭代都会产生一个[K, V]元组，换句话说，#### Iterable#entries是Keyed Iterables的默认迭代器。

结构

### Iterable.Keyed()
创建一个Iterable.Keyed
```js
Iterable.Keyed<K, V>(iter: Iterable.Keyed<K, V>): Iterable.Keyed<K, V>
Iterable.Keyed<K, V>(iter: Iterable<any, any>): Iterable.Keyed<K, V>
Iterable.Keyed<K, V>(array: Array<any>): Iterable.Keyed<K, V>
Iterable.Keyed<V>(obj: {[key: string]: V}): Iterable.Keyed<string, V>
Iterable.Keyed<K, V>(iterator: Iterator<any>): Iterable.Keyed<K, V>
Iterable.Keyed<K, V>(iterable: Object): Iterable.Keyed<K, V>
```
讨论
类似于Iterable()，但是它期望如果不是从Iterable.Keyed或JS对象构造的K，V元组的迭代式喜欢。

转换为Seq
#### Iterable.Keyed#toSeq()
返回Seq.Keyed。
```js
toSeq(): Seq.Keyed<K, V>
```
覆盖 `Iterable#toSeq`

#### Iterable.Keyed#toKeyedSeq()
从此Iterable返回一个Seq.Keyed，其索引被视为键。
```js
toKeyedSeq(): Seq.Keyed<K, V>
```
继承 `Iterable#toKeyedSeq`

讨论
如果您想要对Iterable.Indexed进行操作并保留索引，值对，这非常有用。
返回的Seq将具有与此Iterable相同的迭代顺序。

例：
```js
var indexedSeq = Immutable.Seq.of('A', 'B', 'C');
indexedSeq.filter(v => v === 'B').toString() // Seq [ 'B' ]
var keyedSeq = indexedSeq.toKeyedSeq();
keyedSeq.filter(v => v === 'B').toString() // Seq { 1: 'B' }
#### Iterable.Keyed#toIndexedSeq()
```
返回一个Seq.Indexed这个Iterable的值，丢弃键。
```js
toIndexedSeq(): Seq.Indexed<V>
```
继承 `Iterable#toIndexedSeq`
```js
#### Iterable.Keyed#toSetSeq()
```
返回一个Seq.Set这个Iterable的值，丢弃键。
```js
toSetSeq(): Seq.Set<V>
```
继承 `Iterable#toSetSeq`

序列功能
#### Iterable.Keyed#flip()
返回键和值已翻转的同一类型的新Iterable.Keyed。
```js
flip(): Iterable.Keyed<V, K>
```
🌰
```js
Seq({ a: 'z', b: 'y' }).flip() // { z: 'a', y: 'b' }
```
#### Iterable.Keyed#mapKeys()
使用通过mapper函数传递的键返回相同类型的新Iterable.Keyed 。
```js
mapKeys<M>(mapper: (key?: K, value?: V, iter?: Iterable.Keyed<K, V>) => M,context?: any): Iterable.Keyed<M, V>
```
🌰
```js
Seq({ a: 1, b: 2 })
  .mapKeys(x => x.toUpperCase())
// Seq { A: 1, B: 2 }
```
#### Iterable.Keyed#mapEntries()
通过mapper函数传递条目（键，值元组），返回相同类型的新Iterable.Keyed 。
```js
mapEntries<KM, VM>(mapper: (entry?: Array<any>,index?: number,iter?: Iterable.Keyed<K, V>) => Array<any>,context?: any): Iterable.Keyed<KM, VM>
```
🌰
```js
Seq({ a: 1, b: 2 })
  .mapEntries(([k, v]) => [k.toUpperCase(), v * 2])
// Seq { A: 2, B: 4 }
```
价值平等
#### Iterable.Keyed#equals()
如果这和另一个Iterable具有值相等性，则为真，如下定义Immutable.is()。
```js
equals(other: Iterable<K, V>): boolean
```
继承 `Iterable#equals`

讨论
注意：这相当于Immutable.is(this, other)，但提供允许链式表达式。

#### Iterable.Keyed#hashCode()
计算并返回此Iterable的散列标识。
```js
hashCode(): number
```
继承 `Iterable#hashCode`

讨论
在hashCode一个可迭代的用于确定潜在平等，和添加这一个当使用Set或作为一个键Map，经由不同的实例实现查找。
```js
var a = List.of(1, 2, 3);
var b = List.of(1, 2, 3);
assert(a !== b); // different instances
var set = Set.of(a);
assert(set.has(b) === true);
```
如果两个值相同hashCode，则不能保证相等（http://en.wikipedia.org/wiki/Collision_（computer_science％29）。如果两个值有不同的hashCodes，则它们不能相等。

读取值
#### Iterable.Keyed#get()
返回与提供的键相关联的值，如果Iterable不包含此键，则返回notSetValue。
```js
get(key: K, notSetValue?: V): V
```
继承 `Iterable#get`

讨论
注意：一个键可能与一个undefined值相关联，所以如果notSetValue没有提供并且该方法返回undefined，那么不能保证没有找到该键。
```js
#### Iterable.Keyed#has()
```
如果此关键字存在Iterable，则为真，Immutable.is用于确定相等性
```js
has(key: K): boolean
```
继承 `Iterable#has`
```js
#### Iterable.Keyed#includes()
```
如果此值中存在值Iterable，则为true ，Immutable.is用于确定相等性
```js
includes(value: V): boolean
```
继承 `Iterable#includes`

别号
contains()

#### Iterable.Keyed#first()
Iterable中的第一个值。
```js
first(): V
```
继承 `Iterable#first`

#### Iterable.Keyed#last()
Iterable中的最后一个值。
```js
last(): V
```
继承 `Iterable#last`

读deep values
#### Iterable.Keyed#getIn()
通过嵌套的Iterables返回键或索引路径的值。
```js
getIn(searchKeyPath: Array<any>, notSetValue?: any): any
getIn(searchKeyPath: Iterable<any, any>, notSetValue?: any): any
```
继承 `Iterable#getIn`

#### Iterable.Keyed#hasIn()
如果通过嵌套的Iterables跟随键或索引路径的结果导致设置值，则返回true。
```js
hasIn(searchKeyPath: Array<any>): boolean
hasIn(searchKeyPath: Iterable<any, any>): boolean
```
继承 `Iterable#hasIn`

转换为JavaScript类型
#### Iterable.Keyed#toJS()
将此Iterable深度转换为等效的JS。
```js
toJS(): any
```
继承 `Iterable#toJS`

别号
toJSON()

讨论
Iterable.Indexeds，并Iterable.Sets成为阵列，同时Iterable.Keyeds成为物体。

#### Iterable.Keyed#toArray()
浅显地将这个迭代器转换为一个Array，丢弃键。
```js
toArray(): Array<V>
```
继承 `Iterable#toArray`

#### Iterable.Keyed#toObject()
将此Iterable浅转换为Object。
```js
toObject(): {[key: string]: V}
```
继承 `Iterable#toObject`

讨论
如果键不是字符串，则抛出。

转换为集合
#### Iterable.Keyed#toMap()
将此Iterable转换为Map，如果键不可哈希则抛出。
```js
toMap(): Map<K, V>
```
继承 `Iterable#toMap`

讨论
注意：这相当于Map(this.toKeyedSeq())，但为方便起见并允许链接表达式。

#### Iterable.Keyed#toOrderedMap()
将此Iterable转换为Map，并保持迭代顺序。
```js
toOrderedMap(): OrderedMap<K, V>
```
继承 `Iterable#toOrderedMap`

讨论
注意：这相当于OrderedMap(this.toKeyedSeq())，但为方便起见并允许链接表达式。

#### Iterable.Keyed#toSet()
将此Iterable转换为Set，放弃键。如果值不可哈希则抛出。
```js
toSet(): Set<V>
```
继承 `Iterable#toSet`

讨论
注意：这相当于Set(this)，但提供允许链式表达式。

#### Iterable.Keyed#toOrderedSet()
将此Iterable转换为Set，保持迭代顺序并丢弃键。
```js
toOrderedSet(): OrderedSet<V>
```
继承 `Iterable#toOrderedSet`

讨论
注意：这相当于OrderedSet(this.valueSeq())，但为方便起见并允许链接表达式。

#### Iterable.Keyed#toList()
将此Iterable转换为List，放弃键。
```js
toList(): List<V>
```
继承 `Iterable#toList`

讨论
注意：这相当于List(this)，但提供允许链式表达式。

#### Iterable.Keyed#toStack()
将此Iterable转换为堆栈，丢弃键。如果值不可哈希则抛出。
```js
toStack(): Stack<V>
```
继承 `Iterable#toStack`

讨论
注意：这相当于Stack(this)，但提供允许链式表达式。

迭代器
#### Iterable.Keyed#keys()
这个Iterable键的迭代器。
```js
keys(): Iterator<K>
```
继承 `Iterable#keys`

讨论
注意：这将返回一个不支持Immutable JS序列算法的ES6迭代器。使用keySeq替代，如果这是你想要的。

#### Iterable.Keyed#values()
这个Iterable值的迭代器。
```js
values(): Iterator<V>
```
继承 `Iterable#values`

讨论
注意：这将返回一个不支持Immutable JS序列算法的ES6迭代器。使用valueSeq替代，如果这是你想要的。

#### Iterable.Keyed#entries()
这个Iterable条目的迭代器作为[key, value]元组。
```js
entries(): Iterator<Array<any>>
```
继承 `Iterable#entries`

讨论
注意：这将返回一个不支持Immutable JS序列算法的ES6迭代器。使用entrySeq替代，如果这是你想要的。

失败（Seq）
#### Iterable.Keyed#keySeq()
返回此Iterable的新键的Seq.Indexed，放弃值。
```js
keySeq(): Seq.Indexed<K>
```
继承 `Iterable#keySeq`

#### Iterable.Keyed#valueSeq()
返回一个Seq.Indexed这个Iterable的值，丢弃键。
```js
valueSeq(): Seq.Indexed<V>
```
继承 `Iterable#valueSeq`

#### Iterable.Keyed#entrySeq()
返回一个新的Seq.Indexed键值值元组。
```js
entrySeq(): Seq.Indexed<Array<any>>
```
继承 `Iterable#entrySeq`

序列算法
#### Iterable.Keyed#map()
使用通过mapper函数传递的值返回相同类型的新Iterable 。
```js
map<M>(mapper: (value?: V, key?: K, iter?: Iterable<K, V>) => M,context?: any): Iterable<K, M>
```
继承 `Iterable#map`

🌰
```js
Seq({ a: 1, b: 2 }).map(x => 10 * x)
// Seq { a: 10, b: 20 }
```
#### Iterable.Keyed#filter()
仅predicate返回函数返回true 的条目返回相同类型的新Iterable 。
```js
filter(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any): Iterable<K, V>
```
继承 `Iterable#filter`

🌰
```js
Seq({a:1,b:2,c:3,d:4}).filter(x => x % 2 === 0)
// Seq { b: 2, d: 4 }
```
#### Iterable.Keyed#filterNot()
仅predicate返回函数返回false 的条目返回相同类型的新Iterable 。
```js
filterNot(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any): Iterable<K, V>
```
继承 `Iterable#filterNot`

🌰
```js
Seq({a:1,b:2,c:3,d:4}).filterNot(x => x % 2 === 0)
// Seq { a: 1, c: 3 }
```
#### Iterable.Keyed#reverse()
按相反顺序返回相同类型的新Iterable。
```js
reverse(): Iterable<K, V>
```
继承 `Iterable#reverse`

#### Iterable.Keyed#sort()
返回包含相同条目的相同类型的新Iterable，通过使用a进行稳定排序comparator。
```js
sort(comparator?: (valueA: V, valueB: V) => number): Iterable<K, V>
```
继承 `Iterable#sort`

讨论
如果comparator没有提供a，默认比较器使用<和>。

comparator(valueA, valueB):

返回0元素不应该交换的情况。
返回-1（或任何负数）如果valueA之前valueB
返回1（或任何正数）如果valueA后来valueB
是纯粹的，即它必须始终为同一对值返回相同的值。
排序没有定义顺序的集合时，它们的顺序等价物将被返回。例如map.sort()返回OrderedMap。

#### Iterable.Keyed#sortBy()
喜欢sort，但也接受一个comparatorValueMapper允许更复杂的手段进行排序的一个：
```js
sortBy<C>(comparatorValueMapper: (value?: V, key?: K, iter?: Iterable<K, V>) => C,comparator?: (valueA: C, valueB: C) => number): Iterable<K, V>
```
继承 `Iterable#sortBy`

🌰
```js
hitters.sortBy(hitter => hitter.avgHits);
```
#### Iterable.Keyed#groupBy()
返回Iterable.Keyed的Iterable.Keyeds，由返回值分组grouper功能。
```js
groupBy<G>(grouper: (value?: V, key?: K, iter?: Iterable<K, V>) => G,context?: any): Seq.Keyed<G, Iterable<K, V>>
```
继承 `Iterable#groupBy`

讨论
注意：这总是一个急切的操作。

副作用
#### Iterable.Keyed#forEach()
该sideEffect是在可迭代的每个条目执行。
```js
forEach(sideEffect: (value?: V, key?: K, iter?: Iterable<K, V>) => any,context?: any): number
```
继承 `Iterable#forEach`

讨论
不同的是Array#forEach，如果有任何sideEffect回报的话false，迭代将停止。返回迭代的条目数（包括返回false的最后一次迭代）。

创建子集
#### Iterable.Keyed#slice()
返回一个新的Iterable，其类型代表这个Iterable从开始到结束的一部分。
```js
slice(begin?: number, end?: number): Iterable<K, V>
```
继承 `Iterable#slice`

讨论
如果begin是负数，它将从Iterable的末尾偏移。例如slice(-2)返回最后两个条目的Iterable。如果没有提供，则新的Iterable将在此Iterable开始时开始。

如果end是负数，它将从Iterable的末尾偏移。例如slice(0, -1)返回除最后一项之外的所有内容的Iterable。如果没有提供，那么新的Iterable将会持续到这个Iterable的结尾。

如果所请求的分片等同于当前的Iterable，那么它将自行返回。
