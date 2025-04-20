export default function Breadcrumbs({breadcrumbs}) {

    return (
        <nav aria-label="breadcrumb">
            {breadcrumbs.map((breadcrumb, i) => 
                <button onClick={breadcrumb.onClick} disabled={i === breadcrumbs.length - 1}>{breadcrumb.label}</button>
            )}
        </nav>
    );
}