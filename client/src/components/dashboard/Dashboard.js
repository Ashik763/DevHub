import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import { deleteAccount, getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';
// import Experience from '../../../../validation/experience';


class Dashboard extends Component {
    componentDidMount(){
        this.props.getCurrentProfile();
    } 

    onDeleteClick(e){
        // e.preventDefault();
        this.props.deleteAccount();

    }
    render() {
        const {user} = this.props.auth;
        const {profile,loading} = this.props.profile;
        // console.log('dashboard',profile,'loading',loading);
        let dashboardContent ;
        if(profile==null || loading){
            dashboardContent = <Spinner/>
        }
        else{
            if(Object.keys(profile).length > 0){
                dashboardContent = (
                    <div> 
                        <p className='lead text-muted'> Welcome <Link to={`/profile/${profile.handle}`}>{user.name} </Link> </p>
                        <ProfileActions/>
                        <Experience  experience={profile.experience}  />
                        <Education education={profile.education} />
                        
                        <div style = {{marginBottom:'60px'}}>
                            <button className=' btn btn-danger' onClick={this.onDeleteClick.bind(this)}>Delete account
                           
                            </button>
                        </div>
                    </div>
                )
            }
            else{
                dashboardContent = (
                    <div> 
                        <p className='lead text-muted'> Welcome {user.name}</p>
                        <p> You have not yet setup a profile,please ad some info </p>
                        <Link to='/create-profile' className='btn btn-lg btn-info' >
                                Create Profile
                         </Link>
                    </div>
                )

            }
            // dashboardContent = <h1>Hello</h1>;
        }
        // console.log(dashboardContent);
        return (
            <div className='dashboard'>
                <div  className="container"> 
                    <div className='row'>
                        <div className='col-md-12'> 
                            <h1 className='display-4'> Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>

                </div>
                    
                
            </div>
        );
    }
}
Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,

}

const mapStateToProps = (state) =>({
    auth: state.auth,
    profile:state.profile
})

export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard);