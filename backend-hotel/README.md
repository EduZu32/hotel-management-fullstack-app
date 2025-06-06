# Proyecto Backend - API Hotel

Este documento proporciona instrucciones para instalar, configurar y ejecutar el backend de la API del hotel, asegurando una correcta conexión con la base de datos y la integración con el frontend.

---

## Requisitos Previos

Antes de instalar las dependencias y ejecutar el servidor, asegúrate de tener instalado lo siguiente en tu sistema:

**Node.js** (Versión recomendada: **18.x o superior**)  
 **MySQL** (o MariaDB)  
 **Postman** (opcional, para probar la API)  
 **Git** (opcional, para clonar el repositorio)

---

## Instalación y Configuración

### ** Clonar el repositorio**

```
git clone https://github.com/TuUsuario/Proyecto-Hotel.git
cd Proyecto-Hotel/backend-hotel
```

### ** Instalar dependencias de Node.js**

Ejecuta el siguiente comando dentro de la carpeta **backend-hotel**:

```
npm install
```

**Dependencias clave instaladas:**

- `express` → Framework para manejar peticiones HTTP.
- `cors` → Permite la comunicación entre frontend y backend.
- `dotenv` → Carga variables de entorno desde `.env`.
- `mysql2` → Cliente para conectarse a MySQL.
- `nodemon` (DevDependency) → Reinicio automático del servidor en cambios.

---

## Configuración de la Base de Datos

### ** Crear la base de datos en MySQL**

Abre MySQL y ejecuta:

```
CREATE DATABASE aplicacion_hotel;
```

**Cargar la estructura desde el archivo SQL**  
Si tienes el archivo `aplicacion_hotel.sql`, impórtalo en MySQL con:

```
mysql -u root -p aplicacion_hotel < aplicacion_hotel.sql
```

### ** Configurar la conexión con MySQL**

En la raíz del backend, hay un archivo **`.env`** donde se configuran las credenciales de la base de datos.  
Si no existe, créalo y agrega:

```
DB_HOST=localhost
DB_USER=root
DB_PASS=tu_contraseña_mysql
DB_NAME=aplicacion_hotel
PORT=3000
```

**Recuerda:** Si cambias los datos de la base de datos en MySQL, actualízalos aquí.

---

## Estructura del Proyecto

```
backend-hotel/
│── src/
│   ├── config/
│   │   ├── db.js         # Configuración de la conexión MySQL
│   ├── controllers/      # Controladores de cada entidad
│   ├── models/           # Modelos de la base de datos
│   ├── routes/           # Rutas de la API
│   ├── server.js         # Punto de entrada del servidor
│── .env                  # Variables de entorno
│── package.json          # Dependencias y scripts de Node.js
│── README.md             # Documentación del proyecto
```

---

## Ejecutar el Servidor

### **Iniciar el backend**

Para ejecutar el backend en desarrollo:

```
npm run dev
```

📌 Usa `nodemon` para reiniciar automáticamente el servidor si detecta cambios.

Para ejecutar en producción:

```
node src/server.js
```

### **Verificar que la API está corriendo**

Abre tu navegador o por ejemplo Postman, Thunder Client y accede a:

```
http://localhost:3000/api/hotels
```

Si todo está correcto, deberías ver un **JSON** con los datos de los hoteles.

---

## Conexión con el Frontend

Si tienes el frontend desarrollado , sigue estos pasos:

```
cd ../frontend/react-app
npm install   # Instala las dependencias del frontend
npm run dev   # Inicia la aplicación en modo desarrollo
```

Por defecto, el frontend se ejecutará en:

```
http://localhost:5173
```

Y el backend en:

```
http://localhost:3000
```

---

## Solución de Errores Comunes

**Error: "Cannot connect to MySQL"**  
 Revisa que MySQL esté corriendo con:

```
sudo systemctl start mysql  # En Linux
net start MySQL             # En Windows
```

**Error: "EADDRINUSE: Address already in use"**  
 Significa que el puerto **3000** ya está en uso. El servidor automáticamente buscará el siguiente disponible.

**Error en instalación de paquetes (`ERESOLVE`)**  
 Fuerza la instalación con:

```
npm install --legacy-peer-deps
```

---

## Funcionalidades Implementadas

### Envío de Consultas desde el Formulario de Contacto

- Los clientes (registrados o no) pueden enviar un mensaje desde la página de contacto.
- Estos mensajes se almacenan en la tabla `contact_messages` de la base de datos.
- Están disponibles para que los empleados puedan visualizarlos posteriormente desde el panel de administración.

### Sistema de Reservas

- Se puede reservar como **invitado** (guest) o como **cliente registrado** (client).
- Las reservas se guardan en la tabla `reservation` y su correspondiente factura en la tabla `invoice`.
- Para los clientes registrados, se les puede asignar un empleado que gestiona el `checkin` y `checkout`.

### Sistema de Puntos de Recompensa

- Por cada **100€** pagados en una reserva, se otorgan **10 puntos**.
- Los puntos se acumulan en la tabla `account`, que relaciona al cliente con su saldo de puntos.
- Estos puntos podrán usarse como **descuento** (ej. 100 puntos = 5% de descuento) en futuras versiones.

### Visualización de Puntos Acumulados

- Los clientes registrados pueden ver sus puntos acumulados desde la sección **"Recompensas"** en su perfil.
- Se accede a través del endpoint protegido `GET /api/clients/me` usando JWT.

---

### Subida y Gestión de Archivos de Reserva

- Los empleados pueden subir documentos relacionados con las reservas, como archivos PDF, imágenes o documentos.

- Los archivos se gestionan a través de Multer, y se almacenan en la carpeta uploads/reservations/.

- Los archivos se asocian a las reservas de los clientes y se pueden consultar desde la base de datos.

- Si el archivo ya existe en el sistema, no se subirá de nuevo.

### Subida y Descarga de Archivos en Reservas

- Los empleados pueden subir hasta 3 archivos asociados a cada reserva.
- Los archivos se almacenan físicamente en `/uploads/reservations` y se referencian en la base de datos.
- Desde el panel de gestión, los documentos pueden ser descargados con un clic en el icono correspondiente.

### Gestión de Tipos de Empleados

- El sistema permite la gestión de tipos de empleados dentro de la plataforma, diferenciando entre empleados estándar (Staff) y gerentes (Managers).

- Los gerentes tienen permisos adicionales para gestionar reservas, empleados y realizar tareas administrativas.

- Los empleados estándar tienen permisos más limitados, solo pueden gestionar reservas y ver los detalles de los clientes.

#### Modificación de Datos en la Gestión de Reservas

- Los empleados pueden modificar los datos de una reserva desde la interfaz de administración (OffCanvas).

- Los datos que se pueden editar incluyen:

- Estado de la reserva (Pendiente, Check-In, Check-Out, Reserva Cerrada).

- Fecha de Check-In y Check-Out.

- Observaciones de la reserva.

- Información del cliente (nombre, apellidos, documento, teléfono, email).

- Archivos adjuntos relacionados con la reserva (subir documentos como evidencia).

- Habitación asignada a la reserva.

- Al guardar los cambios, se actualizan en la base de datos y se reflejan inmediatamente en el sistema.

---

## Gestión de Habitaciones

El sistema permite a los empleados con rol **manager** visualizar, filtrar y modificar el estado de las habitaciones del hotel.

### Funcionalidades disponibles

- **Listar habitaciones**: Se muestran todas las habitaciones agrupadas por tipo.
- **Filtrar por estado**: Se puede filtrar por:
  - Todas
  - Habilitadas
  - Deshabilitadas
- **Habilitar/Deshabilitar** habitaciones: Solo disponible para usuarios con rol `manager`.

### Requisitos

- Autenticación mediante token JWT.
- El token debe guardarse en `sessionStorage` como `Token`.
- El usuario debe tener el rol `manager` guardado como `User` en `sessionStorage`.

### Endpoints utilizados

#### GET `/api/rooms`

- Retorna todas las habitaciones habilitadas (por defecto).
- El backend permite adaptar la consulta para incluir todas si es necesario.

#### PUT `/api/rooms/:id/enable`

- Habilita la habitación con ID específico.

#### PUT `/api/rooms/:id/disable`

- Deshabilita la habitación con ID específico.

### Lógica de React

- El componente `EmpRooms` obtiene el listado de habitaciones y las agrupa por tipo.
- Al hacer clic en los botones de acción, se envía una petición `PUT` para cambiar el estado de la habitación.
- La vista se actualiza automáticamente tras cada acción.

---

# Gestión de Empleados - Backend Hotel

Este documento explica cómo crear empleados de tipo **staff** o **manager** en el sistema del hotel, así como qué hacer si no hay empleados creados y necesitas obtener un token de autorización.

---

## Requisitos previos

- Tener el backend corriendo: `npm start`
- Tener una base de datos MySQL funcional y configurada.
- Tener configurado el archivo `.env` con una variable `JWT_SECRET`.
- Usar herramientas como **Thunder Client** o **Postman.**

---

## Crear empleados staff o manager

### 1. Endpoint

```
POST http://localhost:3000/api/employees
```

### 2. Headers requeridos

```http
Authorization: Bearer <token_de_manager_o_superadmin>
Content-Type: application/json
```

### 3. JSON de ejemplo (crear manager):

```json
{
  "emp_doc_id": "12345678A",
  "emp_name": "Ana",
  "emp_surname_one": "Pérez",
  "emp_surname_two": "López",
  "emp_telephone": 600123456,
  "emp_email": "ana.manager@email.com",
  "emp_password": "admin1234",
  "emp_manager_id": null,
  "emp_hotel_id": "1",
  "emp_role": "manager"
}
```

### 4. JSON de ejemplo (crear staff):

```json
{
  "emp_doc_id": "23456789B",
  "emp_name": "Juan",
  "emp_surname_one": "García",
  "emp_surname_two": "Martínez",
  "emp_telephone": 666987321,
  "emp_email": "juan.staff@email.com",
  "emp_password": "staff1234",
  "emp_manager_id": 1,
  "emp_hotel_id": "1",
  "emp_role": "staff"
}
```

### Reglas importantes:

- El campo `emp_role` debe ser "manager" o "staff".
- Si `emp_role` es **staff**, el campo `emp_manager_id` **es obligatorio**.
- El `emp_manager_id` debe referenciar a **emp_id** del empleado existente con rol `manager`.
- Si `emp_role` es **manager**, puedes dejar `emp_manager_id` como `null`.

---

## Inicio de sesión de empleados

### Endpoint

```
POST http://localhost:3000/api/employees/login
```

### Ejemplo JSON

```json
{
  "emp_email": "ana.manager@email.com",
  "emp_password": "admin1234"
}
```

Este login te devolverá un token JWT en caso de éxito, que puedes usar para todas las operaciones protegidas.

---

## ¿No hay ningún empleado en la base de datos?

### Usa el superusuario de emergencia

El backend incluye un acceso “root” embebido, para casos donde no existan empleados.

### Credenciales root:

```json
{
  "emp_email": "root@admin.com",
  "emp_password": "root1234"
}
```

Este usuario genera un token con rol `"superadmin"`, con el cual puedes:

- Crear empleados
- Habilitar/deshabilitar habitaciones
- Realizar operaciones como si fueras manager

Este usuario **no está en la base de datos**, solo existe como emergencia en el login.
