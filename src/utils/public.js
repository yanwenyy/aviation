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


export function getFileImg (val) {
  if(val.indexOf('ppt')!=-1){
    return 'icon_ppt.png'
  }else if(val.indexOf('xls')!=-1){
    return 'icon_excel.png'
  }else if(val.indexOf('pdf')!=-1){
    return 'icon_PDF.png'
  }else if(val.indexOf('doc')!=-1||val.indexOf('txt')!=-1){
    return 'icon_doc.png'
  }
}
