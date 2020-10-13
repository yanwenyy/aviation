var baseUrl ={};
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV == 'development') {
  baseUrl.httpUrl = "http://59.110.54.1:8080/jinding-back/";
  baseUrl.ltUrl="http://localhost:8091/";
}else if(process.env.NODE_ENV == 'testing'){
  baseUrl.httpUrl = "http://59.110.54.1:8080/jinding-back/";
}else if(process.env.NODE_ENV == 'production'){
  baseUrl.httpUrl = "http://www.incfotech.com/hotel";
}
export default baseUrl
