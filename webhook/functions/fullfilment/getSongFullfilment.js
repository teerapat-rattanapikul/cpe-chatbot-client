const db = require('../database/db');

async function getSongFullfilment(agent, queryResult){
    try {
        const song = await db.doc(`/song/${queryResult.parameters.song}`).get();
        agent.add(song.data().verse);
    } catch (error) {
        console.log(error)
        agent.add('ฉันไม่รู้จักเพลงนั้น');
    }
}

module.exports = getSongFullfilment;