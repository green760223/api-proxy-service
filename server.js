const express = require("express")
const { createProxyMiddleware } = require("http-proxy-middleware")
const cors = require("cors") // 引入cors套件

const app = express()

// 允許所有來源
app.use(
  cors({
    origin: true, // 反映請求的Origin值，或者如果是請求沒有包含Origin頭，則設置為'*'
    credentials: true, // 因為withCredentials設置為true，所以這裡需要設置credentials為true允許發送cookie
  })
)

// 配置代理路径
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://api-driver.marsview.cc/api", // 第三方 API 的 URL
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
    onProxyRes: function (proxyRes, req, res) {
      // 移除可能造成CORS問題的不安全頭部
      delete proxyRes.headers["access-control-allow-origin"]
    },
  })
)

// 為根路徑添加一個GET請求處理器
app.get("/", (req, res) => {
  res.send("Welcome to the API proxy server!")
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
