//@desc Register new user
//@route   POST /api/users
//@access Public

export const registerUser = (req,res)=>{
    
    res.json({message:'Register user'})
    
}

//@desc Authenticaate a user
//@route   POST /api/login
//@access Public
export const loginUser = (req,res)=>{
    
    res.json({message:'Logi user'})
    
}

//@desc  Get user data
//@route   GET /api/users/me
//@access Public
export const getUser = (req,res)=>{
    
    res.json({message:'get user'})
    
}

