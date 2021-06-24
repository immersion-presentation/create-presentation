import chalk from "chalk";
import execa from "execa";
import fs from "fs";
import path from "path";
import readline from "readline";
import { templateFolderName, turnIntoDot } from "./dotfiles";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (question: string) => {
  return new Promise<string>((resolve) => {
    rl.question(question, (s) => resolve(s));
  });
};

const shouldUseYarn = (): boolean => {
  return Boolean(
    process.env.npm_execpath?.includes("yarn.js") ||
      process.env.npm_config_user_agent?.includes("yarn")
  );
};

export const init = async () => {
  const arg = process.argv[2];
  let selectedDirname = arg?.match(/[a-zA-Z0-9-]+/g) ? arg : "";
  while (selectedDirname === "") {
    const answer =
      (await askQuestion(
        `What's the name of your project? ${chalk.gray("(my-presentation)")} `
      )) || "my-presentation";
    if (answer.match(/[a-zA-Z0-9-]+/g)) {
      selectedDirname = answer;
    } else {
      console.log("Name must match /[a-zA-Z0-9-]+/g.");
    }
  }

  const templateDir = path.join(__dirname, "..", templateFolderName);
  const outputDir = path.join(process.cwd(), selectedDirname);

  if (fs.existsSync(outputDir)) {
    console.log(`Directory ${selectedDirname} already exists. Quitting.`);
    return;
  }
  if (process.platform === "win32") {
    await execa("xcopy", [
      templateDir,
      selectedDirname,
      "/s",
      "/i",
      "/e",
      "/h",
    ]);
  } else {
    await execa("cp", ["-r", templateDir, selectedDirname]);
  }
  await turnIntoDot(selectedDirname);
  console.log("");
  console.log(
    `Created project at ${chalk.blue(
      selectedDirname
    )}. Installing dependencies...`
  );
  console.log("");
  if (shouldUseYarn()) {
    console.log("> yarn");
    const promise = execa("yarn", [], {
      cwd: outputDir,
    });
    promise.stderr?.pipe(process.stderr);
    promise.stdout?.pipe(process.stdout);
    await promise;
  } else {
    console.log("> npm install");
    const promise = execa("npm", ["install"], {
      cwd: outputDir,
    });
    promise.stderr?.pipe(process.stderr);
    promise.stdout?.pipe(process.stdout);
    await promise;
  }

  console.log(`Welcome to ${chalk.blue("Immersion")}!`);
  console.log(
    `✨ Your presentation has been created at ${chalk.blue(selectedDirname)}.\n`
  );

  console.log("Get started by running");
  console.log(chalk.blue(`cd ${selectedDirname}`));
  console.log(chalk.blue(shouldUseYarn() ? "yarn start" : "npm start"));
  console.log("");
  // TODO
  // console.log(
  // 	'Read the documentation at',
  // 	chalk.underline('https://immersion.castel.dev')
  // );
  console.log("Enjoy Immersion!");
};
