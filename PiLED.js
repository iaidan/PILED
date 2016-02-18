#!/usr/bin/env node

/*
 * PiLED v0.1.0
 * Created by Aidan Taylor - http://aidantaylor.net
 */

require("colors");
var proc = require("child_process");
var fs = require("fs-extra");

var PiLED = function(command) {
    switch (process.argv[2]) {
        case 'start':
            self.getRunningPid(function (err, pid) {
                if (err) {
                    console.log("PiLED is not running");
                    console.log("Starting...");

                    self.start();
                }

                if (pid) {
                    console.log("PiLED already running on " + pid);
                    process.exit(1);
                }
            });
            break;
        case 'stop':
            getRunningPid(function (err, pid) {
                if (err) {
                    console.error("PiLED doesn't seem to be running! ", err.message);
                }

                if (pid) {
                    console.log("PiLED running on " + pid);
                    console.log("Attempting to stop...");

                    self.stop();
                }
            });
            break;
        default:
            self.showUsage();
            break;
    }
}

PiLED.prototype.start = function() {
    proc.fork(__dirname, {
        env: process.env
    });

    status = self.checkStatus(true);

    if (status === null) {
        console.log("Process did not start...");
    } else {
        console.log(pid + " .. started");
    }
}

PiLED.prototype.stop = function() {
    process.kill(pid, 'SIGINT');
    self.checKStop();
}

PiLED.prototype.checKStop = function() {
     try {
        Console.log("Still not shutdown..");

        process.kill(pid, 0);
        process.stdout.write('.');

        setTimeout(waiting, 30);
    } catch(e) {
        console.log("Successfully stopped");
    }
}

PiLED.prototype.showUsage = function() {
    console.log("PiLED - Usage:");
    console.log("./PiLED (start|stop|status|debug)");
    console.log("   start  - Start PiLED process");
    console.log("   stop   - Attempts to stop PiLED process");
}

new PiLED(process.argv[2]);

