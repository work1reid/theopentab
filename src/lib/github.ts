const FILE_PATH = "src/data/episodes.json";

function env() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!token || !owner || !repo) {
    throw new Error(
      "Missing GitHub env vars (GITHUB_TOKEN / GITHUB_OWNER / GITHUB_REPO)"
    );
  }
  return { token, owner, repo, branch };
}

type GhFileResponse = {
  content: string;
  sha: string;
  encoding: string;
};

export async function readEpisodes(): Promise<{
  episodes: unknown;
  sha: string;
}> {
  const { token, owner, repo, branch } = env();
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${FILE_PATH}?ref=${branch}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(
      `GitHub read failed: ${res.status} ${await res.text().catch(() => "")}`
    );
  }
  const data = (await res.json()) as GhFileResponse;
  const decoded = Buffer.from(data.content, "base64").toString("utf8");
  return { episodes: JSON.parse(decoded), sha: data.sha };
}

export async function writeEpisodes(
  episodes: unknown,
  sha: string,
  message = "admin: update episodes"
): Promise<{ sha: string; commitUrl: string }> {
  const { token, owner, repo, branch } = env();
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${FILE_PATH}`;
  const content = Buffer.from(
    JSON.stringify(episodes, null, 2) + "\n",
    "utf8"
  ).toString("base64");

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      content,
      sha,
      branch,
      committer: {
        name: "Open Tab Admin",
        email: "admin@theopentab.local",
      },
    }),
  });

  if (!res.ok) {
    throw new Error(
      `GitHub write failed: ${res.status} ${await res.text().catch(() => "")}`
    );
  }

  const data = (await res.json()) as {
    content: { sha: string };
    commit: { html_url: string };
  };
  return { sha: data.content.sha, commitUrl: data.commit.html_url };
}
