// Actions types
export enum RepositoriesTypes {
    LOAD_REQUEST = '@repositories/LOAD_REQUEST',
    LOAD_SUCCES = '@repositories/LOAD_SUCCES',
    LOAD_FAILURE = '@repositories/LOAD_FAILURE',
}

export interface Repository {
    id: number
    name: String
}

export interface RepositoriesState {
    readonly data: Repository[]
    readonly loading: boolean
    readonly error: boolean
}