import { useNavigate} from "react-router-dom";
//import {EmpLoginError} from "../employeeLoginError/EmployeeLoginError";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Form, Col, Button, Alert } from "react-bootstrap";
import axios from "axios";
import "./empLoginForm.module.css";

const EmpLoginForm = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoginError("");
        //console.log("Original data:", data);
    
        // transformamos a lo que el backend espera
        const loginPayload = {
            emp_email: data.email,
            emp_password: data.password
        };
    
        try {
            const response = await axios.post("http://localhost:3000/api/auth/employee", loginPayload);
            //console.log("Login successful:", response.data);
            
            sessionStorage.setItem("Token", response.data.token);
            sessionStorage.setItem("User", JSON.stringify(response.data.user));

            navigate("/employee/menu");
            
        } catch (error) {
            console.error(" Login error:", error);
          
            if (error.response && error.response.status === 403) {
              // mensaje personalizado del backend
              setLoginError(error.response.data.error || " Cuenta desactivada.");
            } else if (error.response && error.response.status === 401) {
              setLoginError("Email o contraseña incorrectos.");
            } else {
              setLoginError("Error inesperado. Intenta nuevamente.");
            }
          }
          
    };

    return (
            <Container className="z-3 position-relative justify-content-center min-wh-100 min-vh-100 h-auto d-flex">    
                <Col xs={12} md={10} lg={8} xl={5}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Label className="mt-2">Email:</Form.Label>  
                                <Form.Control type="email" {...register("email",{ required : "Es necesario un email", maxlength: 100, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Escriba un email válido"}})}/> 
                                {errors.email && (<div>{errors.email.message}</div>)}
                                <Form.Label className="mt-2" >Contraseña:</Form.Label>
                                <Form.Control type="password" {...register("password", {required : "Es necesaria una contraseña", maxlength: 100})}/>
                                {errors.password && (<div>{errors.password.message}</div>)}    
                                <Button disabled={isSubmitting} className="mt-3 border-0" type="submit">{isSubmitting ? "Cargando..." : "Log In"}</Button>
                    </form>

                    {/* Mostrar error si existe */}
                    {loginError && (
                    <Alert variant="danger" className="mt-3">
                        {loginError}
                    </Alert>
                    )}
                </Col>
            </Container>
    )
}
export default EmpLoginForm