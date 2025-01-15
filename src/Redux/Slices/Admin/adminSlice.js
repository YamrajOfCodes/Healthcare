import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import {getdoctorsAPI, waitingroomAPI} from "@/APIS/Doctor/doctorAPI"





export const getDoctors = createAsyncThunk("getalldoctors",async()=>{
    try {
       const response = await getdoctorsAPI();
       if(response.status==200){
        return response.data;
       }else{
        console.log("error whille fetching doctors")
       }
    } catch (error) {
        console.log(error);
        
    }
})

export const getWaitingroom = createAsyncThunk("waitingroom",async()=>{
    try {
        const response = await waitingroomAPI();
        if(response.status == 200){
            return response.data;
        }else{console.log("error while fetching waiting room");
        }
    } catch (error) {
        console.log(error);
        
    }
})













export const doctorSlice = createSlice({
    name:"Patientslice",
    initialState:{
        doctors:[],
        waitingroom:[],
        error:null,
        loader:false
    },
    extraReducers:(builders)=>{
         // getpatientsdata
        builders.addCase(getDoctors.pending,(state)=>{
            state.loader = true
        })
        .addCase(getDoctors.fulfilled,(state,action)=>{
            state.loader = false;
            state.doctors = [action.payload]
        })
        .addCase(getDoctors.rejected,(state,action)=>{
            state.loader = false;
            state.error [action.payload]
        })

        // waitingroomdata

        builders.addCase(getWaitingroom.pending,(state)=>{
            state.loader = true
        })
        .addCase(getWaitingroom.fulfilled,(state,action)=>{
            state.loader = false;
            state.waitingroom = [action.payload]
        })
        .addCase(getWaitingroom.rejected,(state,action)=>{
            state.loader = false;
            state.error [action.payload]
        })

       

    }

})

export default doctorSlice.reducer
