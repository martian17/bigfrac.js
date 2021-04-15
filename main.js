var Frac = function(a,b){
    //a,b are big numbers
    this.a = a;
    this.b = b;
    
    
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


    var tenToTheN = function(n){
        var str = "";
        for(var i = 0; i < n; i++){
            str += 0;
        }
        return BigInt("1"+str);
    };

    var factorial = function(a){//gets a normal int and returns a bigint
        var fact = BigInt(1);
        while(a > 0){
            fact *= BigInt(a);
            a--;
        }
        return fact;
    };
    
    this.abs = abs;
    this.gcd = gcd;
    this.tenToTheN = tenToTheN;
    this.factorial = factorial;
    
    
    this.roundToNthDegree = function(n){
        var at = this.a.toString();
        var bt = this.b.toString();
        var tlen = at.length < bt.length ? at.length : bt.length;//the smaller one
        var dlen = tlen-n;//number of digits to be rounded
        if(dlen <= 0){
            return new Frac(this.a,this.b);//yup because it's immutable
        }
        return new Frac(BigInt(at.slice(0,-dlen)),BigInt(bt.slice(0,-dlen)));
    };
    
    this.simplify = function(){
        var a = this.a;
        var b = this.b;
        if(a === 0n){
            b = 1n;
        }else{
            var com = gcd(a,b);
            a /= com;
            b /= com;
        }
        return new Frac(a,b);
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
        return (new Frac(a,b));
    };
    
    this.subtract = function(frac){
        frac = new Frac(-frac.a,frac.b);
        return this.add(frac);
    };
    
    this.multiply = function(frac){
        var a = frac.a*this.a;
        var b = frac.b*this.b;
        return (new Frac(a,b));
    };
    
    this.divide = function(frac){
        frac = frac.invert();
        return this.multiply(frac);
    };
    
    this.invert = function(){
        return new Frac(this.a,this.b);
    };
    this.getDecimal = function(n){//get nth decimal
        var str = (this.a*tenToTheN(n)/this.b).toString();
        var int = str.slice(0,-n);
        var digits = str.slice(-n);
        return int+"."+digits;
    };
    this.multiplyBigint = function(n){
        return new Frac(this.a*n,this.b);
    };
    this.divideBigint = function(n){
        return new Frac(this.a,this.b*n);
    };
};



