import { useState } from "react";
import AddRoomForm from "../../../components/form/AddRoomForm";


const Addroom = () => {
    const [dates, setDates] = useState(
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    );

    const handleDates = range => {
        console.log(range);
        setDates(range.selection)
    }
    return (
        <div>
            <p>This is add room</p>

            {/* form */}
            <AddRoomForm dates={dates} handleDates={handleDates}></AddRoomForm>
        </div>
    );
};

export default Addroom;