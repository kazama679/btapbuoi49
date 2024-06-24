// khai báo các hành động cho dự án 

export const actionBook =(type : any , payload : any) =>{
    return {
        type : type,
        payload : payload
    }
}
// bình thường khi bắn action 
/*
   const dispatch = useDispatch ({
    type : 'ADD',
    payload : {id 1, name : "hoa"}
   })
   const dispatch = useDispatch(actionBook("ADD",{id:1 ,name : "hoa"}))

*/