function zeroOnePackOpt(V, C, W) { 
    // 防止无效输入
    if ((V <= 0) || (C.length != W.length)) {
        return 0;
    }

    let n = C.length;

    let dp = new Array(n+1).fill(new Array(V+1).fill(0));

    for (let i = 1; i <= n; ++i) {
        for (let j = 1; j <= V; j++) {

            dp[i][j] = dp[i-1][j]
            
            let k = dp[i-1][j-C[i-1]] + W[i-1]
            
            if(j > C[i-1] && dp[i][j] < k){
                dp[i][j] = k
            }
        }
    }

    console.log(dp)

    return dp[n][V];
}

zeroOnePackOpt(10,[2,3,5,7],[2,5,2,5])