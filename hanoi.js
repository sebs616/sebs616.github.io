var A = [], B = [], C=[]; //torres
var h = 3; // altura de la torre

(function(){
	let x=h;
	while (A.length < h){
		A.push(x);
		x--;
	}
	console.log(A, B, C);
})()

console.log(ordered(A));







function stack(arr, x){
	if(x >= arr[arr.length-1]){
		return false;
	}
	arr.push(x);
	return true;
}


function ordered(arr){
	let val1=h+1, val2;
	for(let x of arr){
		val2=x;
		if(val2 > val1){
			return false;
		}
	}
	return true;
}