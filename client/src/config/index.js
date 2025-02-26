export const signUpFormControls = [
    {
        name :'userName',
        label : 'User Name',
        placeholder : 'Enter your user name',
        type : 'text',
        componentType : 'input'
    },
    {
        name :'userEmail',
        label : 'User Email',
        placeholder : 'Enter your user emaile',
        type : 'text',
        componentType : 'input'
    },
    {
        name :'password',
        label : 'Password',
        placeholder : 'Enter your Password',
        type : 'password',
        componentType : 'input'
    },
]

export const signInFormControls = [
    
    {
        name :'userEmail',
        label : 'User Email',
        placeholder : 'Enter your user emaile',
        type : 'text',
        componentType : 'input'
    },
    {
        name :'password',
        label : 'Password',
        placeholder : 'Enter your Password',
        type : 'password',
        componentType : 'input'
    },
]


export const initialSignInFormData={
    userEmail :"",
    password : "",
}

export const initialSignUpFormData={
    userName : "",
    userEmail :"",
    password : "",
}