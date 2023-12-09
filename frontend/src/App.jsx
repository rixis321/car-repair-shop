import './App.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import {Routes} from "react-router";
import {Route} from "react-router-dom";
import Dashboard from "./routes/dashboard/Dashboard.jsx";
import Home from "./routes/static/Home.jsx";
import LoginPage from "./routes/login/LoginPage.jsx";
import {AuthProvider} from "./security/AuthProvider.jsx";
import Employees from "./routes/employees/Employees.jsx";
import EmployeeDetails from "./routes/employees/details/EmployeeDetails.jsx";
import Diagnoses from "./routes/diagnosis/Diagnoses.jsx";
import Customers from "./routes/customers/Customers.jsx";
import Cars from "./routes/cars/Cars.jsx";
import EmployeesAdd from "./routes/employees/EmployeesAdd.jsx";
import CustomersAdd from "./routes/customers/CustomersAdd.jsx";
import CarsAdd from "./routes/cars/CarsAdd.jsx";
import CustomerDetails from "./routes/customers/details/CustomerDetails.jsx";
import CarDetails from "./routes/cars/details/CarDetails.jsx";
import DiagnosesAdd from "./routes/diagnosis/DiagnosesAdd.jsx";
import DiagnosesDetails from "./routes/diagnosis/details/DiagnosesDetails.jsx";

function App() {

  return (
      <AuthProvider>
          <Routes>
              <Route path={"/"} element={<Home/>}/>
              <Route path={"/dashboard/*"} element={<Dashboard/>}/>
              <Route path={"/employees"} element={<Employees/>}/>
              <Route path={"/employees/:id"} element={<EmployeeDetails/>}/>
              <Route path={"/employees/add"} element={<EmployeesAdd/>}/>
              <Route path={"/diagnosis"} element={<Diagnoses/>}/>
              <Route path={"/diagnosis/add"} element={<DiagnosesAdd/>}/>
              <Route path={"/diagnosis/:id"} element={<DiagnosesDetails/>}/>
              <Route path={"/customers"} element={<Customers/>}/>
              <Route path={"/customers/:id"} element={<CustomerDetails/>}/>
              <Route path={"/customers/add"} element={<CustomersAdd/>}/>
              <Route path={"/cars"} element={<Cars/>}/>
              <Route path={"/cars/:id"} element={<CarDetails/>}/>
              <Route path={"/cars/add"} element={<CarsAdd/>}/>
              <Route path={"/login"} element={<LoginPage/>}/>
          </Routes>
      </AuthProvider>
  )
}

export default App
