const initialstate={
    user:null,
    isAuthenticated:false
}

export const authReducer=(state=initialstate,action)=>{
    switch(action.type){
        case "LOGIN_USER":{
            return {...state,user : action.payload,isAuthenticated:true}
        }
   
        case "userAuthStatus":{
            return{...state,isAuthenticated:true}
        }
        
        case "LOGOUT_USER":
        return {
          ...state,
          user: null,
          isAuthenticated: false
         };

    
        default : return state
    }
}
