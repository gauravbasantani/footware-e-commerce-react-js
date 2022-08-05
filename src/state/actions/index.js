export const addQuantity = (quantity)=>{
    return(dispatch)=>{
        dispatch({
         type:'add',
         payload:quantity
        })
    }
}

export const removeQuantity = (quantity)=>{
    return(dispatch)=>{
        dispatch({
         type:'remove',
         payload:quantity
        })
    }
}

export const setQuantity = (quantity)=>{
    return(dispatch)=>{
        dispatch({
         type:'set',
         payload:quantity
        })
    }
}