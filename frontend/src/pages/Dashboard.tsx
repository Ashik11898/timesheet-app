
import { useNavigate } from "react-router-dom";


const Dashboard = () => {

  const navigate = useNavigate()

  const pageRedirect=(name:string)=>{
console.log(name);

  if(name === "time"){
    navigate("/timesheetPage")
  }
  if(name === "chat"){
    navigate("/chatPage")
  }
  if(name === "stream"){
    navigate("/streamPage")
  }
  if(name === "cover"){
    navigate("/coverLetter")
  }

  }

  const name = localStorage.getItem("username")


  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow flex items-center justify-between p-4">
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            Welcome Back, 
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-[#257180] to-[#CB6040]">{name}</span>
          </h1>
        </header>
  
        {/* Content Area */}
        <main className="flex p-6 overflow-auto bg-white w-full justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 text-white rounded shadow" style={{ backgroundColor: "#257180" }}>
              <h2 className="text-xl font-semibold text-center cursor-pointer" onClick={() => pageRedirect("time")}>TimeSheet</h2>
            </div>
            <div className="p-4 text-white rounded shadow" style={{ backgroundColor: "#FD8B51" }}>
              <h2 className="text-xl font-semibold text-center cursor-pointer" onClick={() => pageRedirect("chat")}>Group Chat</h2>
            </div>
            <div className="p-4 text-white rounded shadow" style={{ backgroundColor: "#FD8B51" }}>
              <h2 className="text-xl font-semibold text-center cursor-pointer" onClick={() => pageRedirect("cover")}>Cover Letter</h2>
            </div>
            <div className="p-4 text-gray-800 rounded shadow" style={{ backgroundColor: "#F2E5BF" }}>
              <h2 className="text-xl font-semibold text-center cursor-pointer" onClick={() => pageRedirect("stream")}>Stream Response</h2>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
  
  
};

export default Dashboard;
