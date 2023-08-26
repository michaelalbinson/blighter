import FeedItem from "./FeedItem";

export default interface Feed {
    url: string,
    name: string,
    description: string,
    lastBuildDate: string|null,
    updatePeriod: string|null,
    id: number,
    active: boolean,
    data: any|null,
    feedItems: FeedItem[]|null,
}