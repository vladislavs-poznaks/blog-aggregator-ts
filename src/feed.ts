import { log } from 'console';
import { XMLParser } from 'fast-xml-parser'

export type RSSFeed = {
    channel: {
        title: string;
        link: string;
        description: string;
        item: RSSFeedItem[];
    }
}

export type RSSFeedItem = {
    title: string;
    link: string;
    description: string;
    pubDate: string;
}


export const fetchFeed = async (feedURL: string): Promise<RSSFeed> => {
    const response = await fetch(feedURL, {
        headers: {
            'User-Agent': 'gator'
        }
    })

    const xml = await response.text()

    const parser = new XMLParser()

    const obj = parser.parse(xml)

    if (!obj.rss?.channel) {
        throw new Error('Invalid RSS feed')
    }

    const {title, link, description, item} = obj.rss.channel


    if (!title || !link || !description || !item) {
        throw new Error('Invalid RSS feed')
    }

    const items = Array.isArray(item) ? item : []

    const feedItems: RSSFeedItem[] = []
    
    for (const it of items) {
        if (!it.title || !it.link || !it.description || !it.pubDate) {
            continue
        }

        feedItems.push({
            title: it.title,
            link: it.link,
            description: it.description,
            pubDate: it.pubDate,
        })
    }

    return {
        channel: {
            title, link, description, item: feedItems
        }
    } as RSSFeed
}
