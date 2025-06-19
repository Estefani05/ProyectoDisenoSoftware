-- CREATE DATABASE RIPSSHA;

USE RIPSSHA;
    
CREATE TABLE Roles (
  id INT PRIMARY KEY IDENTITY,
  nombre VARCHAR(50) NOT NULL UNIQUE -- Ej: 'admin', 'lector'
);

-- Tabla de usuarios
CREATE TABLE Usuarios (
  id INT PRIMARY KEY IDENTITY,
  nombre_usuario VARCHAR(50) NOT NULL,
  correo VARCHAR(100) NOT NULL UNIQUE,
  contraseña_hash VARCHAR(255) NOT NULL,
  rol_id INT NOT NULL,
  FOREIGN KEY (rol_id) REFERENCES Roles(id)
);

-- Los roles del sistema hasta el momento
INSERT INTO Roles (nombre) VALUES ('admin');
INSERT INTO Roles (nombre) VALUES ('lector');

-- Tabla de articulos
CREATE TABLE Articulos (
  id INT PRIMARY KEY IDENTITY,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  archivo_url VARCHAR(500), -- Ruta al archivo PDF u otro
  fecha_creacion DATETIME DEFAULT GETDATE(),
  fecha_modificacion DATETIME DEFAULT GETDATE(),
  creado_por INT FOREIGN KEY REFERENCES Usuarios(id)
);

-- Tabla para manejo de alertas
CREATE TABLE Alertas (
  id INT PRIMARY KEY IDENTITY,
  mensaje TEXT NOT NULL,
  articulo_id INT FOREIGN KEY REFERENCES Articulos(id),
  fecha DATETIME DEFAULT GETDATE()
);

-- Stored Procedures	
GO
CREATE PROCEDURE sp_ObtenerArticulos
AS
BEGIN
  SELECT id, titulo, descripcion, archivo_url, fecha_modificacion
  FROM Articulos
  ORDER BY fecha_modificacion DESC;
END

GO
CREATE PROCEDURE sp_CrearArticulo
  @titulo VARCHAR(255),
  @descripcion TEXT,
  @archivo_url VARCHAR(500),
  @creado_por INT
AS
BEGIN
  INSERT INTO Articulos (titulo, descripcion, archivo_url, creado_por)
  VALUES (@titulo, @descripcion, @archivo_url, @creado_por);
END

GO
CREATE PROCEDURE sp_EditarArticulo
  @id INT,
  @titulo VARCHAR(255),
  @descripcion TEXT,
  @archivo_url VARCHAR(500)
AS
BEGIN
  UPDATE Articulos
  SET titulo = @titulo,
      descripcion = @descripcion,
      archivo_url = @archivo_url,
      fecha_modificacion = GETDATE()
  WHERE id = @id;
END

GO
CREATE PROCEDURE sp_LoginUsuario
  @correo VARCHAR(100)
AS
BEGIN
  SELECT id, nombre_usuario, correo, contraseña_hash, rol_id
  FROM Usuarios
  WHERE correo = @correo;
END

--ALTER LOGIN sa WITH PASSWORD = 'Contra123';
--ALTER LOGIN sa ENABLE;

CREATE PROCEDURE sp_Login
  @correo NVARCHAR(100),
  @contrasena NVARCHAR(100)
AS
BEGIN
  SELECT Id, Nombre FROM Usuarios
  WHERE Correo = @correo AND Contrasena = @contrasena;
END

INSERT INTO Usuarios (nombre_usuario, correo, contraseña_hash, rol_id)
VALUES (
  'Keingell',
  'keingell@example.com',
  'contra123', 
  1                             
);

SELECT * FROM Usuarios;