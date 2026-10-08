// CACHE : A TINY MEMORY TO STORE DATA TEMPORARILY
// The reason we do this is so that we don't hit the rate limit

const store = new Map();

export async function cached(key,ttlMs,loader){
    const hit = store.get(key);
    if (hit && Date.now() - hit.time < ttlMs){
        return hit.data;
    }
    const data =  await loader();
    store.set(key, { data, time:Date.now() });
    return data;
}