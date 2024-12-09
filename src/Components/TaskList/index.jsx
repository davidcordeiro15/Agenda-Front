import { useEffect, useState } from "react";
import Task from "../Task";

function TaskList({ taskLocal, taskDate }) {
    const [tasks, setTasks] = useState([]); // Inicializado como array vazio
    const [array, setArray] = useState("http://localhost:8090/task"); // URL padrão
    const [taskForm, setTaskForm] = useState("absolute invisible"); // Controle do menu de filtros
    const [textFindingTask, setTextFindingTask] = useState("Carregando tarefas...");

    // Alternar o URL com base no critério de ordenação
    const sortArray = (sortType) => {
        if (sortType === "creation") {
            setArray("http://localhost:8090/task/sort"); // Exemplo: ordenação por data
        } else {
            setArray("http://localhost:8090/task"); // URL padrão
        }
    };

    // Buscar tarefas sempre que o array mudar
    useEffect(() => {
        fetch(array)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar as tarefas");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data); // Para depuração
                setTasks(data); // Atualiza o estado das tarefas
            })
            .catch((error) => console.error("Erro:", error));
    }, [array]); // Adiciona `array` como dependência

    // Mensagem de fallback se não houver tarefas
    useEffect(() => {
        const timer = setTimeout(() => {
            if (tasks.length === 0) {
                setTextFindingTask("Nenhuma tarefa foi encontrada, já pensou em criar uma?");
            }
        }, 3000);
        return () => clearTimeout(timer); // Limpa o timer para evitar efeitos colaterais
    }, [tasks]);

    // Alternar a visibilidade do menu de filtros
    const showCreator = () => {
        setTaskForm((prev) =>
            prev === "absolute invisible" ? "visible p-2" : "absolute invisible"
        );
    };

    return (
        <div>
            <div className="flex m-5 items-center justify-between">
                <h1 className="text-xl">Suas Tarefas:</h1>
                <div>
                    <button
                        onClick={showCreator}
                        className="text-white bg-blue-500 border-solid border-4 border-blue-500 hover:bg-blue-600 hover:border-blue-600 rounded-xl z-0 text-sm p-2"
                    >
                        Filtrar
                    </button>
                    <div className="flex flex-col z-10 absolute text-sm mt-2 mr-5">
                        <button
                            onClick={() => sortArray("date")}
                            className={"bg-slate-400 hover:bg-slate-500 " + taskForm}
                        >
                            Por data
                        </button>
                        <button
                            onClick={() => sortArray("creation")}
                            className={"bg-slate-400 hover:bg-slate-500 " + taskForm}
                        >
                            Por criação
                        </button>
                    </div>
                </div>
            </div>
            <div className="m-5">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <Task
                            key={task.id}
                            taskId={task.id}
                            taskDescription={task.description}
                            taskTitle={task.title}
                            taskDate={task.date}
                            taskLocal={task.local}
                        />
                    ))
                ) : (
                    <p className="text-center text-xl font-bold">{textFindingTask}</p>
                )}
            </div>
        </div>
    );
}

export default TaskList;
