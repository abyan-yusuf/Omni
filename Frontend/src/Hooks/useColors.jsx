import axios from 'axios';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const useColors = () => {
    const [colors, setColors] = useState([]);

    useEffect(() => {
        const getColors = async () => {
            try {
                const { data } = await axios.get(
                    "/api/v1/colors/all-colors"
                );
                setColors(data);
            } catch (error) {
                toast.error(error);
            }
        };
        getColors();
    }, []);

    return colors
}

export default useColors