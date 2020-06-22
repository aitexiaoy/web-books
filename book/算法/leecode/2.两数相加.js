/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 *
 * https://leetcode-cn.com/problems/add-two-numbers/description/
 *
 * algorithms
 * Medium (34.52%)
 * Likes:    2561
 * Dislikes: 0
 * Total Accepted:    145K
 * Total Submissions: 420K
 * Testcase Example:  '[2,4,3]\n[5,6,4]'
 *
 * 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
 * 
 * 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
 * 
 * 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 * 
 * 示例：
 * 
 * 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
 * 输出：7 -> 0 -> 8
 * 原因：342 + 465 = 807
 * 
 * 
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    function getValue(k1, k2, obj, carry) {
        let total = (k1 && k1.val ? k1.val : 0) + (k2 && k2.val ? k2.val : 0) + (carry ? 1 : 0)
        // 判断是否进位
        carry = total >= 10 ? true : false
        obj.val = total % 10
        if ((!k1 || !k1.next) && (!k2 || !k2.next) && carry === false) {
            obj.next = null
            return
        }
        else if ((k1 && k1.next) || (k2 && k2.next) || carry) {
            obj.next = {}
            return getValue(k1 ? k1.next : null, k2 ? k2.next : null, obj.next, carry)
        }
    }
    let obj = {}
    getValue(l1, l2, obj)
    return obj

};

