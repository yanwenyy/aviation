//标题显示几个字
export function getTitle (val,num) {
  console.log(val)
  return val.length>num?val.slice(0,num):val;
}
