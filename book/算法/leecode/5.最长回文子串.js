/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 *
 * https://leetcode-cn.com/problems/longest-palindromic-substring/description/
 *
 * algorithms
 * Medium (25.51%)
 * Likes:    960
 * Dislikes: 0
 * Total Accepted:    68.3K
 * Total Submissions: 267.6K
 * Testcase Example:  '"babad"'
 *
 * 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
 * 
 * 示例 1：
 * 
 * 输入: "babad"
 * 输出: "bab"
 * 注意: "aba" 也是一个有效答案。
 * 
 * 
 * 示例 2：
 * 
 * 输入: "cbbd"
 * 输出: "bb"
 * 
 * 
 */
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {

    if (!s || s.length < 2) {
        return s
    }

    let maxStr = ''
    const length = s.length
    getPalindrome = (left, right) => {
        while (left >= 0 && right < length && s[left] === s[right]) {
            left--
            right++
        }
        return s.substring(left + 1, right)
    }

    for (let i = 0; i < length; i++) {
        let s1 = getPalindrome(i, i)
        let s2 = getPalindrome(i, i + 1)
        let maxLength = Math.max(s1.length, s2.length)
        if (maxStr.length < maxLength) {
            maxStr = s1.length === maxLength ? s1 : s2
        }
    }

    return maxStr
};

