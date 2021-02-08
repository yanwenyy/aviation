var baseUrl ={};
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV == 'development') {
  baseUrl.httpUrl = "http://123.56.130.178/lxb-aviation/";
  window.httpUrl= "http://123.56.130.178/lxb-aviation/";
  window.path='../../../static/img/'
}else if(process.env.NODE_ENV == 'testing'){
  baseUrl.httpUrl = "http://123.56.130.178/lxb-aviation/";
  window.path='./static/img/'
}else if(process.env.NODE_ENV == 'production'){
  baseUrl.httpUrl = "http://www.incfotech.com/hotel";
}
export default baseUrl
