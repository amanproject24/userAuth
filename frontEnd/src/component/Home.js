import { React, useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";



const Home = () => {

    const navigate = useNavigate()

    const [register, setRegister] = useState({
        name: "",
        email: "",
        password: "",

    })

    const [image,setImage] = useState(null)

    const [showlogin, setshowLogin] = useState(false);
    const [error, setError] = useState({})

    

    const handleRegister = (e) => {
        const { name, value } = e.target;
        setRegister((prevalue) => ({ ...prevalue, [name]: value }))
    }

  

    // const handleImage = (e)=>{
    //     setImage(e.target.files[0])
    // }

    const validation = () => {
        const { name, email, password } = register;

        let errors = {};

        if (!name) {
            errors.name = "Name is required"
        } else if (!/^[a-zA-Z ]+$/.test(name)) {
            errors.name = "Please enter the valid Name"

        }

        if (!email) {
            errors.email = "Please enter the Email"
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Please enter the valid Email"
        }

        if (!password) {
            errors.password = "Please enter the Password"
        }

        setError(errors)

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setshowLogin(false)
        validation()

        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('name',register.name)
            formData.append('email',register.email)
            formData.append('password',register.password)
            console.log(formData)
            await axios.post('http://localhost:7000/api/signup',formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            }).then((res) => {
                console.log(res)
                if (res.status === 201) {
                    alert("User is register")
                    localStorage.setItem('token', JSON.stringify(res.data.token))
                    setRegister({ name: "", email: "", password: "" })
                    navigate("/home")
                } else {
                    alert("Please check all the filed once")
                }
            }).catch(() => {
                console.log("User Is not register")
            })

        } catch {
            console.log("API is not working")
        }


    }

    const handleLogIn = (e) => {
        e.preventDefault();
        setshowLogin(true)
        validation()

        const { email, password } = register;

        axios({
            method: "POST",
            url: "http://localhost:7000/api/login",
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                email: email,
                password: password,
            }

        }).then((res) => {
            console.log(res);
            navigate("/home")
            localStorage.setItem('token', JSON.stringify(res.data.token))
            setRegister({ email: "", password: "" })
        }).catch((err) => {
            console.log(err, "User is Not Login")

        })

    }



    return (
        <>
            <div className='bg-gray-500 h-screen'>

                <h1 className="text-center pt-4 text-white text-4xl">Wellcome to Register Auth App</h1>

                <div className="w-full max-w-xs absolute 	top-48 inset-x-1/3 ml-20">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
                        {showlogin ? null : <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Username" name="name" value={register.name} onChange={handleRegister} />
                            {error.name && <span className="text-red-500">{error.name}</span>}

                        </div>}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                Email
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="email" name="email" value={register.email} onChange={handleRegister} />
                            {error.email && <span className="text-red-500">{error.email}</span>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                Password
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" name="password" value={register.password} onChange={handleRegister} />
                            {error.password && <span className="text-red-500">{error.password}</span>}

                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                upload profileImage
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="image"  accept="image/*"  type="file" name="image"  onChange={(e)=>setImage(e.target.files[0])} />
                            {/* {error.password && <span className="text-red-500">{error.password}</span>} */}

                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={(e) => {
                                handleSubmit(e)
                            }}>
                                Sign In
                            </button>
                            <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={(e) => {
                                handleLogIn(e)
                            }}>
                                Log in
                            </button>

                        </div>
                    </div>

                </div>



            </div>
        </>
    )
}

export default Home