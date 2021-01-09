import { Collection, MongoClient } from 'mongodb'

class Mongo {
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

  getCollection(name: string): Collection {
    return this.client.db().collection(name)
  }

  map<T>(data: any): T {
    const { _id, ...documentWithoutId } = data
    return Object.assign({}, documentWithoutId, { id: _id })
  }
}

export const MongoHelper = new Mongo()
