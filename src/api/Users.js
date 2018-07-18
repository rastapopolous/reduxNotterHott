import axios from 'axios'

const fullURL = 'https://randomuser.me/api/?results=100'

export default function getUsers () {
  return axios.get(fullURL)

}
