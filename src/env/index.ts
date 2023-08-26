import { Octokit } from "@octokit/rest";

export default {
  api: new Octokit({
    auth: process.env.GITHUB_TOKEN,
  }),
  repo: {
    owner: "russellbanks",
    repo: "komac",
  },
};
