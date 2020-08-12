var baseUrl = '';
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV == 'development') {
  baseUrl = "http://61.incfotech.com/test";
}else if(process.env.NODE_ENV == 'testing'){
  baseUrl = "http://61.incfotech.com/test";
}else if(process.env.NODE_ENV == 'production'){
  baseUrl = "http://www.incfotech.com/hotel";
}
export default baseUrl
