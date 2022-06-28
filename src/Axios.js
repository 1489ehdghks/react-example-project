import axios from "axios";

function axiosGet() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
   
    axios.get('/api')
      .then(response => {
          console.log(response.data.data)
          name.innerHTML = `${response.data.data.first_name} ${response.data.data.last_name}`
          email.innerHTML = response.data.data.email
      })
  }
   
export default axiosGet;
