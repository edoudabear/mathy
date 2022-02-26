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

function assert(condition,errorMessage="One test did not pass") {
    if (!condition)
        throw errorMessage
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