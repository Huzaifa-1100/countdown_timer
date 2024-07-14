#! /usr/bin/env node
// import chlak from npm
import chalk from "chalk";
// importing the differenceInSeconds function from date-fns liberary
import { differenceInSeconds } from "date-fns";
// import inquirer from npm
import inquirer from "inquirer";
// Prompting the user for input using inquirer
const res = await inquirer.prompt({
    name: "inpuserInput",
    type: "number",
    message: "Please Enter the Amount in Seconds",
    validate: (input) => {
        // @ts-ignore
        if (isNaN(input)) {
            return "Please Enter Valid Number";
            // @ts-ignore
        }
        else if (input > 60) {
            return "Seconds must be in 60";
        }
        else {
            return true;
        }
    },
});
// Extracting the user's input from the response
let input = res.inpuserInput;
// Function to start the timer
function startTime(val) {
    console.log(chalk.bgWhite.red("WELCOME TO COUNTDOWN TIMER"));
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.bgRed.white("Countdown Timer has Expired"));
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(chalk.bgWhite.red(`\t${min.toString().padStart(2, "0")}:${sec
            .toString()
            .padStart(2, "0")}`));
    }, 1000);
}
// Start the timer with the user's input
startTime(input);
