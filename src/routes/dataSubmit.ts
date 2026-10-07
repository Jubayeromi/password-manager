type PasswordForm = {
  site: string;
  userName: string;
  password: string;
};

export const dataSubmit = async (form: PasswordForm) => {
    try{
  if(form.site && form.userName && form.password){

      const api =await fetch('http://localhost:3000/save', {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
        // const response = await api.json();
        // console.log(response)
    } else{
        console.log("something went wrong here")
    }
    } catch(err){
        console.error(err,"something in the frontend")
    }
}