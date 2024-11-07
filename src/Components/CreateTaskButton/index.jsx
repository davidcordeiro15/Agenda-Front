import { useState } from "react"


export default function CreateTaskButton() {
    //A seguinte função mostra o formulário para criar tarefas
    const [taskForm, setTaskForm] = useState("absolute invisible") 
    const showCreator = () => {
        taskForm === "absolute invisible" ?  setTaskForm("visible") : setTaskForm("absolute invisible")
    }

    //Variaveis necessárias para criar uma tarefa
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");  
    const [local, setLocal] = useState("")  
    const [date, setDate] = useState("")

    //Mostra para o React-DOM que ele precisa observar os eventos que irão acontecer dentro dos inputs 
    const handleTitle = (event) => {setTitle(event.target.value)}  
    const handleDescription = (event) => {setDescription(event.target.value)}  
    const handleLocal = (event) => {setLocal(event.target.value)} 
    const handleDate = (event) => {setDate(event.target.value)} 

    // Função que cria a tarefa
    const createTask = (m) => {
        //Evita do site ser aualizado a cada criação
        m.preventDefault();

        //Criando um objeto para a tarefa
        const task = {
            title: title,
            description: description,
            local: local,
            date: date
        }

        //Verifica se há algum campo vazio
        if (task.title === "" || task.description === "" || task.local === "" || task.date === "") {
            alert("Por favor preencha todos os campos")
        } else {
            //Limpa os inputs
            console.log(task)
            setTitle("")
            setDescription("")
            setLocal("")
            setDate("")
        }

    }
    return (
        <>
            <div className={taskForm}>
                <form action="" className="z-10 fixed bg-slate-500 border-solid border-gray-900 flex  flex-col  gap-2">
                    <div className="flex gap-3">
                        <button className="ml-3 mt-2">X</button>
                    </div>
                        <h1 className="text-center">Crie sua tarefa!</h1>
                    <div className="m-10 mt-0 mb-2">
                        <h2>Título da tarefa: </h2>
                        <input type="text" value={title} onChange={handleTitle}/>
                        <h2>Data e Horário da tarefa: </h2>
                        <input type="datetime-local" value={date} onChange={handleDate}/>
                        <h2>Local: </h2>
                        <input type="text" value={local} onChange={handleLocal}/>
                        <h2>Descrição: </h2>
                        <input type="text" value={description} onChange={handleDescription}/>
                    </div>
                        <button onClick={createTask}>Criar tarefa</button>
                </form>
            </div>
            <div>
                <button onClick={showCreator} className="bg-blue-300 z-0" >Crie uma nova tarefa!</button>
            </div>
        </>
    )
}