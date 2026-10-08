// WE GET THE DATA FROM GITHUB VIA API 

export async function getGithubRepos(limit=15) {
    const since = new Date(Date.now() - 7*24*60*60*1000).toISOString().slice(0,10) ;
    const q = encodeURIComponent(`created:>${since}`) ;
    const base = "https://api.github.com/search/repositories" ;
    const url = `${base}?q=${q}&sort=stars&order=desc&per_page=${limit}` ;

    const res = await fetch(url, {
        headers: { Accept: "application/vnd.github+json","User-Agent": "devpulse-app" },
    });

    if(!res.ok) throw new Error(`GitHub request failed (${res.status})`) ;
    const data = await res.json();

    return data.items.map((r) => ({
        id: `gh-${r.id}`,
        source: "github",
        title: r.full_name,
        url: r.html_url,
        score: r.stargazers_count,
        author: r.owner.login,
        comments: 0,
        description: r.description ?? "",
        tags: r.language ? [r.language] : []
    }));
}