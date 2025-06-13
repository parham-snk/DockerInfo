import http from 'http'
import exp from "express"
import { Server } from 'socket.io'
import { exec } from 'child_process'




let socketio = new Server(8084, { cors: { origin: "*" } })
socketio.on("connection", async socket => {

    let status = true
    if (status) {
        setInterval(() => {
            let docker = {
                ContainerName: "", memoryUsage: "", cpuUsage: ""
            }

            exec("docker stats --no-stream", (err, stdout, stderr) => {
                let lines = stdout.toString().split(/\n/)

                let rows = lines[1].split("   ")
                docker.ContainerName = rows[1]
                docker.cpuUsage = rows[3]
                docker.memoryUsage = rows[5]

                socket.emit('docker', docker)
            })
            if (!status) return
        }, 1000)
    } else {

    }
    socket.on("changeStatus", ({ status }) => {
        console.log(status)
        if (status)

            return status = true
        status = false
        

    })

})


