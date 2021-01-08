import { MongoClient } from 'mongodb'

class MongoHelper {
  public client: MongoClient

  public async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  public async disconnect(): Promise<void> {
    await this.client.close()
  }
}

export default new MongoHelper()
/*
export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect(): Promise<void> {
    await this.client.close()
  }
}
*/
