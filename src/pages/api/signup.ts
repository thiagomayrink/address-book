// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, Db } from "mongodb";
import SignUpData from "@/components/interfaces/SignUpData";
import PatchSignUpData from "@/components/interfaces/PatchSignUpData";
import { v4 as uuidv4 } from "uuid";

let cachedDb: Db | null = null;

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
  if (!process.env.MONGODB_URI) {
    response.status(500).json({ text: "Database URL error" });
    return;
  }

  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = db.collection("users");

  if (request.method === "POST") {
    const validatedData = validateAndReturnPostData(request.body as SignUpData);

    if (!validatedData) {
      return response.status(422).json({ text: "invalid Data" });
    }
    const { userData } = validatedData;

    const result = await collection.findOne({ email: userData.email });

    if (result && result.email === userData.email) {
      return response.status(409).json({ text: "o email já está cadastrado" });
    }

    await collection.insertOne(userData);

    return response.status(201).json({ text: "Created" });
  }

  if (request.method === "PATCH") {
    const validatedData = validateAndReturnPatchData(
      request.body as PatchSignUpData
    );

    if (!validatedData) {
      return response.status(422).json({ text: "invalid Data" });
    }

    const { query, update } = validatedData;
    const options = { upsert: true };
    await collection.updateOne(query, update, options);

    return response.status(200).json({ text: "Updated" });
  }
 
  if (request.method === "GET" && request?.query?.slug) {
    const slug = request.query.slug as any;
    
    const result = await collection.findOne({ slug: slug });
    if (!result) {
      return response.status(400).json({ text: "Bad request" });
    }
    return response.send(result);
  }

  if (request.method === "GET") {
    const result = await collection.find({}).toArray();
    return response.send(result);
  }

  if (request.method === "DELETE") {
    const slug = request.body as { slug: string };
    const deleted = await collection.findOneAndDelete({ slug: slug });

    return response.send(deleted);
  }

  return response.status(500).json({ text: "Unexpected error" });
};

function validateAndReturnPatchData(body: PatchSignUpData) {
  const { name, email, slug, birthday, address } = body;

  if (!name || !email || !slug || !birthday || !address) {
    return false;
  }

  const { cep, street, city, number, state, neighborhood } = address;
  const addressDetail = address?.addressDetail || null;

  if (!cep || !street || !city || !number || !state || !neighborhood) {
    return false;
  }

  const query = { email: email };
  const update = {
    $set: {
      name,
      email,
      birthday,
      slug,
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
  return { query, update };
}

function validateAndReturnPostData(body: SignUpData) {
  const { name, email, birthday, address } = body as SignUpData;

  if (!name || !email || !birthday || !address) {
    return false;
  }

  const { cep, street, city, number, state, neighborhood } = address;
  const addressDetail = address?.addressDetail || null;

  if (!cep || !street || !city || !number || !state || !neighborhood) {
    return false;
  }

  const slug = uuidv4();
  const data = {
    name,
    email,
    slug,
    birthday,
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
  };
  return { userData: data };
}
