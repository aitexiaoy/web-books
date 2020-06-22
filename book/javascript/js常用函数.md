### 实现一个事件绑定类
采用发布-订阅者模式
```js
//伪代码，部分判断自行写
var events={};
this.$on(event,fn){
    if(!events[event]){
        events[event]=[];
    }
    events[event].push(fn);
}
this.$off(event,fn){
    if(fn){
        if(events[event]){
            let index=events[event].indexOf(fn)
            if(index!=-1){
                events[event].splice(index,1);
                if(events[event].length==0){
                    delete events[event];
                }
            }
        } 
    }
    else{
        if(events[event]){
            delete events[event];
        }
    }
}

this.$emit(event,data){
    if(events[event]&&events[event].length>0){
        events[event].forEach(fn=>{
            fn(data);
        })
    }
}

this.$once(){
    
}

```

### 数组去重
```js
// 方法一
function uniq(array){
    var temp = []; //一个新的临时数组
    for(var i = 0; i < array.length; i++){
        if(temp.indexOf(array[i]) == -1){
            temp.push(array[i]);
        }
    }
    return temp;
}

var aa = [1,2,2,4,9,6,7,5,2,3,5,6,5];
console.log(uniq(aa));

//方法二 空间换时间
function uniq(array){
    var temp = {},len = array.length, val, type;
    for (var i = 0; i < len; i++) {
        temp[array[i]]='';
    }
    return Object.keys(temp);
}

var aa = [1,2,"2",4,9,"a","a",2,3,5,6,5];
console.log(uniq(aa));

//方法三 排序后相邻去除法
function uniq(array){
    array.sort();
    var temp=[array[0]];
    for(var i = 1; i < array.length; i++){
        if( array[i] !== temp[temp.length-1]){
            temp.push(array[i]);
        }
    }
    return temp;
}

var aa = [1,2,"2",4,9,"a","a",2,3,5,6,5];
console.log(uniq(aa));

//方法四 数组下标法
function uniq(array){
    var temp = [];
    for(var i = 0; i < array.length; i++) {
        //如果当前数组的第i项在当前数组中第一次出现的位置是i，才存入数组；否则代表是重复的
        if(array.indexOf(array[i]) == i){
            temp.push(array[i])
        }
    }
    return temp;
}

var aa = [1,2,"2",4,9,"a","a",2,3,5,6,5];
console.log(uniq(aa));

//方法五 set
var array=Array.from(new Set(aa));

```

### 实现Promise函数


### 节流函数

### 去抖函数

### 节流去抖函数