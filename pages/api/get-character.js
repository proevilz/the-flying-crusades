const MongoClient = require("mongodb").MongoClient

export default async function (req, res) {
    const data = JSON.parse(req.body)

    try {
        const client = new MongoClient(process.env.MONGO_DB_URL, {useUnifiedTopology: true})
        await client.connect()

        const character = await client.db(process.env.MONGO_DB_NAME).collection(data.name.toLowerCase()).find({"name": data.name.toLowerCase()}).toArray()

        await client.close()

        return res.status(200).json(character[0])
    }
    catch {
        return res.status(500).json(
            {
                "name": "bob", 
                "class": "adventurer", 
                "gold": 500, 
                "inventory": {
                    "head": null,
                    "body": null,
                    "r-hand": null,
                    "l-hand": null,
                    "legs": null,
                    "feet": null,
                    "items": {"potion": 1}
                 } 
            }
        )
    }
 }