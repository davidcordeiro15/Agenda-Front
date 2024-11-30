import { useEffect, useState } from "react";
import Task from "../Task";

function TaskList({taskLocal, taskDate }) {
    const [tasks, setTasks] = useState([]); // Inicializado como array vazio
    const apiAddress = "http://localhost:8090/task";

    useEffect(() => {
        fetch(apiAddress)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar as tarefas");
                }
                return response.json();
            })
            .then((data) => {
                // Verifique se os dados são um array diretamente ou ajuste conforme a estrutura
                console.log(data); // Para verificar o que a API retorna
                setTasks(data); // Ajuste aqui conforme a estrutura da resposta da API
            })
            .catch((error) => console.error("Erro:", error));
    }, []);

    const [textFindingTask, setTextFindingTask] = useState("Carregando tarefas...")

    setTimeout(() => {
        setTextFindingTask("Nenhuma tarefa foi encontrada, já pensou em criar uma?")
    }, 3000);
    return (
        <div>
            <h1 className="text-xl m-5">Suas Tarefas:</h1>
            <div className="m-5">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        //O React precisa de uma key em todo .map para organizar corretamente os elementos e aumentar o desempenho do código
                        <Task key={task.id} taskId={task.id} taskDescription={task.description} taskTitle={task.title} taskDate={task.date} taskLocal={task.local}/>
                    ))
                ) : (
                    <p className="text-center text-xl font-bold">{textFindingTask}</p>
                )}
            </div>
        </div>
    );
}

export default TaskList;
