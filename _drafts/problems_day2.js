// var limit = 5;
// for (var i = 0; i <= limit; i++) {
//   var line = "";
//   for (var j = 0; j <= limit; j++) {
//     line += j;
//   }
//   console.log(line);
// }
// 
// for (var x = 0; x <= limit; x++) {
//   var line = "";
//   for (var y = x; y >= 0; y--) {
//     line += y;
//   }
//   console.log(line);
// }

// var x = 29;
// var result = true;
// for (var i = 2; i < Math.sqrt(x); i++) {
//  if (x%i === 0) {
//   result = false;
//  }
// } 
// console.log(result)

// var n = 29;
// var isPrime = true;
// if (n<2) {
// 	isPrime = false;
// } else {
//     // search for number which divides n evenly...
//     var sqrt=Math.sqrt(n); // only need to search up to n's square root
//     for (var test=2; test<=sqrt && isPrime; test++) {
//         if (n%test===0) {
//            isPrime = false;  //found one; n isn't prime
//         }
//     }
//  }
// console.log(isPrime);

// var num = 1972;
// var rom = "";
// while (num >= 1000) {
// 	rom += "M";
// 	num -= 1000;
// }
// if (num >= 900) {
// 	rom += "CM";
// 	num -= 900;
// }
// if (num >= 500) {
// 	rom += "D";
// 	num -= 500;
// }
// if (num >= 400) {
//   rom += "CD";
//   num -= 400;
// }
// while (num >= 100) {
// 	rom += "C";
// 	num -= 100;
// }
// if (num >= 90) {
// 	rom += "XC";
// 	num -= 90;
// }
// if (num >= 50) {
// 	rom += "L";
// 	num -= 50;
// }
// if (num >= 40) {
// 	rom += "XL";
// 	num -= 40;
// }
// while (num >= 10) {
// 	rom += "X";
// 	num -= 10;
// }
// if (num >= 9) {
// 	rom += "IX";
// 	num -= 9;
// }
// if (num >= 5) {
// 	rom += "V";
// 	num -= 5;
// }
// if (num >= 4) {
// 	rom += "IV";
// 	num -= 4;
// }
// while (num>0) {
// 	rom += "I";
// 	num -= 1;
// }
// console.log(rom);

// var start = 4;
// var daysInMonth = 31;
// var calendar = "+-----+-----+-----+-----+-----+-----+-----+\n";
// for (var weeks = 1; weeks <= Math.ceil((start + daysInMonth)/7); weeks++) {
//   calendar += "|     |     |     |     |     |     |     |\n|     |     |     |     |     |     |     |\n";
// }
// console.log(calendar);

var numDays = 31;
var startsOn = 3;//Wednesday

var calendar = "";
// generate leading blanks
for (var day=0; day<startsOn; ++day) {
	calendar += '   ';
}
for (var day=1; day<=numDays; ++day) {
	if (day<10)
		calendar += ' ';
	calendar += day + ' ';
	if ((startsOn+day)%7 === 0)
		calendar += '\n';
}

console.log(calendar);

// var n = r * 8 + c;
// var r = Math.floor(n/8);
// var c = n%8;
// var color = (r%2 === c%2 ? 'black' : 'white');
// var board = "";
// for (var n = 0; n < 64; n++) {
//   var r = Math.floor(n/8);
//   var c = n%8;
//   board += (r%2 === c%2 ? '#' : ' ');
//   if (n%8 === 7) {
//     board += "\n";
//   }
// }
// console.log(board);
