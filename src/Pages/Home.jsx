import { useState, useEffect} from "react";
import CreateTaskButton from "../Components/CreateTaskButton";
import TaskList from "../Components/TaskList";
import { NavLink } from "react-router-dom";
import { GoChevronLeft ,GoChevronRight} from "react-icons/go";
function Home() {
    const months = [
        { id: 0, name: 'Janeiro', days: 31 }, 
        { id: 1, name: 'Fevereiro', days: 28 }, 
        { id: 2, name: 'Março', days: 31 }, 
        { id: 3, name: 'Abril', days: 30 }, 
        { id: 4, name: 'Maio', days: 31 }, 
        { id: 5, name: 'Junho', days: 30 }, 
        { id: 6, name: 'Julho', days: 31 }, 
        { id: 7, name: 'Agosto', days: 31 }, 
        { id: 8, name: 'Setembro', days: 30 },
        { id: 9, name: 'Outubro', days: 31 }, 
        { id: 10, name: 'Novembro', days: 30 }, 
        { id: 11, name: 'Dezembro', days: 31 }
    ];

    const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
    const [monthDays, setMonthDays] = useState([]);

    const handlePrevious = () => {setCurrentMonthIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 11));};

    const handleNext = () => {setCurrentMonthIndex(prevIndex => (prevIndex < 11 ? prevIndex + 1 : 0));};

    useEffect(() => {
        // Atualiza o estado de monthDays com o número de dias do mês atual
        const daysArray = Array.from({ length: months[currentMonthIndex].days }, (_, i) => i + 1);
        setMonthDays(daysArray);
    }, [currentMonthIndex]); // Remove months da lista de dependências

    const currentMonth = months[currentMonthIndex];




    return (
        <>
            <h1 className="text-center text-3xl m-5">Organize seu dia</h1>
            <CreateTaskButton></CreateTaskButton>

            <div className="bg-gradient-to-b from-blue-300 to-blue-400  p-4 mt-3 ">
                <div className="flex justify-center text-xl ">
                    <button className="pr-2 pl-2  " onClick={handlePrevious}><GoChevronLeft  /></button>
                    <h1 className="m-2">{currentMonth.name}</h1>
                    <button className="pr-2 pl-2  " onClick={handleNext}><GoChevronRight /></button>
                </div>
                        <ul className="grid grid-rows-1 grid-cols-7 m-4 gap-4">
                            <li>Dom</li>
                            <li>Seg</li>
                            <li>Ter</li>
                            <li>Qua</li>    
                            <li>Qui</li>
                            <li>Sex</li>
                            <li>Sab</li>
                        </ul>
                <div className=" grid grid-rows-4 grid-cols-7 m-4 md:w-3/12 text-center ">
                    {monthDays.map(day => (
                        <NavLink className="border-2 border-gray-400 bg-gray-200 p-1 hover:bg-gray-300" to={`/day/${day}`} key={day} >{day} </NavLink>
                    ))}
                </div>
            </div>
            <TaskList ></TaskList>
        </>
    );
}

export default Home;
