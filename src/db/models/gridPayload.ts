export type GridPayload = {
    page: number;
    take: number;
    sortBy: string;
    direction: 'asc' | 'desc' | string
    filters: GridPayloadFilter[]
}

export type GridPayloadFilter = {
    column: string;
    value: string;
    filterType: string;
}