/*
Mathy Project (2022)
This project is protected by the MIT License
Edouard Aubert
*/

String.prototype.replaceAt=function(index, char) {
    var a = this.split("");
    a[index] = char;
    return a.join("");
}

String.prototype.isNumber= function(i=0) {
    return (this[i]=='0' || this[i]=='1' || this[i]=='2' || 
    this[i]=='3' || this[i]=='4' || this[i]=='5' || this[i]=='6' || 
    this[i]=='7' || this[i]=='8' || this[i]=='9' );
}

function assert(condition,errorMessage="One test did not pass") {
    if (!condition)
        throw errorMessage
}

assert("5".isNumber(),"isNumber is not working (1)");
assert(!"5a".isNumber(1),"isNumber is not working (2)");

/*
EXEMPLES DE REQUÊTES :
NIVEAU 1
3
3x+7
2x^2+2x-1
e^x
lnx
NIVEAU 2
2^xe^3x+7x-2
2^xe^3x+7(x-2)
2^{3x}e^{3}x+7x
2^3x+7x-3^{x+7}ln(2x)e^{2x}-3x
NIVEAU 3
e^{3x+7}7ln(x)e^8+2
NIVEAU 4
\frac{2x+3}{e^{2x}}+7
(2x+7x)\times\frac{3}{e^{2x}}+7
(2x+7x)\times\frac{3}{e^{2x}*ln{2x}}+7
*/
/*
STRUCTURE OBJET :
décomposition en sous fonctions aux caractéristiques suivantes :
• uniquement des produits (éventuellement fractions)
• décomposition produit en :
    • constante
    • exponentielle (valeur exposant)
    • logarithme népérien (avec paramètres sous forme de tableau, car lna*lnb=lna^lnb [peu commode])
*/

/*
TESTS POUR LA FONCTION developper(input [str])
2(x+3) -> 2x + 6
e^x(2+3x) -> 2e^x + 3xe^x
(3x+2)(7x-8) -> 21x^2 - 10x - 16
e^x(2+3x)(3x+2)(7x-8)lnx -> lnxe^x(42x^2-20x-32+48x-30x^2+63x^3)
*/

function developper(input) {

    return output;
}

function arrayzeExpression(input) { // Must be recursive
    // Step 1 : map factorization in an array
    var parseMin=0;
    var output=JSON.parse(JSON.stringify([[],[]])); // output[0]==content output[1]==contentType
    for (var i=0;i<input.length;i++) {
        if (input[i]!='(' && input.isNumber(i)) { //Number case
            if (input.isNumber(i)) {
                parseMin=i;
                i++;
                while (input.isNumber(i)) {
                    i++;
                }
                output[0].push(parseInt(input.slice(parseMin,i)));
                output[1].push("number");
                i--;
            }
        } else if (input[i]=='(') {
            parseMin=i+1; // We ignore the opening bracket that way
            var lev=1;
            if (input[i]==')') {
                throw "Invalid expression '()'"
            }
            while (lev>0) {
                i++;
                if (input[i]==')') {
                    lev--;
                }
                if (input[i]=='(') {
                    lev++;
                }
                if (i==input.length-1 && lev>0) {
                    throw "Bracket error";
                }
            }
            console.log("valid circonscription ?");
            output[1].push("multiObjectExpression");
            output[0].push(arrayzeExpression(input.slice(parseMin,i))); // We remove the closing bracket
        } else if (input.slice(i,i+2)=="e^") {
            i+=2;
            if (input[i]=='{') {
                i++;
                parseMin=i; // We ignore the opening bracket that way
                var lev=1;
                if (input[i]=='}') {
                    throw "Invalid expression '{}'"
                }
                while (lev>0) {
                    i++;
                    if (input[i]=='}') {
                        lev--;
                    }
                    if (input[i]=='{') {
                        lev++;
                    }
                    if (i==input.length-1 && lev>0) {
                        throw "Snippet error";
                    }
                }
                output[0].push([arrayzeExpression(input.slice(parseMin,i))]);
            } else if (input.isNumber(i) || input[i]=='x' || input[i]=='e') {
                if (input.isNumber(i)) {
                    output[0].push([parseInt(input[i]),"number"]); // constant case (except e)
                } else if (input[i]=='e') {
                    output[0].push([Math.E,"number"]); // e constant case;
                } else {
                    output[0].push([input[i],"number"]); // x case;
                }
            } else {
                throw "Invalid expression for e^x";
            }
            output[1].push("exp");
        } else if (input[i]=='e') {
            output[0].push(Math.E);
            output[1].push("number");
        } else if (input.slice(i,i+2)=="ln") {
            i+=2;
            if (input[i]=='(') {
                i++;
                parseMin=i; // We ignore the opening bracket that way
                var lev=1;
                if (input[i]==')') {
                    throw "Invalid expression '()'"
                }
                while (lev>0) {
                    i++;
                    if (input[i]==')') {
                        lev--;
                    }
                    if (input[i]=='(') {
                        lev++;
                    }
                    if (i==input.length-1 && lev>0) {
                        throw "Bracket error";
                    }
                }
                output[0].push(arrayzeExpression(input.slice(parseMin,i)));
            } else if (input.isNumber(i) || input[i]=='x' || input[i]=='e') {
                if (input.isNumber(i)) {
                    output[0].push([parseInt(input[i]),"number"]); // constant case (except e)
                } else if (input[i]=='e') {
                    output[0].push([Math.E,"number"]); // e constant case;
                } else {
                    output[0].push([input[i],"number"]); // x case;
                }
            } else {
                throw "Invalid expression for ln function"
            }
            output[1].push("ln");
        } else if (input[i]=='x') {
            if (input[i+1]=='^') {
                i+=2;
                if (input[i]=='{') {
                    i++;
                    parseMin=i; // We ignore the opening bracket that way
                    var lev=1;
                    if (input[i]=='}') {
                        throw "Invalid expression '{}'"
                    }
                    while (lev>0) {
                        i++;
                        if (input[i]=='}') {
                            lev--;
                        }
                        if (input[i]=='{') {
                            lev++;
                        }
                        if (i==input.length-1 && lev>0) {
                            throw "Snippet error";
                        }
                    }
                    output[0].push([arrayzeExpression(input.slice(parseMin,i))]);
                } else if (input.isNumber(i) || input[i]=='x' || input[i]=='e') {
                    if (input.isNumber(i)) {
                        output[0].push([parseInt(input[i]),"number"]); // constant case (except e)
                    } else if (input[i]=='e') {
                        output[0].push([Math.E,"number"]); // e constant case;
                    } else {
                        output[0].push([input[i],"number"]); // x case;
                    }
                } else {
                    throw "Invalid power expression";
                }
            } else {
                output[0].push(1); // case x(=x^1)
            }
            output[1].push("x");
        }
    }
    return output;
}

function multiplier(array, indexA, indexB) {

}

function parse(input) {
    subFirst=[];
    inputState="";
    lev=-1;
    for (var i=0;i<input.length;i++) {
        inputState+="0";
    }
    for (var i=0;i<input.length;i++) {
        if (input[i]=="(") {
            subFirst.push(i);
            lev+=1;
        } else if (input[i]==")") {
            if (lev==-1) {
                return "Invalid expression";
            } else {
                //parse(input.slice(subFirst,i-subFirst[lev]))
                console.log(input.slice(subFirst[lev]+1,i));
                for (var j=subFirst[lev];j<i+1;j++) {
                    inputState=inputState.replaceAt(j,'1');
                }
                console.log(input);
                console.log(inputState);
                lev-=1;
            }
        }
    }
}

function derivee(input) {
    if (true) {

    }
}