import express from "express";
import { create } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import { getRandomFortune } from "./lib/fortunes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let app = express();
app.set("port", process.env.PORT || 3000);

// 设置handlebars视图引擎
// 基于mustache(胡子引擎)
// 修改后缀为 .hbs
const handlebars = create({ defaultLayout: "main", extname: ".hbs" });
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

// app.VERB 帮我们做了很多工作：它默认忽略了大小写或反斜杠，并且在进行匹配时也不考虑查询字符串
// .get 是对路由的处理
// .use 和 .get 都对顺序有要求
// /about* 中 * 为通配符，对/about/contact 和/about/directions 都能进行匹配
/* app.get('/', function (req, res) {
  res.type('text/plain');
  res.send('Meadowlark Travel');
});
app.get('/about', function (req, res) {
  res.type('text/plain');
  res.send('About Meadowlark Travel');
}); */

// static 中间件可以将一个或多个目录指派为包含静态资源的目录，其中的资源不经过任何特殊处理直接发送到客户端。
// 需要加在所有路由之前
// static 中间件相当于给你想要发送的所有静态文件创建了一个路由，渲染文件并发送给客户端。
// 可以直接指向/img/logo.png （注意：路径中没有public，这个目录对客户端来说是隐形的）
app.use(express.static(__dirname + "/public"));

// 无需设置状态码和内容类型（设置为200和text/html）
// render()方法
app.get("/", function (req, res) {
  res.render("home");
});
app.get("/about", function (req, res) {
  let randomFortune = getRandomFortune();
  // 给模板引擎传入变量，视图中动态内容
  res.render("about", { fortune: randomFortune });
});

// 404 catch-all处理器（中间件）
app.use(function (req, res, next) {
  res.status(404);
  res.render("404");
});

// 500错误处理器（中间件）
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render("500");
});

// Express能根据回调函数中参数的个数区分404和500处理器
// 定制404页面
// app.use 是Express添加中间件的一种方法
/* app.use(function (req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
}); */

app.listen(app.get("port"), function () {
  console.log("Express started on http://localhost:" + app.get("port") + "; press Ctrl-C to terminate.");
});
