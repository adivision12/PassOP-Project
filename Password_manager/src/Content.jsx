import { useEffect, useState } from "react"
import "./Content.css"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Content() {
    // let [formData,setFormData]=useState([{}])
    let [newFormData, setNewFormData] = useState({ url: "", username: "", password: "", id: "" })
    let [users, setUsers] = useState([])


    async function HandleSubmit(event) {
        event.preventDefault();
        let result = await fetch("http://localhost:8080", {
            method: "POST",
            body: JSON.stringify(newFormData),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await result.json();
        console.log(data)

        // setFormData([ ...formData,{site:newFormData.site,username:newFormData.username,password:newFormData.password,id:uuidv4()}])
        setNewFormData({ url: "", username: "", password: "", id: "" })
        toast('🦄 Password Saved!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        // console.log(formData);
    }

    async function getUsers() {
        let result = await fetch("http://localhost:8080/register", {
            method: "GET",
        })
        const data = await result.json();
        setUsers(data)
    }
    useEffect(() => {
        getUsers();
    })
    function inputHandle(event) {
        // console.log(event.target.value)
        setNewFormData((currData => {
            return { ...currData, [event.target.name]: event.target.value }
        }))
    }
    async function editUser(id) {
        console.log("original id=", id)
        setNewFormData(users.filter((data) => data._id === id)[0])
        // console.log(users.filter((data)=>data._id===id)[0])
        deleteUser(id)
    }

    async function deleteUser(id) {
        let c=confirm("Do You want to delete");
        console.log("deleted", id)
        if(c){
            let result = await fetch("http://localhost:8080/delete", {
                method: "delete",
                body: JSON.stringify({ id }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        }
        
    }

    function copyText(text) {
        console.log(text);
        navigator.clipboard.writeText(text)
        toast('🦄 Copied To Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            
    }
    return <> <div className="content">
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition="Bounce"
        />

        {/* Same as */}
        <ToastContainer />
        <div>
            <h1 className="text-3xl"><span className="pass">&lt;Pass</span><span className="op">OP/&gt;</span></h1>

            <h4 className="text-lg">Your Own Password Manager</h4>
            <br />
            <form onSubmit={HandleSubmit}>

                <input type="text" placeholder="Enter Web URL" className="url" value={newFormData.url} onChange={inputHandle} name="url" />

                <br /><br />
                <input type="text" placeholder="Enter Username" className="username" value={newFormData.username} onChange={inputHandle} name="username" />
                &nbsp; &nbsp;&nbsp;
                <input type="text" placeholder="Enter Password" className="password" value={newFormData.password} onChange={inputHandle} name="password" />
                {/* <span><i className="fa fa-eye relative right-0" aria-hidden="true"></i></span> */}
                <br /><br />
                <button className="btn">Save</button>

            </form>
        </div>
    </div>
        <br /><br />
        <div className="text-center">
            <h2 className="text-2xl text-green-900 font-extrabold">Your PassWords</h2>

            <br />
            {
                users.length ? <table className="table-auto w-full">
                <thead className="bg-green-900 text-xl text-white">
                    <tr>
                        <th className="text-center w-32 border-solid border-3">Site</th>
                        <th className="text-center w-32 border-solid border-3">Username</th>
                        <th className="text-center w-32 border-solid border-3">Password</th>
                        <th className="text-center w-32 border-solid border-3">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-lime-300 ">
                    {
                        users.map((user => (
                            <tr key={user._id}>
                                <td className="text-center w-32 border-solid border-3">{user.url} &nbsp;&nbsp;<i onClick={() => copyText(user.url)} className="fa fa-clone" aria-hidden="true"></i></td>
                                <td className="text-center w-32 border-solid border-3">{user.username} &nbsp;&nbsp;<i onClick={() => copyText(user.username)} className="fa fa-clone" aria-hidden="true"></i></td>
                                <td  className="text-center w-32 border-solid border-3">
                                    { "*".repeat(user.password.length)} &nbsp;&nbsp;<i onClick={() => copyText(user.password)} className="fa fa-clone" aria-hidden="true"></i></td>
                                <td className="text-center w-32 border-solid border-3"> <span onClick={() => editUser(user._id)}><i className="fa fa-pencil edit" aria-hidden="true"></i></span> &nbsp; &nbsp;<span onClick={() => deleteUser(user._id)}><i className="fa fa-trash" aria-hidden="true"></i></span></td>
                            </tr>
                        )))
                    }


                </tbody>
            </table> : <h3>No Passwords have to show</h3>
            }
            
        </div>
    </>
}