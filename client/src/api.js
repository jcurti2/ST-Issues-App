import Axios from "axios"

export const BASE_URL = 'postgres://fzpibuqedjbobm:426903f4b5712d14f9246a32ab95e8016d25bee6604a861684b493a0e806b67c@ec2-3-234-204-26.compute-1.amazonaws.com:5432/ddtisfffpi87rf'

// export const BASE_URL="http://localhost:3001/"

const Client = Axios.create({baseURL:BASE_URL})

export default Client