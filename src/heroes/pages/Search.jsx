import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from '../../hook/useForm'
import queryString from 'query-string'
import { HeroCard } from '../components'
import { getHeroesByName } from '../helpers'

export const Search = () => {

  const navigate = useNavigate()
  const location = useLocation()
  
  const {q = ''} = queryString.parse(location.search)
  const heroes = getHeroesByName(q)

  const showSearch = (q.length === 0)
  const showError = (q.length > 0) && heroes.length === 0;

  const { searchText, onInputChange } = useForm({
    searchText: q
  })

  const onSearchSubmit = (e) => {
    e.preventDefault()
    navigate(`?q=${searchText}`)
  }

  return (
    <>
      <div className="row mt-5">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input type="text"
              placeholder='Search a hero'
              className='form-control'
              name='searchText'
              autoComplete='off' 
              value={searchText}
              onChange={onInputChange}
              />
            <button className="btn btn-outline-primary mt-3">Search</button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />
          <div className="alert alert-primary" style={{display: showSearch ? '' : 'none'}}>
            Search a hero
          </div>
          <div className="alert alert-danger" style={{display: showError ? '' : 'none'}}>
            No hero with <b>{q} </b>
          </div>

          {
            heroes.map( h =>(
              <HeroCard key={h.id} {...h}/>
            ))
          }


        </div>
      </div>
    </>
  )
}
