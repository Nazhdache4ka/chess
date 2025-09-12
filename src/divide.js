var divide = function(dividend, divisor) {
    if (divisor === 1) {
        if (dividend > (2 ** 31) - 1) {
            return (2 ** 31) - 1;
        } else if (dividend < -(2 ** 31)) {
            return -(2 ** 31);
        }
        return dividend;
    }

    if (divisor === -1) {
        if (-dividend > (2 ** 31) - 1) {
            return (2 ** 31) - 1;
        } else if (-dividend < -(2 ** 31)) {
            return -(2 ** 31);
        }
        return -dividend;
    }

    const absDividend = Math.abs(dividend);
    
    const absDivisor = Math.abs(divisor);
    

    let result = '';
    let strDividend = absDividend.toString();
    let div = ''; // строка, в которую кладется наибоольший разряд делимого
    let digitPlaceCount = 0; // счетчик, сколько раз делитель помещается в разряд делимого
    let num; // число, в которое преобразуется разряд делимого

    for (let i = 0; i < strDividend.length; i++) {
        div = div + strDividend[i];
        
        console.log('remain: ' + num + ' itr: ' + i)
        console.log('div: ' + div + ' itr: ' + i)

        if (Number(div) - absDivisor < 0 && i === 0) {
            console.log("aboba1")
            continue;
        }
        
        if (Number(div) - absDivisor < 0 && Number(div)) {
            result = result + '0';
            continue;
        }
 
        num = Number(div);

        while (num > 0) {
            if (num -  absDivisor < 0) {
                break;
            }
            num = num - absDivisor;
            digitPlaceCount++;
        }
        
        if (digitPlaceCount) {
            result = result + digitPlaceCount.toString();   
        }
        
        console.log("result: " + result + " itr: " + i)

        div = num.toString();
        digitPlaceCount = 0;
        
        if (num === 0) {
            div = '';
            let accessedEnd = false;
            for (let j = i + 1; j < strDividend.length; j++) {
                if (strDividend[j] !== '0') {
                    break;
                }
                if (j === strDividend.length - 1) {
                    accessedEnd = true;
                }
                console.log("plus 0")
                result = result + '0'
            }
            if (accessedEnd) {
                accessedEnd = false;
                break;
            }
        }
        
        // if (Number(num.toString() + strDividend[i + 1]) - absDivisor < 0 && (num !== 0)) {
        //     result = result + '0'
        // }
        
        console.log("result: " + result)
    }

    if (divisor < 0 || dividend < 0) {
        result = -Number(result);
    }
    if (divisor < 0 && dividend < 0) {
        result = -Number(result);
    }

    if (result > ((2 ** 31) - 1)) {
        return (2 ** 31) - 1;
    }
    if (result < -(2 ** 31)) {
        return -(2 ** 31);
    }

    return Number(result);
};

var sumZero = function(n) {
    let result = [];
    let num = n;
    for (let i = 0; i < n; i += 2) {
        if (i === (n-1)) {
            result.push(0);
            break;
        }
        result.push(num);
        result.push(-num);
        num--;
    }

    return result;
};

var findMedianSortedArrays = function(nums1, nums2) {
    const arr = [...nums1, ...nums2].sort((a, b) => a-b);
    
    if (arr.length % 2 === 0) {
        return (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2
    }

    return arr[Math.floor(arr.length / 2)];
};

console.log(1);
console.log(useEffect(() => {
    console.log(2);
}, []));
console.log(setTimeout(() => {
    console.log(3);
}, 0));
console.log(Promise.resolve().then(() => {
    console.log(4);
}));
console.log(5);


async function test() {
    console.log(1);
    await Promise.resolve();
    console.log(2);
}

test();
console.log(3);