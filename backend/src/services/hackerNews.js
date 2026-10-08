// WE GET THE DATA FROM HACKERNEWS VIA API 

export async function getHackerNews(limit=15) {
    const idsRes = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
    if (!idsRes.ok) throw new Error("Hacker News request failed ");
    const ids = await idsRes.json();

    const stories = await Promise.all(
        ids.slice(0, limit).map((id) =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((r) => r.json())
        )
    );

    return stories.filter(Boolean).map((s) => ({
        id: `hn-${s.id}`,
        source: "hackernews",
        title: s.title,
        url: s.url || `https://new.ycombinator.com/item?id=${s.id}`,
        score: s.score ?? 0,
        author: s.by,
        comments: s.descendants ?? 0,
        description: "",
        tags: []
    }));
}