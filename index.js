import {exec} from "child_process"


let s=exec('docker stats')

s.stdout.on("data",data=>{
    // console.log(data)
    // console.log(data.toString().split(' '))
    // let data.tostring().split('').filter()
    let ContainerName,memoryUsage,cpuUsage;
    ContainerName=data.toString().split("/")[3].split('   ')[2]
    cpuUsage=data.toString().split("/")[3].split('   ')[3]
    memoryUsage=data.toString().split("/")[3].split('   ')[4]
    let info={
        ContainerName,memoryUsage,cpuUsage
    }
    console.table(info)
    
})