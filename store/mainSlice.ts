import { createSlice, current } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"
import { APIDataType, playersType } from "../types/fetchDataType"
import { v4 as uuidv4 } from 'uuid';
const initialState:{apiData: APIDataType[],players:playersType[]} = {
    apiData : [],
    players: [],

}

export const mainSlice = createSlice({
    name:"mainSlice",
    initialState,
    reducers:{
        populateApiData :(state,action:PayloadAction< APIDataType[]>)=>{
            state.apiData = [...action.payload.map(el=>({...el,teams: el.teams.map(e=>({...e,players:e.players.map(elem=>({...elem,id:uuidv4()}))}))}))]
             
        },
        addPlayer: (state,action:PayloadAction<playersType & {teamName:string}>)=>{
             state.apiData = [...state.apiData.map(el=>({...el,teams: 
                el.teams.map(e=>{
                    if(e.team_name===action.payload.teamName){
                        return {...e,players:[{age:action.payload.age,id:uuidv4(),name:action.payload.name},...e.players]}
                    }
                    else{
                        return {...e}
                    }
            })
            
            }))]
            },
            updatePlayerData:(state,action:PayloadAction<{id:number,age?:number | null,name?:string | null}>)=>{
            state.apiData = [...state.apiData.map(el=>({...el,teams: el.teams.map(e=>{
                const elemIndex = e.players.findIndex(()=>action.payload.id)
                if(action.payload.name) 
                {

                    e.players[elemIndex].name =  action.payload.name
                } 
                if(action.payload.age)
                {

                    e.players[elemIndex].age = action.payload.age
                }
            return    {...e,players:[...e.players]}
            })}))]
             
        }
    }
})

export default mainSlice.reducer;
export const {populateApiData,addPlayer,updatePlayerData} = mainSlice.actions