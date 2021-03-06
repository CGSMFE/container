import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../Redux/Reducers/authReducer";
import { Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";

export class Dashboard extends Component {
  logoutUser = () => {
    Auth.signOut();
    this.props.logout();
  };

  render(props) {
    const { user } = this.props;
    console.log(this.props.user);

    if (user && !user.username) {
      return <Redirect to="/auth" />;
    }
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <h2>Welcome, {user.username}!</h2>

        <button onClick={this.logoutUser}>Logout</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps, { logout })(Dashboard);
