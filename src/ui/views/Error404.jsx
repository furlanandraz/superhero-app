import { useNavigate } from 'react-router-dom';

import style from './Error404.module.css'

export default function Error404() {

    const navigate = useNavigate();

    return (
        <div className={style.main}>
            <div>
                hey, how did you get here?
            </div>
            <div>
                <button onClick={()=>navigate(-1)}>go back!</button>
            </div>
        </div>
    );
}