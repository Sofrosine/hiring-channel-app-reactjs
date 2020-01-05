import React, { Component } from "react";
import "./ProfileCompany.css";

class ProfileCompany extends Component {
  render() {
    const companyProfile = this.props.companyProfile
    return (
      <>
        <section id="company-profile" className="company-profile">
          <div className="ml-3">
            <div class="demo-card-image mdl-card mdl-shadow--2dp">
              <div class="mdl-card__title mdl-card--expand"></div>
              <div class="mdl-card__actions">
                <div id="id-card-profile" class="demo-card-image__filename">
                  {companyProfile.Name}
                </div>
                <div id="desc" class="demo-card-image__filename">
                  {companyProfile.Description}
                </div>
             
                <div id="list-of-skill" class="demo-card-image__filename d-flex flex-direction-row">
                  <i class="material-icons red-text text-lighten-1">location_on</i>
                  <p>{companyProfile.Location}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default ProfileCompany
