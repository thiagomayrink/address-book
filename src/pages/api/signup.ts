// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, Db } from "mongodb";
import SignUpData from "@/components/interfaces/signUpData";

let cachedDb: Db | null = null;
console.log(cachedDb);
async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }

  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };

  const client = await MongoClient.connect(uri, options);

  const dbConnectionURL = new URL(uri);
  const dbName = dbConnectionURL.pathname.substr(1);

  const db = client.db(dbName);

  cachedDb = db;

  return db;
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  console.log(request.method);

  if (!process.env.MONGODB_URI) {
    response.status(911).json({ text: "Database URL error" });
    return;
  }

  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = db.collection("users");

  if (request.method === "PATCH") {
    const { name, email, address } = request.body as SignUpData;

    if (!name && !email && !address) {
      return response.status(422).json({ text: "Dados inválidos" });
    }

    const { cep, street, city, number, state, neighborhood } = address;
    let addressDetail = null;

    if (address.addressDetail) {
      addressDetail = address.addressDetail;
    }

    const query = { email: email };
    const update = {
      $set: {
        name,
        email,
        address: {
          cep,
          street,
          city,
          number,
          state,
          neighborhood,
          addressDetail,
        },
        updatedAt: new Date(),
      },
    };
    const options = { upsert: true };

    await collection.updateOne(query, update, options);

    return response.status(201).json({ ok: true });
  }

  if ((request.method === "GET")) {
    const result = await collection.find({}).toArray();
    return response.send(result);
  }
};
