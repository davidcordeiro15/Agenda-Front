import { useEffect, useState } from "react";

function TaskList({ taskTitle, taskDescription, taskLocal, taskDate }) {
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

    return (
        <div>
            <h1 className="text-xl m-5">Suas Tarefas:</h1>
            <div className="m-5">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div key={task.id} className="mb-4 border-2 border-gray-300 rounded-lg p-5">
                            <div className="flex justify-between mb-3">
                                <h2 className="text-lg font-bold mr-1">{task.title}</h2>
                                <p>{task.date}</p>
                            </div>
                            <p>{"Local: " + task.local}</p>
                            <p>{task.description}</p>
                        </div>
                    ))
                ) : (
                    <p>Carregando tarefas...</p>
                )}
            </div>
        </div>
    );
}

export default TaskList;
