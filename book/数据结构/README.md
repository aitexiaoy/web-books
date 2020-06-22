

### 数据结构

#### 队列 FIFO

特点：先进先出

```js
function Queue(){
    let items =[]

    this.enqueue = function(data){
        items.push(data)
        return items
    }
    this.dequeue = function(){
        return items.shift()
    }

    this.front=function(){
        return items[0]
    }

    this.size = function(){
        return items.length
    }

    this.isEmpty = function(){
        return this.size() === 0
    }

    this.print=function(){
        console.log(items.toString())
    }

}
```

##### 优先队列

是只队列中的元素含有优先级，拥有优先级高的元素在前面。

```js
function PriorityQueue(){
    let items=[]

    /**
     * @param {any} element 元素
     * @param {number} priority 优先级
     */
    function QueueElement=(element,priority){
        this.element = element
        this.priority = priority
    }

    this.enqueue = function(element,property){
        let addEd = false
        let queueElement = new QueueElement(element,priority)
        for(let i = 0,length=item.length;i<length;i++){
            if(queueElement.priority>item[i].priority){
                items.splice(i,0,queueElement)
                added = true
                break
            }
            if(!added){
                items.push(queueElement)
            }
        }
    }

    this.print = function(){
        items.forEach(({element,priority})=>{
            console.log(`${element}-${priority}`)
        })
    }

    // ... 其他实现方法相同
}

```

##### 循环队列

```js
// 击鼓传花游戏

function hotPotato(names,num){
    let queue = new Queue()
    names.forEach(item=>{
        queue.enqueue(item)
    })

    let eliminated = ''
    while(queue.size() > 1){
        for(let i=0;i<num;i++){
            queue.enqueue(queue.dequeue())
        }

        eliminated = queue.dequeue()
        console.log(`${eliminated}在击鼓传花中被淘汰`)
    }

    return queue.dequeue()
}

let names = ['John','Jack','Camila','Ingrid','Carl'];
let winner = hotPotato(names, 7);
console.log('The winner is: ' + winner);
```




#### 栈 LIFO
    后进先出 

```js
function Stack(){
    let items = []

    this.push=function(data){
        items.push(data)
        return items
    }

    this.pop=function(){
        return items.pop()
    }

    this.peek=function(){
        return items[items.length-1]
    }

    this.size=function(){
        return items.length
    }

    this.isEmpty=function(){
        return items.length === 0
    }

    this.print=function(){
        console.log(items.toString())
    }
}
```

#### 链表

链表也是存储有序元素的集合，但是和数组不同，链表的元素可以在内存中不连续，每个元素有一个存储元素本身节点和一个指向下一个元素的引用组成。

链表只能从表头开始访问，直到找到所需元素

##### 单项链表

```js
function LinkedList(){
    let Node = function(element){
        this.element = element
        this.next = null
    }

    let length = 0
    let head = null

    // 向尾部插入元素
    this.append=function(element){
        let node = new Node(element)
        if(head === null){
            head = node
        } else {
            current = head;
            // 找到最后一项
            while(current.next){
                current = current.next
            }

            current.next = node
        }
        length ++ 
    }

    // 向特定位置插入元素
    this.insert = function(position, element){

        if( position >=0 && position <= length ){

            let node  = new Node(element)
            let current = head
            let previous = null
            let index = 0

            if( position === 0 ){
                node.next = current
                head = node
            } else if(position === length){
                this.append(node)
                return true
            } else {
                while(index++ < position){
                    previous = current
                    current = current.next
                }

                node.next = current
                previous.next = node
            }
            length ++
            return true
        }

        return false
    }

    // 指定位置移除
    this.removeAt = function(position){
        // 在范围内移除
        if(position >= 0 && position < length){
            let current = head
            let previous = null
            let index = 0

            if(position === 0){
                head = head.next
            } else {
                // 当index === position的时候循环退出
                while(index++ < position){
                    previous = current
                    current = current.next
                }
                previous.next = current.next
            }

            length-- 
            return current.element
        } else {
            return null
        }
    }

    // 移除指定元素
    this.remove = function(element){
        let index = this.indexOf(element)
        return this.removeAt(index)
    }

    // 获得元素位置
    this.indexOf = function(element){
        let current = head
        let index = 0
        while (current){
            if(current.element === element){
                return index
            }

            index++
            current = current.next
        }
        return -1
    }

    // 链表是否为空
    this.isEmpty = function(){
        return length === 0
    }

    // 链表长度
    this.size = function(){
        return length
    }

    // 获得头部元素
    this.getHead = function(){
        return head
    }

    this.toString = function(){
        let current = head
        let string = ''

        while(current){
            string += `${current.element.toString()}${current.next ? '/n' : ''}`
            current = current.next
        }

        return string
    }

    this.print = function(){

    }

}
```

##### 双向链表

双向链表除了有个执行下一个节点的指针，还有一个指向上一个节点的指针。双向链表除了能实现从头到尾的访问，也能实现特定节点的访问

```js

function DoublyLinkedList(){
    let Node = function(element){
        this.element = element
        this.next = null
        this.prev = null
    }

    let length = 0
    let head = null
    let tail = null

    this.insert = function(position, element){
        if(position >=0 && position<= length){
            let node = new Node(element)
            let current = head
            let previous = null
            let index = 0

            if(position === 0 ){
                if(!head){
                    head = node
                    tail = node
                } else{
                    node.next = current
                    current.prev = node
                    head = node
                }
            }else if(position === length){
                current = tail
                current.next = node
                node.prev = current
                tail = node
            }else {
                while(index++ < position){
                    previous = current
                    current = current.next
                }

                node.next = current
                previous.next = node

                current.prev = node
                node.prev = previous
            }

            length ++
            return true
        }
        return false
    }

    this.removeAt = function(position) {

        if(position>=0 && position < length){
            let current = head
            let previous = null
            let index = 0

            // 移除第一项
            if(position === 0){
                head = current.next
                if(length === 1){
                    tail = null
                }
                else{
                    head.prev = null
                }
            }

            // 移除最后一项

            else if( position === length-1 ){
                current = tail
                tail = current.prev
                tail.next = null
            }

            else {

                while(index++ < position){
                    previous = current
                    current = current.next
                }

                previous.next = current.next
                current.next.prev = previous

            }

            length --

            return current.element
        }

        return null
    }

}

```

#### 集合

集合就是一系列无重复元素的集合，ES6中的`Set`与`weakSet`

##### 并集

```js
this.union = function(otherSet){
    if(Object.prototype.toString.call(otherSet)!=='[object Set]'){
        throw TypeError('参数类型错误')
    }
    const originSet = this

    let unionSet = new Set([...originSet,...otherSet])

    return unionSet
}
```

##### 交集

```js
this.intersection = function(otherSet){
    if(Object.prototype.toString.call(otherSet)!=='[object Set]'){
        throw TypeError('参数类型错误')
    }

    let intersectionSet = new Set()

    [...this.values()].forEach(value =>{
        if(otherSet.has(value)){
            intersectionSet.add(value)
        }
    })

    return intersectionSet
}
```

```js

// 求两个数组的并集，并不能重复

const a = [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
const b = [3,5,7,8,9,12,20,14]

const result = [...new Set(a.reduce(function(r,current){
    if(b.includes(current)){
        r.push(current)
    }
    return r
},[]))]
```

##### 差集

`A-B`意思是x(元素)存在于A中，且x不存在与B中

```js
this.difference = function(otherSet){
    if(Object.prototype.toString.call(otherSet)!=='[object Set]'){
        throw TypeError('参数类型错误')
    }
    let difference = new Set()

    for(let value of this){
        if(!otherSet.has(value)){
            difference.add(value)
        }
    }
    
    return difference
}
```

##### 子集

`A⊆B`也就是A中的每一个元素都在B中

```js
this.sunset = function(otherSet){
    if(Object.prototype.toString.call(otherSet)!=='[object Set]'){
        throw TypeError('参数类型错误')
    }

    if(this.size > otherSet.size){
        return fasle
    } else {
        for(let value of this){
            if(!otherSet.has(value)){
                return false
            }
        }
        return true
    }
}

```

#### 字典与散列表

直接使用ES6的`Map`与`weakMap`

###### 散列表

散列函数的作用是给定一个键值，然后返回值在表中的地址

解决冲突

- 分离链接

- 线性探查

#### 树

- 根节点 没有父节点
- 子树 子树由节点和它的后代构成
- 深度 节点的深度取决于它的祖先节点的数量
- 高度 树的高度取决于所有节点深度的最大值

##### 二叉树

`二叉树`的节点最多只能有2个子节点，一个是左侧子节点，一个是右侧子节点

##### 二叉搜索树(BST)

`二叉搜索树（BST）` 是二叉树的一种，但是它只允许你在左侧节点存储(比父节点)小的值， 在右侧节点存储(比父节点)大(或者等于)的值。

```js
function BinarySearchTree(){
    let Node = function(key){
        this.key = key
        this.left = null
        this.right = null
    }

    let root = null

    const noop = function(){}

    const insertNode = function(node,newNode){
        if(newNode.key < node.key){
            if(node.left === null){
                node.left = newNode
            } else {
                insertNode(node.left, newNode)
            }
        }else{
            if(node.right === null){
                node.right = newNode
            } else {
                insertNode(node.right, newNode)
            }
        }
    }

    const inOrderTraverseNode = function(node,callback){
        if(node!== null){
            inOrderTraverseNode(node.left, callback)
            callback(node.key)
            inOrderTraverseNode(node.right, callback)
        }
    }

    const preOrderTraverseNode = function(node,callback) {
        if(node!== null){
            callback(node.key)
            preOrderTraverseNode(node.left, callback)
            preOrderTraverseNode(node.right, callback)
        }
    }

    const postOrderTraverseNode = function(node,callback) {
        if(node!== null){
            postOrderTraverseNode(node.left, callback)
            postOrderTraverseNode(node.right, callback)
            callback(node.key)
        }
    }

    const minNode = function(node){
        // if(node){
        //     if(!node.left){
        //         return node.key
        //     }
        //     return minNode(node.left)
        // }
        // return null

        if(node){
            while( node && node.left !== null ){
                node = node.left;
            }
            return node.key
        }

        return null
    }

    const maxNode = function(node){
        if(node){
            while(node && node.right!==null){
                node = node.right;
            }
            return node.key
        }
        return null
    }

    const searchNode = function(node, key){
        if(node === null){
            return false
        }
        if(key < node.key){
            return searchNode(node.left, key)
        } else if (key > node.key) {
            return searchNode(node.right, key)
        } else {
            return true
        }
    }

    const findMinNode = (node, key) =>{
        while(node && node.left !== null){
            node = node.left
        }
        return node
    }

    const removeNode = function(node, key){
        if(node===null){
            return null
        }
        if(key < node.key){ // 小于
            node.left = removeNode(node.left, key)
        } else if(key > node.key){ // 大于
            node.right = removeNode(node.right, key)
        } else { // 找到指定节点了
            // 第一种情况，移除叶子节点
            if(node.left===null&&node.right===null){
                node = null
                return node
            }

            // 第二种情况，只有一个子节点
            if(node.left === null){
                node = node.right
                return node
            }
            if(node.right === null){
                node = node.left
                return node
            }

            // 第三种情况 有两个子节点的
            const aux = findMinNode(node.right) // 找到右侧节点的最小子节点
            node.key = aux.key // 将node节点替换成aux节点
            node.right = removeNode(node.right, aux.key) // 删除aux节点
            return node // 返回node
        }
    }



    // 向树中插入一个新的键
    this.insert = function(key){
        let node = new Node(key)
        if(root === null ){
            root = node
        }else {
            insertNode(root,node)
        }
    }

    // 判断数中是否有某个键
    this.search = function(key){
        return searchNode(root,key)
    }

    // 中序遍历
    this.inOrderTraverse = function(callback=noop){
        inOrderTraverseNode(root, callback)
    }

    // 先序遍历
    this.preOrderTraverse = function(callback=noop){
        preOrderTraverseNode(root, callback)
    }

    // 后续遍历
    this.postOrderTraverse = function(callback=noop){
        postOrderTraverseNode(root, callback)
    }

    // 返回树中最小的键
    this.min=function (){
        return minNode(root)
    }

    // 返回数中最大的键
    this.max=function (){
        return maxNode(root)
    }

    // 移除某个键
    this.remove=function(key){
        root = removeNode(root,key)
    }

}
```

##### 自平衡树(AVL)

`AVL`树是一种自平衡二叉搜索树，意思是任何 一个节点左右两侧子树的高度之差最多为1

##### 红黑树

#### 图



##### 图的表示

###### 邻接矩阵

![README-邻接矩阵-202059171350.png](http://file.qiniu.taoacat.com/README-邻接矩阵-202059171350.png)

###### 邻接表

![README-邻接表-202059171433.png](http://file.qiniu.taoacat.com/README-邻接表-202059171433.png)

###### 关联矩阵

采用邻接表来表示图

```js
function Graph(){
    let vertices = [] // 顶点
    let adjList = new Map() // 存储邻接表

    // 添加节点
    this.addVertices = function(v){
        vertices.push(v)
        adjList.set(v, [])
    }

    // 添加边
    this.addEdge = function(v, w){
        adjList.get(v).push(w)
        adjList.get(w).push(v)
    }
}
```

###### 图的遍历

算法|数据结构|描述
---|---|---
深度优先(DFS)|栈|通过将顶点存入栈中，顶点是沿着路径被搜索的，存在相邻节点就去访问
广度优先(BFS)|队列|通过将顶点存入队列汇总，最先入队列的顶点先被搜索

广度优先搜索

![README-广度优先搜索-202059173059.png](http://file.qiniu.taoacat.com/README-广度优先搜索-202059173059.png)

首先通过三个颜色来判断节点是否被访问过

- 白色: 表示顶点还没有被访问过
- 灰色: 被访问，但是未被探查
- 黑色: 顶点被访问且被完全探索过

```js
/**
 * 1. 创建一个队列Q。
 * 2. 将v标注为被发现的(灰色)，并将v入队列Q。 
 * 3. 如果Q非空，则运行以下步骤:
 *     a. 将u从Q中出队列;
 *     b. 将标注u为被发现的(灰色);
 *     c. 将u所有未被访问过的邻点(白色)入队列;
 *     d. 将u标注为已被探索的(黑色)。
**/

function initColor() {
    const color = new WeakMap()
    for(let i = 0; i <vertices.length; i++){
        color.set(vertices, 'white')
    }
    return color
}

// v为入口节点
function bfs (v, callback){
    let color = initColor()
    let queue = []
    queue.push(v)

    while(queue.length>0){
        let u = queue.shift()
        // 获得v节点的相邻点
        let neighbor = adjList.get(u)
        color.set(u, 'grey')
        for(let i = 0; i < neighbor.length;i++){
            let w = neighbor[i]
            if(color.get(w)==='white'){
                color.set(w, 'grey')
                queue.push(w)
            }
        }
        color.set(u, 'black')
        if(callback){
            callback(u)
        }
    }
}

```

深度优先搜索


![README-深度优先-202059214742.png](http://file.qiniu.taoacat.com/README-深度优先-202059214742.png)

```js
function dfs = function(callback){
    const color = initColor()

    for(let i = 0; i < vertices.length; i++){
        if(color.get(vertices[i]) === 'white'){
            dfsVisit(vertices[i],color,callback)
        }
    }

    function dfsVisit(u,color,callback){
        color.set(u,'grey')
        if(callback){
            callback(u)
        }

        const neighbors  = adjList.get(u)
        for(let i = 0; i<neighbors.length; i++){
            let w = neighbors[i]
            if(color.get(w)==='white'){
                dfsVisit(w,color,callback)
            }
        }
        color.set(u,'black')
    }
}
```



#### 排序和搜索算法

##### 冒泡排序

```js
function sort(array){
    const length = array.length
    for(let i = 0; i < length; i++){
        for(let j = 0; j < length-1; j++){
            if(array[j]>array[j+1]){
                [array[j],array[j+1]] = [array[j+1],array[j]]
            }
        }
    }
    return array
}

// 改进的冒泡排序
// 已经排过的就不在排了

function sort(array){
    const length = array.length
    for(let i = 0; i < length; i++){
        for(let j = 0; j < length-i-1; j++){
            if(array[j]>array[j+1]){
                [array[j],array[j+1]] = [array[j+1],array[j]]
            }
        }
    }
    return array
}
```

##### 选择排序

每次找出最小的数放在前面

```js
function sort(array){
    const length = array.length
    let indexMin = 0
    for(let i = 0; i < length-1; i++){
        indexMin = i
        for(let j = i; j < length; j++){
            if(array[indexMin]>array[j]){
                indexMin = j
            }
        }
        if(indexMin!==i){
            [array[i],array[indexMin]] = [array[indexMin],array[i]]
        }
    }
    return array
}
```

##### 插入排序

假设前面的项已经是排好了的，每次只需要取出一个值把它插入到正确的位置

```js
function sort(array){
    const length = array.length
    let j = 0
    let temp = 0 // 用于存储临时值

    for(let i = 1; i < length; i++){
        temp = array[i]
        j = i
        while(j > 0 && array[j-1] > temp){
            array[j] = array[j-1]
            j--
        }
        array[j] = temp
    }
    return array
}
```

##### 归并排序

```js

function merge(left, right) {
    let result = []
    let li = 0
    let ri = 0
    
    while(li < left.length && ri < right.length) {
        if(left[li] < right[ri]) {
            result.push(left[li++])
        }else {
            result.push(right[ri++])
        }
    }

    while(li < left.length ) {
        result.push(left[li++])
    }

    while(ri < right.length){
        result.push(right[ri++])
    }

    return result
}

function mergeSort(array){
    const length = array.length
    if(length===1){
        return array
    }
    const mind = Math.floor(length/2)
    const left = array.slice(0,mind)
    const right = array.slice(mind,length)
    return merge(mergeSort(left), mergeSort(right))
}

function sort(array){
    return mergeSort(array)
}

```

##### 快速排序

找出一个值，将比该值小的数放左边，比该值大的数放右边，以此划分

```js

function partition(array, left, right){
    // 取中间数为比较值
    let pivot = array[Math.floor((left + right)/2)]
    let i = left
    let j = right

    while(i <= j){
        while(array[i] < pivot){
            i++
        }
        while(array[j] > pivot){
            j--
        }
        if(i <= j){
            [array[i], array[j]] = [array[j], array[i]]
            i++
            j--
        }
    }
    return i
}

function quick(array, left, right){
    let index = 0
    if(array.length > 1){
        index = partition(array, left, right)
        if(left < index-1){
            quick(array, left, index-1)
        }
        if(index < right){
            quick(array, index, right)
        }
    }
}

function sort(array){
    quick(array, 0, array.length-1)
    return array
}
```

##### 堆排序

```js

// 构建堆
function heapify(array, heapSize, i){
    let left = i*2+1
    let right = i*2+2
    let largest = i

    if(left < heapSize && array[left] > array[largest]){
        largest = left
    }
    if(right < heapSize && array[right] > array[largest]){
        largest = right
    }

    if(largest !== i){
        [array[largest], array[i]] = [array[i], array[largest]]
        heapify(array, heapSize, largest)
    }
}

function buildHeap(array){
    const heapSize = array.length
    for(let i = Math.floor(array.length/2); i >= 0; i--){
        heapify(array, heapSize, i)
    }
}

function sort(array){
    let heapSize = array.length
    buildHeap(array) // 初始化堆，构建大堆
    while(heapSize > 1){
        heapSize --
        [array[0], array[heapSize]] = [array[heapSize], array[0]] // 取出堆的最大值，也就是第一个元素
        heapify(array, heapSize, 0) // 把剩下的元素重新构建堆
    }
    return array
}
```


#### 算法模式

##### 递归

##### 动态规划

硬币找零问题

假设有[1,5,10,20]面值的硬币，现在要凑`36`美分的金额。求使用最少的硬币数

```js

// 书中代码

function MinCoinChange(coins){
    let coins = coins
    let cache = {}

    this.makeChange = function (amount){
        let me = this
        if(!amount){
            return []
        }
        // 如果有缓存，就直接使用计算好的
        if(cache[amount]){
            return cache[amount]
        }

        let min = []
        let newMin = []
        let newAmount = amount

        for(let i = 0; i < coins.length; i++){
            let coin = coins[i]
            newAmount = amount - coin
            if(newAmount >= 0){
                newMin = me.makeChange(newAmount)
            }

            if(newAmount>=0 
            && (newMin.length < min.length - 1 || !min.length) 
            && (newMin.length || !newAmount) ){
                min = [coin].concat(newMin)
            }
        }

        return (cache[amount] = min)
    }
}

// function MinCoinChange2(coins, amount){
//     // 用于记录最小个数
//     const dp = new Array(amount+1).fill(Infinity)
//     // 用于记录最小个数的组合
//     const dp2 = new Array(amount+1).fill([])
//     dp[0]= 0
//     dp2[0] = []

//     for(let i = 1; i<=amount; i++){
//         for(let coin of coins){
//             if(i-coin>=0){
//                 dp[i] = Math.min(dp[i], dp[i-coin] + 1)
//                 if(dp[i] === dp[i-coin] + 1){
//                     dp2[i].push(coin)
//                 }
//             }
//         }
//     }
//     return dp[amount] === Infinity ? -1 : dp[amount]
// }



// 采用动态规划代码
/**
 * 假设有[1,2,3,5]四种硬币，求56的最小组合
 * 56 = Math.min(55+1,54+1,53+1,51+1)
 * 
 * 
 */ 
var coinChange = function(coins, amount) {
    const dp = new Array(amount+1).fill(Infinity)
    dp[0]=0
    for(let i = 1; i<=amount; i++){
        for(let coin of coins){
            if(i-coin>=0){
                dp[i] = Math.min(dp[i], dp[i-coin] + 1)
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount]
};

```

背包问题



