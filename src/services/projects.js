import axios from 'axios'
import authHeader from './auth-header';
const projectServiceUrl = `http://localhost:8080/api/auth/projects`
const projectServiceHistoryUrl = `http://localhost:8080/api/auth/projectHistory`
const projectServiceDel = `http://localhost:8080/api/auth/deleteProject`
const projectServiceCreate = `http://localhost:8080/api/auth/createSProject`

class ProjectService {

    retrieveAllProjects(parmas) {
        return axios.get(`${projectServiceUrl}`, { headers: authHeader(), params: parmas });
    }
    retrieveProjectHistory(Id) {
        return axios.get(`${projectServiceHistoryUrl}/${Id}`);
    }

    deleteprojects(Id) {
        return axios.delete(`${projectServiceDel}/${Id}`);

    }
    createprojects(data) {
        return axios.post(`${projectServiceCreate}`, data);
    }
}

export default new ProjectService()
