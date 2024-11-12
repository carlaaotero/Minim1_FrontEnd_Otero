export interface Activity {
    _id?: string,
    name: string,
    date: Date,
    type: string,
    participants?: string[],
    tags?: string[]
}
