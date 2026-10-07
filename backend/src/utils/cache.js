// CACHE : A TINY MEMORY TO STORE DATA TEMPORARILY
// The reason we do this is so that we don't hit the rate limit

const store = new MAP();

export async function cached(key,tt1Ms,loader){
    const hit = store.get(key);
    if (hit && DAte.now() - hit.time < tt1Ms){
        return hit.data;
    }
    const data =  await loader();
    store.set(key, { date, time:Date.now() });
    return data;
}