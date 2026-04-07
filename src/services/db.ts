// IndexedDB initialization using idb package

import { openDB, type IDBPDatabase } from 'idb'

interface CTGDatabase {
  'wikivoyage-articles': {
    key: string           // city slug
    value: {
      slug: string
      html: string
      title: string
      sections: string[]
      fetchedAt: number   // timestamp
    }
  }
  'trip-itineraries': {
    key: string           // itinerary ID
    value: {
      id: string
      name: string
      days: {
        date: string
        cityId: string
        activities: string[]
      }[]
      createdAt: number
      updatedAt: number
    }
  }
}

let dbInstance: IDBPDatabase<CTGDatabase> | null = null

export async function getDB(): Promise<IDBPDatabase<CTGDatabase>> {
  if (dbInstance) return dbInstance

  dbInstance = await openDB<CTGDatabase>('china-travel-guide', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('wikivoyage-articles')) {
        db.createObjectStore('wikivoyage-articles', { keyPath: 'slug' })
      }
      if (!db.objectStoreNames.contains('trip-itineraries')) {
        db.createObjectStore('trip-itineraries', { keyPath: 'id' })
      }
    },
  })

  return dbInstance
}
