const ncp = require("ncp").ncp;
const simpleGit = require("simple-git");
const git = simpleGit();

git
  .init()
  .then(() => git.checkout("docs"))
  .then(() =>
    ncp("./site/__sapper__/export/", "./", (err) => {
      if (err) return console.error(err);
      console.log("Done!");
    })
  )
  .then(() => git.add("."))
  .then(() => git.commit(`Deployed at ${new Date().toUTCString()}`))
  .then(() => git.push())
  .then(() => git.checkout("master"))
  .catch((e) => console.error(e));
