// 方法一
var compressString = function(S) {
    if(S.length<=2){
        return S
    }
    let result=''
    let j = 0
    let c = S[0]
    let i=0
    for(let i =0 ;i<=S.length;i++){
        if(c!==S[i]){
            result+=`${c}${j}`
            j=1
            c=S[i]
        }else{
            j++
        }
    }
    
    return result.length > S.length ? S : result
};

// 方法二
var compressString = function(S) {
    if(S.length<=2){
        return S
    }
    const result =  S.replace(/([A-z])\1*/g,function(a,b){
        return `${b}${a.length}`
    })
    return result.length > S.length ? S : result
};

