import axios from "axios";
import localStorageService from "./localStorageService";
import history from "../history.js";
class apiCallService {
    serverAddress = "http://workalert.mind2matter.co";
//    serverAddress = "http://192.168.0.115:8000";

    loginWithEmailAndPassword = (email, password) => {
        if(axios.defaults.headers.common["Authorization"]) {
            delete axios.defaults.headers.common["Authorization"];
        }
        return axios.post(this.serverAddress + '/api/login', {
            "email": email,
            "password": password,
        }).then(res=> {
            this.setSession(res.data.token);
            this.setUser(res.data);
            if(res.data.current_plan) {
//                this.setLocation('find');
            }
            else {
//                this.setLocation('plan');
            }
            
            return res.data;
        });
    };

    loginWithToken = () => {
    if(localStorage.getItem('bearer_token')) {
      if(!axios.defaults.headers.common["Authorization"]) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem('bearer_token');
      }

//      return axios.get('http://localhost:8000/api/user/').then(data => {
      return axios.get(this.serverAddress + '/api/user').then(data => {
        // Token is valid
  //      this.setSession(data.token);
  //      this.setUser(data);
        return data;
      }).catch(error => {
        this.logout();
        console.log("Unauthorized");
        history.push({
          pathname: "/index.html#/login"
        });
        window.location.reload();
        return;
      });
    }
    else {
        history.push({
          pathname: "/index.html#/login"
        });
        window.location.reload();
      return;
    }
  }

  register = (email, password, password_confirmation) => {
    if(axios.defaults.headers.common["Authorization"]) {
        delete axios.defaults.headers.common["Authorization"];
    }
    return axios.post(this.serverAddress + '/api/register', {
        "email": email,
        "password": password,
        "password_confirmation": password_confirmation,
    }).then(res=> {
        return res;
    }).catch(error => {
        return error;
    });
  }

  logout = async () => {
    await this.CallAPIWithToken('/api/logout', 'post', '');

    this.setSession(null);
    this.removeUser();
    this.removeJob();
    this.removeLocation();
  }

    // Set token to all http request header, so you don't need to attach everytime
    setSession = token => {
        if (token !== null) {
            localStorage.setItem("bearer_token", token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        } else {
            localStorage.removeItem("bearer_token");
            delete axios.defaults.headers.common["Authorization"];
        }
    };
    // Save user to localstorage
    setUser = (user) => {    
        localStorageService.setItem("auth_user", user);
    }

    // Get user to global state
    getUser = () => {
        let user = localStorageService.getItem("auth_user");
        return user;
    }

    // Remove user from localstorage
    removeUser = () => {
        localStorage.removeItem("auth_user");
    }

    // Save current location to localstorage
    setLocation = (location) => {
        localStorageService.setItem("location", location);
    }

    // Get current location
    getLocation = () => {
        let location = localStorageService.getItem("location");
        return location;
    }

    // Remove current location
    removeLocation = () => {
        localStorage.removeItem("location");
    }

    // Set Jobs to localstorage
    setJob = (job) => {
        localStorageService.setItem("job", job);
    }

    // Get jobs to global state
    getJob = () => {
        let jobs = localStorageService.getItem("job");

        return jobs;
    }

    // Remove jobs
    removeJob = () => {
        localStorage.removeItem("job");
    }

    CallAPIWithToken = async (url, method, body) => {
        let result = [];
        if(localStorage.getItem('bearer_token')) {
            if(!axios.defaults.headers.common["Authorization"]) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem('bearer_token');
            }
            else {
                delete axios.defaults.headers.common["Authorization"];
                axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem('bearer_token');
            }
            if(url.includes('api/auth') && axios.defaults.headers.common["Authorization"]) {
                if(!url.includes('logout')) {
                    delete axios.defaults.headers.common["Authorization"];
                }
            }
            await axios({
                method: method,
                url: this.serverAddress + url,
                data: body,
            })
            .then(data => {
            // Token is valid
                result = data;
                return result;
            }).catch(error => {
                if(error.response) {
                    console.log(JSON.stringify(error.response));
                    if(error.response.status == '401') {
                      console.log("session time out!");
                    }
                }
                result = error.response;
                return result;
            });

            return result;
        }
    }
}

export default new apiCallService();