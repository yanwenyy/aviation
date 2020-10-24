//标题显示几个字
export function getTitle (val,num) {
  console.log(val)
  return val.length>num?val.slice(0,num):val;
}

Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
