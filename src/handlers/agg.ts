import { CommandHandler } from "../commands"
import { fetchFeed, RSSFeed } from "../feed"
import { scrape } from "../scraper"

export const agg: CommandHandler = async (command: string, ...args: string[]) => {
    if (args.length === 0) {
        throw new Error('Usage: cmd <time_between_reqs>')
    }

    const miliseconds = parseInputToMiliseconds(args[0])

    console.log(`Collecting feeds every ${miliseconds} miliseconds`)

    scrape().catch(handleError)

    const interval = setInterval(() => {
        scrape().catch(handleError)
    }, miliseconds)

    await new Promise<void>((resolve) => {
        process.on("SIGINT", () => {
          console.log("Shutting down feed aggregator...")
          clearInterval(interval)
          resolve()
        })
      })
}

const parseInputToMiliseconds = (input: string): number => {
    const regex = /^(\d+)(ms|s|m|h)$/
    const match = input.match(regex)

    if (!match) {
        return 2500
    }

    const num = parseInt(match[1])

    switch (match[2]) {
        case 'h':
            return num * 1000 * 3600
        case 'm':
            return num * 1000 * 60
        case 's':
            return num * 1000
        case 'ms':
            return num * 1000
        default:
            return num
    }
}

const handleError = (error: Error) => {
    console.log(error)
}
