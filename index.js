import { exec } from "child_process";
import { clearInterval } from "timers";




let timer=setInterval((x) => {
    let s = exec('docker stats --no-stream', (err, stdout) => {
        let str = stdout.toString();
        // بررسی کن str شامل حداقل 4 خط هست که خط چهارم واقعی باشه
        let lines = str.split("\n");
        if (lines.length >= 2) {
            //\s میشه فضای خالی
            // {2,} میشه تعداد تکرار مورد قبلش که فضای خالی هست
            let columns = lines[1].split(/\s{2,}/); // شکستن بر اساس چند فاصله
            let ContainerName = columns[1];
            let cpuUsage = columns[2];
            let memoryUsage = columns[3];

            let info = {
                ContainerName,
                cpuUsage,
                memoryUsage
            };

            console.log(info);
        }
    })
    
  
}, 500);



setTimeout(() => {
    clearInterval(timer)
}, 4000);
