import {React,useState} from 'react'
import axios from 'axios'

const Form = () => {

    const[userdata, SetUserData] = useState({
        firstName:"",
        lastName:"",
        Phone:"",
        Address:"",
        Department:"",
        AdminEmail:""
    })

    let token = JSON.parse(localStorage.getItem("token"))


    const handleData=(e)=>{

        const {name,value} = e.target;
        SetUserData((perv)=>({...perv,[name]:value}))
    }

 const validation=()=>{
 
    let firstNameError  = true;
    let lastNameError = true;
    let AdminEmailError = true;
    let AddressError = true;
    let PhoneError = true;
 
 }



   const AddUser = async(e)=>{

    e.preventDefault()

    const {firstName,lastName,Address,AdminEmail,Phone,Department} = userdata;

  await  axios({
        method:"POST",
        url:"http://localhost:7000/api/add-data",
        headers:{
            "Content-Type":"application/json",
            Authorization:  "Bearer " + token
        },
        data:{
            firstName:firstName,
            lastName:lastName,
            Address:Address,
            AdminEmail:AdminEmail,
            Phone:Phone,
            Department:Department
        }
    }).then((res)=>{
        console.log("Data is add",res)
        alert("User Data is saved")
        SetUserData({firstName:"",lastName:"",AdminEmail:"",Department:"",Phone:"",Address:""})
    }).catch((err)=>
    //    console.log(err.response.data.message)
       alert(err.response.data.message)
    )
   }

    return (
        <div className="max-w-7xl container mx-auto">

            <h2 className='text-3xl mt-4'> Add the User Data </h2>

            <form className="mt-10"  onSubmit={AddUser}>
                <div className="relative z-0 max-w-3xl mb-6 group">
                    <input type="text" name="firstName" id="firstName" value={userdata.firstName} onChange={handleData} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="firstName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">firstName</label>
                </div>
                <div className="relative z-0 max-w-3xl mb-6 group">
                    <input type="text" name="lastName" id="lastName" value={userdata.lastName} onChange={handleData} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="lastName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">lastName</label>
                </div>
                <div className="relative z-0 max-w-3xl mb-6 group">
                    <input type="text" name="Phone" id="Phone" value={userdata.Phone} onChange={handleData} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="Phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
                </div>
                <div className="relative z-0 max-w-3xl mb-6 group">
                    <input type="text" name="Department" id="Department" value={userdata.Department} onChange={handleData} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="Department" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Department</label>
                </div>
                <div className="relative z-0 max-w-3xl mb-6 group">
                    <input type="text" name="AdminEmail" id="Departname" value={userdata.AdminEmail} onChange={handleData} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="AdminEmail" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">AdminEmail</label>
                </div>
                <div >
                    <div className="relative z-0 max-w-3xl mb-6 group">
                        <input type="text" name="Address" id="Address" value={userdata.Address} onChange={handleData} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="Address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                    </div>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    )
}

export default Form