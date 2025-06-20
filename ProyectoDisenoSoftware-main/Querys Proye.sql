-- CREATE DATABASE RIPSSHA;
-- DROP DATABASE RIPSSHA;

USE RIPSSHA;
-------------------------------------------------- TABLAS ----------------------------------------------    
-- Tabla de roles
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

-- Tabla con logs de los usuarios
CREATE TABLE AuditLogs (
  id INT IDENTITY PRIMARY KEY,
  accion NVARCHAR(255),
  usuarioId INT NULL,
  fecha DATETIME DEFAULT GETDATE()
);

CREATE TABLE Slides (
  id INT IDENTITY(1,1) PRIMARY KEY,
  titulo NVARCHAR(255) NOT NULL,
  descripcion NVARCHAR(1000),
  ruta_imagen NVARCHAR(500),
  fecha_creacion DATETIME DEFAULT GETDATE()
);
-------------------------------------------------- ROLES -----------------------------------------------

-- Los roles del sistema hasta el momento
INSERT INTO Roles (nombre) VALUES ('admin');
INSERT INTO Roles (nombre) VALUES ('lector');

-------------------------------------------------- USUARIOS -----------------------------------------------

-- Login Usuario
GO
CREATE PROCEDURE sp_Login
  @correo NVARCHAR(100),
  @contrasena NVARCHAR(100)
AS
BEGIN
  SELECT Id, nombre_usuario FROM Usuarios
  WHERE Correo = @correo AND contraseña_hash = @contrasena;
END
GO

-- Ejemplo de usuario base

INSERT INTO Usuarios (nombre_usuario, correo, contraseña_hash, rol_id)
VALUES (
  'Keingell',
  'keingell@example.com',
  'contra123', 
  1                             
);
GO

-------------------------------------------------- LOGS -----------------------------------------------

-- Insertar un log
CREATE PROCEDURE sp_InsertarAuditLog
  @accion NVARCHAR(255),
  @usuarioId INT = NULL
AS
BEGIN
  INSERT INTO AuditLogs (accion, usuarioId, fecha)
  VALUES (@accion, @usuarioId, GETDATE());
END
GO

-------------------------------------------------- ARTICULOS -----------------------------------------------

-- Obtener articulos un articulo


CREATE PROCEDURE sp_ObtenerArticulos
AS
BEGIN
    SELECT id, titulo, descripcion, archivo_url, fecha_creacion, fecha_modificacion, creado_por FROM Articulos;
END
GO

-- Crear un articulo

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

-- Actualizar un articulo

CREATE PROCEDURE sp_ActualizarArticulo
  @id INT,
  @titulo NVARCHAR(255),
  @descripcion NVARCHAR(1000),
  @archivo_url NVARCHAR(500) = NULL
AS
BEGIN
  SET NOCOUNT ON;

  UPDATE Articulos
  SET
    titulo = @titulo,
    descripcion = @descripcion,
    archivo_url = ISNULL(@archivo_url, archivo_url), -- mantiene la actual si es NULL
    fecha_modificacion = GETDATE()
  WHERE id = @id;
END
GO

-- Eliminar un articulo


CREATE PROCEDURE sp_EliminarArticulo
  @id INT
AS
BEGIN
  SET NOCOUNT ON;

  DELETE FROM Articulos
  WHERE id = @id;
END
GO

-------------------------------------------------- SLIDES Y CARRUSEL -----------------------------------------------

-- Obtener Slides
CREATE PROCEDURE sp_SlidesCarrusel
AS
BEGIN
    SELECT id, titulo, descripcion, ruta_imagen, fecha_creacion
    FROM Slides
    ORDER BY fecha_creacion DESC;
END
GO


-- Agregar slide
CREATE PROCEDURE sp_InsertarSlide
  @titulo NVARCHAR(255),
  @descripcion NVARCHAR(1000),
  @ruta_imagen NVARCHAR(500)
AS
BEGIN
  SET NOCOUNT ON;

  INSERT INTO Slides (titulo, descripcion, ruta_imagen)
  VALUES (@titulo, @descripcion, @ruta_imagen);
END;
GO


-- Actualizar slide
CREATE OR ALTER PROCEDURE sp_Slides_Actualizar
    @id INT,
    @titulo NVARCHAR(255),
    @descripcion NVARCHAR(1000),
    @ruta_imagen NVARCHAR(500)
AS
BEGIN
    UPDATE Slides
    SET titulo = @titulo,
        descripcion = @descripcion,
        ruta_imagen = @ruta_imagen
    WHERE id = @id;
END
GO

-- Eliminar slide
CREATE OR ALTER PROCEDURE sp_Slides_Eliminar
    @id INT
AS
BEGIN
    DELETE FROM Slides WHERE id = @id;
END
GO
