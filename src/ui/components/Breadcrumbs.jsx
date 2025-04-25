import style from './Breadcrumbs.module.css';

export default function Breadcrumbs({ breadcrumbs }) {

    return (

        <nav aria-label="breadcrumb" className={style.breadcrumbs}>
            <div className="container">
                <div className={style.wrapper}>
                    {breadcrumbs.map((breadcrumb, i) => 
                        <>
                            <button key={breadcrumb.label} className={style.breadcrumb} onClick={breadcrumb.onClick} disabled={i === breadcrumbs.length - 1}>{breadcrumb.label}</button>
                            <span className={style.separator}></span>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}