let fibonacci = []
fibonacci[1] = 1
fibonacci[2] = 2
    // 把斐波那契数列中的前两个数字分别赋给了数组的第二和第三位
    // （在Javascript中，数组的第一位是0，这里我们略过，从第二位开始分别保存斐波那契数列中对应位置上的元素）

for (let i = 3; i < 20; i++) {
    fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2]
}

for (let i = 1; i < fibonacci.length; i++) {
    console.log(fibonacci[i])
}