/*
Mathy Project (2022)
This project is protected by the MIT License
Edouard Aubert
*/

function assert(condition,errorMessage="One test did not pass") {
    if (!condition)
        throw errorMessage
}

function parse(input) {
    subFirst=[];
    lev=-1;
    for (var i=0;i<input.length;i++) {
        if (input[i]=="(") {
            subFirst.push(i);
            lev+=1;
        } else if (input[i]==")") {
            if (lev==-1) {
                return "Invalid expression";
            } else {
                //parse(input.slice(subFirst,i-subFirst[lev]))
                console.log(input.slice(subFirst,i-subFirst[lev]));
                lev-=1;
            }
        }
    }
}