import Axios from "axios";

export default {
  loginAction: (username: string, password: string): Promise<any> => {
    const formData = new FormData();
    formData.append("grant_type", "password");
    formData.append("username", username);
    formData.append("password", password);
    return Axios.request({
      url: "http://localhost:8081/oauth/token",
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa("test:test"),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: formData
    });
  }
};
