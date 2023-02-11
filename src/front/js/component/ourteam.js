import React from "react";
import Team1 from "../../img/our_team/carlosr.png"
import Team2 from "../../img/our_team/luciab.png"
import Team3 from "../../img/our_team/juanm.png"
import "../../styles/ourteam.css"

export const OurTeam = ()=>{
    return (
        <div className="d-flex row">
            <div className="justify-content-center">
            <h5 className="team-title mb-5 text-center">¡Nuestro Super Equipo!</h5>
            </div>
            <div className="d-flex justify-content-around">
                <img className="team-pic mt-5" src={Team1} alt="Picture of our team member Carlos Román"/>
                <img className="team-pic mt-5" src={Team2} alt="Picture of our team member Lucía Belén"/>
                <img className="team-pic mt-5" src={Team3} alt="Picture of our team member Juan Miguel Saenz"/>
            </div>
            <div className="team-photos d-flex justify-content-around">
                <p className="name ca-r">Carlos Román</p>
                <p className="name lu-b ml-2">Lucía Belén</p>
                <p className="name ju-m">Juan Miguel Saenz</p>
            </div>
        </div>
    )
}