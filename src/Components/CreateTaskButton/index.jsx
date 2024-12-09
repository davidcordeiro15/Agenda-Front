import { useState } from "react"
import { GoX } from "react-icons/go";

export default function CreateTaskButton() {
    const [textBox, setTextBox] = useState(false)

    //A seguinte função mostra o formulário para criar tarefas
    const [taskForm, setTaskForm] = useState("absolute invisible") 
    const showCreator = () => {
        taskForm === "absolute invisible" ?  setTaskForm("visible flex justify-center") : setTaskForm("absolute invisible")
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
        const body = {
            title: title,
            description: description,
            local: local,
            date: date
        }

        //Verifica se há algum campo vazio
        if (body.title === "" || body.description === "" || body.local === "" || body.date === "") {
            alert("Por favor preencha todos os campos")
        } else {
            const response = fetch('http://localhost:8090/task', {
                method: 'POST',
                body: JSON.stringify(body),  // Remova o envolvimento extra do objeto aqui
                headers: {'Content-type': 'application/json'}
            });
        
            
            
            //Limpa os inputs
            setTextBox(true)
            setTimeout(() => {
                setTextBox(false); 
                location.reload() // Reinicia a página para mostrar a nova tarefa
            }, 1500);
            console.log(body)
            setTitle("")
            setDescription("")
            setLocal("")
            setDate("")
            setTaskForm("absolute invisible")
        }

    }
    return (
        <>
            <div className="z-10 fixed top-0 w-full">
                {textBox && <h2 className="bg-green-500 text-white p-4">Tarefa Criada</h2>}
            </div>
            <div className={taskForm}>
                <form action="" className="z-10 fixed bg-blue-200 p-8 border-gray-900 flex  flex-col gap-2">
                    <div className="flex gap-3">
                        <button className="ml-3 "><GoX /></button>
                    </div>
                        <h1 className="text-center text-2xl ">Crie sua tarefa!</h1>
                    <div className="m-6 mt-0 mb-2 ">
                        <h2>Título da tarefa: </h2>
                        <input className="m-2 rounded-md" type="text" value={title}  onChange={handleTitle}/>
                        <h2>Data e Horário da tarefa: </h2>
                        <input className="m-2 rounded-md" type="date" value={date} onChange={handleDate}/>
                        <h2>Local: </h2>
                        <input className="m-2 rounded-md" type="text" value={local} onChange={handleLocal}/>
                        <h2>Descrição: </h2>
                        <input className="m-2 rounded-md" type="text" value={description} onChange={handleDescription}/>
                    </div>
                        <button className="text-white bg-blue-500 border-solid border-4 border-blue-500 rounded-xl  " onClick={createTask}>Criar tarefa</button>
                </form>
            </div>
            <div className="flex justify-center">
                <button onClick={showCreator} className=" text-white bg-blue-500 border-solid border-4 border-blue-500 hover:bg-blue-600 hover:border-blue-600 rounded-xl z-0 text-sm p-2" >Crie uma nova tarefa!</button>
            </div>
        </>
    )
}