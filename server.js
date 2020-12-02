const Koa = require('koa')
const Router = require('@koa/router')
const Shell = require("node-powershell")


const app = new Koa()
const router = new Router()

const PORT = process.env.PORT || 8080

const ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true
})

router.get("/start-plex", async (ctx, next) => {
    console.log("wow")
    // ps.addCommand('Start-Process -FilePath "C:/Program Files (x86)/Plex/Plex Media Server/Plex Media Server.exe"')
    ps.addCommand("./start-plex.ps1")
    await ps.invoke()
    ctx.body = "starting plex i guess"
})

router.get("/", (ctx, next) => {
    ctx.body = "Hello Koa"
})

app
  .use(router.routes())
  .use(router.allowedMethods())


console.log(`Server listening on port ${PORT}...`)
app.listen(PORT)
