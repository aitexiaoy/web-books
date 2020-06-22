/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个有序数组的中位数
 *
 * https://leetcode-cn.com/problems/median-of-two-sorted-arrays/description/
 *
 * algorithms
 * Hard (35.27%)
 * Likes:    1170
 * Dislikes: 0
 * Total Accepted:    62.2K
 * Total Submissions: 176.4K
 * Testcase Example:  '[1,3]\n[2]'
 *
 * 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。
 * 
 * 请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
 * 
 * 你可以假设 nums1 和 nums2 不会同时为空。
 * 
 * 示例 1:
 * 
 * nums1 = [1, 3]
 * nums2 = [2]
 * 
 * 则中位数是 2.0
 * 
 * 
 * 示例 2:
 * 
 * nums1 = [1, 2]
 * nums2 = [3, 4]
 * 
 * 则中位数是 (2 + 3)/2 = 2.5
 * 
 * 
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
// var findMedianSortedArrays = function (nums1, nums2) {
//     function getMefian(num) {
//         let n = num.length
//         if (n % 2 === 0) {
//             return ((num[n / 2 - 1] + num[n / 2]) / 2)
//         }
//         else {
//             return (num[((n - 1) / 2)])
//         }
//     }

//     function sort(num1, num2) {
//         return num1.concat(num2).sort((a, b) => a - b)
//     }

//     return getMefian(sort(nums1, nums2))
// };

var findMedianSortedArrays = function (nums1, nums2) {
    let n = nums1.length
    let m = nums2.length
    let A = nums1
    let B = nums2
    if (n < m) {
        A = nums1
        B = nums2
    }
    let iMin = 0, iMax = m, halfLen = parseInt((m + n + 1) / 2);

    while (iMin <= iMax) {
        let i = (iMin + iMax) / 2
        let j = halfLen - i
        if (i < iMax && B[j - 1] > A[i]) {
            iMin = i + 1; // i is too small
        }
        else if (i > iMin && A[i - 1] > B[j]) {
            iMax = i - 1; // i is too big
        }
        else {
            let maxLeft = 0;
            if (i == 0) { maxLeft = B[j - 1]; }
            else if (j == 0) { maxLeft = A[i - 1]; }
            else { maxLeft = Math.max(A[i - 1], B[j - 1]); }
            if ((m + n) % 2 == 1) { return maxLeft; }

            let minRight = 0;
            if (i == m) { minRight = B[j]; }
            else if (j == n) { minRight = A[i]; }
            else { minRight = Math.min(B[j], A[i]); }

            return (maxLeft + minRight) / 2.0;
        }
    }
    return 0.0;



};

