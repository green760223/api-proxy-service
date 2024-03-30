const express = require("express")
const { createProxyMiddleware } = require("http-proxy-middleware")

const app = express()

// 配置代理路径
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://api-driver.marsview.cc/api", // 第三方 API 的 URL
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
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
