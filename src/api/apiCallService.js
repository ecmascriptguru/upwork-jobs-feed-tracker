import axios from "axios";
import localStorageService from "./localStorageService";
import history from "../history.js";
class apiCallService {
    loginWithEmailAndPassword = (email, password) => {
        console.log("email: " + email);
        console.log("password: " + password);
        if(axios.defaults.headers.common["Authorization"]) {
            delete axios.defaults.headers.common["Authorization"];
        }
        return axios.post('http://192.168.0.43:8000/api/login', {
            "email": email,
            "password": password,
        }).then(res=> {
            this.setSession(res.data.token);
            this.setUser(res.data);
            return res.data;
        });
    };

    loginWithToken = () => {
    if(localStorage.getItem('bearer_token')) {
      if(!axios.defaults.headers.common["Authorization"]) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem('bearer_token');
      }

//      return axios.get('http://localhost:8000/api/user/').then(data => {
      return axios.get('http://192.168.0.43:8000/api/user/').then(data => {
        // Token is valid
  //      this.setSession(data.token);
  //      this.setUser(data);
        return data;
      }).catch(error => {
        this.logout();
        console.log("Unauthorized");
//        history.push({
//          pathname: "/signin"
//        });
        return;
      });
    }
    else {
      return;
    }
  }

  logout = async () => {
    await this.CallAPIWithToken('/api/logout', 'post', '');

    this.setSession(null);
    this.removeUser();
  }

    // Set token to all http request header, so you don't need to attach everytime
    setSession = token => {
        if (token) {
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
    // Remove user from localstorage
    removeUser = () => {
        localStorage.removeItem("auth_user");
    }

    CallAPIWithToken = async (url, method, body) => {
        let result = [];
        if(url.includes('api/auth') && axios.defaults.headers.common["Authorization"]) {
            if(!url.includes('logout')) {
                delete axios.defaults.headers.common["Authorization"];
            }
        }
        
        await axios({
            method: method,
            url: 'http://localhost:8000' + url,
            data: body,
        })
        .then(data => {
        // Token is valid
            result = data;
            return result;
        }).catch(error => {
            if(error.response) {
                if(error.response.status == '401') {
                this.logout();
        //          history.push({
        //            pathname: "/signin"
        //          });
                    console.log("session time out!");
                }
            }
            result = error.response;
            return result;
        });

        return result;
    }
}

export default new apiCallService();