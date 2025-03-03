import React from 'react'
import "../Styles/home.css"
import FileUpload from './fileUpload'
import S3Upload from './S3upload'
const Home = () => {
  return (
    <div className='home'>
      <h1 className='title'>HireMatch</h1> 
      <p className='graytitle'> En ligne gratuit</p>       
      <p className="whitetitle" >Analyseur de CV</p>
      <p className="graytitle" style={{fontWeight:"bold",fontSize:"30px",marginTop:"-90px"}}>HireMatch – L’Analyseur de CV Intelligent</p>
      <p className="whitetitle" style={{fontWeight:"bold",fontSize:"30px",marginTop:"-20px",maxWidth:"930px",marginLeft:"270px"}}>Grâce à notre IA, obtenez un score de correspondance entre votre CV et une description de poste en quelques secondes. Améliorez vos chances d’être recruté en optimisant vos compétences et votre candidature.</p>
      <a href="#upload" style={{ textDecoration: "none" }}>
          <div className='button'>
            <span style={{ marginTop:"-7px", color:"rgb(25, 25, 25)" }}>&#8595;</span>
          </div>
        </a>

        <div id="upload">
        <S3Upload/>
        </div>
    </div>
  )
}

export default Home