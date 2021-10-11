import './Footer.css'

function Footer(props:any)
{
    return <div className="footer bg-dark border-top">
        <div className="legal-information">
            <span>Copyright</span>
            <span>&copy;</span>
            <span>-</span>
            <span>2021</span>
            <span>-</span>
            <span>EstEnLine</span>
            <span>-</span>
            <span>All right reserved</span>
        </div>
        <div className="other-information">
            <span>realese by Ovide</span>
        </div>
    </div>
}

export default Footer