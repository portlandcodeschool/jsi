var testArray = [1,2,3,4,5];
var otherArray = ["cat", "dog", "fish", "person"];

// function myPush(array, value) {
//   array[array.length] = value;
//   return array.length;
// }
// 
// console.log(myPush(testArray, "cat"));
// console.log(testArray);

// function muyPush(first, second) {
//   for (var i = 0; i < second.length; i++) {
//     first[first.length] = second[i];
//   }
//   return first.length;
// }
// 
// console.log(muyPush(testArray, otherArray));
// console.log(testArray);

// function myConcat(first, second) {
//   var outputArray = [];
//   for (var i = 0; i < first.length; i++) {
//     outputArray[outputArray.length] = first[i];
//   }
//   for (var j = 0; j < second.length; j++) {
//     outputArray[outputArray.length] = second[j];
//   }
//   return outputArray;
// }
// 
// console.log(myConcat(testArray, otherArray));

// function assert(claim, warning) {
//   if (!claim) {
//     console.log(warning);
//   }
// }
// 
// assert((2+2==4), "either math doesn't work or your code is broken");

// var addresses = ["Tom McCluskey; 735 SW 20th Place; Portland, OR 97205", "WE 02358", "Tyler Durden; 420 Paper St.; Wilmington, DE 19886", "Dana Scully; 3170 W. 53rd Rd. # 35; Annapolis, MD 21402", "Lisa Simpson; 742 Evergreen Terrace; Springfield, USA 02358", "Ada Lovelace; 12 St. James's Square; London, England SW1Y4JH"];
// var arr = ["Sherlock Holmes; 221-B Baker St.; London, England NW16XE", "Bilbo Baggins; Bag End, Bagshot Row; Hobbiton, The Shire 10392", "Santa Claus; North Pole H0H0H0", "Sue Richards; Baxter Building; 42nd St & Madison Ave.; Manhattan, NY 10101-7435" ];
// 
// function parse(array) {
//   var newArray = [];
//   for(var i = 0; i < array.length; i++) {
//     var sections = array[i].split('; ');
//     var name = sections[0].split(' ');
//     name = name.reverse().join(', ');
//     name += ':';
//     var zip = sections.slice(-1)[0].split(' ').slice(-1);
//     newArray.push(name + ' ' + zip);
//   }
//   return newArray;
// }

// console.log(parse(arr));
// console.log(parse(addresses));

// reverse: not for strings!
// splice
// slice
// indexOf
// join
// split
// 
// chaining functions

var html = "https://www.portlandcodeschool.com?=javascript,full_stack,immersion";

function query(string) {
  var start = string.indexOf('=');
  var queryString = string.slice(start+1);
  var queries = queryString.split(',');
  return queries;
}

console.log(query(html));
