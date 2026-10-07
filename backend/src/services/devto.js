// WE GET THE DATA FROM DEV.TO VIA API 

export async function getDevTo(limit=15) {
    const res = await fetch(`https://dev.to/api/articles?top=7&per_page=${limit}`);
    if (!res.ok) throw new Error("Dev.to request failed ");
    const articles = await res.json();

    return articles.map((a) => ({
        id: `devto-${a.id}`,
        source: "devto",
        title: a.title,
        url: a.url,
        score: a.public_reactions_count ?? 0,
        author: a.user?.name ?? "unknown",
        comments: a.comments_count ?? 0,
        description: a.description ?? "",
        tags: a.tag_list ?? [],
    }));
}