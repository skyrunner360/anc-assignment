export interface playersType{
    name: string | null;
    age: number | null ;
    id?: string  

}
export interface teamsType{
    team_name:string;
    players: playersType[]
}
export interface APIDataType{
    game:string;
    teams: teamsType[];
}