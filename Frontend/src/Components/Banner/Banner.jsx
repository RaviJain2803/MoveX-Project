import "./Banner.css";

function Banner()
{
    return(
        <>                       
        <section className="banner">

            <div className="banner-content">
                <h1>Welcome to <span style={{"color":"orange"}}>MoveXpress</span></h1>
                <span>“Safe Moves, Happy Homes.”</span>
            </div>

        </section>
        </>
    )
}

export default Banner;