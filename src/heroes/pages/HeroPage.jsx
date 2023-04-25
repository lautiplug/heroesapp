import { useMemo } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getHeroById } from "../helpers"


export const HeroPage = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  const hero = useMemo( () => getHeroById(id), [id]) 

  const onNavigateBack = () => {
    navigate(-1)
  }

  
  if (!hero) {
    return <Navigate to={"/marvel"} />
  }

  return (
    <div className="row mt-5 animate__animated animate__fadeInLeft">
      <div className="col-4">
        <img src={`/heroes/${id}.jpg`} alt={hero.superhero} className="img-thumbnail"/>
      </div>

      <div className="col-8">
        <h3>{hero.superhero}</h3>
        <ul className="list-group list-group-flush">
           <li className="list-group-item"><b> Alter ego:</b> {hero.alter_ego} </li>
           <li className="list-group-item"><b>Publisher:</b> {hero.publisher} </li>
           <li className="list-group-item"><b>First Appearence:</b> {hero.first_appearance} </li>
        </ul>
        <button className="btn btn-outline-primary" onClick={onNavigateBack}>Back</button>
      </div>
    </div>
    
  )
}
