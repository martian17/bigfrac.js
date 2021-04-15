# BigFrac.js
This is a wrapper for BigInt in JavaScript that I created to calculate π to an arbitrary precision.

## Uses and examples
```JavaScript
var a = new Frac(1n,2n);
//creates a new instance representing 1/2

var b = new Frac(10n,6n);
//represents 10/6
var c = b.simplify();
//now c represents 5/3
//because frac numbers are immutable, b is still 10/6

var d = a.add(c);
//now d represents 13/6

var e = new Frac(19241n,2334652n);
var f = e.roundToNthDegree(2);
//now f represents 19/2334
var g = new Frac(2334652n,19241n);
var h = g.roundToNthDegree(2);
//now h represents 2334/19
//round function despite the name, just throws away digits up to certain point
//this is to conserve computation

var i = h.getDecimal(20);//gets decimal conversion of h to 20th place
console.log(i);
//"122.84210526315789473684"
```

## List of methods

All methods are immutable. This is to mimic the behavior of native number and string

### Main methods
| Method name | Argument     | Return value | Notes                                   |
|:------------|:-------------|:-------------|:----------------------------------------|
| add         | Frac         | Frac         |                                         |
| subtract    | Frac         | Frac         |                                         |
| multiply    | Frac         | Frac         |                                         |
| divide      | Frac         | Frac         |                                         |
| invert      | Frac         | Frac         | Swaps the denominator and the numerator |
| getDecimal  | Frac         | String       |                                         |

### Independent methods
acts as independent functions unrelated to the contents of the Frac instance
| Method name | Argument     | Return value |
|:------------|:-------------|:------------:|
| abs         | BigInt       | BigInt       |
| gcd         | BigInt       | BigInt       |
| tenToTheN   | BigInt       | BigInt       |
| factorial   | BigInt       | BigInt       |

