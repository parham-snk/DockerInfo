"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const child_process_1 = require("child_process");
let socketio = new socket_io_1.Server(8084, { cors: { origin: "*" } });
socketio.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    let status = true;
    if (status) {
        setInterval(() => {
            let docker = {
                ContainerName: "", memoryUsage: "", cpuUsage: ""
            };
            (0, child_process_1.exec)("docker stats --no-stream", (err, stdout, stderr) => {
                let lines = stdout.toString().split(/\n/);
                let rows = lines[1].split("   ");
                docker.ContainerName = rows[1];
                docker.cpuUsage = rows[3];
                docker.memoryUsage = rows[5];
                socket.emit('docker', docker);
            });
            if (!status)
                return;
        }, 1000);
    }
    else {
    }
    socket.on("changeStatus", ({ status }) => {
        console.log(status);
        if (status)
            return status = true;
        status = false;
    });
}));
