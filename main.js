var abs = function(a){
    if(a < 0n){
        a = -a;
    }
    return a;
};


var gcd = function(a,b){
    if(a === 0n || b === 0n){
        return 1n;//to prevent bug
    }
    a = abs(a);
    b = abs(b);
    while(true){
        if(a < b){//a must be bigger than a
            var temp = a;
            a = b;
            b = temp
        }
        var c = a%b;
        if(c === 0n){
            return b;
        }
        a = c;
    }
};


var Frac = function(a,b){
    //a,b are big numbers
    this.a = a;
    this.b = b;
    
    
    var tenToTheN = function(n){
        var str = "";
        for(var i = 0; i < n; i++){
            str += 0;
        }
        return BigInt("1"+str);
    };
    
    this.simplify = function(){
        if(a === 0n){
            this.b = 1n;
        }else{
            var com = gcd(this.a,this.b);
            this.a /= com;
            this.b /= com;
        }
        return this;
    };
    
    this.add = function(frac){
        //var com = gcd(this.b,frac.b);
        //console.log("adding,",this,frac);
        //var lcoef = this.b/com;
        //var rcoef = frac.b/com;
        //var a = this.a*rcoef+frac.a*lcoef;
        //var b = rcoef*this.b;
        var a = this.a*frac.b+this.b*frac.a;
        var b = this.b*frac.b;
        return (new Frac(a,b)).simplify();;
    };
    
    this.subtract = function(frac){
        frac = new Frac(-frac.a,frac.b);
        return this.add(frac);
    };
    
    this.multiply = function(frac){
        var a = frac.a*this.a;
        var b = frac.b*this.b;
        return (new Frac(a,b)).simplify();
    };
    
    this.divide = function(frac){
        frac = frac.invert();
        return this.multiply(frac);
    };
    
    this.invert = function(){
        return new Frac(this.a,this.b);
    };
    this.getDecimal = function(n){//get nth decimal
        return (this.a*tenToTheN(n)/this.b).toString();
    };
};

console.log(gcd(3n,14n));


var calculatePiLeibniz = function(){//very inefficient
    var sum = new Frac(0n,1n);
    var sign = 1;
    for(var i = 0; i < 500; i++){
        console.log(i);
        var nth = new Frac(1n,BigInt(sign*(i*2+1)));
        sign = -sign;
        console.log(nth);
        sum = sum.add(nth);
        console.log(sum);
        //sum = sum.add(new Frac(1n,BigInt(sign*(i*2+1))));
        //sum.simplify();
    }
    sum = sum.multiply(new Frac(4n,1n))
    
    console.log(sum.a);
    console.log(sum.b);
    console.log(sum.getDecimal(100));
};

calculatePi();