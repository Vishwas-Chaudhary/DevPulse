// FEED ROUTES THE HEART OF BACKEND
// THIS FILE GETS THE DATA FROM THE SERVICES AND SENDS IT TO THE FRONTEND

import { Router } from "express" ;
import { cached } from "../utils/cache.js" ;
import { getHackerNews } from "../services/hackerNews.js" ;
import { getDevTo } from "../services/devto.js" ;
import { getGithubRepos } from "../services/github.js" ;

const router =  Router();
const FIVE_MIN = 5 * 60 * 1000 ;

router.get("/",async (req,res) => {

    const results = await Promise.allSettled([
        cached("hn", FIVE_MIN, getHackerNews),
        cached("devto", FIVE_MIN, getDevTo),
        cached("github", FIVE_MIN, getGithubRepos)
    ]);

    let items = results
    .filter((r) => r.status === "fulfilled")
    .flatMap((r) => r.value);

    const { source, q , sort, limit} = req.query;
    if (source && source !== "all"){
        items = items.filter((item) => item.source === source) ;
    }
    if (q) {
        const needle = String(q).toLowerCase();
        items = items.filter((item) => item.title.toLowerCase().includes(needle));
    }
    if (sort === "score") {
        items.sort((a,b) => b.score-a.score) ;
    }
    if (limit){
        items = items.slice(0, Number(limit));
    }

    res.json(items);
    
});

export default router ;


