import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
function Task({taskId,  taskTitle, taskDescription, taskLocal, taskDate }) {
    const [alertDeleteBox, setAlertDeleteBox] = useState("absolute invisible")

    //função que manda para a API uma requisição de DELETE com o parâmetro Id 
    const yesChoice = () => {
        fetch('http://localhost:8090/task/'+ taskId, {
            method: 'DELETE',
            headers: {'Content-type': 'application/json'}
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro ao elimnar tarefa");
            }
            return;
        })
        .catch((error) => console.error("Erro:", error));
        location.reload() // Reinicia a página para mostrar mostrar a nova lista 
    }

    //Função que mostra a box para confirmar o apagamento da tarefa
    const deleteTask = () => {
        alertDeleteBox == "absolute invisible" ? setAlertDeleteBox("visible") : setAlertDeleteBox("absolute invisible")
    }
    const [alertEditBox, setAlertEditBox] = useState("absolute invisible")

    const editTask = () => {
        alertEditBox == "absolute invisible" ? setAlertEditBox("visible") : setAlertEditBox("absolute invisible")
    }
    return ( 
        <>
        <div className={"bg-gray-300 text-center p-2 m-5 rounded-md "+ alertDeleteBox} >
            <h1 className="font-bold">Deseja mesmo apagar essa tarefa?</h1>
            <div className="flex justify-around m-2">
                <button onClick={yesChoice} className="bg-red-200 border-red-300 border-2 rounded-md p-1 hover:bg-red-300 hover:text-white">Sim</button>
                <button onClick={deleteTask} className="bg-green-400 border-green-300 border-2 rounded-md p-1 hover:bg-green-500 hover:text-white">Não</button>
            </div>
        </div>
        <div className={"" + alertEditBox}>
            <h1>Teste</h1>
        </div>
        <div key={taskId} className=" mb-4 border-2 border-gray-300 rounded-lg p-5">
            <div className="flex justify-between mb-3">
                <h2 className="text-lg font-bold mr-1">{taskTitle}</h2>
                <p>{taskDate}</p>
            </div>
            <p>{"Local: " + taskLocal}</p>
            <div className="flex justify-between">
                <p>{taskDescription}</p>
                <div className="flex flex-col gap-2">
                    <button onClick={editTask} className="hover:bg-gray-300 rounded-md p-1"><FiEdit /></button>
                    <button onClick={deleteTask} className="hover:bg-gray-300 rounded-md  p-1"><MdDeleteOutline /></button>
                </div>
            </div>
        </div>
        </>
     );
}

export default Task;