export type DisplayType = 'number' | 'operator' | 'cursor' | 'startgroup' | 'endgroup'
export interface Data {
    type: DisplayType
    out: string
    display?: string
}