import axios from 'axios'

const fullURL = 'https://randomuser.me/api/?results=20'

export default function getUsers () {
  return axios.get(fullURL)
  
}
